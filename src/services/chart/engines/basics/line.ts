export function generateLine(gridName: string = '折线图', data: any[]) {
    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        legend: {},
        xAxis: {
            type: 'category',
            data: data.map((i) => i.x),
        },
        yAxis: {
            type: 'value',
        },
        tooltip: {
            trigger: 'axis',
        },
        series: [
            {
                type: 'line',
                data: data.map((i) => i.y),
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
