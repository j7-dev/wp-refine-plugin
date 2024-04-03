import { useState } from 'react'
import GetPostsPage from '@/pages/getPosts'
import { Link } from 'react-router-dom'
import Banner from '@/components/Banner'

function DefaultPage() {
  const [
    count,
    setCount,
  ] = useState(0)
  const [
    showPosts,
    setShowPosts,
  ] = useState(false)

  return (
    <div className="App py-20">
      <Banner />

      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={() => setCount((theCount) => theCount + 1)}
        >
          Count is {count}
        </button>

        <button type="button" onClick={() => setShowPosts(!showPosts)}>
          Get Posts Example
        </button>

        <Link to="/about">
          <button>Go to About Page</button>
        </Link>
      </div>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite, React and WordPress logos to learn more
      </p>

      {showPosts && <GetPostsPage />}
    </div>
  )
}

export default DefaultPage
