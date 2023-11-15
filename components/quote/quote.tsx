"use client";

import React, { useEffect, useState } from "react";

export default function QuoteGenerator() {
  const colors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-rose-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-purple-500",
  ];

  const textColors = [
    "text-red-500",
    "text-pink-500",
    "text-green-500",
    "text-blue-500",
    "text-rose-500",
    "text-yellow-500",
    "text-indigo-500",
    "text-orange-500",
    "text-teal-500",
    "text-purple-500",
  ];

  const [opacity, setOpacity] = useState("opacity-100");

  // Make index state
  const [index, setIndex] = useState(0);

  // Make quote state
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState("Kaizoku ou ni ore wa naru");
  const [author, setAuthor] = useState("Monkey D. Luffy");
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data.quotes);

        // get random index
        let index = Math.floor(Math.random() * data.quotes.length);
        setQuote(data.quotes[index]["quote"]);
        setAuthor(data.quotes[index]["author"]);
      });

    // set quote after get the data
  }, []);

  // Handle click to change color
  const handleClick = () => {
    setIndex(Math.floor(Math.random() * colors.length));
    let quoteIndex = Math.floor(Math.random() * quotes.length);
    // Set the opacity to 0 to make the quote fade out and make delay for 500
    setOpacity("opacity-0");
    setTimeout(() => {
      // Set the opacity to 100 to make the quote fade in
      setOpacity("opacity-100");
      setQuote(quotes[quoteIndex]["quote"]);
      setAuthor(quotes[quoteIndex]["author"]);
    }, 650);
  };

  let tweetUrl =
    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
    encodeURIComponent('"' + quote + '" ' + author);

  let pathUrl =
    "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
    encodeURIComponent(author) +
    "&content=" +
    encodeURIComponent(quote) +
    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";
  return (
    <div
      className={
        "flex flex-col justify-center items-center h-screen w-screen transition-all duration-1000 " +
        colors[index]
      }
    >
      <div
        id="quote-box"
        className="bg-white w-80 sm:w-[600px] rounded-lg shadow-lg p-10"
      >
        <div id="text" className="">
          <p
            className={
              "transition-all duration-1000 text-2xl md:text-3xl text-center " +
              textColors[index] +
              " " +
              opacity
            }
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className={
                  "bi bi-quote h-6 md:h-7 inline mr-1 transition-all duration-1000 " +
                  textColors[index]
                }
                viewBox="0 0 16 16"
              >
                <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
              </svg>
            </span>
            {quote}
          </p>
        </div>
        <div id="author" className="flex justify-end mt-8">
          <p
            className={
              textColors[index] +
              " sm:text-sm md:text-lg transition-all duration-1000 " +
              opacity
            }
          >
            - {author}
          </p>
        </div>
        <div className="flex justify-between mt-8">
          <div className="flex gap-1 md:gap-3 text-white text-2xl">
            <a
              href={tweetUrl}
              target="_blank"
              id="tweet-quote"
              rel="noreferrer"
            >
              <div
                className={`py-1 px-2 md:py-2 md:px-3 rounded-md transition-all duration-1000 ${colors[index]} hover:scale-105 hover:animate-pulse`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  className="w-6 fill-white h-6"
                >
                  <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z"></path>
                </svg>
              </div>
            </a>
            <a
              href={pathUrl}
              id="tumblr-quote"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={`p-1 rounded-md transition-all duration-1000 ${colors[index]} hover:scale-105 hover:animate-pulse`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 32 32"
                  className="w-8 fill-white h-8"
                >
                  <path d="M 14.21875 5 C 13.539063 5 12.96875 5.570313 12.96875 6.25 C 12.96875 7.761719 12.203125 8.816406 11.34375 9.5625 C 10.914063 9.9375 10.453125 10.222656 10.125 10.40625 C 9.960938 10.496094 9.84375 10.550781 9.75 10.59375 C 9.703125 10.617188 9.679688 10.648438 9.65625 10.65625 C 9.632813 10.664063 9.535156 10.6875 9.625 10.65625 C 9.140625 10.847656 8.8125 11.296875 8.8125 11.8125 L 8.8125 14.03125 C 8.8125 14.710938 9.382813 15.28125 10.0625 15.28125 L 11.1875 15.28125 L 11.1875 20.5 C 11.1875 20.855469 11.1875 22.34375 11.875 23.875 C 12.5625 25.40625 14.136719 27 16.71875 27 C 20.652344 27 22.605469 25.441406 22.75 25.3125 C 23.019531 25.074219 23.1875 24.722656 23.1875 24.375 L 23.1875 21.71875 C 23.1875 21.273438 22.921875 20.84375 22.53125 20.625 C 22.15625 20.417969 21.699219 20.460938 21.3125 20.6875 L 21.28125 20.65625 C 21.28125 20.65625 21.25 20.6875 21.25 20.6875 C 21.179688 20.726563 20.09375 21.34375 18.90625 21.34375 C 18.289063 21.34375 18.246094 21.167969 18.125 20.9375 C 18.003906 20.707031 17.96875 20.3125 17.96875 20.40625 L 17.96875 15.46875 L 21.0625 15.46875 C 21.742188 15.46875 22.3125 14.902344 22.3125 14.21875 L 22.3125 11.21875 C 22.3125 10.535156 21.742188 9.96875 21.0625 9.96875 L 17.96875 9.96875 L 17.96875 6.25 C 17.96875 5.570313 17.398438 5 16.71875 5 Z M 14.78125 7 L 15.96875 7 L 15.96875 11.96875 L 20.3125 11.96875 L 20.3125 13.46875 L 15.96875 13.46875 L 15.96875 20.40625 C 15.96875 20.578125 15.976563 21.164063 16.34375 21.875 C 16.710938 22.585938 17.636719 23.34375 18.90625 23.34375 C 19.808594 23.34375 20.589844 23.128906 21.1875 22.90625 L 21.1875 23.9375 C 20.925781 24.144531 19.761719 25 16.71875 25 C 14.878906 25 14.203125 24.136719 13.71875 23.0625 C 13.234375 21.988281 13.1875 20.707031 13.1875 20.5 L 13.1875 13.28125 L 10.8125 13.28125 L 10.8125 12.3125 C 10.910156 12.261719 11 12.226563 11.125 12.15625 C 11.546875 11.921875 12.09375 11.554688 12.65625 11.0625 C 13.636719 10.207031 14.527344 8.792969 14.78125 7 Z"></path>
                </svg>
              </div>
            </a>
          </div>
          <button
            id="new-quote"
            className={
              colors[index] +
              " py-1 px-3 sm:py-2 sm:px-4 shadow-md rounded-lg text-white hover:animate-pulse hover:scale-105 transition-all duration-1000"
            }
            onClick={handleClick}
          >
            New quote!
          </button>
        </div>
      </div>
      <a
        href="https://github.com/dafex301"
        target="_blank"
        className="mt-3 opacity-50"
        rel="noreferrer"
      >
        by dafex
      </a>
    </div>
  );
}
