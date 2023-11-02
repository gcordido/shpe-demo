export interface MessageData {
    role: 'assistant' | 'user' | 'system';
    content: string;
}