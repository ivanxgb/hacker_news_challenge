import Image from "next/image";
import heartIcon from "/public/assets/icons/heart-filled.svg";

export function FilledHeartIcon() {
  return <Image src={heartIcon} alt={"Time Icon"} width={24} height={24} />;
}
