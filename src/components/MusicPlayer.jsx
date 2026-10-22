import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // ឈ្មោះ File ត្រូវតែត្រូវគ្នា 100% ជាមួយអ្វីដែលអ្នកដាក់ក្នុង public/music
  const audioSrc = "/public/videos/broken_toy.mp3";

  useEffect(() => {
    // កំណត់ Volume ឱ្យត្រូវតាមចិត្ត (0.0 ដល់ 1.0)
    if (audioRef.current) {
      audioRef.current.volume = 0.5; 
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center">
      <audio ref={audioRef} src={audioSrc} loop />
      
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-[#f59e0b] dark:hover:text-[#f59e0b] transition-all duration-300 hover:scale-105"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <FaPause className="text-sm animate-pulse" />
        ) : (
          <FaPlay className="text-sm ml-0.5" />
        )}
      </button>
    </div>
  );
}