import styles from './Icon.module.css';

type CSSVars = React.CSSProperties & {
  ['--icon-delay']?: string;
};

type IconProps = {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  image?: string;
  alt?: string;
  className?: string;
  href?: string;
  text?: string;
  target?: '_blank' | '_self';
  delayMs?: number;
  active?: boolean;
};

export const Icon = ({
  icon: SvgIcon,
  image,
  alt = 'icon',
  className = '',
  href,
  text,
  target = '_self',
  delayMs = 0,
  active = false,
}: IconProps) => {
  const rootClassName = `${styles.iconWrapper} ${className}`.trim();
  const rootStyle = {
    '--icon-delay': `${delayMs}ms`,
  } as CSSVars;
  const dataActive = active ? 'true' : 'false';

  const content = (
    <>
      {SvgIcon ? (
        <SvgIcon className={styles.iconSvg} aria-hidden={text ? true : undefined} />
      ) : image ? (
        <img src={image} alt={alt} className={styles.iconImage} />
      ) : null}
      {text && <span className={styles.iconText}>{text}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        aria-label={text ?? alt}
        className={rootClassName}
        style={rootStyle}
        data-active={dataActive}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={rootClassName}
      style={rootStyle}
      data-active={dataActive}
    >
      {content}
    </div>
  );
};
