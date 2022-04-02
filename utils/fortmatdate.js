exports.format = (value, type) => {
  const date = new Date(value);
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  month = month.toString().length === 1 ? `0${month}` : month;
  const day = date.getDate().toString().length === 1
    ? `0${date.getDate().toString()}` : date.getDate().toString();
  if (type === 1) {
    return `${day}-${month}-${year}`;
  }
  return `${year}-${month}-${day}`;
};
