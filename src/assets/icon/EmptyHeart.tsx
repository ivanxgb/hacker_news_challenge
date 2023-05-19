import Image from "next/image";
import heartIcon from "/public/assets/icons/heart-empty.svg";

export function EmptyHeartIcon() {
  return <Image src={heartIcon} alt={"Time Icon"} width={24} height={24} />;
}