function transform(data: any) {
    const keys = Object.keys(data);

    if (!keys.length) return [];

    const len = data[keys[0]]?.length || 0;

    return Array.from({ length: len }, (_, i) => {
        const row: Record<string, any> = {};

        keys.forEach((k) => {
            row[k] = data[k]?.[i];
        });

        return row;
    });
}

export default transform;
