import { Link } from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/updatedemployeeslist'>Updated Employees</Link>
        </li>
        <li>
          <Link href='/deletedemployeeslist'>Deleted Employees</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;