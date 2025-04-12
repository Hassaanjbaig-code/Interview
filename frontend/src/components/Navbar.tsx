import { Link, useLocation } from 'react-router-dom';
import { MdOutlineSpaceDashboard, MdOutlineContactMail  } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";

const Navbar = () => {
  const location = useLocation();
  const navbar = [
    {
      id: 1,
      name: 'Dashboard',
      icon: MdOutlineSpaceDashboard ,
      path: '/',
    },
    {
      id: 2,
      name: 'Organizations',
      icon: GoOrganization,
      path: '/organizations',
    },
    {
      id: 3,
      name: 'Contacts',
      icon: MdOutlineContactMail ,
      path: '/contacts',
    },
    {
      id: 4,
      name: 'Reports',
      icon: HiOutlineDocumentReport,
      path: '/reports',
    },
  ];
  return (
    <nav className="hidden w-56 shrink-0 overflow-y-auto bg-[#2f365f] md:block px-4 py-12">
      <ul>
        {navbar.map((item) => (
          <li
            key={item.id}
            className={`flex items-center px-6 py-3 ${
              location.pathname === item.path ? 'text-white' : 'text-gray-400'
            } hover:text-white transition-colors duration-200`}
          >
            <Link to={item.path} className="flex items-center w-full">
              <item.icon className="mr-4 text-xl" />
              {/* <HiOutlineDocumentReport /> */}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
