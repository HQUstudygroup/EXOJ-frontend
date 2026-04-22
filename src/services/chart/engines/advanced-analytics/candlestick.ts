function calcMA(data: any[], period: number) {
    return data.map((_, i) => {
        if (i < period - 1) return null;

        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((a, b) => a + b.close, 0);

        return sum / period;
    });
}

export function generateCandlestick(gridName: string = 'K 线图', data: any[]) {
    const UP_COLOR = '#ef232a';
    const DOWN_COLOR = '#14b143';

    const categories = data.map((i) => i.time);

    const ohlc = data.map((i) => [i.open, i.close, i.low, i.high]);
    const volume = data.map((i) => i.volume);

    const ma5 = calcMA(data, 5);
    const ma10 = calcMA(data, 10);

    const hasVolume = data.some((i) => i.volume != null);

    const series: any[] = [
        {
            name: 'K-Line',
            type: 'candlestick',
            data: ohlc,
            xAxisIndex: 0,
            yAxisIndex: 0,
        },

        {
            name: 'MA5',
            type: 'line',
            data: ma5,
            smooth: true,
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
                width: 2,
            },
            smoothMonotone: null,
            symbol: 'emptyCircle',
            symbolSize: 6,
            symbolRotate: null,
            showSymbol: true,
            showAllSymbol: 'auto',
        },

        {
            name: 'MA10',
            type: 'line',
            data: ma10,
            smooth: true,
            xAxisIndex: 0,
            yAxisIndex: 0,
            lineStyle: {
                width: 2,
                type: 'dashed',
            },
            smoothMonotone: null,
            symbol: 'emptyCircle',
            symbolSize: 6,
            symbolRotate: null,
            showSymbol: true,
            showAllSymbol: 'auto',
        },
    ];

    if (hasVolume) {
        series.push({
            name: 'Volume',
            type: 'bar',
            data: volume,
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
                color: (params: any) => {
                    const i = params.dataIndex;
                    const item = data[i];
                    return item.close >= item.open ? UP_COLOR : DOWN_COLOR;
                },
            },
        });
    }

    return {
        title: {
            text: gridName,
            left: 'center',
            show: true,
        },

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000',
            },
        },

        axisPointer: {
            link: [{ xAxisIndex: [0, 1] }],
        },

        xAxis: hasVolume
            ? [
                  {
                      type: 'category',
                      data: categories,
                      boundaryGap: true,
                      gridIndex: 0,
                      axisTick: {
                          show: true,
                          alignWithLabel: true,
                      },
                  },
                  {
                      type: 'category',
                      data: categories,
                      boundaryGap: true,
                      gridIndex: 1,
                      axisLabel: {
                          show: false,
                      },
                  },
              ]
            : {
                  type: 'category',
                  data: categories,
                  gridIndex: 0,
                  axisTick: {
                      show: true,
                      alignWithLabel: true,
                  },
              },

        yAxis: hasVolume
            ? [
                  {
                      scale: true,
                      gridIndex: 0,
                      splitArea: {
                          show: true,
                      },
                  },
                  {
                      show: false,
                      scale: true,
                      gridIndex: 1,
                  },
              ]
            : {
                  scale: true,
                  gridIndex: 0,
                  splitArea: {
                      show: true,
                  },
              },

        grid: hasVolume
            ? [
                  {
                      left: '10%',
                      right: '8%',
                      bottom: '35%',
                  },
                  {
                      left: '10%',
                      right: '8%',
                      top: '73%',
                      bottom: '15%',
                  },
              ]
            : [
                  {
                      left: '10%',
                      right: '8%',
                      bottom: '15%',
                  },
              ],

        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: { colorAlpha: 0.1 },
        },

        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: 'all',
                zoomOnMouseWheel: true,
                moveOnMouseMove: true,
            },
            {
                type: 'slider',
                xAxisIndex: 'all',
                height: 20,
                bottom: '8%',
            },
        ],

        series,

        legend: {
            bottom: 10,
            left: 'center',

            data: ['K-Line', 'MA5', 'MA10', 'Volume'],

            z: 4,
            show: true,
            orient: 'horizontal',
            align: 'auto',

            itemGap: 12,
            itemWidth: 25,
            itemHeight: 14,

            textStyle: {
                color: '#54555a',
                fontSize: 12,
            },

            inactiveColor: '#cfd2d7',

            selected: {
                'K-Line': true,
                MA5: true,
                MA10: true,
                Volume: true,
            },
        },

        toolbox: {
            feature: {
                dataView: {
                    title: '数据视图',
                    show: true,
                    readOnly: true,
                    lang: ['数据视图', '关闭'],
                },
                brush: {
                    type: ['lineX', 'clear'],
                    title: {
                        lineX: '横向选择区域',
                        clear: '清除选择',
                    },
                },
                restore: {
                    show: true,
                    title: '恢复',
                },
            },
        },
    };
}
