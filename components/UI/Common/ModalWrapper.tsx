"use client";

import dynamic from 'next/dynamic';

const ClientOnlyModal = dynamic(
  () => import("./ClientOnlyModal"),
  { ssr: false }
);

export default function ModalWrapper() {
  return (
    <ClientOnlyModal 
      isOpen={false} 
      onClose={() => {}}
    >
      <div />
    </ClientOnlyModal>
  );
}
