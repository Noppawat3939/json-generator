import React, { type FC } from "react";
import { Highlight } from "prism-react-renderer";
import type { HighLightProps as Props } from "./hightlightType";

const HighLight: FC<Props> = ({ code, theme }) => {
  return (
    <Highlight language="tsx" code={code} theme={theme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="max-h-[360px] p-2 font-[inherit] gap-1 flex flex-col">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default HighLight;
