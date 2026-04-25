export function generatePercentBar(gridName: string = '百分比柱状图', data: any[]) {
    const categories = [...new Set(data.map((i) => i.x))];
    const groups = [...new Set(data.map((i) => i.group))];

    const totals = categories.map((c) =>
        data.filter((i) => i.x === c).reduce((sum, i) => sum + i.y, 0)
    );

    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        tooltip: { trigger: 'axis' },
        legend: {},
        xAxis: { type: 'category', data: categories },
        yAxis: { type: 'value', max: 100 },
        series: groups.map((g) => ({
            name: g,
            type: 'bar',
            stack: 'percent',
            data: categories.map((c, idx) => {
                const val = data.find((i) => i.x === c && i.group === g)?.y ?? 0;
                return (val / totals[idx]) * 100;
            }),
        })),
        axisLabel: {
            formatter: '{value}%',
        },
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
