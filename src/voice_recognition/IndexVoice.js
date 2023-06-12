import React, { useEffect, useState } from "react";
import AudioSpectrum from "./AudioAnnotation/AudioSpectrum";

import "./App.css";
import { axiosInstance } from "./Api/axiosInstance";
// import audio from "./audio/smooth.wav";
// import { AudioRecorder } from "react-audio-voice-recorder";

// const addAudioElement = (blob) => {
//   const url = URL.createObjectURL(blob);
//   const audio = document.createElement("audio");
//   audio.src = url;
//   audio.controls = true;
//   document.body.appendChild(audio);
// };

function IndexVoice() {
  const [url, setUrl] = useState("");
  const [spectogram, setSpectogram] = useState("");
  const [filedata, setFiledata] = useState({});
  const [loading, setLoading] = useState(true);

  // let mySound = new Audio(audio);
  // mySound.play();

  useEffect(() => {
    axiosInstance.get("get_data/").then((result) => {
      const data = result.data;
      console.log(result.data);
      setUrl(data.sound_url);
      console.log("sound url", data.sound_url);
      //setUrl("https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav");
      // console.log(data.sound_url);
      setSpectogram(data.spectogram_url);
      // setSpectogram(
      //   "https://en.wikipedia.org/wiki/Spectrogram#/media/File:Spectrogram-19thC.png"
      //);

      setFiledata({
        table: data.table,
        index: data.index,
        serial: data.serial,
      });
      // setFiledata({
      //   table: "table data",
      //   index: "data.index",
      //   serial: "data.serial",
      // });
      setLoading(false);
    });
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <button type="button" onClick={handleRefresh}>
        Load next
      </button>
      {!loading ? (
        <div className="folderid">
          {filedata.table + "/" + filedata.index + "/" + filedata.serial}{" "}
        </div>
      ) : null}

      {!loading ? (
        <AudioSpectrum url={url} spectogram={spectogram} filedata={filedata} />
      ) : null}
    </div>
  );
}

export default IndexVoice;
