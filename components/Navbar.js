import Link from 'next/link'
import navStyles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={navStyles.navigationContainer}>
      <ul className={navStyles.listContainer}>
        <li className={navStyles.listItem}>
          <Link href='/'><a className={navStyles.listLink}>Home</a></Link>
        </li>
        <li className={navStyles.listItem}>
          <Link href='/updatedemployeeslist'><a className={navStyles.listLink}>Updated Employees</a></Link>
        </li>
        <li className={navStyles.listItem}>
          <Link href='/deletedemployeeslist'><a className={navStyles.listLink}>Deleted Employees</a></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar