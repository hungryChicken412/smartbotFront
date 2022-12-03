export type ChatbotStatus = 'Development' | 'Online' | 'Offline' | 'Error';

export interface Chatbot {
  id: string;
  status: ChatbotStatus;
  name: string;
  created: number;
  website: string;
  interactions: string;
}
