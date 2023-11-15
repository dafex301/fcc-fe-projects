"use client";

import "./styles.css";
import React, { useState } from "react";
import InputBox from "./input-box";
import PreviewBox from "./preview-box";
import { placeholder } from "./placeholder";

function MarkdownPreviewer() {
  const [text, setText] = useState(placeholder);
  return (
    <div className="base-background overflow-hidden scr">
      <div className="h-screen w-screen flex flex-col gap-3 items-center justify-center">
        <h1 className="text-white text-xl text-center font-sans">
          Markdown Previewer
          <br />
          <span className="text-sm font-light text-white">
            <a
              href="https://github.com/dafex301"
              className="no-underline text-white italic opacity-80"
              target="_blank"
              rel="noreferrer"
            >
              by dafex301
            </a>
          </span>
        </h1>
        <div className="grid grid-cols-2 h-5/6 bg-gray-200 shadow-lg rounded-xl w-4/6">
          <div className="flex flex-col items-center justify-center ">
            <InputBox text={text} handleText={setText} />
          </div>
          <div className="flex items-center justify-center">
            <div className="h-96 md:h-[34rem] w-5/6 p-5 bg-gray-50 rounded-md shadow-md overflow-auto">
              <PreviewBox text={text} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkdownPreviewer;
