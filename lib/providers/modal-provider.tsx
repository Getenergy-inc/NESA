"use client";
import Modal from "@/components/Common/Modal";
import { FC, PropsWithChildren, useEffect } from "react";
import { useModal } from "../store/modal";
import { AnimatePresence } from "framer-motion";

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { visible } = useModal();

  return (
    <>
      {children}
    </>
  );
};

export default ModalProvider;
