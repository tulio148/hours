import { timeFormatter } from "../utils/timeFormatter";

export default function Display({
  time,
  hideDisplay,
}: {
  time: number;
  hideDisplay: string;
}) {
  return <div className={hideDisplay}>{timeFormatter(time)}</div>;
}
