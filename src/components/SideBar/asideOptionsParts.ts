import { h } from 'vue';
import { RouterLink } from 'vue-router';

/** 子选项 - 函数查询  @type {Array} */
const SheetFunctions = [
    {
        label: '常用函数',
        key: 'commonFunctions',
        children: [
            {
                label: 'SUMIF',
                key: 'SUMIF',
            },
            {
                label: 'SUM',
                key: 'SUM',
            },
            {
                label: 'AVERAGE',
                key: 'AVERAGE',
            },
            {
                label: 'IF',
                key: 'IF',
            },
            {
                label: 'COUNT',
                key: 'COUNT',
            },
            {
                label: 'SIN',
                key: 'SIN',
            },
            {
                label: 'MAX',
                key: 'MAX',
            },
        ],
    },
    {
        label: '财务',
        key: 'financialFunctions',
        children: [
            {
                label: 'ACCRINT',
                key: 'ACCRINT',
            },
            {
                label: 'ACCRINTM',
                key: 'ACCRINTM',
            },
            {
                label: 'AMORLINC',
                key: 'AMORLINC',
            },
            {
                label: 'COUPDAYBS',
                key: 'COUPDAYBS',
            },
            {
                label: 'COUPDAYS',
                key: 'COUPDAYS',
            },
            {
                label: 'COUPDAYSNC',
                key: 'COUPDAYSNC',
            },
            {
                label: 'COUPNCD',
                key: 'COUPNCD',
            },
            {
                label: 'COUPNUM',
                key: 'COUPNUM',
            },
            {
                label: 'COUPPCD',
                key: 'COUPPCD',
            },
            {
                label: 'CUMIPMT',
                key: 'CUMIPMT',
            },
            {
                label: 'CUMPRINC',
                key: 'CUMPRINC',
            },
            {
                label: 'DB',
                key: 'DB',
            },
            {
                label: 'DDB',
                key: 'DDB',
            },
            {
                label: 'DISC',
                key: 'DISC',
            },
            {
                label: 'DOLLARDE',
                key: 'DOLLARDE',
            },
            {
                label: 'DOLLARFR',
                key: 'DOLLARFR',
            },
            {
                label: 'DURATION',
                key: 'DURATION',
            },
            {
                label: 'EFFECT',
                key: 'EFFECT',
            },
            {
                label: 'FV',
                key: 'FV',
            },
            {
                label: 'FVSCHEDULE',
                key: 'FVSCHEDULE',
            },
            {
                label: 'INTRATE',
                key: 'INTRATE',
            },
            {
                label: 'IPMT',
                key: 'IPMT',
            },
            {
                label: 'IRR',
                key: 'IRR',
            },
            {
                label: 'ISPMT',
                key: 'ISPMT',
            },
            {
                label: 'MDURATION',
                key: 'MDURATION',
            },
            {
                label: 'MIRR',
                key: 'MIRR',
            },
            {
                label: 'NOMINAL',
                key: 'NOMINAL',
            },
            {
                label: 'NPER',
                key: 'NPER',
            },
            {
                label: 'NPV',
                key: 'NPV',
            },
            {
                label: 'ODDFPRICE',
                key: 'ODDFPRICE',
            },
            {
                label: 'ODDFYIELD',
                key: 'ODDFYIELD',
            },
            {
                label: 'ODDLPRICE',
                key: 'ODDLPRICE',
            },
            {
                label: 'ODDLYIELD',
                key: 'ODDLYIELD',
            },
            {
                label: 'PDURATION',
                key: 'PDURATION',
            },
            {
                label: 'PMT',
                key: 'PMT',
            },
            {
                label: 'PPMT',
                key: 'PPMT',
            },
            {
                label: 'PRICE',
                key: 'PRICE',
            },
            {
                label: 'PRICEDISC',
                key: 'PRICEDISC',
            },
            {
                label: 'PRICEMAT',
                key: 'PRICEMAT',
            },
            {
                label: 'PV',
                key: 'PV',
            },
            {
                label: 'RATE',
                key: 'RATE',
            },
            {
                label: 'RECEIVED',
                key: 'RECEIVED',
            },
            {
                label: 'RRI',
                key: 'RRI',
            },
            {
                label: 'SLN',
                key: 'SLN',
            },
            {
                label: 'SYD',
                key: 'SYD',
            },
            {
                label: 'TBILLEQ',
                key: 'TBILLEQ',
            },
            {
                label: 'TBILLPRICE',
                key: 'TBILLPRICE',
            },
            {
                label: 'TBILLYIELD',
                key: 'TBILLYIELD',
            },
            {
                label: 'VDB',
                key: 'VDB',
            },
            {
                label: 'XIRR',
                key: 'XIRR',
            },
            {
                label: 'XNPV',
                key: 'XNPV',
            },
            {
                label: 'YIELD',
                key: 'YIELD',
            },
            {
                label: 'YIELDDISC',
                key: 'YIELDDISC',
            },
            {
                label: 'YIELDMAT',
                key: 'YIELDMAT',
            },
        ],
    },
    {
        label: '逻辑判断函数',
        key: 'logicFunctions',
        children: [
            {
                label: 'LET',
                key: 'LET',
            },
            {
                label: 'AND',
                key: 'AND',
            },
            {
                label: 'BYCOL',
                key: 'BYCOL',
            },
            {
                label: 'FALSE',
                key: 'FALSE',
            },
            {
                label: 'IF',
                key: 'IF',
            },
            {
                label: 'IFERROR',
                key: 'iferror',
            },
            {
                label: 'IFNA',
                key: 'IFNA',
            },
            {
                label: 'IFS',
                key: 'IFS',
            },
            {
                label: 'LAMBDA',
                key: 'LAMBDA',
            },
            {
                label: 'MAKEARRAY',
                key: 'MAKEARRAY',
            },
            {
                label: 'MAP',
                key: 'MAP',
            },
            {
                label: 'NOT',
                key: 'NOT',
            },
            {
                label: 'OR',
                key: 'OR',
            },
            {
                label: 'REDUCE',
                key: 'REDUCE',
            },
            {
                label: 'SCAN',
                key: 'SCAN',
            },
            {
                label: 'SWITCH',
                key: 'SWITCH',
            },
            {
                label: 'TRUE',
                key: 'TRUE',
            },
            {
                label: 'XOR',
                key: 'XOR',
            },
        ],
    },
    {
        label: '文本处理函数',
        key: 'textFunctions',
        children: [
            {
                label: 'ASC',
                key: 'ASC',
            },
            {
                label: 'ARRAYTOTEXT',
                key: 'ARRAYTOTEXT',
            },
            {
                label: 'BAHTTEXT',
                key: 'BAHTTEXT',
            },
            {
                label: 'CHAR',
                key: 'CHAR',
            },
            {
                label: 'CLEAN',
                key: 'CLEAN',
            },
            {
                label: 'CODE',
                key: 'CODE',
            },
            {
                label: 'CONCAT',
                key: 'CONCAT',
            },
            {
                label: 'CONCATENATE',
                key: 'CONCATENATE',
            },
            {
                label: 'DBCS',
                key: 'DBCS',
            },
            {
                label: 'DOLLAR',
                key: 'DOLLAR',
            },
            {
                label: 'EXACT',
                key: 'EXACT',
            },
            {
                label: 'FIND',
                key: 'FIND',
            },
            {
                label: 'FINDB',
                key: 'FINDB',
            },
            {
                label: 'FIXED',
                key: 'FIXED',
            },
            {
                label: 'LEFT',
                key: 'LEFT',
            },
            {
                label: 'LEFTB',
                key: 'LEFTB',
            },
            {
                label: 'LEN',
                key: 'LEN',
            },
            {
                label: 'LENB',
                key: 'LENB',
            },
            {
                label: 'LOWER',
                key: 'LOWER',
            },
            {
                label: 'MID',
                key: 'MID',
            },
            {
                label: 'MIDB',
                key: 'MINDB',
            },
            {
                label: 'NUMBERSTRING',
                key: 'NUMBERSTRING',
            },
            {
                label: 'NUMBERVALUE',
                key: 'NUMBERVALUE',
            },
            {
                label: 'PROPER',
                key: 'PROPER',
            },
            {
                label: 'REGEXEXTRACT',
                key: 'REGEXEXTRACT',
            },
            {
                label: 'REGEXMATCH',
                key: 'REGEXMATCH',
            },
            {
                label: 'REGEXREPLACE',
                key: 'REGEXREPLACE',
            },
            {
                label: 'REPLACE',
                key: 'REPLACE',
            },
            {
                label: 'REPLACEB',
                key: 'REPLACEB',
            },
            {
                label: 'REPT',
                key: 'REPT',
            },
            {
                label: 'RIGHT',
                key: 'RIGHT',
            },
            {
                label: 'RIGHTB',
                key: 'RIGHTB',
            },
            {
                label: 'SEARCH',
                key: 'SEARCH',
            },
            {
                label: 'SEARCHB',
                key: 'SEARCHB',
            },
            {
                label: 'SUBSTITUTE',
                key: 'SUBSTITUTE',
            },
            {
                label: 'T',
                key: 'T',
            },
            {
                label: 'TEXT',
                key: 'TEXT',
            },
            {
                label: 'TEXTAFTER',
                key: 'TEXTAFTER',
            },
            {
                label: 'TEXTBEFORE',
                key: 'TEXTBEFORE',
            },
            {
                label: 'TEXTJOIN',
                key: 'TEXTJOIN',
            },
            {
                label: 'TEXTSPLIT',
                key: 'TEXTSPLIT',
            },
            {
                label: 'TRIM',
                key: 'TRIM',
            },
            {
                label: 'UNICHAR',
                key: 'UNICHAR',
            },
            {
                label: 'UNICODE',
                key: 'UNICODE',
            },
            {
                label: 'UPPER',
                key: 'UPPER',
            },
            {
                label: 'VALUE',
                key: 'VALUE',
            },
            {
                label: 'VALUETOTEXT',
                key: 'VALUETOTEXT',
            },
        ],
    },
    {
        label: '日期与时间函数',
        key: 'dataAndTimeFunctions',
        children: [
            {
                label: 'DATE',
                key: 'DATE',
            },
            {
                label: 'DATEDIF',
                key: 'DATEDIF',
            },
            {
                label: 'DATEVALUE',
                key: 'DATEVALUE',
            },
            {
                label: 'DAY',
                key: 'DAY',
            },
            {
                label: 'DAYS',
                key: 'DAYS',
            },
            {
                label: 'DAYS360',
                key: 'DAYS360',
            },
            {
                label: 'EDATE',
                key: 'EDATE',
            },
            {
                label: 'EOMONTH',
                key: 'EOMONTH',
            },
            {
                label: 'EPOCHTODATE',
                key: 'EPOCHTODATE',
            },
            {
                label: 'HOUR',
                key: 'HOUR',
            },
            {
                label: 'ISOWEEKNUM',
                key: 'ISOWEEKNUM',
            },
            {
                label: 'MINUTE',
                key: 'MINUTE',
            },
            {
                label: 'MONTH',
                key: 'MONTH',
            },
            {
                label: 'NETWORKDAYS',
                key: 'NETWORKDAYS',
            },
            {
                label: 'NETWORKDAYS.INTL',
                key: 'NETWORKDAYS.INTL',
            },
            {
                label: 'NOW',
                key: 'NOW',
            },
            {
                label: 'SECOND',
                key: 'SECOND',
            },
            {
                label: 'TIME',
                key: 'TIME',
            },
            {
                label: 'TIMEVALUE',
                key: 'TIMEVALUE',
            },
            {
                label: 'TO_DATE',
                key: 'TO_DATE',
            },
            {
                label: 'TODAY',
                key: 'TODAY',
            },
            {
                label: 'WEEKDAY',
                key: 'WEEKDAY',
            },
            {
                label: 'WEEKNUM',
                key: 'WEEKNUM',
            },
            {
                label: 'WORKDAY',
                key: 'WORKDAY',
            },
            {
                label: 'WORKDAY.INTL',
                key: 'WORKDAY.INTL',
            },
            {
                label: 'YEAR',
                key: 'YEAR',
            },
            {
                label: 'YEARFRAC',
                key: 'YEARFRAC',
            },
        ],
    },
    {
        label: '查找引用函数',
        key: 'lookupFunctions',
        children: [
            {
                label: 'ADDRESS',
                key: 'ADDRESS',
            },
            {
                label: 'AREAS',
                key: 'AREAS',
            },
            {
                label: 'CHOOSE',
                key: 'CHOOSE',
            },
            {
                label: 'CHOOSECOLS',
                key: 'CHOOSECOLS',
            },
            {
                label: 'CHOOSEROWS',
                key: 'CHOOSEROWS',
            },
            {
                label: 'COLUMN',
                key: 'COLUMN',
            },
            {
                label: 'COLUMNS',
                key: 'COLUMNS',
            },
            {
                label: 'DROP',
                key: 'DROP',
            },
            {
                label: 'EXPAND',
                key: 'EXPAND',
            },
            {
                label: 'FILTER',
                key: 'FILTER',
            },
            {
                label: 'FORMULATEXT',
                key: 'FORMULATEXT',
            },
            {
                label: 'HLOOKUP',
                key: 'HLOOKUP',
            },
            {
                label: 'HSTACK',
                key: 'HSTACK',
            },
            {
                label: 'HYPERLINK',
                key: 'HYPERLINK',
            },
            {
                label: 'IMAGE',
                key: 'IMAGE',
            },
            {
                label: 'INDEX',
                key: 'INDEX',
            },
            {
                label: 'INDIRECT',
                key: 'INDIRECT',
            },
            {
                label: 'LOOKUP',
                key: 'LOOKUP',
            },
            {
                label: 'MATCH',
                key: 'MATCH',
            },
            {
                label: 'OFFSET',
                key: 'OFFSET',
            },
            {
                label: 'ROW',
                key: 'ROW',
            },
            {
                label: 'ROWS',
                key: 'ROWS',
            },

            {
                label: 'SORT',
                key: 'SORT',
            },
            {
                label: 'SORTBY',
                key: 'SORTBY',
            },
            {
                label: 'TAKE',
                key: 'TAKE',
            },
            {
                label: 'TOCOL',
                key: 'TOCOL',
            },
            {
                label: 'TOROW',
                key: 'TOROW',
            },
            {
                label: 'TRANSPOSE',
                key: 'TRANSPOSE',
            },
            {
                label: 'UNIQUE',
                key: 'UNIQUE',
            },
            {
                label: 'VLOOKUP',
                key: 'VLOOKUP',
            },
            {
                label: 'VSTACK',
                key: 'VSTACK',
            },
            {
                label: 'WRAPCOLS',
                key: 'WRAPCOLS',
            },
            {
                label: 'WRAPROWS',
                key: 'WRAPROWS',
            },
            {
                label: 'XLOOKUP',
                key: 'XLOOKUP',
            },
            {
                label: 'XMATCH',
                key: 'XMATCH',
            },
        ],
    },
    {
        label: '数学与三角函数',
        key: 'mathFunctions',
        children: [
            {
                label: 'ABS',
                key: 'ABS',
            },
            {
                label: 'ACOS',
                key: 'ACOS',
            },
            {
                label: 'ACOSH',
                key: 'ACOSH',
            },
            {
                label: 'ACOT',
                key: 'ACOT',
            },
            {
                label: 'ACOTH',
                key: 'ACOTH',
            },
            {
                label: 'AGGREGATE',
                key: 'AGGREGATE',
            },
            {
                label: 'ARABIC',
                key: 'ARABIC',
            },
            {
                label: 'ASIN',
                key: 'ASIN',
            },
            {
                label: 'ASINH',
                key: 'ASINH',
            },
            {
                label: 'ATAN',
                key: 'ATAN',
            },
            {
                label: 'ATAN2',
                key: 'ATAN2',
            },
            {
                label: 'ATANH',
                key: 'ATANH',
            },
            {
                label: 'BASE',
                key: 'BASE',
            },
            {
                label: 'CEILING',
                key: 'CEILING',
            },
            {
                label: 'CEILING.MATH',
                key: 'CEILING.MATH',
            },
            {
                label: 'CEILING.PRECISE',
                key: 'CEILING.PRECISE',
            },
            {
                label: 'COMBIN',
                key: 'COMBIN',
            },
            {
                label: 'COMBINA',
                key: 'COMBINA',
            },
            {
                label: 'COS',
                key: 'COS',
            },
            {
                label: 'COSH',
                key: 'COSH',
            },
            {
                label: 'COT',
                key: 'COT',
            },
            {
                label: 'COTH',
                key: 'COTH',
            },
            {
                label: 'CSC',
                key: 'CSC',
            },
            {
                label: 'CSCH',
                key: 'CSCH',
            },
            {
                label: 'DECIMAL',
                key: 'DECIMAL',
            },
            {
                label: 'DEGREES',
                key: 'DEGREES',
            },
            {
                label: 'EVEN',
                key: 'EVEN',
            },
            {
                label: 'EXP',
                key: 'EXP',
            },
            {
                label: 'FACT',
                key: 'FACT',
            },
            {
                label: 'FACTDOUBLE',
                key: 'FACTDOUBLE',
            },
            {
                label: 'FLOOR',
                key: 'FLOOR',
            },
            {
                label: 'FLOOR.MATH',
                key: 'FLOOR.MATH',
            },
            {
                label: 'FLOOR.PRECISE',
                key: 'FLOOR.PRECISE',
            },
            {
                label: 'GCD',
                key: 'GCD',
            },
            {
                label: 'INT',
                key: 'INT',
            },
            {
                label: 'LCM',
                key: 'LCM',
            },
            {
                label: 'LN',
                key: 'LN',
            },
            {
                label: 'LOG',
                key: 'LOG',
            },
            {
                label: 'LOG10',
                key: 'LOG10',
            },
            {
                label: 'MDETERM',
                key: 'MDETERM',
            },
            {
                label: 'MINVERSE',
                key: 'MINVERSE',
            },
            {
                label: 'MMULT',
                key: 'MMULT',
            },
            {
                label: 'MOD',
                key: 'MOD',
            },
            {
                label: 'MROUND',
                key: 'MROUND',
            },
            {
                label: 'MULTINOMIAL',
                key: 'MULTINOMIAL',
            },
            {
                label: 'MUNIT',
                key: 'MUNIT',
            },
            {
                label: 'ODD',
                key: 'ODD',
            },
            {
                label: 'PI',
                key: 'PI',
            },
            {
                label: 'POWER',
                key: 'POWER',
            },
            {
                label: 'PRODUCT',
                key: 'PRODUCT',
            },
            {
                label: 'QUOTIENT',
                key: 'QUOTIENT',
            },
            {
                label: 'RADIANS',
                key: 'RADIANS',
            },
            {
                label: 'RAND',
                key: 'RAND',
            },
            {
                label: 'RANDARRAY',
                key: 'RANDARRAY',
            },
            {
                label: 'RANDBETWEEN',
                key: 'RANDBETWEEN',
            },
            {
                label: 'ROMAN',
                key: 'ROMAN',
            },
            {
                label: 'ROUND',
                key: 'ROUND',
            },
            {
                label: 'ROUNDBANK',
                key: 'ROUNDBANK',
            },
            {
                label: 'ROUNDDOWN',
                key: 'ROUNDDOWN',
            },
            {
                label: 'ROUNDUP',
                key: 'ROUNDUP',
            },
            {
                label: 'SEC',
                key: 'SEC',
            },
            {
                label: 'SECH',
                key: 'SECH',
            },
            {
                label: 'SERIESSUM',
                key: 'SERIESSUM',
            },
            {
                label: 'SEQUENCE',
                key: 'SEQUENCE',
            },
            {
                label: 'SIGN',
                key: 'SIGN',
            },
            {
                label: 'SIN',
                key: 'SIN',
            },
            {
                label: 'SINH',
                key: 'SINH',
            },
            {
                label: 'SQRT',
                key: 'SQRT',
            },
            {
                label: 'SQRT',
                key: 'SQRT',
            },
            {
                label: 'SQRTPI',
                key: 'SQRTPI',
            },
            {
                label: 'SUBTOTAL',
                key: 'SUBTOTAL',
            },
            {
                label: 'SUM',
                key: 'SUM',
            },
            {
                label: 'SUMIF',
                key: 'SUMIF',
            },
            {
                label: 'SUMIFS',
                key: 'SUMIFS',
            },
            {
                label: 'SUMPRODUCT',
                key: 'SUMPRODUCT',
            },
            {
                label: 'SUMSQ',
                key: 'SUMSQ',
            },
            {
                label: 'SUMX2MY2',
                key: 'SUMX2MY2',
            },
            {
                label: 'SUMX2PY2',
                key: 'SUMX2PY2',
            },
            {
                label: 'SUMXMY2',
                key: 'SUMXMY2',
            },
            {
                label: 'TAN',
                key: 'TAN',
            },
            {
                label: 'TANH',
                key: 'TANH',
            },
            {
                label: 'TRUNC',
                key: 'TRUNC',
            },
        ],
    },
    {
        label: '统计分析函数',
        key: 'statisticalFunctions',
        children: [
            {
                label: 'AVEDEV',
                key: 'AVEDEV',
            },
            {
                label: 'AVERAGE',
                key: 'AVERAGE',
            },
            {
                label: 'AVERAGE.WEIGHTED',
                key: 'AVERAGE.WEIGHTED',
            },
            {
                label: 'AVERAGEA',
                key: 'AVERAGEA',
            },
            {
                label: ' AVERAGEIF',
                key: 'AVERAGEIF',
            },
            {
                label: 'AVERAGEIFS',
                key: 'AVERAGEIFS',
            },
            {
                label: 'BETA.DIST',
                key: 'BETA.DIST',
            },
            {
                label: 'BETA.INV',
                key: 'BETA.INV',
            },
            {
                label: 'BINOM.DIST',
                key: 'BINOM.DIST',
            },
            {
                label: 'BINOM.DIST.RANGE',
                key: 'BINOM.DIST.RANGE',
            },
            {
                label: 'BINOM.INV',
                key: 'BINOM.INV',
            },
            {
                label: 'CHISQ.DIST',
                key: 'CHISQ.DIST',
            },
            {
                label: 'CHISQ.DIST.RT',
                key: 'CHISQ.DIST.RT',
            },
            {
                label: 'CHISQ.INV',
                key: 'CHISQ.INV',
            },
            {
                label: 'CHISQ.INV.RT',
                key: 'CHISQ.INV.RT',
            },
            {
                label: 'CHISQ.TEST',
                key: 'CHISQ.TEST',
            },
            {
                label: 'CONFIDENCE.NORM',
                key: 'CONFIDENCE.NORM',
            },
            {
                label: 'CONFIDENCE.T',
                key: 'CONFIDENCE.T',
            },
            {
                label: 'CORREL',
                key: 'CORREL',
            },
            {
                label: 'COUNT',
                key: 'COUNT',
            },
            {
                label: 'COUNTA',
                key: 'COUNTA',
            },
            {
                label: 'COUNTBLANK',
                key: 'COUNTBLANK',
            },
            {
                label: 'COUNTIF',
                key: 'COUNTIF',
            },
            {
                label: 'COUNTIFS',
                key: 'COUNTIFS',
            },
            {
                label: 'COVARIANCE.P',
                key: 'COVARIANCE.P',
            },
            {
                label: 'COVARIANCE.S',
                key: 'COVARIANCE.S',
            },
            {
                label: 'DEVSQ',
                key: 'DEVSQ',
            },
            {
                label: 'EXPON.DIST',
                key: 'EXPON.DIST',
            },
            {
                label: 'F.DIST',
                key: 'F.DIST',
            },

            {
                label: 'F.DIST.RT',
                key: 'F.DIST.RT',
            },
            {
                label: 'F.TEST',
                key: 'F.TEST',
            },
            {
                label: 'FISHER',
                key: 'FISHER',
            },
            {
                label: 'FISHERINV',
                key: 'FISHERINV',
            },
            {
                label: 'FORECAST',
                key: 'FORECAST',
            },

            {
                label: 'FORECAST.LINEAR',
                key: 'FORECAST.LINEAR',
            },
            {
                label: 'FREQUENCY',
                key: 'FREQUENCY',
            },
            {
                label: 'GAMMA',
                key: 'GAMMA',
            },
            {
                label: 'GAMMA.DIST',
                key: 'GAMMA.DIST',
            },
            {
                label: 'GAMMA.INV',
                key: 'GAMMA.INV',
            },
            {
                label: 'GAMMALN',
                key: 'GAMMALN',
            },
            {
                label: 'GAMMALN.PRECISE',
                key: 'GAMMALN.PRECISE',
            },
            {
                label: 'GAUSS',
                key: 'GAUSS',
            },
            {
                label: 'GEOMEAN',
                key: 'GEOMEAN',
            },
            {
                label: 'GROWTH',
                key: 'GROWTH',
            },
            {
                label: 'HARMEAN',
                key: 'HARMEAN',
            },
            {
                label: 'HYPGEOM.DIST',
                key: 'HYPGEOM.DIST',
            },
            {
                label: 'INTERCEPT',
                key: 'INTERCEPT',
            },
            {
                label: 'KURT',
                key: 'KURT',
            },
            {
                label: 'LARGE',
                key: 'LARGE',
            },
            {
                label: 'LINEST',
                key: 'LINEST',
            },
            {
                label: 'LOGEST',
                key: 'LOGEST',
            },
            {
                label: 'LOGNORM.DIST',
                key: 'LOGNORM.DIST',
            },
            {
                label: 'LOGNORM.INV',
                key: 'LOGNORM.INV',
            },
            {
                label: 'MARGINOFERROR',
                key: 'MARGINOFERROR',
            },
            {
                label: 'MAX',
                key: 'MAX',
            },
            {
                label: 'MAXA',
                key: 'MAXA',
            },
            {
                label: 'MAXIFS',
                key: 'MAXIFS',
            },
            {
                label: 'MEDIAN',
                key: 'MEDIAN',
            },
            {
                label: 'MIN',
                key: 'MIN',
            },
            {
                label: 'MINA',
                key: 'MINA',
            },
            {
                label: 'MINIFS',
                key: 'MINIFS',
            },
            {
                label: 'MODE.MULT',
                key: 'MODE.MULT',
            },
            {
                label: 'MODE.SNGL',
                key: 'MODE.SNGL',
            },
            {
                label: 'NEGBINOM.DIST',
                key: 'NEGBINOM.DIST',
            },
            {
                label: 'NORM.DIST',
                key: 'NORM.DIST',
            },
            {
                label: 'NORM.INV',
                key: 'NORM.INV',
            },
            {
                label: 'NORM.S.DIST',
                key: 'NORM.S.DIST',
            },
            {
                label: 'NORM.S.INV',
                key: 'NORM.S.INV',
            },
            {
                label: 'PEARSON',
                key: 'PEARSON',
            },
            {
                label: 'PERCENTILE.EXC',
                key: 'PERCENTILE.EXC',
            },
            {
                label: 'PERCENTILE.INC',
                key: 'PERCENTILE.INC',
            },
            {
                label: 'PERCENTRANK.EXC',
                key: 'PERCENTRANK.EXC',
            },
            {
                label: 'PERCENTRANK.INC',
                key: 'PERCENTRANK.INC',
            },

            {
                label: 'PERMUT',
                key: 'PERMUT',
            },
            {
                label: 'PERMUTATIONA',
                key: 'PERMUTATIONA',
            },

            {
                label: 'PHI',
                key: 'PHI',
            },
            {
                label: 'POISSON.DIST',
                key: 'POISSON.DIST',
            },
            {
                label: 'PROB',
                key: 'PROB',
            },
            {
                label: 'QUARTILE.EXC',
                key: 'QUARTILE.EXC',
            },
            {
                label: 'QUARTILE.INC',
                key: 'QUARTILE.INC',
            },
            {
                label: 'RANK.AVG',
                key: 'RANK.AVG',
            },
            {
                label: 'RANK.EQ',
                key: 'RANK.EQ',
            },
            {
                label: 'RSQ',
                key: 'RSQ',
            },
            {
                label: 'SKEW',
                key: 'SKEW',
            },
            {
                label: 'SKEW.P',
                key: 'SKEW.P',
            },
            {
                label: 'SLOPE',
                key: 'SLOPE',
            },
            {
                label: 'SMALL',
                key: 'SMALL',
            },
            {
                label: 'STANDARDIZE',
                key: 'STANDARDIZE',
            },
            {
                label: 'STDEV.P',
                key: 'STDEV.P',
            },
            {
                label: 'STDEV.S',
                key: 'STDEV.S',
            },
            {
                label: 'STDEVA',
                key: 'STDEVA',
            },
            {
                label: 'STDEVPA',
                key: 'STDEVPA',
            },
            {
                label: 'STEYX',
                key: 'STEYX',
            },
            {
                label: 'T.DIST',
                key: 'T.DIST',
            },
            {
                label: 'T.DIST.2T',
                key: 'T.DIST.2T',
            },
            {
                label: 'T.DIST.RT',
                key: 'T.DIST.RT',
            },
            {
                label: 'T.INV',
                key: 'T.INV',
            },
            {
                label: 'T.INV.2T',
                key: 'T.INV.2T',
            },
            {
                label: 'T.TEST',
                key: 'T.TEST',
            },
            {
                label: 'TREND',
                key: 'TREND',
            },
            {
                label: 'TRIMMEAN',
                key: 'TRIMMEAN',
            },
            {
                label: 'VAR.P',
                key: 'VAR.P',
            },
            {
                label: 'VAR.S',
                key: 'VAR.S',
            },
            {
                label: 'VARA',
                key: 'VARA',
            },
            {
                label: 'WEIBULL.DIST',
                key: 'WEIBULL.DIST',
            },
            {
                label: 'Z.TEST',
                key: 'Z.TEST',
            },
        ],
    },
    {
        label: '工程函数',
        key: 'engineeringFunctions',
        children: [
            {
                label: 'BESSELI',
                key: 'BESSELI',
            },
            {
                label: 'BESSELJ',
                key: 'BESSELJ',
            },
            {
                label: 'BESSELK',
                key: 'BESSELK',
            },
            {
                label: 'BESSELY',
                key: 'BESSELY',
            },
            {
                label: 'BIN2DEC',
                key: 'BIN2DEC',
            },
            {
                label: 'BIN2HEX',
                key: 'BIN2HEX',
            },
            {
                label: 'BIN2OCT',
                key: 'BIN2OCT',
            },
            {
                label: 'BITAND',
                key: 'BITAND',
            },
            {
                label: 'BITLSHIFT',
                key: 'BITLSHIFT',
            },
            {
                label: 'BITOR',
                key: 'BITOR',
            },
            {
                label: 'COMPLEX',
                key: 'COMPLEX',
            },
            {
                label: 'CONVERT',
                key: 'CONVERT',
            },
            {
                label: 'DEC2BIN',
                key: 'DEC2BIN',
            },
            {
                label: 'DEC2HEX',
                key: 'DEC2HEX',
            },
            {
                label: 'DEC2OCT',
                key: 'DEC2OCT',
            },
            {
                label: 'DELTA',
                key: 'DELTA',
            },
            {
                label: 'ERF',
                key: 'ERF',
            },
            {
                label: 'ERF.PRECISE',
                key: 'ERF.PRECISE',
            },
            {
                label: 'ERFC',
                key: 'ERFC',
            },
            {
                label: 'ERFC.PRECISE',
                key: 'ERFC.PRECISE',
            },
            {
                label: 'GESTEP',
                key: 'GESTEP',
            },
            {
                label: 'HEX2BIN',
                key: 'HEX2BIN',
            },
            {
                label: 'HEX2DEC',
                key: 'HEX2DEC',
            },
            {
                label: 'HEX2OCT',
                key: 'HEX2OCT',
            },
            {
                label: 'IMABS',
                key: 'IMABS',
            },
            {
                label: 'IMAGINARY',
                key: 'IMAGINARY',
            },
            {
                label: 'IMARGUMENT',
                key: 'IMARGUMENT',
            },
            {
                label: 'IMCONJUGATE',
                key: 'IMCONJUGATE',
            },
            {
                label: 'IMCOS',
                key: 'IMCOS',
            },
            {
                label: 'IMCOSH',
                key: 'IMCOSH',
            },
            {
                label: 'IMCOT',
                key: 'IMCOT',
            },
            {
                label: 'IMCOTH',
                key: 'IMCOTH',
            },
            {
                label: 'IMCSC',
                key: 'IMCSC',
            },
            {
                label: 'IMCSCH',
                key: 'IMCSCH',
            },
            {
                label: 'IMDIV',
                key: 'IMDIV',
            },
            {
                label: 'IMEXP',
                key: 'IMEXP',
            },
            {
                label: 'IMLN',
                key: 'IMLN',
            },
            {
                label: 'IMLOG',
                key: 'IMLOG',
            },
            {
                label: 'IMLOG10',
                key: 'IMLOG10',
            },
            {
                label: 'BITAND',
                key: 'BITAND',
            },
            {
                label: 'IMLOG2',
                key: 'IMLOG2',
            },
            {
                label: 'IMPOWER',
                key: 'IMPOWER',
            },
            {
                label: 'IMPRODUCT',
                key: 'IMPRODUCT',
            },
            {
                label: 'IMREAL',
                key: 'IMREAL',
            },
            {
                label: 'IMSEC',
                key: 'IMSEC',
            },
            {
                label: 'IMSECH',
                key: 'IMSECH',
            },
            {
                label: 'IMSIN',
                key: 'IMSIN',
            },
            {
                label: 'IMSINH',
                key: 'IMSINH',
            },
            {
                label: 'IMSQRT',
                key: 'IMSQRT',
            },
            {
                label: 'IMSUB',
                key: 'IMSUB',
            },
            {
                label: 'IMSUM',
                key: 'IMSUM',
            },
            {
                label: 'IMTAN',
                key: 'IMTAN',
            },
            {
                label: 'IMTANH',
                key: 'IMTANH',
            },
            {
                label: 'OCT2BIN',
                key: 'OCT2BIN',
            },
            {
                label: 'OCT2DEC',
                key: 'OCT2DEC',
            },
            {
                label: 'OCT2HEX',
                key: 'OCT2HEX',
            },
        ],
    },
    {
        label: '信息函数',
        key: 'informationFunctions',
        children: [
            {
                label: 'CELL',
                key: 'CELL',
            },
            {
                label: 'ERROR.TYPE',
                key: 'ERROR.TYPE',
            },
            {
                label: 'ISBETWEEN',
                key: 'ISBETWEEN',
            },
            {
                label: 'ISBLANK',
                key: 'ISBLANK',
            },
            {
                label: 'ISDATE',
                key: 'ISDATE',
            },
            {
                label: 'ISEMAIL',
                key: 'ISEMAIL',
            },
            {
                label: 'ISERR',
                key: 'ISERR',
            },
            {
                label: 'ISERROR',
                key: 'ISERROR',
            },
            {
                label: 'ISEVEN',
                key: 'ISEVEN',
            },
            {
                label: 'ISFORMULA',
                key: 'ISFORMULA',
            },
            {
                label: 'ISLOGICAL',
                key: 'ISLOGICAL',
            },
            {
                label: 'ISNA',
                key: 'ISNA',
            },
            {
                label: 'ISNONTEXT',
                key: 'ISNONTEXT',
            },
            {
                label: 'ISNUMBER',
                key: 'ISNUMBER',
            },
            {
                label: 'ISODD',
                key: 'ISODD',
            },
            {
                label: 'ISREF',
                key: 'ISREF',
            },
            {
                label: 'ISTEXT',
                key: 'ISTEXT',
            },
            {
                label: 'ISNUMBER',
                key: 'ISNUMBER',
            },
            {
                label: 'ISODD',
                key: 'ISODD',
            },
            {
                label: 'ISREF',
                key: 'ISREF',
            },
            {
                label: 'ISTEXT',
                key: 'ISTEXT',
            },
            {
                label: 'ISURL',
                key: 'ISURL',
            },
            {
                label: 'N',
                key: 'N',
            },
            {
                label: 'NA',
                key: 'NA',
            },
            {
                label: 'SHEET',
                key: 'SHEET',
            },
            {
                label: 'SHEETS',
                key: 'SHEETS',
            },
            {
                label: 'TYPE',
                key: 'TYPE',
            },
        ],
    },
    {
        label: '数据库函数',
        key: 'sqlFunctions',
        children: [
            {
                label: 'DAVERAGE',
                key: 'DAVERAGE',
            },
            {
                label: 'DCOUNT',
                key: 'DCOUNT',
            },
            {
                label: 'DCOUNTA',
                key: 'DCOUNTA',
            },
            {
                label: 'DGET',
                key: 'DGET',
            },
            {
                label: 'DMAX',
                key: 'DMAX',
            },
            {
                label: 'DMIN',
                key: 'DMIN',
            },
            {
                label: 'DPRODUCT',
                key: 'DPRODUCT',
            },
            {
                label: 'DSTDEV',
                key: 'DSTDEV',
            },
            {
                label: 'DSTDEVP',
                key: 'DSTDEVP',
            },
            {
                label: 'DSUM',
                key: 'DSUM',
            },
            {
                label: 'DVAR',
                key: 'DVAR',
            },
            {
                label: 'DVARP',
                key: 'DVARP',
            },
        ],
    },
];

