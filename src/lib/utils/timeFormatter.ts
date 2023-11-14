export const hour = (t: number) => {
  return Math.floor(t / 3600).toString();
};
export const minutes = (t: number) => {
  return Math.floor((t % 3600) / 60).toString();
};
export const seconds = (t: number) => {
  return Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
};
