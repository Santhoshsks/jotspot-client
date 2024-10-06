export interface NoteObject {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  deleted: boolean;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  color: string;
}
