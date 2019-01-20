import { Snippet } from './snippet';

export interface ChatMessage {
    conversationId?: string;
    message: {
        content: Snippet | Snippet[];
    }
}
