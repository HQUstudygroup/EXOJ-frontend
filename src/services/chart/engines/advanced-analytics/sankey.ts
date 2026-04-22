export function generateSankey(gridName: string = '桑基图', data: any[] | { links: any[] }) {
    const realData = Array.isArray(data) ? data : data.links;

    const nodes = Array.from(
        new Set(realData.flatMap((i: { source: string; target: string }) => [i.source, i.target]))
    ).map((name) => ({
        name,
    }));

    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        tooltip: { trigger: 'item' },
        series: [
            {
                type: 'sankey',
                data: nodes,
                links: realData.map((i: { source: string; target: string; value: number }) => ({
                    source: i.source,
                    target: i.target,
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
        dataZoom: [{ type: 'inside' }, { type: 'slider', height: 20, bottom: 60 }],
        grid: {
            bottom: 140,
        },
    };
}
