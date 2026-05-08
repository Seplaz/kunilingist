import styles from './FirstPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import arrowDown from '/icons/arrow_down.svg';
import { useState } from 'react';

type Props = { active: boolean };

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
  { title: 'ВЕЛИКИЙ МОГУЧИЙ ЯЗЫК', subtitle: 'Клитор есть — ума не надо' },
];

export const FirstPage = ({ active }: Props) => {
  const [currentPhraseIndex] = useState(() =>
    Math.floor(Math.random() * phrases.length),
  );

  const phrase = phrases[currentPhraseIndex];

  const baseDelayMs = 200;
  const wordsCount = phrase.title.trim().split(/\s+/).filter(Boolean).length;
  const subtitleDelayMs = baseDelayMs + (wordsCount - 1) * 250 + 250;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <Header />
      <div className={styles.content}>
        <div className={styles.text}>
          <Title title={phrase.title} stackedWords baseDelayMs={baseDelayMs} />
          <Subtitle subtitle={phrase.subtitle} delayMs={subtitleDelayMs} />
        </div>
      </div>
      <img
        className={styles.arrow}
        src={arrowDown}
        alt='Вниз'
        style={{ '--arrow-delay': '1450ms' } as React.CSSProperties}
      />
    </div>
  );
};
