export function generateBoxplot(gridName: string = '箱线图', data: any[]) {
    const groups = [...new Set(data.map((i) => i.group))];

    const grouped = groups.map((g) =>
        data
            .filter((i) => i.group === g)
            .map((i) => i.value)
            .sort((a, b) => a - b)
    );

    // 更严谨一点的分位数计算
    const quantile = (arr: number[], q: number) => {
        const pos = (arr.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        return arr[base + 1] !== undefined
            ? arr[base] + rest * (arr[base + 1] - arr[base])
            : arr[base];
    };

    const calc = (arr: number[]) => {
        const min = arr[0];
        const max = arr[arr.length - 1];
        const q1 = quantile(arr, 0.25);
        const median = quantile(arr, 0.5);
        const q3 = quantile(arr, 0.75);
        return [min, q1, median, q3, max];
    };

    const scatterData = data.map((i) => ({
        value: [i.value, i.group],
        group: i.group,
        valueRaw: i.value,
    }));

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
            type: 'value',
            splitArea: {
                show: true,
            },
        },

        yAxis: {
            type: 'category',
            data: groups,
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

        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                data: grouped.map(calc),
                itemStyle: {
                    color: '#b8c5f2',
                },
            },
            {
                name: 'detail',
                type: 'scatter',
                data: scatterData,
                symbolSize: 8,

                itemStyle: {
                    color: '#d00000',
                },

                label: {
                    show: true,
                    position: 'right',
                    fontSize: 10,
                    formatter: (param: any) => {
                        return param.data.valueRaw;
                    },
                },

                tooltip: {
                    trigger: 'item',
                    formatter: (param: any) => {
                        const d = param.data;
                        return `
                            group: ${d.group}<br/>
                            value: ${d.valueRaw}
                        `;
                    },
                },
            },
        ],

        legend: {
            selected: { detail: false },
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
                saveAsImage: {
                    type: 'png',
                    name: gridName,
                    title: '点击下载',
                    pixelRatio: 2,
                },
            },
        },
    };
}
