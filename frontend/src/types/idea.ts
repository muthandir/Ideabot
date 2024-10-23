export interface Idea {
  id?: number;
  isRecent: boolean;
  content: string;
  chatId: number;
  createdAt?: string;
  updatedAt?: string;
}