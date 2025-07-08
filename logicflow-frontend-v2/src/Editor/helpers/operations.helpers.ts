/* eslint-disable import/order */
import { getRandomColor } from '@/lib/utils'
import { store } from '@/store'
import { EDITOR_ELEMENT_ID } from '../CONSTANTS'
import type { Operation } from '../models/operations.models'
import { updateAddUsers } from '../reduxSlice/editorSlice'

export const processOperation = (operation: Operation) => {
  switch (operation.type) {
    case 'add-user': {
      store.dispatch(updateAddUsers({
        color: getRandomColor(),
        id: operation.user.id,
        name: operation.user.name,
        userId: operation.user.userId,
        userName: operation.user.userName
      }))
      break
    }
    case 'content-sync': {
      const oldSelection = window.getSelection()
      const editorEle = document.getElementById(EDITOR_ELEMENT_ID)
      if(editorEle){
        editorEle.innerHTML = operation.content
      } 
      const selection = window.getSelection();
      selection?.removeAllRanges();
      
      const range = document.createRange();
      if(oldSelection&&oldSelection.anchorNode  ){
        range.setStart(oldSelection.anchorNode, oldSelection.anchorOffset)
        selection?.addRange(range)
      }

      break
    }
  }
}
