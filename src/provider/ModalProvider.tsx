import { ConfirmModal, GeneratedJsonModal } from "@/components";
import type { Layout } from "@/types";
import React, { type FC } from "react";

const ModalProvider: FC<Layout> = ({ children }) => {
  return (
    <main about="modal-container">
      {children}
      <ConfirmModal />
      <GeneratedJsonModal />
    </main>
  );
};

export default ModalProvider;
