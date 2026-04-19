import { defineStore } from 'pinia';
import { useUniverStore } from './univer';

const univerStore = useUniverStore();

export const useMenuStore = defineStore('menu', {
    state: () => ({
        activeKey: '' as string,

        formulaInfo: undefined as any,

        showFormulaInfoModal: false as boolean,
    }),

    actions: {
        async openFormulaInfoModal() {
            this.formulaInfo = await univerStore.getFormulaInfo(this.activeKey);

            if (this.formulaInfo === undefined) {
                this.showFormulaInfoModal = false;
                return;
            }

            this.showFormulaInfoModal = true;
        },
    },
});