/** 子选项 - 文件转换类别  @type {Array} */
const FileTypeChange = [
    {
        label: 'Word To Excel',
        key: 'wce',
    },
    {
        label: 'PDF To Excel',
        key: 'pce',
    },
    {
        label: 'Excel To PDF',
        key: 'ecp',
    },
    {
        label: 'Excel To Word',
        key: 'ecw',
    },
];

/** 子选项 - 图的类别  @type {Array} */
const DataVisualizationType = [
    { label: '折线图', key: 'line' },
    { label: '柱状图', key: 'bar' },
    { label: '散点图', key: 'scatter' },
    { label: '平滑折线', key: 'smooth-line' },
    { label: '直方图', key: 'histogram' },
    { label: '箱线图', key: 'boxplot' },
    { label: '热力图', key: 'heatmap' },
    { label: '饼图', key: 'pie' },

    { label: '堆叠柱状图', key: 'stacked-bar' },
    { label: '分组柱状图', key: 'grouped-bar' },
    { label: '百分比柱状图', key: 'percent-bar' },

    { label: '面积图', key: 'area' },
    { label: '趋势线', key: 'trend-line' },
    { label: '移动平均线', key: 'moving-average' },

    { label: '漏斗图', key: 'funnel' },
    { label: '桑基图', key: 'sankey' },
    { label: 'K 线图', key: 'candlestick' },
];

/** 合并文件视图  @key merge-files */
const goMergeFilesView = {
    label: () => h(RouterLink, { to: { name: 'merge-files' } }, { default: () => '多文件合并' }),
    key: 'merge-files',
};

/** 文件格式标准化视图  @key format-files */
const goFormatFilesView = {
    label: () =>
        h(RouterLink, { to: { name: 'format-files' } }, { default: () => '文件格式标准化' }),
    key: 'format-files',
};

/** 主页视图  @key go-index */
const goIndexView = {
    label: () => h(RouterLink, { to: { name: 'index' } }, () => '数据分析主页'),
    key: 'go-index',
};

export {
    SheetFunctions,
    FileTypeChange,
    DataVisualizationType,
    goMergeFilesView,
    goFormatFilesView,
    goIndexView,
};
