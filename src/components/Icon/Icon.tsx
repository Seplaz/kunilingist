import styles from './Icon.module.css';

type IconProps = {
  image: string;
  alt?: string;
  className?: string;
  href?: string;
  text?: string;
  target?: '_blank' | '_self';
};

export const Icon = ({
  image,
  alt = 'icon',
  className = '',
  href,
  text,
  target = '_self',
}: IconProps) => {
  const content = (
    <>
      <img src={image} alt={alt} className={styles.iconImage} />
      {text && <span className={styles.iconText}>{text}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`${styles.iconWrapper} ${className}`}
      >
        {content}
      </a>
    );
  }

  return <div className={`${styles.iconWrapper} ${className}`}>{content}</div>;
};
