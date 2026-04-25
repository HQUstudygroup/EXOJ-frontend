export const chartTestData = {
    // 📈 line / smooth-line / trend-line / moving-average / area
    line: [
        { x: 'Mon', y: 120 },
        { x: 'Tue', y: 200 },
        { x: 'Wed', y: 150 },
        { x: 'Thu', y: 80 },
        { x: 'Fri', y: 70 },
        { x: 'Sat', y: 110 },
        { x: 'Sun', y: 130 },
    ],

    'smooth-line': [
        { x: 'Mon', y: 120 },
        { x: 'Tue', y: 220 },
        { x: 'Wed', y: 180 },
        { x: 'Thu', y: 140 },
        { x: 'Fri', y: 90 },
        { x: 'Sat', y: 160 },
        { x: 'Sun', y: 200 },
    ],

    'trend-line': [
        { x: '1', y: 10 },
        { x: '2', y: 15 },
        { x: '3', y: 18 },
        { x: '4', y: 25 },
        { x: '5', y: 30 },
    ],

    'moving-average': [
        { x: '1', y: 10 },
        { x: '2', y: 20 },
        { x: '3', y: 30 },
        { x: '4', y: 25 },
        { x: '5', y: 40 },
        { x: '6', y: 35 },
    ],

    area: [
        { x: 'Mon', group: 'A', y: 120 },
        { x: 'Mon', group: 'B', y: 60 },

        { x: 'Tue', group: 'A', y: 200 },
        { x: 'Tue', group: 'B', y: 80 },

        { x: 'Wed', group: 'A', y: 150 },
        { x: 'Wed', group: 'B', y: 70 },

        { x: 'Thu', group: 'A', y: 80 },
        { x: 'Thu', group: 'B', y: 50 },

        { x: 'Fri', group: 'A', y: 70 },
        { x: 'Fri', group: 'B', y: 40 },
    ],

    // 📊 bar
    bar: [
        { x: 'A', y: 30 },
        { x: 'B', y: 80 },
        { x: 'C', y: 45 },
        { x: 'D', y: 60 },
    ],

    // 📊 grouped / stacked / percent
    'grouped-bar': [
        { x: 'Mon', group: 'A', y: 10 },
        { x: 'Mon', group: 'B', y: 20 },
        { x: 'Tue', group: 'A', y: 15 },
        { x: 'Tue', group: 'B', y: 25 },
        { x: 'Wed', group: 'A', y: 30 },
        { x: 'Wed', group: 'B', y: 10 },
    ],

    'stacked-bar': [
        { x: 'Q1', group: 'Apple', y: 120 },
        { x: 'Q1', group: 'Samsung', y: 80 },
        { x: 'Q2', group: 'Apple', y: 150 },
        { x: 'Q2', group: 'Samsung', y: 90 },
        { x: 'Q3', group: 'Apple', y: 180 },
        { x: 'Q3', group: 'Samsung', y: 110 },
    ],

    'percent-bar': [
        { x: 'Male', group: '18-25', y: 40 },
        { x: 'Male', group: '26-35', y: 60 },
        { x: 'Female', group: '18-25', y: 55 },
        { x: 'Female', group: '26-35', y: 45 },
    ],

    // 🔵 scatter
    scatter: Array.from({ length: 40 }).map(() => ({
        x: Math.round(Math.random() * 100),
        y: Math.round(Math.random() * 100),
        color: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    })),

    // 📦 histogram
    histogram: Array.from({ length: 100 }).map(() => ({
        value: Math.round(Math.random() * 100),
    })),

    // 📊 boxplot
    boxplot: [
        ...Array.from({ length: 30 }).map(() => ({
            group: 'A',
            value: Math.round(Math.random() * 100),
        })),
        ...Array.from({ length: 30 }).map(() => ({
            group: 'B',
            value: Math.round(Math.random() * 100),
        })),
    ],

    // 🔥 heatmap
    heatmap: [
        { x: 'Mon', y: 'Morning', value: 10 },
        { x: 'Mon', y: 'Evening', value: 30 },
        { x: 'Tue', y: 'Morning', value: 20 },
        { x: 'Tue', y: 'Evening', value: 40 },
        { x: 'Wed', y: 'Morning', value: 15 },
        { x: 'Wed', y: 'Evening', value: 35 },
    ],

    // 🥧 pie
    pie: [
        { category: 'A', value: 40 },
        { category: 'B', value: 20 },
        { category: 'C', value: 30 },
        { category: 'D', value: 10 },
    ],

    // 🔻 funnel
    funnel: [
        { stage: 'Visit', value: 1000 },
        { stage: 'Click', value: 600 },
        { stage: 'Add to Cart', value: 300 },
        { stage: 'Purchase', value: 120 },
    ],

    // 🔗 sankey
    sankey: [
        // 输入层
        { source: '用户访问', target: '首页', value: 1200 },
        { source: '用户访问', target: '搜索页', value: 800 },
        { source: '用户访问', target: '商品页', value: 600 },

        // 首页流向
        { source: '首页', target: '商品页', value: 500 },
        { source: '首页', target: '分类页', value: 400 },
        { source: '首页', target: '流失', value: 300 },

        // 搜索页流向
        { source: '搜索页', target: '商品页', value: 500 },
        { source: '搜索页', target: '筛选页', value: 200 },
        { source: '搜索页', target: '流失', value: 100 },

        // 分类页流向
        { source: '分类页', target: '商品页', value: 500 },
        { source: '分类页', target: '流失', value: 200 },

        // 筛选页流向
        { source: '筛选页', target: '商品页', value: 150 },
        { source: '筛选页', target: '流失', value: 50 },

        // 商品页行为
        { source: '商品页', target: '加入购物车', value: 900 },
        { source: '商品页', target: '流失', value: 700 },

        // 购物车
        { source: '加入购物车', target: '下单页', value: 700 },
        { source: '加入购物车', target: '流失', value: 200 },

        // 下单
        { source: '下单页', target: '支付成功', value: 500 },
        { source: '下单页', target: '支付失败', value: 200 },
        { source: '下单页', target: '流失', value: 50 },

        // 支付结果
        { source: '支付失败', target: '重新支付', value: 120 },
        { source: '支付失败', target: '流失', value: 80 },
        { source: '重新支付', target: '支付成功', value: 100 },
        { source: '重新支付', target: '流失', value: 20 },

        // 结果
        { source: '支付成功', target: '留存用户', value: 600 },
        { source: '支付成功', target: '退款', value: 50 },

        { source: '退款', target: '流失', value: 50 },
    ],

    // 🌳 treemap
    treemap: [
        {
            name: 'A',
            value: 40,
            children: [
                { name: 'A1', value: 15 },
                { name: 'A2', value: 25 },
            ],
        },
        {
            name: 'B',
            value: 60,
            children: [
                { name: 'B1', value: 30 },
                { name: 'B2', value: 30 },
            ],
        },
    ],

    // 📉 candlestick（完整版）
    candlestick: [
        { time: '2023-11-01', open: 105.0, close: 106.2, low: 104.5, high: 107.0, volume: 42000 },
        { time: '2023-11-02', open: 106.2, close: 108.5, low: 106.0, high: 109.1, volume: 48000 },
        { time: '2023-11-03', open: 108.5, close: 107.8, low: 107.0, high: 109.5, volume: 41000 },
        { time: '2023-11-06', open: 107.8, close: 109.0, low: 107.5, high: 110.2, volume: 45000 },
        { time: '2023-11-07', open: 109.0, close: 110.5, low: 108.8, high: 111.0, volume: 52000 },
        {
            time: '2023-11-08',
            open: 110.5,
            close: 106.8,
            low: 106.0,
            high: 111.2,
            volume: 85000,
        },
        { time: '2023-11-09', open: 106.8, close: 105.2, low: 104.5, high: 107.5, volume: 62000 },
        { time: '2023-11-10', open: 105.2, close: 106.0, low: 104.8, high: 106.5, volume: 38000 },
        { time: '2023-11-13', open: 106.0, close: 104.5, low: 104.0, high: 106.8, volume: 35000 },
        { time: '2023-11-14', open: 104.5, close: 103.2, low: 102.5, high: 105.0, volume: 31000 },
        { time: '2023-11-15', open: 103.2, close: 104.8, low: 103.0, high: 105.5, volume: 44000 },
        { time: '2023-11-16', open: 104.8, close: 105.5, low: 104.2, high: 106.3, volume: 41000 },
        { time: '2023-11-17', open: 105.5, close: 107.2, low: 105.0, high: 108.0, volume: 49000 },
        { time: '2023-11-20', open: 107.2, close: 108.8, low: 107.0, high: 109.5, volume: 53000 },
        { time: '2023-11-21', open: 108.8, close: 110.2, low: 108.5, high: 111.0, volume: 58000 },
        { time: '2023-11-22', open: 110.2, close: 112.5, low: 110.0, high: 113.0, volume: 72000 },
        { time: '2023-11-23', open: 112.5, close: 111.8, low: 111.0, high: 113.5, volume: 45000 },
        { time: '2023-11-24', open: 111.8, close: 113.0, low: 111.5, high: 114.0, volume: 50000 },
        { time: '2023-11-27', open: 113.0, close: 115.5, low: 112.8, high: 116.2, volume: 68000 },
        { time: '2023-11-28', open: 115.5, close: 117.0, low: 115.0, high: 118.0, volume: 75000 },
    ],
};
