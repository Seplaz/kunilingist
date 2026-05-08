import styles from './ThirdPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { Footer } from '../../components/Footer/Footer';
import { MerchItem } from '../../components/MerchItem/MerchItem';
import { JoinButton } from '../../components/JoinButton/JoinButton';
import { Icon } from '../../components/Icon/Icon';

import merch1 from '/images/merch1.png';
import merch2 from '/images/merch2.png';

import telegram from '/icons/telegram.svg';
import instagram from '/icons/instagram.svg';
import yandex from '/icons/yandex.svg';
import spotify from '/icons/spotify.svg';
import apple from '/icons/apple_music.svg';

type Props = {
  active: boolean;
  onNext?: () => void; // для консистентности с другими страницами
};

export const ThirdPage = ({ active }: Props) => {
  const baseDelayMs = 200;

  const title = 'МЕРЧ И СООБЩЕСТВО';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;

  const subtitleDelayMs = baseDelayMs + (wordsCount - 1) * 250 + 250;
  const merch1DelayMs = subtitleDelayMs + 750;
  const merch2DelayMs = merch1DelayMs + 150;
  const joinDelayMs = merch2DelayMs + 650;

  const iconStepMs = 150;
  const iconsBaseDelayMs = joinDelayMs + 650;

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
          media="(min-width: 1024px)"
          srcSet="/images/pages/page_3/background_3_desktop.png"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/pages/page_3/background_3_tablet.png"
        />
        <img
          src="/images/pages/page_3/background_3.png"
          alt=""
          className={styles.background_image}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width="1920"
          height="1080"
        />
      </picture>

      <Header />

      <div className={styles.content}>
        <div className={styles.text}>
          <Title
            title={title}
            stackedWords
            baseDelayMs={baseDelayMs}
            page="third"
          />
          <Subtitle
            subtitle="Присоединяйся к нашей деградации"
            delayMs={subtitleDelayMs}
          />
        </div>

        <div className={styles.merch_container}>
          <div className={styles.merch}>
            <MerchItem
              image={merch1}
              alt="Футболка Труповозка"
              delayMs={merch1DelayMs}
              active={active}
            />
            <MerchItem
              image={merch2}
              alt="Свитшот Труповозка"
              delayMs={merch2DelayMs}
              active={active}
            />
          </div>
        </div>

        <JoinButton
            href="https://t.me/+a0uKxz6TsexmM2Uy"
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
                target="_blank"
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