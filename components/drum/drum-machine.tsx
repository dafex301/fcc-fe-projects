"use client";

import React, { useState, useEffect } from "react";

// Define a type for the sound objects
type Sound = {
  id: string;
  keyTrigger: string;
  url: string;
};

// Array of sound objects
const sounds: Sound[] = [
  {
    id: "Heater-1",
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    id: "Heater-2",
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    id: "Heater-3",
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    id: "Heater-4",
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    id: "Clap",
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    id: "Open-HH",
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    id: "Kick-n-Hat",
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    id: "Kick",
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    id: "Closed-HH",
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const DrumPad: React.FC<{
  sound: Sound;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  power: boolean;
  volume: number;
}> = ({ sound, setDisplay, power, volume }) => {
  const playSound = () => {
    if (!power) return; // If the power is off, don't play the sound.
    const audio = document.getElementById(sound.keyTrigger) as HTMLAudioElement;
    setDisplay(sound.id);
    if (audio) {
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
    }
  };

  const buttonStyle = `drum-pad ${power ? "bg-gray-300" : "bg-gray-600"} ...`;

  useEffect(() => {
    if (!power) return;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === sound.keyTrigger) {
        playSound();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [sound.keyTrigger, power, volume]);

  return (
    <button
      className={`transition-all text-lg duration-500 hover:shadow-md flex items-center justify-center rounded-md w-16 h-16 ${
        power
          ? "bg-blue-400 hover:bg-blue-600 font-bold"
          : "bg-gray-200 hover:bg-gray-300 text-transparent"
      }`}
      id={sound.id}
      onClick={playSound}
    >
      {sound.keyTrigger}
      <audio className="clip" id={sound.keyTrigger} src={sound.url}></audio>
    </button>
  );
};

const DrumMachine: React.FC = () => {
  const [display, setDisplay] = useState("");
  const [power, setPower] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setDisplay(`Volume: ${Math.round(newVolume * 100)}`);
  };

  const togglePower = () => {
    setPower(!power);
    setDisplay(""); // Clear the display when the power is toggled
  };

  return (
    <div
      id="drum-machine"
      className="flex min-h-screen items-center justify-center bg-gray-200"
    >
      <div className="flex bg-white p-5 shadow-sm rounded-md gap-8">
        <div id="drum-pads" className="grid grid-cols-3 gap-4">
          {sounds.map((sound) => (
            <DrumPad
              key={sound.id}
              sound={sound}
              volume={volume}
              power={power}
              setDisplay={setDisplay}
            />
          ))}
        </div>
        <div className="flex flex-col gap-5 justify-around">
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm">Power</p>
            <button
              onClick={togglePower}
              className="bg-gray-200 relative w-16 h-8 rounded-md"
            >
              <div
                className={`absolute w-6 h-6 transition-all duration-300 rounded-md top-1 left-1 ${
                  power
                    ? `bg-blue-600 hover:bg-blue-800`
                    : "bg-gray-600 hover:bg-gray-800 translate-x-8"
                }`}
              ></div>
            </button>
          </div>
          <div
            id="display"
            className="bg-gray-100 flex items-center justify-center py-2 font-mono"
          >
            {/* TODO: show the volume everytime volume is moved */}
            {power ? (display ? display : "On") : "Off"}
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-sm">Volume</p>
            <input
              type="range"
              step="0.01"
              min="0"
              max="1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-200 accent-blue-600 hover:accent-blue-800 transition-all rounded-lg appearance-none cursor-pointer "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
