import { defineStore } from 'pinia';
import { useUniverStore } from './univer';
import CATEGORY_MAP from '@/components/SideBar/asideCategoryMap';

const univerStore = useUniverStore();

export const useMenuStore = defineStore('menu', {
    state: () => ({
        activeKey: '' as string,

        formulaInfo: undefined as any,

        showFormulaInfoModal: false as boolean,
    }),

    getters: {
        isDataVisualization: (state) =>
            CATEGORY_MAP['data-visualization'].includes(state.activeKey),
    },

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
