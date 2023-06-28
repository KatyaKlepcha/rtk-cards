export const convertDate = (date: string) => {
  const splitDate = date.split("T")[0];

  const year = splitDate.split("-")[0];
  const month = splitDate.split("-")[1];
  const day = splitDate.split("-")[2];

  return `${day}.${month}.${year}`;
};
