export interface Message {
  text: string;
  sender: "user" | "bot";
  chatId?: number;
}