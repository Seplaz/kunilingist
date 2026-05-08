import styles from './SecondPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { Player } from '../../components/Player/Player';
import arrowDown from '/icons/arrow_down.svg';

type Props = { active: boolean };

export const SecondPage = ({ active }: Props) => {
  const baseDelayMs = 200;
  const microDelayMs = 150;

  const title = 'НОВЫЙ СИНГЛ';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;

  const wordStepMs = 250;
  const blockStepMs = 250;
  const sectionGapMs = 500;

  const subtitleDelayMs =
    baseDelayMs + (wordsCount - 1) * wordStepMs + blockStepMs;

  const subtitle2DelayMs = subtitleDelayMs + blockStepMs;

  const playerBarDelayMs = subtitle2DelayMs + sectionGapMs + blockStepMs;
  const playerCoverDelayMs = playerBarDelayMs - blockStepMs;

  const arrowDelayMs = playerBarDelayMs + sectionGapMs + microDelayMs;

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

          <Subtitle subtitle='2026 — Труповозка' delayMs={subtitleDelayMs} />

          <Subtitle
            subtitle='Саундтрек для общей деградации'
            delayMs={subtitle2DelayMs}
          />
        </div>

        <Player
          barDelayMs={playerBarDelayMs}
          coverDelayMs={playerCoverDelayMs}
          active={active}
        />
      </div>

      <img
        className={styles.arrow}
        src={arrowDown}
        alt='Вниз'
        style={{ '--arrow-delay': `${arrowDelayMs}ms` } as React.CSSProperties}
      />
    </div>
  );
};
