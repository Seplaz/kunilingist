import { useEffect, useRef, useState } from 'react';
import styles from './Player.module.css';
import cover from '/images/cover.png';
import playIcon from '/icons/play.svg';
import pauseIcon from '/icons/pause.svg';
import audio from '/audio/КУНИЛИНГИСТ — Труповозка.mp3';

const AUDIO_SRC = audio;

type CSSVars = React.CSSProperties & {
  ['--cover-delay']?: string;
  ['--bar-delay']?: string;
};

type Props = {
  coverDelayMs?: number;
  barDelayMs?: number;
  active?: boolean;
};

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export const Player = ({ coverDelayMs = 0, barDelayMs = 0, active = false }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(p => !p);
  };

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <div
      className={styles.wrapper}
      data-active={active ? 'true' : 'false'}
      style={{
        '--cover-delay': `${coverDelayMs}ms`,
        '--bar-delay': `${barDelayMs}ms`,
      } as CSSVars}
    >
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      <div className={styles.card}>
        <img src={cover} alt="Обложка" className={styles.cover} />
      </div>

      <div className={styles.bar}>
        <div className={styles.info}>
          <span className={styles.artist}>КУНИЛИНГИСТ</span>
          <span className={styles.track}>Труповозка</span>
        </div>

        <button
          className={styles.playBtn}
          onClick={togglePlay}
          aria-label={playing ? 'Пауза' : 'Воспроизвести'}
        >
          <img
            src={playIcon}
            alt="Играть"
            className={`${styles.icon} ${playing ? styles.iconHidden : styles.iconVisible}`}
          />
          <img
            src={pauseIcon}
            alt="Пауза"
            className={`${styles.icon} ${playing ? styles.iconVisible : styles.iconHidden}`}
          />
        </button>
      </div>

      <div
        className={styles.progressTrack}
        onPointerDown={seek}
        role="slider"
        aria-label="Прогресс"
        aria-valuenow={Math.round(currentTime)}
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
      >
        <div className={styles.progressFill} style={{ width: `${progress * 100}%` }} />
      </div>

      <div className={styles.times}>
        <span>{formatTime(currentTime)}</span>
        <span>{duration ? formatTime(duration) : '--:--'}</span>
      </div>
    </div>
  );
};
