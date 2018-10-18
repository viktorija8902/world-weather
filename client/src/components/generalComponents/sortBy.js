export function sortBy(data, key) {
  let arrayCopy = [...data];
  arrayCopy.sort((a, b) => {
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  });
  return arrayCopy;
}