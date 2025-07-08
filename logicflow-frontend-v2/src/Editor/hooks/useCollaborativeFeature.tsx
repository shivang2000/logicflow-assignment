import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processOperation } from "../helpers/operations.helpers";
import { updateAddUsers, updateIsConnected } from "../reduxSlice/editorSlice";
import type { AppState } from "@/store";
import type { Operation } from "../models/operations.models";
import { getRandomColor, uuidV4 } from "@/lib/utils";

export const useCollaborativeFeature = () => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const { operations } = useSelector((state: AppState) => state.editorStore);
  const user = useSelector((state: AppState) => state.auth.user);

  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      const ws = new WebSocket("ws://localhost:8000/ws/doc/shivang/");
      webSocketRef.current = ws;

      ws.addEventListener("open", (event) => {
        dispatch(updateIsConnected(true))
        const operation: Operation = {
          type: 'add-user',
          id: uuidV4(),
          timeStamp: Date.now(),
          user,
          userId: user.id
        }
        dispatch(updateAddUsers({
        color: getRandomColor(),
        id: user.id,
        name: user.name,
        userId: user.userId,
        userName: user.userName
      }))
        ws.send(JSON.stringify(operation))
      });

      ws.addEventListener("message", (event) => {
        const operation: Operation = JSON.parse(event.data)
        if(operation.userId !== user.id){
          processOperation(operation)
        }
      });

      return () => {
        ws.close();
        webSocketRef.current = null;
      };
    }
  }, [user]);

  const lastSentOperation = useRef<number | null>(null);
  useEffect(() => {
    if (
      operations.length > 0 &&
      webSocketRef.current &&
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      webSocketRef.current.OPEN
    ) {
      for (const operation of operations) {
        if (operation.timeStamp > (lastSentOperation.current ?? 0)) {
          lastSentOperation.current = operation.timeStamp;
          if (user?.id === operation.userId) {
            webSocketRef.current.send(JSON.stringify(operation));
          }
        }
      }
    }
  }, [operations,user]);
};
