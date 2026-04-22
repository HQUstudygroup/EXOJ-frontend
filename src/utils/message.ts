import type { MessageApi } from 'naive-ui';

let message: MessageApi | null = null;

export function setMessageInstance(instance: MessageApi) {
    message = instance;
}

export function getMessageInstance() {
    if (!message) {
        throw new Error('Message instance not initialized');
    }
    return message;
}
