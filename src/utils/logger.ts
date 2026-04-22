import { getMessageInstance } from './message';

type MsgOptions = {
    duration?: number;
};

const DEFAULT_DURATION = 5000;

export const logger = {
    info(content: string, options: MsgOptions = {}) {
        console.log('[INFO]', content);

        const { duration = DEFAULT_DURATION } = options;

        getMessageInstance().info(content, {
            duration,
        });
    },

    success(content: string, options: MsgOptions = {}) {
        console.log('[SUCCESS]', content);

        const { duration = DEFAULT_DURATION } = options;

        getMessageInstance().success(content, {
            duration,
        });
    },

    warning(content: string, options: MsgOptions = {}) {
        console.warn('[WARNING]', content);

        const { duration = DEFAULT_DURATION } = options;

        getMessageInstance().warning(content, {
            duration,
        });
    },

    error(content: string, options: MsgOptions = {}) {
        console.error('[ERROR]', content);

        const { duration = DEFAULT_DURATION } = options;

        getMessageInstance().error(content, {
            duration,
        });
    },

    loading(content: string, options: MsgOptions = {}) {
        const { duration = DEFAULT_DURATION } = options;

        return getMessageInstance().loading(content, {
            duration,
        });
    },
};
