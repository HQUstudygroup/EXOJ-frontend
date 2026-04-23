import { openDB, type DBSchema } from 'idb';
import type { TabItem } from '@/models/chartTypes';

/** 数据库结构定义 */
interface ChartSchema extends DBSchema {
    chartTabs: {
        key: string;
        value: TabItem;
    };
}

/** 初始化数据库 */
export const dbPromise = openDB<ChartSchema>('chart-db', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('chartTabs')) {
            db.createObjectStore('chartTabs', {
                keyPath: 'tabName',
            });
        }
    },
});
