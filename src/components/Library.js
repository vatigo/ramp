import LibraryItem from "./LibraryItem";

const Library = ({
  isPlaying,
  songs,
  currentSong,
  audioRef,
  setCurrentSong,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibraryItem
            isPlaying={isPlaying}
            song={song}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
