import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import enCA from 'date-fns/locale/en-CA'

import { Avatar } from '../Avatar/Avatar'
import { Comment } from '../Comment/Comment'
import styles from './Post.module.css'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  //EXAMPLE OF INTL USE FOR DATE FORMATTING
  /*
  const publishedDateFormatted = new Intl.DateFormat('en-CA', {
    minute: '2-digit',
    hour: '2-digit',
    day: '2-digit',
    month: 'long',
  }).format(publishedAt);
  */

  const [comments, setComments] = useState(["Now that is a nice comment"]);
  const [newComment, setNewComment] = useState('')

  //DATE FORMATTING WITH DATE-FNS PACKAGE
  const publishedDateFormatted = format(publishedAt , "LLLL d 'at' HH:mm'h'", {
    locale: enCA,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: enCA,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newComment])
    setNewComment('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    //if you use he setCustomValidity and don't set this back to empty, if the
    //"required" error fires and the user starts typing it will keep giving the
    // error.
    event.target.setCustomValidity('')
    setNewComment(event.target.value)
  }

  function handleInvalidNewComment(event: InvalidEvent<HTMLTextAreaElement>) {
    //only if you want a custom message on a required field error
    event.target.setCustomValidity('Please write something =)')
  }

  function deleteComment(commentToDelete: string) {
    const commentListAfterDeletion = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentListAfterDeletion);
  }

  const isNewCommentEmpty = newComment.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <strong>{author.role}</strong>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong> Leave your feedback</strong>

        <textarea
          name="comment"
          placeholder="Leave a comment"
          value={newComment}
          onChange={handleNewCommentChange}
          onInvalid={handleInvalidNewComment}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Comment
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
        })}
      </div>
    </article>
  )
}