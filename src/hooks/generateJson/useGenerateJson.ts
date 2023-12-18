import { useState } from "react";
import { generateJson } from "@/services";
import type { Status } from "@/types";
import { HttpStatusCode, type AxiosError } from "axios";
import { useConfirmCreateJsonStore, useJsonStore } from "@/stores";

const useGenerateJson = () => {
  const { onCloseModal } = useConfirmCreateJsonStore((store) => ({
    onCloseModal: store.onClose,
  }));

  const { values } = useJsonStore((store) => ({ values: store.values }));

  const [status, setStatus] = useState<Status>("idle");
  const [limit, setLimit] = useState(1);

  const filteredValues = values.filter(
    (val) => val.key && val.id && val.dataType
  );

  const handleGenerateJson = async () => {
    setStatus("loading");
    try {
      const { status } = await generateJson(filteredValues, limit);

      if (status === HttpStatusCode.Ok) {
        setStatus("success");
      }

      onCloseModal();
      setLimit(1);
    } catch (err) {
      const error = err as AxiosError;

      console.warn("Error generating JSON", error.response?.data);

      setStatus("error");
    }
  };

  const onIncreaseLimit = () => setLimit((prev) => prev + 1);
  const onDecreaseLimit = () => (limit <= 1 ? 1 : setLimit((prev) => prev - 1));
  const resetLimit = () => setLimit(1);

  const isSuccess = status === "success";
  const isLoading = status === "loading";
  const isError = status === "error";
  const isIdle = status === "idle";

  return {
    action: {
      handleGenerateJson,
      onIncreaseLimit,
      onDecreaseLimit,
      resetLimit,
    },
    state: { isSuccess, isLoading, isError, isIdle, limit },
  };
};

export default useGenerateJson;
