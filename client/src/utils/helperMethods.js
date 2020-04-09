const findIndex = (arr, prop, value) => {
  let index = arr
    .map(item => {
      return item[prop];
    })
    .indexOf(value);
  return index;
};

export const cutArray = (arr, prop, value) => {
  let index = findIndex(arr, prop, value);
  let part1 = arr.slice(index);
  let part2 = arr.slice(0, index);
  return part1.concat(part2);
};

export const formatDate = inputDate => {
  let workDate = inputDate;
  workDate = new Date(workDate);
  return workDate.toDateString();
};
