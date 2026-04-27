export function generateScatter(gridName: string = '散点图', data: any[]) {
    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },
        legend: {},
        xAxis: {},
        yAxis: {},
        tooltip: {
            trigger: 'item',
            formatter: (param: any) => {
                const d = param.data;
                return `x: ${d[0]}, y: ${d[1]}`;
            },
        },
        series: [
            {
                type: 'scatter',
                data: data.map((i) => [i.x, i.y]),
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
