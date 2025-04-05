import React, { useState, useEffect, useRef } from "react";
import "./AudioPlayerStyles.css";

const AudioPlayer = () => {
  const BASE_URL = "https://playground.4geeks.com";
  const [songsList, setSongsList] = useState([]);
  const audioPlayerRef = useRef(null);
  const [activeSong, setActiveSong] = useState({});

  const [index, setIndex] = useState(0);

  // FETCH SONGS FUNC
  const fetchSongs = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/sound/songs");
      const data = await response.json();
      // console.log(data)

      let readyToUseURL = data.songs.map((elemnt) => {
        return { ...elemnt, url: `${BASE_URL}${elemnt.url}` };
      });

      setSongsList(readyToUseURL);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="audioPlayerContainer">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      <div className="controls d-flex justify-content-center align-items-center flex-row">
        <audio
          src={songsList.length !== 0 ? songsList[index].url : ""}
          ref={audioPlayerRef}
        />
        <button onClick={() => setIndex((prev) => prev + 1)}>next</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
