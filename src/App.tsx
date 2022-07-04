import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Post } from './components/Post/Post';

import styles from './App.module.css'
import './global.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'http://github.com/caotavio.png',
      name: 'Otavio Carvalho',
      role: 'Software Developer @TheBIOAgency'
    },
    content: [
      { type: 'paragraph', content: 'Speak Dev Bruv!' },
      { type: 'paragraph', content: 'I just published some cool stuff.' },
      { type: 'link', content: 'tav.thedev/articles/7' }
    ],
    publishedAt: new Date('2022-06-26 12:30:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'http://github.com/pabloharger.png',
      name: 'Pablo Harger',
      role: 'VP @Havan'
    },
    content: [
      { type: 'paragraph', content: 'Speak Dev!' },
      { type: 'paragraph', content: 'I just published some hot stuff.' },
      { type: 'link', content: 'blito.harger/articles/11' }
    ],
    publishedAt: new Date('2022-05-20 08:00:00')
  },
]

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}

export default App
