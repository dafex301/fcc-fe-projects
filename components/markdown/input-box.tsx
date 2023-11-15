import React, { ChangeEvent } from "react";

interface InputBoxProps {
  handleText: (text: string) => void;
  text: string;
}

export default function InputBox(props: InputBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.handleText(e.target.value);
  };

  return (
    <textarea
      placeholder="Enter your text here"
      className="resize-none h-96 md:h-[34rem] w-5/6 p-5 bg-gray-50 rounded-md shadow-md"
      id="editor"
      value={props.text}
      onChange={handleChange}
    />
  );
}
