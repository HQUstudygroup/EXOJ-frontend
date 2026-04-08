import type { MenuOption } from 'naive-ui';

export const asideOptions: MenuOption[] = [
    {
        label: '舞，舞，舞',
        key: 'dance-dance-dance',
        children: [
            {
                type: 'group',
                label: '人物',
                key: 'people',
                children: [
                    {
                        label: '叙事者',
                        key: 'narrator',
                    },
                    {
                        label: '羊男',
                        key: 'sheep-man',
                    },
                ],
            },
            {
                label: '饮品',
                key: 'beverage',
                children: [
                    {
                        label: '威士忌',
                        key: 'whisky',
                        href: 'http://localhost:5173/about',
                    },
                ],
            },
            {
                label: '食物',
                key: 'food',
                children: [
                    {
                        label: '三明治',
                        key: 'sandwich',
                    },
                ],
            },
            {
                label: '过去增多，未来减少',
                key: 'the-past-increases-the-future-recedes',
            },
        ],
    },
];
