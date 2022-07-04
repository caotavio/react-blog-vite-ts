import { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'

/* whenever I want to type a normal HTML tag's properties I can extend them like
the example below and only add my custom property that in this case it's the
hasBorder property.
When we do this we can add another little hack to it... instead of putting the
normal props that we use one by one we just add them in the spread operator
and it works normally */
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props}: AvatarProps) {
  /*If the prop hasBorder is different from false that means that the component
  has border and you don't need to add anything. You only need to add if you
  want to remove the border. */
  // const hasBorder = props.hasBorder !== false

  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
    />
  );
}
