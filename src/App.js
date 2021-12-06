import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
import { useState, useRef } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //state
  const [songs] = useState(data());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <div
        className="bg-image"
        style={{ backgroundImage: `url(${currentSong.cover})` }}
      ></div>

      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song song={currentSong} isPlaying={isPlaying}></Song>
      <Player
        songs={songs}
        song={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
      ></Player>
      <Library
        isPlaying={isPlaying}
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
        audioRef={audioRef}
      />
    </div>
  );
}

export default App;
