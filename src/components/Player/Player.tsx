import { useEffect, useRef, useState } from "react";
import audio from "/audio/КУНИЛИНГИСТ — Труповозка.mp3";
import pause from "/icons/pause.svg";
import play from "/icons/play.svg";
import video_cover_webm from "/videos/video_cover.webm";
import styles from "./Player.module.css";

const AUDIO_SRC = audio;

type CSSVars = React.CSSProperties & {
	"--bar-delay"?: string;
	"--cover-delay"?: string;
};

type Props = {
	barDelayMs?: number;
	coverDelayMs?: number;
	active?: boolean;
};

function formatTime(s: number): string {
	const m = Math.floor(s / 60);
	const sec = Math.floor(s % 60);
	return `${m}:${sec.toString().padStart(2, "0")}`;
}

export const Player = ({
	barDelayMs = 0,
	coverDelayMs = 1500,
	active = false,
}: Props) => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	/* ---------------- AUDIO ---------------- */

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.load();

		const onTimeUpdate = () => {
			setCurrentTime(audio.currentTime);
			setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
		};

		const onLoadedMetadata = () => setDuration(audio.duration);
		const onEnded = () => setPlaying(false);

		audio.addEventListener("timeupdate", onTimeUpdate);
		audio.addEventListener("loadedmetadata", onLoadedMetadata);
		audio.addEventListener("ended", onEnded);

		return () => {
			audio.removeEventListener("timeupdate", onTimeUpdate);
			audio.removeEventListener("loadedmetadata", onLoadedMetadata);
			audio.removeEventListener("ended", onEnded);
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

		setPlaying((p) => !p);
	};

	const seek = (e: React.PointerEvent<HTMLDivElement>) => {
		const audio = audioRef.current;
		if (!audio?.duration) return;

		const rect = e.currentTarget.getBoundingClientRect();
		const ratio = Math.max(
			0,
			Math.min(1, (e.clientX - rect.left) / rect.width),
		);

		audio.currentTime = ratio * audio.duration;
	};

	/* ---------------- VIDEO REFLOW FIX ---------------- */

	useEffect(() => {
		const forceReflow = () => {
			const video = videoRef.current;
			if (!video) return;

			const wasPlaying = !video.paused;

			video.style.display = "none";
			void video.offsetHeight;
			video.style.display = "";

			if (wasPlaying) {
				video.play().catch(() => {});
			}
		};

		const handleVisibility = () => {
			if (!document.hidden) {
				setTimeout(forceReflow, 50);
			}
		};

		document.addEventListener("visibilitychange", handleVisibility);
		window.addEventListener("resize", forceReflow);
		window.addEventListener("pageshow", forceReflow);
		window.addEventListener("focus", forceReflow);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibility);
			window.removeEventListener("resize", forceReflow);
			window.removeEventListener("pageshow", forceReflow);
			window.removeEventListener("focus", forceReflow);
		};
	}, []);

	/* ---------------- RENDER ---------------- */

	return (
		<div
			className={styles.wrapper}
			data-active={active ? "true" : "false"}
			style={
				{
					"--bar-delay": `${barDelayMs}ms`,
					"--cover-delay": `${coverDelayMs}ms`,
				} as CSSVars
			}
		>
			<audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

			{active && (
				<div className={styles.coverWrapper}>
					<video
						ref={videoRef}
						autoPlay
						muted
						loop
						playsInline
						src={video_cover_webm}
						className={styles.cover}
					/>
				</div>
			)}

			<div className={styles.bar}>
				<div className={styles.info}>
					<span className={styles.artist}>КУНИЛИНГИСТ</span>
					<span className={styles.track}>Труповозка</span>
				</div>

				<button
					type="button"
					className={styles.playBtn}
					onClick={togglePlay}
					aria-label={playing ? "Пауза" : "Воспроизвести"}
				>
					<img
						src={play}
						alt="Воспроизвести"
						className={`${styles.icon} ${
							playing ? styles.iconHidden : styles.iconVisible
						}`}
					/>
					<img
						src={pause}
						alt="Пауза"
						className={`${styles.icon} ${
							playing ? styles.iconVisible : styles.iconHidden
						}`}
					/>
				</button>
			</div>

			<div
				className={styles.progressTrack}
				onPointerDown={seek}
				role="slider"
				tabIndex={0}
				aria-label="Прогресс"
				aria-valuenow={Math.round(currentTime)}
				aria-valuemin={0}
				aria-valuemax={Math.round(duration)}
				onKeyDown={(e) => {
					const audio = audioRef.current;
					if (!audio?.duration) return;

					if (e.key === "ArrowRight") {
						audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
					}

					if (e.key === "ArrowLeft") {
						audio.currentTime = Math.max(audio.currentTime - 5, 0);
					}
				}}
			>
				<div
					className={styles.progressFill}
					style={{ width: `${progress * 100}%` }}
				/>
			</div>

			<div className={styles.times}>
				<span>{formatTime(currentTime)}</span>
				<span>{duration ? formatTime(duration) : "--:--"}</span>
			</div>
		</div>
	);
};
