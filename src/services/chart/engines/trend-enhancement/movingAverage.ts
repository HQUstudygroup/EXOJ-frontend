export function generateMovingAverage(gridName: string = '移动平均线', data: any[], window = 3) {
    const values = data.map((i) => i.y);

    const ma = values.map((_, i) => {
        if (i < window - 1) return null;
        const slice = values.slice(i - window + 1, i + 1);
        return slice.reduce((a, b) => a + b, 0) / window;
    });

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
                data: values,
            },
            {
                type: 'line',
                data: ma,
                smooth: true,
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
