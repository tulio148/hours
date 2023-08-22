export const timeFormatter = (t: number) => {
  let hours = Math.floor(t / 3600).toString();
  let minutes = Math.floor((t % 3600) / 60).toString();
  let seconds = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  if (Number(hours) === 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes.padStart(2, "0")}:${seconds}`;
};
