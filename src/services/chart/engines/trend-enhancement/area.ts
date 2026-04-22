export function generateArea(gridName: string = '面积图', data: any[]) {
    const categories = [...new Set(data.map((i) => i.x))];
    const groups = [...new Set(data.map((i) => i.group))];

    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        legend: {
            data: groups,
            bottom: 0,
        },

        tooltip: {
            trigger: 'axis',
        },

        xAxis: {
            type: 'category',
            data: categories,
        },

        yAxis: {
            type: 'value',
        },

        series: groups.map((g) => ({
            name: g,
            type: 'line',
            stack: 'total',
            areaStyle: {},
            smooth: true,
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
