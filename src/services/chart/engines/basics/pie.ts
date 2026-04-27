export function generatePie(gridName: string = '饼图', data: any[]) {
    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        legend: {},
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                type: 'pie',
                data: data.map((i) => ({
                    name: i.category,
                    value: i.value,
                })),
            },
        ],
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
                saveAsImage: {
                    type: 'png',
                    name: gridName,
                    title: '点击下载',
                    pixelRatio: 2,
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
