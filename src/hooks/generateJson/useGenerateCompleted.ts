import { useModalStore } from "@/stores";
import { useCallback, useEffect, useState } from "react";

import JsonToTS from "json-to-ts";

type JsonTab = "jsonData" | "jsonType";

const useGenerateCompleted = () => {
  const { open, onClose, data } = useModalStore((store) => ({
    open: store.open,
    onClose: store.onClose,
    data: store.data,
  }));

  const [isCopied, setIsCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState<JsonTab>("jsonData");

  const [jsonInterface, setJsonInterface] = useState("");

  const objectData = data as Record<string, any[]>[] | null;

  const handleCopyClipboard = () => {
    const copyValue =
      selectedTab === "jsonData"
        ? JSON.stringify(objectData)
        : JSON.stringify(jsonInterface);

    navigator.clipboard.writeText(copyValue);
    setIsCopied(true);
  };

  const handleClosed = useCallback(() => {
    setIsCopied(false);
    onClose();
    setSelectedTab("jsonData");
  }, []);

  const generateInterface = () => {
    if (objectData?.length) {
      JsonToTS(objectData).forEach((_interface) => {
        setJsonInterface(_interface);
      });
    }
  };

  const handleSelectedTab = () => {
    if (isCopied) {
      setIsCopied(false);
    }

    setSelectedTab((prevTab) =>
      prevTab === "jsonData" ? "jsonType" : "jsonData"
    );
  };

  useEffect(() => {
    if (objectData?.length) {
      generateInterface();
    }
  }, [objectData]);

  return {
    action: {
      handleCopyClipboard,
      handleCloseModal: handleClosed,
      handleSelectedTab,
    },
    state: {
      isCopied,
      jsonInterface,
      selectedTab,
      objectData,
      openModal: open,
    },
  };
};

export default useGenerateCompleted;
