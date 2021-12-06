import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faFastBackward,
  faFastForward,
  faVolumeDown,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  song,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  setCurrentSong,
  audioRef,
}) => {
  const playSongHandler = () => {
    if (!isPlaying) audioRef.current.play();
    else audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const [activeVolume, setActiveVolume] = useState(false);
  const [volume, setVolume] = useState(1);
  const changeVolume = (e) => {
    let value = e.target.value;
    setVolume(value);
  };

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume, audioRef]);

  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;

  const skipSongHandler = async (direction) => {
    let currentIndex = songs.indexOf(song);
    let targetIndex = currentIndex + direction;
    if (targetIndex < 0) targetIndex = songs.length - 1;
    else if (targetIndex >= songs.length) targetIndex = 0;
    await setCurrentSong(songs[targetIndex]);
    if (isPlaying) audioRef.current.play();
    /*if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }*/
  };

  function isIOSDevice() {
    let platform =
      navigator?.userAgentData?.platform || navigator?.platform || "unknown";
    return !!platform && /iPad|iPhone|iPod/.test(platform);
  }

  function getVolumeIcon() {
    if (volume <= 0.001) return faVolumeMute;
    else if (volume < 0.5) return faVolumeDown;
    else return faVolumeUp;
  }

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration || 0;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  return (
    <div className={`player ${activeVolume ? "volume-active" : ""}`}>
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${song.color[0]}, ${song.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div
            className="animate-track"
            style={{
              transform: `translateX(${animationPercentage}%)`,
            }}
          ></div>
        </div>

        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faFastBackward}
          onClick={() => {
            skipSongHandler(-1);
          }}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faFastForward}
          onClick={() => {
            skipSongHandler(1);
          }}
        />
        {!isIOSDevice() && (
          <FontAwesomeIcon
            size="2x"
            onClick={() => {
              setActiveVolume(!activeVolume);
            }}
            icon={getVolumeIcon()}
          />
        )}
        {activeVolume && (
          <input
            onChange={changeVolume}
            value={volume}
            max="1"
            min="0"
            step="0.01"
            type="range"
          />
        )}

        <audio
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler}
          onEnded={() => skipSongHandler(1)}
          ref={audioRef}
          src={song.audio}
        ></audio>
      </div>
    </div>
  );
};

export default Player;
