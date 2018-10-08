export const cloneDeep = (item) => {
  if (!item || typeof item !== 'object') return item;
  let constructor = item.constructor();
  return Object.keys(item).reduce((acc, curr) => {
    acc[curr] = cloneDeep(item[curr]);
    return acc;
  }, constructor)
}
