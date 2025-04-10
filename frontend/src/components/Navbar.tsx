import {
    ClockIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    PrinterIcon,
  } from '@heroicons/react/24/outline';
  
  const Navbar = () => {
    const navbar = [
      {
        id: 1,
        name: 'Dashboard',
        icon: ClockIcon,
      },
      {
        id: 2,
        name: 'Organizations',
        icon: BuildingOfficeIcon,
      },
      {
        id: 3, 
        name: 'Contacts',
        icon: UserGroupIcon,
      },
      {
        id: 4,
        name: 'Reports',
        icon: PrinterIcon,
      },
    ];
    return (
      <nav className="bg-[#2f365f] w-64 text-white flex flex-col overflow-y-auto py-4 h-screen p-12 shrink-0">
        {navbar.map((item) => (
          <div
            key={item.id}
            className="flex items-center px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <item.icon className="h-5 w-5 mr-3" />
            <a href="/" className="text-sm font-medium">
              {item.name}
            </a>
          </div>
        ))}
      </nav>
    );
  };
  
  export default Navbar;