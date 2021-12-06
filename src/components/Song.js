import record from "../record.png";

const Song = ({ song, isPlaying }) => {
  return (
    <div className="song-container">
      <div className="album">
        <img
          className={isPlaying ? "cover playing" : "cover"}
          alt="album art"
          src={song.cover}
        ></img>
        <div className={isPlaying ? "record playing" : "record"}>
          <img
            className={isPlaying ? "rotate" : ""}
            alt="album art"
            src={record}
          ></img>
        </div>
      </div>
      <h2>{song.name}</h2>
      <h3>{song.artist}</h3>
    </div>
  );
};

export default Song;
