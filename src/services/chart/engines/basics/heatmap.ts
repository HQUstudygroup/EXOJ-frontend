export function generateHeatmap(gridName: string = '热力图', data: any[]) {
    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        legend: {},
        xAxis: {
            type: 'category',
            data: Array.from(new Set(data.map((i) => i.x))),
        },
        yAxis: {
            type: 'category',
            data: Array.from(new Set(data.map((i) => i.y))),
        },
        tooltip: {
            trigger: 'axis',
        },
        visualMap: {
            min: 0,
            max: Math.max(...data.map((i) => i.value)),
            calculable: true,
            orient: 'horizontal',
            left: 'center',
        },
        series: [
            {
                type: 'heatmap',
                data: data.map((i) => [i.x, i.y, i.value]),
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
