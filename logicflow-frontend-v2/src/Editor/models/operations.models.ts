import type { IUser } from "@/Auth/models/user.models"

export type Operation = {
  id: string
  type: string // operation type will change based on diference operaiton
  userId: string
  timeStamp: number
} &(AddUserOperation | ContentSyncOperation)

export interface AddUserOperation {
  type: 'add-user'
  user: IUser
}
export interface ContentSyncOperation {
  type:'content-sync'
  content: string
}