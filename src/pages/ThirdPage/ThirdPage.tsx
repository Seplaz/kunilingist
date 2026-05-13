import { useState } from 'react';
import apple from '/icons/apple_music.svg';
import instagram from '/icons/instagram.svg';
import spotify from '/icons/spotify.svg';
import telegram from '/icons/telegram.svg';
import yandex from '/icons/yandex.svg';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Icon } from '../../components/Icon/Icon';
import { JoinButton } from '../../components/JoinButton/JoinButton';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { Title } from '../../components/Title/Title';
import styles from './ThirdPage.module.css';

type Props = {
  active: boolean;
  onNext?: () => void;
};

const phrases = [
  {
    title: 'СООБЩЕСТВО ТРУПОВОЗКИ',
    subtitle: ['Вне системы', 'Вне цензуры', 'Только для посвящённых'],
  },
  {
    title: 'СООБЩЕСТВО ТРУПОВОЗКИ',
    subtitle: ['Здесь не отписываются', 'Отсюда выносят'],
  },
  {
    title: 'СООБЩЕСТВО ТРУПОВОЗКИ',
    subtitle: ['Вход — языком', 'Выход не предусмотрен'],
  },
  {
    title: 'СООБЩЕСТВО ТРУПОВОЗКИ',
    subtitle: ['Это не сообщество', 'Это диагноз'],
  },
  {
    title: 'СООБЩЕСТВО ТРУПОВОЗКИ',
    subtitle: ['В этот культ не вступают', 'В него падают'],
  },
];

export const ThirdPage = ({ active }: Props) => {
  const [currentPhraseIndex] = useState(() =>
    Math.floor(Math.random() * phrases.length),
  );

  const phrase = phrases[currentPhraseIndex];

  const baseDelayMs = 200;
  const wordStepMs = 250;
  const lineStepMs = 250;
  const blockStepMs = 250;
  const sectionGapMs = 500;
  const iconStepMs = 150;

  const wordsCount = phrase.title.trim().split(/\s+/).filter(Boolean).length;
  const linesCount = phrase.subtitle.length;

  const subtitleDelayMs =
    baseDelayMs + (wordsCount - 1) * wordStepMs + blockStepMs;

  const subtitleEndMs = subtitleDelayMs + (linesCount - 1) * lineStepMs;

  const joinDelayMs = subtitleEndMs + sectionGapMs + blockStepMs;

  const iconsBaseDelayMs = joinDelayMs + sectionGapMs + blockStepMs;

  const socialIcons = [
    {
      icon: instagram,
      alt: 'Instagram',
      href: 'https://www.instagram.com/kunilingist?igsh=MTdxdzdjdGxzbHhzbA%3D%3D&utm_source=qr',
    },
    {
      icon: telegram,
      alt: 'Telegram',
      href: 'https://t.me/+a0uKxz6TsexmM2Uy',
    },
    { icon: yandex, alt: 'Yandex Music' },
    { icon: spotify, alt: 'Spotify' },
    { icon: apple, alt: 'Apple Music' },
  ];

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <picture>
        <source
          media='(min-width: 1024px)'
          srcSet='/images/pages/page_3/background_3_desktop.png'
        />
        <source
          media='(min-width: 768px)'
          srcSet='/images/pages/page_3/background_3_tablet.png'
        />
        <img
          src='/images/pages/page_3/background_3.png'
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
          <Title
            title={phrase.title}
            stackedWords
            baseDelayMs={baseDelayMs}
            page='third'
          />
          <div className={styles.subtitle_container}>
            <Subtitle subtitle={phrase.subtitle} delayMs={subtitleDelayMs} />
          </div>
        </div>

        {/* <div className={styles.merch_container}>
          <div className={styles.merch}>
            <MerchItem
              image={tshirt}
              alt="Футболка Труповозка"
              delayMs={merch1DelayMs}
              active={active}
            />
            <MerchItem
              image={sweatshirt}
              alt="Свитшот Труповозка"
              delayMs={merch2DelayMs}
              active={active}
            />
          </div>
        </div> */}

        <JoinButton
          href='https://t.me/+a0uKxz6TsexmM2Uy'
          delayMs={joinDelayMs}
          active={active}
        />

        <div className={styles.social_container}>
          <div className={styles.icons}>
            {socialIcons.map((item, index) => (
              <Icon
                key={item.alt}
                icon={item.icon}
                alt={item.alt}
                href={item.href}
                target='_blank'
                delayMs={iconsBaseDelayMs + iconStepMs * index}
                active={active}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
