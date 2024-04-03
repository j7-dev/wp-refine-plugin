import reactLogo from '@/assets/images/react.svg'
import viteLogo from '@/assets/images/vite.svg'
import wpLogo from '@/assets/images/wp.png'
import refineLogo from '@/assets/images/refine.png'

const index = () => {
  return (
    <>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer noopener">
          <img src={reactLogo} className="logo" alt="React logo" />
        </a>
        <a
          href="https://wordpress.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={wpLogo} className="logo" alt="WordPress logo" />
        </a>
        <a href="https://refine.dev" target="_blank" rel="noreferrer noopener">
          <img src={refineLogo} className="logo" alt="Refine logo" />
        </a>
      </div>
      <h1 className="text-lg">Vite + React + WordPress + Refine</h1>
    </>
  )
}

export default index
