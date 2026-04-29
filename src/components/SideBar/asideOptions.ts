import type { MenuOption } from 'naive-ui';
import * as asideOptionsParts from './asideOptionsParts';

/** 侧边栏选项 */
const asideOptions: MenuOption[] = [
    /** 主页视图  @key go-index */
    asideOptionsParts.goIndexView,

    {
        label: '数据可视化',
        key: 'data-visualization',
        children: asideOptionsParts.DataVisualizationType,
    },

    /** 合并文件视图  @key merge-files */
    asideOptionsParts.goMergeFilesView,

    /** 文件格式标准化视图  @key format-files */
    asideOptionsParts.goFormatFilesView,

    /** 文件格式转换视图  @key convert-files */
    asideOptionsParts.goConvertFilesView,

    {
        label: '表格函数参考',
        key: 'sheet-functions',
        children: asideOptionsParts.SheetFunctions,
    },
];

export default asideOptions;
