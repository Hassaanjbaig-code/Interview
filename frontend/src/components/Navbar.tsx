import {
  ClockIcon,
  BriefcaseIcon,
  UserGroupIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navbar = [
    {
      id: 1,
      name: 'Dashboard',
      icon: ClockIcon,
      path: '/',
    },
    {
      id: 2,
      name: 'Organizations',
      icon: BriefcaseIcon,
      path: '/organizations',
    },
    {
      id: 3,
      name: 'Contacts',
      icon: UserGroupIcon,
      path: '/contacts',
    },
    {
      id: 4,
      name: 'Reports',
      icon: PrinterIcon,
      path: '/reports',
    },
  ];
  return (
    <nav className="bg-[#2f365f] w-64 text-white flex flex-col overflow-y-auto py-4 h-screen min-h-full p-12 shrink-0">
      <ul>
        {navbar.map((item) => (
          <li
            key={item.id}
            className="flex items-center px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <Link to={item.path} className="flex items-center w-full">
              <item.icon className="h-6 w-6 mr-4" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;