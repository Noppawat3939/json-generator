import JsonToTS from "json-to-ts";
import { debounce } from "lodash";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const DELAY = 1000; //1000 ms

const useGenerateInterface = () => {
  const [jsonString, setJsonString] = useState("");
  const [interfaces, setInterfaces] = useState<string[] | string>([]);

  const [rootNameInterface, setRootNameInterface] = useState("Root");

  const handleJsonStringChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setJsonString(value);
    },
    []
  );

  const handleRootNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setRootNameInterface(value);
    },
    []
  );

  const memorizeTsInterfaces = useMemo(() => {
    if (typeof interfaces === "string") return `/*\n${interfaces}\n*/`;
    return interfaces
      .map((int) => "export " + int)
      .join("\n\n")
      .trim();
  }, [interfaces]);

  const handleGenerateInterface = useCallback(() => {
    try {
      const interfaces = JsonToTS(JSON.parse(jsonString), {
        rootName: rootNameInterface.trim() ? rootNameInterface : "Root",
      });
      setInterfaces(interfaces);
    } catch (error) {
      console.log("Error generating interface", error);

      return;
    }
  }, [jsonString, rootNameInterface]);

  useEffect(() => {
    if (jsonString.trim()) {
      debounce(() => handleGenerateInterface(), DELAY)();
    }

    return () => console.clear();
  }, [jsonString, handleGenerateInterface]);

  return {
    state: { memorizeTsInterfaces, jsonString, rootNameInterface },
    action: { handleRootNameChange, handleJsonStringChange },
  };
};

export default useGenerateInterface;
