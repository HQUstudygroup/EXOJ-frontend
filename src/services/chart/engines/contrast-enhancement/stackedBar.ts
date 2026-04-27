export function generateStackedBar(gridName: string = '堆叠柱状图', data: any[]) {
    const categories = [...new Set(data.map((i) => i.x))];
    const groups = [...new Set(data.map((i) => i.group))];

    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        tooltip: { trigger: 'axis' },
        axisPointer: {
            type: 'shadow',
        },
        legend: {},
        xAxis: {
            type: 'category',
            data: categories,
        },
        yAxis: { type: 'value' },
        series: groups.map((g) => ({
            name: g,
            type: 'bar',
            stack: 'Ad',
            data: categories.map((c) => data.find((i) => i.x === c && i.group === g)?.y ?? 0),
        })),
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
