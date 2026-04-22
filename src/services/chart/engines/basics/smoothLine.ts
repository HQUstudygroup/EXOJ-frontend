export function generateSmoothLine(gridName: string = '平滑折线', data: any[]) {
    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: data.map((i) => i.x),
        },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'line',
                smooth: true,
                data: data.map((i) => i.y),
            },
        ],
        smooth: true,
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
        legend: {},
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
