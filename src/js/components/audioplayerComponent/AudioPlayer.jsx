import React, { useState, useEffect, useRef } from "react";
import "./AudioPlayerStyles.css";

const AudioPlayer = () => {
  const BASE_URL = "https://playground.4geeks.com";
  const [songsList, setSongsList] = useState([]);
  const audioPlayerRef = useRef(null);
  const [activeSong, setActiveSong] = useState({});
  const [isLoop, setIsLoop] = useState(false);

  const [index, setIndex] = useState(0);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (songsList.length !== 0) {
      setActiveSong(songsList[index]);
    }
  }, [index]);

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    if (play && songsList.length > 0) {
      audioPlayerRef.current.play();
  
    }
  }, [activeSong, play]);

  const playSong = () => {
    setPlay((prev) => !prev);

    if (play) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play();
    }
  };

  const nextSong = () => {
    setIndex((prev) => {
      if (prev === songsList.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };
  const prevSong = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return songsList.length - 1;
      }
      return prev - 1;
    });
  };

  const selectSong = (elem) => {
    setActiveSong(elem);
    setIndex(elem.id - 1);
    setPlay(true);
  };

  const volumeHandler = (action) => {
    let currentVol = audioPlayerRef.current.volume;
    // POR QUE USE EL TOFIXED? DE LA NADA COMO ESTOY RESTANDOO DECIMALES EN VOL ME SALIAN NUMEROS COMMO 0.1 , 0.2, 0.30000001, 4.99999999, Y ESO ME OCASIONADA ERROR
    if (action === "+") {
      if (currentVol === 1) return;

      let newVolMas = (currentVol + 0.1).toFixed(2);
      audioPlayerRef.current.volume = newVolMas;
    } else if (action === "-") {
      if (currentVol === 0) return;
      let newVolMenos = (currentVol - 0.1).toFixed(2);

      audioPlayerRef.current.volume = newVolMenos;
    }
  };

  // FETCH SONGS FUNC
  const fetchSongs = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/sound/songs");
      const data = await response.json();

      let readyToUseURL = data.songs.map((elemnt) => {
        return { ...elemnt, url: `${BASE_URL}${elemnt.url}` };
      });
      setActiveSong(readyToUseURL[0]);

      setSongsList(readyToUseURL);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="audioPlayerContainer">
      {songsList.length !== 0
        ? songsList.map((elem) => (
            <div
              style={{
                color: elem.id === activeSong.id ? "white" : "",
                backgroundColor: elem.id === activeSong.id ? "grey" : "",
              }}
              onClick={() => selectSong(elem)}
              key={elem.id}
              className="box d-flex align-items-center justify-content-start"
            >
              <span style={{ width: "30px" }} className="m-2">
                {elem.id}
              </span>
              <p className="m-0">{elem.name}</p>
            </div>
          ))
        : "Cargando..."}
      <div className="controls d-flex justify-content-around align-items-center flex-row">
        <audio
        
        loop={isLoop}
          src={songsList.length !== 0 ? songsList[index].url : ""}
          ref={audioPlayerRef}
        />
        <button className="botones" onClick={() => volumeHandler("-")}>
        <i className="fa-solid fa-volume-low" ></i>
        </button>
        <button className="botones" onClick={prevSong}>
        <i className="fa-solid fa-backward-step"></i>
        </button>

        <button className="botones" onClick={playSong}>{play ? <i  className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
        <button className="botones" onClick={nextSong}>
        <i className="fa-solid fa-forward-step"></i>
        </button>
        <button className="botones" onClick={() => volumeHandler("+")}>
        <i className="fa-solid fa-volume-high" ></i>
        </button>
        <button className="botones" style={{
          background:isLoop===true ? "white" :"black",
          color:isLoop===true ? "black" :"white",
          border:isLoop===true ? "none" :"2px white solid",
        }} onClick={() => setIsLoop((prev)=>!prev)}>
        <i 
        
        className="fa-solid fa-repeat"></i>
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
