import styles from './SecondPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { Player } from '../../components/Player/Player';
import arrowDown from '/icons/arrowDown.svg';

type Props = { active: boolean };

export const SecondPage = ({ active }: Props) => {
  const baseDelayMs = 200;
  const title = 'НОВЫЙ СИНГЛ';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;
  const subtitleDelayMs = baseDelayMs + (wordsCount - 1) * 250 + 250;
  const subtitleStaggerMs = 250;
  const subtitle2DelayMs = subtitleDelayMs + subtitleStaggerMs;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <Header />
      <div className={styles.content}>
        <div className={styles.text}>
          <Title title={title} baseDelayMs={baseDelayMs} />
          <Subtitle subtitle="2026 — Труповозка" delayMs={subtitleDelayMs} />
          <Subtitle
            subtitle="Саундтрек деградационного сообщества"
            delayMs={subtitle2DelayMs}
          />
        </div>
        <div className={styles.playerArea}>
          <Player />
        </div>
      </div>
      <img className={styles.arrow} src={arrowDown} alt="Вниз" style={{ '--arrow-delay': '1200ms' } as React.CSSProperties} />
    </div>
  );
};
