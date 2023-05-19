import Image from "next/image";
import timeIcon from "/public/assets/icons/time-icon.svg";

export function TimeIcon() {
  return <Image src={timeIcon} alt={"Time Icon"} width={14} height={14} />;
}
