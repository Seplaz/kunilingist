import styles from './ThirdPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { Footer } from '../../components/Footer/Footer';

type Props = { active: boolean };

export const ThirdPage = ({ active }: Props) => {
  const baseDelayMs = 200;
  const title = 'СТАТИСТИКА И СООБЩЕСТВО';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;
  const subtitleDelayMs = baseDelayMs + (wordsCount - 1) * 250 + 250;
  const subtitleStaggerMs = 250;
  const subtitle2DelayMs = subtitleDelayMs + subtitleStaggerMs;
  const subtitle3DelayMs = subtitle2DelayMs + subtitleStaggerMs;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <Header />
      <div className={styles.content}>
        <Title title={title} stackedWords baseDelayMs={baseDelayMs} />
        <Subtitle subtitle="0 прослушиваний во всём мире" delayMs={subtitleDelayMs} />
        <Subtitle subtitle="666 положительных отзывов" delayMs={subtitle2DelayMs} />
        <Subtitle subtitle="420 довольных бомжих" delayMs={subtitle3DelayMs} />
      </div>
      <Footer />
    </div>
  );
};
