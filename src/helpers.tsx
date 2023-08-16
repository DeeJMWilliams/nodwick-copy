export const compare = (first, second) => {
  const a = first.name.toLowerCase();
  const b = second.name.toLowerCase();
  if (a < b) {
    return -1;
  } else if (a === b) {
    return 0;
  } else if (a > b) {
    return 1;
  }
};
