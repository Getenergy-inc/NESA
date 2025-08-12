import { useRef } from "react";

const useSlider = (slideAmount?: number) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const moveLeft = () => sliderRef.current && (sliderRef.current.scrollLeft -= slideAmount ?? 500);
  const moveRight = () => sliderRef.current && (sliderRef.current.scrollLeft += slideAmount ?? 500);

  return { sliderRef, moveLeft, moveRight };
};

export default useSlider;
