import { getMessageInstance } from './message';

const DEFAULT_DURATION_SEC = 5;

const toMS = (sec: number) => ({ duration: sec * 1000 });

/**
 * 全局日志与消息提示工具
 * @param content 提示内容
 * @param duration 停留时长（秒）
 */
export const logger = {
    /** @param content 提示内容 @param duration 停留时长 (秒) */
    info(content: string, duration = DEFAULT_DURATION_SEC) {
        console.log('[INFO]', content);
        getMessageInstance().info(content, toMS(duration));
    },

    /** @param content 提示内容 @param duration 停留时长 (秒) */
    success(content: string, duration = DEFAULT_DURATION_SEC) {
        console.log('[SUCCESS]', content);
        getMessageInstance().success(content, toMS(duration));
    },

    /** @param content 提示内容 @param duration 停留时长 (秒) */
    warning(content: string, duration = DEFAULT_DURATION_SEC) {
        console.warn('[WARNING]', content);
        getMessageInstance().warning(content, toMS(duration));
    },

    /** @param content 提示内容 @param duration 停留时长 (秒) */
    error(content: string, duration = DEFAULT_DURATION_SEC) {
        console.error('[ERROR]', content);
        getMessageInstance().error(content, toMS(duration));
    },

    /** @param content 提示内容 @param duration 停留时长 (秒) */
    loading(content: string, duration = DEFAULT_DURATION_SEC) {
        return getMessageInstance().loading(content, toMS(duration));
    },
};
