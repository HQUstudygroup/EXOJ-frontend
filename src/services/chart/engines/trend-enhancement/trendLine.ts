export function generateTrendLine(gridName: string = '趋势线', data: any[]) {
    const x = data.map((_, i) => i);
    const y = data.map((i) => i.y);

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((s, xi, i) => s + xi * y[i], 0);
    const sumX2 = x.reduce((s, xi) => s + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const trend = x.map((i) => slope * i + intercept);

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
                data: y,
            },
            {
                type: 'line',
                data: trend,
                lineStyle: {
                    type: 'dashed',
                },
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
