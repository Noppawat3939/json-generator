import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { generateJson } from "@/services";
import type { Status } from "@/types";
import { HttpStatusCode, type AxiosError } from "axios";
import { useJsonStore, useModalStore } from "@/stores";

const useGenerateJson = () => {
  const { onCloseModal, openModal, setData } = useModalStore((store) => ({
    onCloseModal: store.onClose,
    openModal: store.onOpen,
    setData: store.setData,
  }));

  const { values } = useJsonStore((store) => ({ values: store.values }));

  const [status, setStatus] = useState<Status>("idle");
  const [limit, setLimit] = useState("1");

  const filteredValues = values
    .map(({ value, key, dataType }) => ({
      key,
      value,
      dataType,
    }))
    .filter((val) => val.key && val.dataType);

  const handleGenerateJson = async (
    event: FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const { status, data } = await generateJson(filteredValues, +limit);

      if (status === HttpStatusCode.Ok) {
        setStatus("success");
        setData(data.data);

        onCloseModal();

        setTimeout(() => {
          setLimit("1");
          openModal("generatedJsonModal");
        }, 1000);
      }
    } catch (err) {
      const error = err as AxiosError;

      console.warn("Error generating JSON", error.response?.data);
      setStatus("error");
    }
  };

  const onLimitChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regex = /[^\d]+/g;

    const replacedNumber = value.replaceAll(regex, "");

    const cleaned = replacedNumber.startsWith("0")
      ? replacedNumber.slice(-1)
      : replacedNumber;

    setLimit(cleaned);

    if (status === "error") {
      setStatus("idle");
    }
  }, []);

  const resetLimit = useCallback(() => {
    setLimit("1");
    setStatus("idle");
  }, []);

  const isSuccess = status === "success";
  const isLoading = status === "loading";
  const isError = status === "error";
  const isIdle = status === "idle";

  return {
    action: {
      handleGenerateJson,
      resetLimit,
      onLimitChange,
    },
    state: { isSuccess, isLoading, isError, isIdle, limit },
  };
};

export default useGenerateJson;
