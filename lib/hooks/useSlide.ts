import { useRef } from "react";

const useSlider = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    ref.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    ref.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return { ref, scrollLeft, scrollRight };
};

export default useSlider;
