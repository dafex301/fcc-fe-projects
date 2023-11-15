import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface PreviewBoxProps {
  text: string;
}

const PreviewBox: FC<PreviewBoxProps> = ({ text }) => {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default PreviewBox;
