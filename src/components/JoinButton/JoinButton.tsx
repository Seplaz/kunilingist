import styles from './JoinButton.module.css';

type Props = {
  href: string;
  label?: string;
};

export const JoinButton = ({ href, label = 'Присоединиться' }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btn}
    >
      {label}
    </a>
  );
};
