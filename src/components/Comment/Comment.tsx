import { useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'
import { Avatar } from '../Avatar/Avatar'
import styles from './Comment.module.css'

interface CommentProps {
  content: string;
  onDeleteComment: (commentToDelete: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likesCount, setLikesCount] = useState(0)

  function handleDeleteComment() {
    onDeleteComment(content)
  }

  function handleLikes() {
    // setLikesCount(likesCount + 1) you can do it like this but the best practices are:
    setLikesCount((state) => {
      return state + 1;
    })
  }

  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="http://github.com/caotavio.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Otavio Carvalho</strong>
              <time title="June 11th at 08:11h" dateTime="2022-06-08">About 1 hour ago</time>
            </div>

            <button onClick={handleDeleteComment} title="Delete comment">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button title="Applaud" onClick={handleLikes}>
            <ThumbsUp />
            Applaud <span>{likesCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}