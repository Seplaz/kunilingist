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

type Props = { active: boolean };

export const ThirdPage = ({ active }: Props) => {
  const baseDelayMs = 200;
  const title = 'МЕРЧ И СООБЩЕСТВО';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;
  const subtitleDelayMs = baseDelayMs + (wordsCount - 1) * 250 + 250;
  const merch1DelayMs = subtitleDelayMs + 500 + 250;
  const merch2DelayMs = merch1DelayMs + 150;
  const joinDelayMs = merch2DelayMs + 500 + 150;
  const iconTelegramDelayMs = joinDelayMs + 500 + 150;
  const iconInstagramDelayMs = iconTelegramDelayMs + 150;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <Header />
      <div className={styles.content}>
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
        <JoinButton
          href='https://t.me/+a0uKxz6TsexmM2Uy'
          delayMs={joinDelayMs}
          active={active}
        />
        <div className={styles.icons}>
          <Icon
            text='Telegram'
            image={telegram}
            alt='Телеграм'
            href='https://t.me/+a0uKxz6TsexmM2Uy'
            target='_blank'
            delayMs={iconTelegramDelayMs}
            active={active}
          />
          <Icon
            text='Instagram'
            image={instagram}
            alt='Инстаграм'
            href='https://www.instagram.com/kunilingist?igsh=MTdxdzdjdGxzbHhzbA%3D%3D&utm_source=qr'
            target='_blank'
            delayMs={iconInstagramDelayMs}
            active={active}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
