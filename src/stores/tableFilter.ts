import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', {
    state: () => ({
        filterRows: [
            {
                field: null as string | null,
                condition: null,
                value: null,
            },
        ],

        logicOptions: [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            { label: '13', value: '13' },
            { label: '14', value: '14' },
        ],

        optionsSelected: [] as { label: string; value: string }[],

        oldValueMap: new WeakMap<any, string | null | undefined>(),

        showModal: false,
    }),

    getters: {
        availableOptions(state) {
            return state.logicOptions.filter((option) => {
                return !state.optionsSelected.some((selected) => selected.value === option.value);
            });
        },
    },

    actions: {
        addFilterRow() {
            if (this.filterRows.length < this.logicOptions.length) {
                this.filterRows.push({
                    field: null,
                    condition: null,
                    value: null,
                });
            }
        },

        removeFilterRow(index: number) {
            const row = this.filterRows[index];

            const oldVal = this.oldValueMap.get(row);

            if (oldVal) {
                const i = this.optionsSelected.findIndex((o) => o.value === oldVal);
                if (i !== -1) {
                    this.optionsSelected.splice(i, 1);
                }
            }

            if (this.filterRows.length > 1) {
                this.filterRows.splice(index, 1);
            }

            this.oldValueMap.delete(row);
        },

        handleFieldChange(row: any, newVal: string | null | undefined) {
            const oldVal = this.oldValueMap.get(row);

            if (oldVal) {
                const i = this.optionsSelected.findIndex((o) => o.value === oldVal);
                if (i !== -1) {
                    this.optionsSelected.splice(i, 1);
                }
            }

            if (newVal) {
                this.optionsSelected.push({
                    label: newVal,
                    value: newVal,
                });
            }

            this.oldValueMap.set(row, newVal);
        },

        resetFilter() {
            this.filterRows = [
                {
                    field: null,
                    condition: null,
                    value: null,
                },
            ];

            this.optionsSelected = [];

            this.oldValueMap = new WeakMap();

            this.showModal = false;
        },

        handlerFilterAbandon() {
            this.resetFilter();
            this.showModal = false;
        },

        handlerFilterSubmit() {
            this.showModal = false;
        },
    },
});
