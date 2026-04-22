export function generateFunnel(gridName: string = '漏斗图', data: any[]) {
    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}',
        },
        series: [
            {
                name: 'Funnel',
                type: 'funnel',
                data: data.map((i) => ({
                    name: i.stage,
                    value: i.value,
                })),
            },
        ],
        legend: {},
        toolbox: {
            feature: {
                dataView: {
                    title: '数据视图',
                    show: true,
                    readOnly: true,
                    lang: ['数据视图', '关闭'],
                },
                restore: {
                    show: true,
                    title: '恢复',
                },
            },
        },
        dataZoom: [
            {
                type: 'inside',
            },
            {
                type: 'slider',
                height: 20,
                bottom: 60,
            },
        ],
        grid: {
            bottom: 140,
        },
    };
}
