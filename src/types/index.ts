export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface ConversationTurn {
  role: "user" | "model";
  parts: { text: string }[];
}

export type Theme = "light" | "dark";
