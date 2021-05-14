import {EmployeesContextProvider}  from '../context/EmployeesContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <EmployeesContextProvider>
      <Component {...pageProps} />
    </EmployeesContextProvider>
  )
}

export default MyApp
