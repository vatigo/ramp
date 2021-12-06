const LibraryItem = ({
  isPlaying,
  song,
  currentSong,
  setCurrentSong,
  audioRef,
}) => {
  const songClickHandler = async () => {
    await setCurrentSong(song);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      className={`library-item-container ${
        song.id === currentSong.id ? "selected" : ""
      }`}
      onClick={songClickHandler}
    >
      <img alt="album art" src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibraryItem;
