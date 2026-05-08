import styles from './Icon.module.css';

type CSSVars = React.CSSProperties & {
  ['--icon-delay']?: string;
};

type IconProps = {
  icon?: string;
  alt?: string;
  className?: string;
  href?: string;
  text?: string;
  target?: '_blank' | '_self';
  delayMs?: number;
  active?: boolean;
};

export const Icon = ({
  icon,
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
      {icon && (
        <img
          src={icon}
          alt={alt}
          className={styles.iconImage}
          draggable={false}
        />
      )}
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
    <div className={rootClassName} style={rootStyle} data-active={dataActive}>
      {content}
    </div>
  );
};
