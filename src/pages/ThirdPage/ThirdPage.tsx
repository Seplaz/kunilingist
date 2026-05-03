import styles from './ThirdPage.module.css';
import { Header } from '../../components/Header/Header';
import { Title } from '../../components/Title/Title';
import { Subtitle } from '../../components/Subtitle/Subtitle';
import { Footer } from '../../components/Footer/Footer';
import { MerchItem } from '../../components/MerchItem/MerchItem';
import { JoinButton } from '../../components/JoinButton/JoinButton';
import merch1 from '/images/merch1.png';
import merch2 from '/images/merch2.png';

type Props = { active: boolean };

export const ThirdPage = ({ active }: Props) => {
  const baseDelayMs = 200;
  const title = 'МЕРЧ И СООБЩЕСТВО';
  const wordsCount = title.trim().split(/\s+/).filter(Boolean).length;
  const subtitleDelayMs = baseDelayMs + (wordsCount - 1) * 250 + 250;

  return (
    <div className={styles.page} data-active={active ? 'true' : 'false'}>
      <Header />
      <div className={styles.content}>
        <Title title={title} stackedWords baseDelayMs={baseDelayMs} page="third" />
        <Subtitle subtitle="Присоединяйся к нашей деградации" delayMs={subtitleDelayMs} />
        <div className={styles.merch}>
          <MerchItem image={merch1} alt="Футболка Труповозка" />
          <MerchItem image={merch2} alt="Свитшот Труповозка" />
        </div>
        <JoinButton href="https://t.me/+a0uKxz6TsexmM2Uy" />
      </div>
      <Footer />
    </div>
  );
};
