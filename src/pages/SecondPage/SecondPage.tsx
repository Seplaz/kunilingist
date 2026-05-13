import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Player } from '../../components/Player/Player';
import { ScrollHint } from '../../components/ScrollHint/ScrollHint';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { Title } from '../../components/Title/Title';
import styles from './SecondPage.module.css';

type Props = {
  active: boolean;
  onNext?: () => void;
};

const title = 'НОВЫЙ СИНГЛ';
const releaseLine = '2026 — Труповозка';

const phrases: string[][] = [
  ['Последнее,', 'что ты услышишь в сознании'],
  ['Музыка для тех,', 'кто уже не дышит'],
  ['Саундтрек', 'к кунилингической смерти'],
  ['Едет за теми,', 'кто ещё шевелится'],
  ['Под эту музыку', 'выносят вперёд ногами'],
];

export const SecondPage = ({ active, onNext }: Props) => {
  const [currentPhraseIndex] = useState(() =>
    Math.floor(Math.random() * phrases.length),
  );

  const tagline = phrases[currentPhraseIndex];

  const baseDelayMs = 200;
  const wordStepMs = 250;
  const lineStepMs = 250;
  const blockStepMs = 250;
  const sectionGapMs = 500;

  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;

  const subtitleDelayMs =
    baseDelayMs + (wordsCount - 1) * wordStepMs + blockStepMs;

  const subtitle2DelayMs = subtitleDelayMs + blockStepMs;

  const subtitle2EndMs = subtitle2DelayMs + (tagline.length - 1) * lineStepMs;

  const playerCoverDelayMs = subtitle2EndMs + sectionGapMs;
  const playerBarDelayMs = playerCoverDelayMs + blockStepMs;

  const arrowDelayMs = playerBarDelayMs + sectionGapMs + blockStepMs;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <picture>
        <source
          media='(min-width: 1024px)'
          srcSet='/images/pages/page_2/background_2_desktop.webp'
        />
        <source
          media='(min-width: 768px)'
          srcSet='/images/pages/page_2/background_2_tablet.webp'
        />
        <img
          src='/images/pages/page_2/background_2.webp'
          alt=''
          className={styles.background_image}
          loading='lazy'
          decoding='async'
          fetchPriority='low'
          width='1920'
          height='1080'
        />
      </picture>

      <Header />

      <div className={styles.content}>
        <div className={styles.text}>
          <Title title={title} baseDelayMs={baseDelayMs} />
          <div className={styles.subtitle_container}>
            <Subtitle subtitle={releaseLine} delayMs={subtitleDelayMs} />
            <Subtitle subtitle={tagline} delayMs={subtitle2DelayMs} />
          </div>
        </div>

        <Player
          barDelayMs={playerBarDelayMs}
          coverDelayMs={playerCoverDelayMs}
          active={active}
        />
      </div>

      <ScrollHint delayMs={arrowDelayMs} active={active} onClick={onNext} />
    </div>
  );
};
