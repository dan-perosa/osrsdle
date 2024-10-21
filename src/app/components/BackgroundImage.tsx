import Image from "next/image";
import bgImage from '../images/bg.jpg';

export default function BackgroundImage() {
  return <Image 
    src={bgImage}
    alt="osrsBg"
    fill
    placeholder="blur"
    sizes="100vw"
    style={{
      zIndex: -1,
      position: 'absolute',
      opacity: 0.5,
    }}
  />
}