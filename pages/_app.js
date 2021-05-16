import Layout from '../components/Layout'
import '../styles/globals.css'
import { EmployeesContextProvider } from '../components//EmployeesContext'

function MyApp({ Component, pageProps }) {
  
  return (
    <EmployeesContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EmployeesContextProvider>
  )
}

export default MyApp