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

  const [isShowIdObject, setIsShowIdObject] = useState(false);

  const [jsonInterface, setJsonInterface] = useState("");

  const objectData = data as Record<string, any[]>[] | null;

  const excludedId = objectData?.map((data) => {
    const { _id, ...rest } = data;

    return rest;
  });

  const handleCopyClipboard = () => {
    const copyValue =
      selectedTab === "jsonData"
        ? JSON.stringify(isShowIdObject ? objectData : excludedId)
        : JSON.stringify(jsonInterface);

    navigator.clipboard.writeText(copyValue);
    setIsCopied(true);
  };

  const handleClosed = useCallback(() => {
    setIsCopied(false);
    onClose();
    setSelectedTab("jsonData");
    setIsShowIdObject(false);
  }, []);

  const generateInterface = () => {
    if (objectData?.length) {
      JsonToTS(isShowIdObject ? objectData : excludedId, {
        rootName: "Data",
      }).forEach((_interface) => {
        setJsonInterface(_interface);
      });
    }
  };

  const handleToggleShowId = (show: boolean) => {
    setIsCopied(false);
    setIsShowIdObject(show);
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
    // get interface from JSON object
    if (objectData?.length) {
      generateInterface();
    }
  }, [objectData, isShowIdObject]);

  return {
    action: {
      handleCopyClipboard,
      handleCloseModal: handleClosed,
      handleSelectedTab,
      handleToggleShowId,
    },
    state: {
      isCopied,
      jsonInterface,
      selectedTab,
      objectData: isShowIdObject ? objectData : excludedId,
      openModal: open,
      isShowIdObject,
    },
  };
};

export default useGenerateCompleted;
