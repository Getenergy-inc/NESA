"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useModal } from "@/lib/store/modal";

interface Modal {
  onClose?: () => void;
  visible: boolean;
}

const transition = { duration: 0.3, ease: "easeInOut" };

const variants = {
  initial: {
    scale: "50%",
    opacity: 0,
  },
  animate: {
    scale: "100%",
    opacity: 1,
    transition,
  },
  exit: {
    scale: "50%",
    opacity: 0,
    transition,
  },
};

const Modal: React.FC<Modal> = ({ onClose, visible }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { content, hideModal } = useModal();

  useEffect(() => {
    if (visible) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [visible, onClose]);

  return (
    <>
      {visible && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[3000] overflow-hidden"
          key={"content"}
        >
          {/* Fixed background */}
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 w-screen h-screen bg-black/40"
            onClick={onClose}
          ></motion.div>
          {/* modal */}
          <motion.div ref={ref} key="modal-content" {...variants}>
            {content}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Modal;
