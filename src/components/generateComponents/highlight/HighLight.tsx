import React, { type FC } from "react";
import { Highlight, type PrismTheme } from "prism-react-renderer";

type HighLightProps = { code: string; theme: PrismTheme };

const HighLight: FC<HighLightProps> = ({ code, theme }) => {
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
