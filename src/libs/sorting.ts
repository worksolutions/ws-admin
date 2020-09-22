export const sortObjectEntriesByKey = (arr: [string, any][]) => [...arr].sort((a, b) => (a[0] >= b[0] ? 1 : -1));
