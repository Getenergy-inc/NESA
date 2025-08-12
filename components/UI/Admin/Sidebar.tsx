
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Sidebar = ({ selected, setSelected }: any) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const navItems = [
    { name: 'Dashboard' },
    { name: 'Nomination' },
    { name: 'Voting' },
    { name: 'Sponsorship' },
    { name: 'Categories' },
    { name: 'Ambassadors' },
    { name: 'Volunteers' },
    {
      name: 'Judges',
      subItems: ['Judges', 'Applications', 'Nominations']
    },
    { name: 'Merchandise Sale' },
    { name: 'Website' },
  ];

  return (
    <div className="w-64 pt-20 bg-black text-white h-screen py-6 px-4 space-y-2">
      
      {navItems.map((item) => (
        <div key={item.name}>
          <div
            className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${selected === item.name ? 'bg-[#FFF8EB] text-black border-r-4 border-r-[#F5A300]' : 'hover:bg-yellow-800'}`}
            onClick={() => item.subItems ? toggleMenu(item.name) : setSelected(item.name)}
          >
            <span>{item.name}</span>
            {item.subItems && (
              openMenus[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            )}
          </div>
          {item.subItems && openMenus[item.name] && (
            <div className="pl-6">
              {item.subItems.map((sub) => (
                <div
                  key={sub}
                  onClick={() => setSelected(`${item.name}/${sub}`)}
                  className={`py-1 pl-2 cursor-pointer rounded ${selected === `${item.name}/${sub}` ? 'text-yellow-300 font-semibold' : 'text-gray-400 hover:text-white'}`}
                >
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;