import { chatAPI } from '@/api/chat';

import { defineStore } from 'pinia';
import { nextTick } from 'vue';

/**
 * AiAssistantStore
 *
 * @typedef {Object} useAiAssistantStore
 *
 * @property {Object} state - 状态数据
 * @property {Array} state.messages - 消息列表，用于渲染
 * @property {number} state.taskId - 任务Id，用于防止任务相互污染
 * @property {boolean} state.isInputLoading - 用于消息输入框的状态管理
 * @property {AbortController} state.abortController - 用于中断请求
 *
 * @property {Object} actions - 逻辑操作
 * @property {Function} actions.addMessage - 添加消息到消息列表
 * @property {Function} actions.requestAssistant - 请求 AI Assistant
 * @property {Function} actions.analyzePack - 解析请求 AI 返回的数据流
 * @property {Function} actions.addNewSession - 创建新的 AI 会话
 * @property {Function} actions.stopCurrentTask - 停止当前任务
 * @property {Function} actions.scrollToButtom - 渲染消息的时候滚动条到最底下
 */

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useAiAssistantStore = defineStore('aiassistant', {
    state: () => ({
        /** @type {{role: string, content: string, messageStatus: boolean | 'error'}[]} 消息列表，用于 UI 渲染 */
        messages: [] as {
            role: string;
            content: string;
            messageStatus: boolean | 'error';
        }[],

        /** @type {number} 任务轮次 ID，用于通过版本比对防止异步请求污染 */
        taskId: 0 as number,

        /** @type {boolean} 全局输入框加载状态 */
        isInputLoading: false as boolean,

        /** @type {AbortController | null} 控制当前 Fetch 请求的中断控制器 */
        abortController: null as AbortController | null,

        /** @type {boolean} 控制 AI 助手模态框显示 */
        showAssistantModal: false as boolean,
    }),

    actions: {
        /**
         * 向消息列表追加一条新消息
         * @param {string} role - 角色: 'user' | 'assistant'
         * @param {string} content - 消息文本内容
         * @param {boolean} messageStatus - 是否处于加载/打字机状态
         */
        addMessage(role: string, content: string, messageStatus: boolean) {
            this.messages.push({
                role,
                content,
                messageStatus,
            });
        },

        /**
         * 停止当前进行的 AI 任务
         * 重置加载状态、中断网络请求，并将最后一条消息置为非等待状态
         */
        stopCurrentTask() {
            this.taskId++;
            this.isInputLoading = false;

            if (this.abortController) {
                this.abortController.abort();
                this.abortController = null;
            }

            const last = this.messages.at(-1);
            if (last && last.role === 'assistant' && last.messageStatus) {
                last.messageStatus = false;
            }
        },

        /**
         * 发起 AI 对话请求
         * 包含自动创建会话（如果没有的话）、处理流式响应及异常处理
         * @param {string} prompt - 用户输入的提示词
         * @returns {Promise<void>}
         */
        async requestAssistant(prompt: string, scene: string, analyzeData?: []) {
            const id = this.taskId;

            let session_id = localStorage.getItem('session_id');
            if (!session_id) {
                session_id = await this.addNewSession();
            }

            this.isInputLoading = true;

            this.addMessage('user', prompt, false);
            this.addMessage('assistant', '', true);

            const assistantIndex = this.messages.length - 1;

            this.scrollToButtom();

            this.abortController = new AbortController();

            try {
                if (id !== this.taskId) return;

                if (scene === 'analyze') {
                    prompt;
                }
                const response = await chatAPI({
                    baseURL,
                    session_id,
                    prompt,
                    signal: this.abortController.signal,
                });

                const reader = response.body?.getReader();
                const decoder = new TextDecoder();

                if (!reader) throw new Error('无法读取流：response.body 为 null');

                while (true) {
                    if (!this.isInputLoading || id !== this.taskId) break;

                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);

                    await this.analyzePack(id, assistantIndex, chunk);
                }
            } catch (error: any) {
                if (error.name === 'AbortError') return;

                this.messages[assistantIndex].messageStatus = 'error';
                this.messages[assistantIndex].content += error;

                console.error('流传输失败:', error);
            } finally {
                if (
                    this.messages[assistantIndex] &&
                    this.messages[assistantIndex].messageStatus !== 'error'
                )
                    this.messages[assistantIndex].messageStatus = false;

                this.isInputLoading = false;
                this.abortController = null;

                await this.scrollToButtom();
            }
        },

        /**
         * 解析 SSE 流式数据包
         * @param {number} id - 发起请求时的任务 ID
         * @param {number} assistantIndex - 消息在列表中的索引
         * @param {string} chunk - 原始数据块
         */
        async analyzePack(id: number, assistantIndex: number, chunk: string) {
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (id !== this.taskId) return;

                const trimmedLine = line.trim();

                if (!trimmedLine || !trimmedLine.startsWith('data:')) continue;

                const rawData = trimmedLine.replace(/^data:\s*/, '');

                if (rawData === '[DONE]') {
                    if (this.messages[assistantIndex]?.content === '') {
                        this.messages[assistantIndex].messageStatus = 'error';
                        this.messages[assistantIndex].content += `没额度了`;
                    }
                    break;
                }

                try {
                    const json = JSON.parse(rawData);
                    const content = json.choices?.[0]?.delta?.content;

                    if (content && this.messages[assistantIndex]) {
                        this.messages[assistantIndex].content += content;
                        this.scrollToButtom();
                    }
                } catch (e) {
                    console.error('解析单行失败', e);
                }
            }
        },

        /**
         * 滚动视图至底部
         * 确保在 DOM 更新后执行平滑滚动
         */
        async scrollToButtom() {
            await nextTick();

            const el = document.querySelector('.scroll-bottom');

            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        },

        /**
         * 创建新的会话
         * 清空历史消息并生成新的 session_id 存储在本地
         * @returns {Promise<string>} 返回新的会话 ID
         */
        async addNewSession() {
            const sessionId = localStorage.getItem('session_id');
            if (sessionId) {
                localStorage.removeItem('session_id');
            }

            const newSessionId = Date.now().toString();
            localStorage.setItem('session_id', newSessionId);

            this.messages = [];

            return newSessionId;
        },
    },
});
