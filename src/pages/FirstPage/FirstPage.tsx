import styles from './FirstPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { ScrollHint } from '../../components/ScrollHint/ScrollHint';
import { useState } from 'react';

type Props = {
  active: boolean;
  onNext?: () => void;
};

const phrases = [
  {
    title: 'ПРЕВОСХОДНОЕ ВЛАДЕНИЕ ЯЗЫКОМ',
    subtitle: 'Искусство, от которого сводит ноги',
  },
  {
    title: 'МАСТЕРСТВО ГЛУБОКОЙ ЛИНГВИСТИКИ',
    subtitle: 'Шершавый профессионалитет',
  },
  {
    title: 'ПРОФЕССОР КЛИТОРАЛЬНОЙ ЛИНГВИСТИКИ',
    subtitle: 'Доктор наук по женскому удовольствию',
  },
  {
    title: 'КУНИЛИНГУС КАК РЕЛИГИЯ',
    subtitle: 'Присоединяйся к культу наслаждения',
  },
  {
    title: 'ВЕЛИКИЙ МОГУЧИЙ ЯЗЫК',
    subtitle: 'Клитор есть — ума не надо',
  },
];

export const FirstPage = ({ active, onNext }: Props) => {
  const [currentPhraseIndex] = useState(() =>
    Math.floor(Math.random() * phrases.length),
  );

  const phrase = phrases[currentPhraseIndex];

  const baseDelayMs = 200;
  const wordStepMs = 250;
  const blockStepMs = 250;
  const sectionGapMs = 500;

  const wordsCount = phrase.title.trim().split(/\s+/).filter(Boolean).length;

  const subtitleDelayMs =
    baseDelayMs + (wordsCount - 1) * wordStepMs + blockStepMs;

  const arrowDelayMs = subtitleDelayMs + sectionGapMs + blockStepMs;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/images/pages/page_1/background_desktop.webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/pages/page_1/background_tablet.webp"
        />
        <img
          src="/images/pages/page_1/background.webp"
          alt=""
          className={styles.background_image}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width="1920"
          height="1080"
        />
      </picture>

      <Header />

      <div className={styles.content}>
        <div className={styles.text}>
          <Title title={phrase.title} stackedWords baseDelayMs={baseDelayMs} />
          <Subtitle subtitle={phrase.subtitle} delayMs={subtitleDelayMs} />
        </div>
      </div>

      <ScrollHint
        delayMs={arrowDelayMs}
        active={active}
        onClick={onNext}
      />
    </div>
  );
};