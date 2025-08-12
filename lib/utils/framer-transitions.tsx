import { motion } from "framer-motion";
import { opacityV, parentV, toTopV } from "./variants";

type TransitionElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  React.PropsWithChildren;

export const DivOpacityInView: React.FC<TransitionElement> = (props) => {
  const { children, ...remaining } = props;
  return (
    <div {...remaining}>
      <motion.div variants={opacityV} initial="initial" exit="exit" whileInView="animate" viewport={{ once: true }}>
        {children}
      </motion.div>
    </div>
  );
};

export const DivToTopInView: React.FC<TransitionElement> = (props) => {
  const { children, ...remaining } = props;
  return (
    <div {...remaining}>
      <motion.div variants={toTopV} initial="initial" exit="exit" whileInView="animate" viewport={{ once: true }}>
        {children}
      </motion.div>
    </div>
  );
};

export const DivParentInView: React.FC<TransitionElement> = (props) => {
  const { children, className, ...remaining } = props;
  return (
    <div {...remaining}>
      <motion.div
        variants={parentV}
        className={className}
        initial="initial"
        exit="exit"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  );
};
