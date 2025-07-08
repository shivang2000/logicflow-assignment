import { FileText, Users, Wifi, WifiOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import {
  updateAddOperatons,
  updateCurrentUserCursor,
  updateLastSavedContent,
} from "../reduxSlice/editorSlice";
import { useCollaborativeFeature } from "../hooks/useCollaborativeFeature";
import ToolBar from "./ToolBar";
import type { AppState } from "@/store";
import type { Operation } from "../models/operations.models";
import { store } from "@/store";
import { uuidV4 } from "@/lib/utils";
import { EDITOR_ELEMENT_ID } from "../CONSTANTS";

const Editor = () => {
  const dispatch = useDispatch();
  const fontFamily = useSelector(
    (state: AppState) => state.editorStore.fontFamily
  );
  const fontSize = useSelector((state: AppState) => state.editorStore.fontSize);
  const isConnected = useSelector(
    (state: AppState) => state.editorStore.isConnected
  );
  const textColor = useSelector(
    (state: AppState) => state.editorStore.textColor
  );
  const users = useSelector((state: AppState) => state.editorStore.users);
  const editorRef = useRef<HTMLDivElement>(null);

  const inputChangeRef = useRef<number | null>(null);
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = (e.target as HTMLDivElement).innerHTML;
    const operation: Operation = {
      type: "content-sync",
      content,
      id: uuidV4(),
      timeStamp: Date.now(),
      userId: store.getState().auth.user!.id,
    };
    if (inputChangeRef.current) clearTimeout(inputChangeRef.current);
    inputChangeRef.current = setTimeout(() => {
      dispatch(updateLastSavedContent(content));
      dispatch(updateAddOperatons(operation));
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {};

  const handleCursorMove = (e: React.MouseEvent<HTMLDivElement>) => {};

  useEffect(() => {
    const t = setInterval(() => {
      const cursor = window.getSelection();
      if (cursor) {
        // store.dispatch(
        //   updateCurrentUserCursor({
        //     position: {
        //       startContainer: cursor.anchorNode,
        //       startOffset: cursor.anchorOffset,
        //     },
        //   })
        // );
      } else {
        store.dispatch(updateCurrentUserCursor(null));
      }
    }, 100);
    return () => clearInterval(t);
  }, []);

  useCollaborativeFeature();

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText size={24} />
            <h1 className="text-xl font-semibold">Collaborative Text Editor</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <>
                  <Wifi size={18} className="text-green-300" />
                  <span className="text-sm">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff size={18} className="text-red-300" />
                  <span className="text-sm">Disconnected</span>
                </>
              )}
            </div>

            {/* Active Users */}
            <div className="flex items-center space-x-2">
              <Users size={18} />
              <span className="text-sm">{users.length} users</span>
              <div className="flex space-x-1">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: user.color }}
                    title={user.name}
                  >
                    {user.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <ToolBar />

      {/* Editor */}
      <div className="p-6 bg-white">
        <div className="relative">
          <div
            ref={editorRef}
            id={EDITOR_ELEMENT_ID}
            contentEditable={isConnected}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onMouseUp={handleCursorMove}
            className={`min-h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white relative ${
              !isConnected ? "bg-gray-50" : ""
            }`}
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily,
              color: textColor,
              lineHeight: "1.6",
            }}
            suppressContentEditableWarning={true}
          ></div>

          {/* Render user cursors */}
          {/* {Array.from(cursors.values()).map((cursor) => (
            <UserCursor key={cursor.userId} cursor={cursor} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Editor;
