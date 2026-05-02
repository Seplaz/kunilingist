import styles from './SecondPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';

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
      <Title title={title} baseDelayMs={baseDelayMs} />
      <Subtitle subtitle="2026 — БДСМ" delayMs={subtitleDelayMs} />
      <Subtitle
        subtitle="Вдохновлено бичихой с центрального рынка, которая отказала в предложении с ней встречаться..."
        delayMs={subtitle2DelayMs}
      />
      </div>
    </div>
  );
};
