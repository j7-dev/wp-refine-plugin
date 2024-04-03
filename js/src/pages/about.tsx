import { Link } from 'react-router-dom'
import Banner from '@/components/Banner'

function About() {
  return (
    <div className="App py-20">
      <Banner />
      <h1>This is About Page</h1>
      <p>
        with <span className="text-red-500">hash router</span>
      </p>
      <div className="flex justify-center mb-8">
        <Link to="/">
          <button>Back to Home Page</button>
        </Link>
      </div>
      <p>
        Edit <code>src/App1.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite, React and WordPress logos to learn more
      </p>
    </div>
  )
}

export default About
