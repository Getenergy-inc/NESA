import { ThreeCircles } from "react-loader-spinner";
import { motion } from "framer-motion";
import { opacityV } from "@/lib/utils/variants";

const FullWidthLoader = () => {
  return (
    <motion.div
      {...opacityV}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur z-10"
    >
      <div className="p-4 bg-white shadow-2xl rounded-2xl">
        <ThreeCircles visible={true} height="50" width="50" color="#FFB92E" ariaLabel="three-circles-loading" />
      </div>
    </motion.div>
  );
};

export default FullWidthLoader;
