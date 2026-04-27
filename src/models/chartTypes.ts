type Chart = {
    chartName: string;
    chartType: ChartTypes;
    data: any[];
};

type TabItem = {
    tabName: string;
    charts: Chart[];
};

type ChartUIKey =
    | 'line'
    | 'bar'
    | 'scatter'
    | 'smooth-line'
    | 'histogram'
    | 'boxplot'
    | 'heatmap'
    | 'pie'
    | 'stacked-bar'
    | 'grouped-bar'
    | 'percent-bar'
    | 'area'
    | 'trend-line'
    | 'moving-average'
    | 'funnel'
    | 'sankey'
    | 'candlestick';

type ChartTypes = ChartUIKey;

export type { ChartUIKey, ChartTypes, Chart, TabItem };
