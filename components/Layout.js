import Navbar from './Navbar'
// import Meta from './Meta'
// import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <>
      {/* <Meta /> */}
      <Navbar />
        <main >
          {children}
        </main>
    </>
  )
}

export default Layout