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

const phrases = [
  {
    title: 'СООБЩЕСТВО',
    subtitle: 'Искусство, от которого сводит ноги',
  },
  {
    title: 'СООБЩЕСТВО',
    subtitle: 'Секта для тех, кому бог уже не перезвонит',
  },
  {
    title: 'СООБЩЕСТВО',
    subtitle: 'Вход — языком. Выход не предусмотрен',
  },
  {
    title: 'СООБЩЕСТВО',
    subtitle: 'Добро пожаловать в яму, из которой не хочется вылезать',
  },
];

export const SecondPage = ({ active, onNext }: Props) => {
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
          <div className={styles.subtitle_container}>
            <Subtitle subtitle='2026 — Труповозка' delayMs={subtitleDelayMs} />
            <Subtitle
              subtitle='Последнее, что ты услышишь в сознании'
              delayMs={subtitle2DelayMs}
            />
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
