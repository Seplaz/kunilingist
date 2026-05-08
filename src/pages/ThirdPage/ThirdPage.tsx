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

type Props = { active: boolean };

export const ThirdPage = ({ active }: Props) => {
  const baseDelayMs = 200;
  const title = 'МЕРЧ И СООБЩЕСТВО';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;
  const subtitleDelayMs = baseDelayMs + (wordsCount - 1) * 250 + 250;
  const merch1DelayMs = subtitleDelayMs + 500 + 250;
  const merch2DelayMs = merch1DelayMs + 150;
  const joinDelayMs = merch2DelayMs + 500 + 150;

  const iconStepMs = 150;

  const iconTelegramDelayMs = joinDelayMs + 500 + 150;
  const iconInstagramDelayMs = iconTelegramDelayMs + iconStepMs;
  const iconSpotifyDelayMs = iconInstagramDelayMs + iconStepMs;
  const iconYandexDelayMs = iconSpotifyDelayMs + iconStepMs;
  const iconAppleDelayMs = iconYandexDelayMs + iconStepMs;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <Header />
      <div className={styles.content}>
        <div className={styles.text}>
          <Title
            title={title}
            stackedWords
            baseDelayMs={baseDelayMs}
            page='third'
          />
          <Subtitle
            subtitle='Присоединяйся к нашей деградации'
            delayMs={subtitleDelayMs}
          />
        </div>
        <div className={styles.merch_container}>
          <div className={styles.merch}>
            <MerchItem
              image={merch1}
              alt='Футболка Труповозка'
              delayMs={merch1DelayMs}
              active={active}
            />
            <MerchItem
              image={merch2}
              alt='Свитшот Труповозка'
              delayMs={merch2DelayMs}
              active={active}
            />
          </div>
        </div>
        <div className={styles.social_container}>
          <JoinButton
            href='https://t.me/+a0uKxz6TsexmM2Uy'
            delayMs={joinDelayMs}
            active={active}
          />
          <div className={styles.icons}>
            <Icon
              icon={telegram}
              alt='Телеграм'
              href='https://t.me/+a0uKxz6TsexmM2Uy'
              target='_blank'
              delayMs={iconTelegramDelayMs}
              active={active}
            />
            <Icon
              icon={instagram}
              alt='Инстаграм'
              href='https://www.instagram.com/kunilingist?igsh=MTdxdzdjdGxzbHhzbA%3D%3D&utm_source=qr'
              target='_blank'
              delayMs={iconInstagramDelayMs}
              active={active}
            />
            <Icon
              icon={spotify}
              alt='Spotify'
              // href='https://www.instagram.com/kunilingist?igsh=MTdxdzdjdGxzbHhzbA%3D%3D&utm_source=qr'
              target='_blank'
              delayMs={iconSpotifyDelayMs}
              active={active}
            />
            <Icon
              icon={yandex}
              alt='Yandex Music'
              // href='https://www.instagram.com/kunilingist?igsh=MTdxdzdjdGxzbHhzbA%3D%3D&utm_source=qr'
              target='_blank'
              delayMs={iconYandexDelayMs}
              active={active}
            />
            <Icon
              icon={apple}
              alt='Apple Music'
              // href='https://www.instagram.com/kunilingist?igsh=MTdxdzdjdGxzbHhzbA%3D%3D&utm_source=qr'
              target='_blank'
              delayMs={iconAppleDelayMs}
              active={active}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
