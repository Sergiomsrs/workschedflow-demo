import React, { useState } from 'react'
import { AddUSer } from '../formComponents/AddUSer';
import { AddWwh } from '../formComponents/AddWwh';
import { AddTeamWork } from '../formComponents/AddTeamWork';
import { AddPto } from '../formComponents/AddPto';
import { AddDisp } from '../formComponents/AddDisp';



export const Add = () => {


  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  let content;

  switch (activeTab) {
    case 0:
      content = <AddUSer />;
      break;
    case 1:
      content = <AddWwh />;
      break;
    case 2:
      content = <AddTeamWork />;
      break;
    case 3:
      content = <AddPto />;
      break;
      case 4:
        content = <AddDisp />;
        break;
    default:
      content = null; // o cualquier contenido predeterminado
  }

  return (
    <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-2/3 mx-auto">


<div className="border rounded-lg shadow-md overflow-x-auto p-4 ">
<div className='mb-6'>
      <ul className="flex ml-2 ">
        <li className="-mb-px mr-1 cursor-pointer">
          <a
            className={`inline-block py-2 px-4 font-semibold ${activeTab === 0 ? ' border-l border-t border-r rounded-t text-indigo-700' : 'text-indigo-400 hover:text-blue-800'}`}
   
            onClick={() => handleTabClick(0)}
          >
            User
          </a>
        </li>
        <li className="mr-1 cursor-pointer ">
          <a
            className={`inline-block py-2 px-4 font-semibold ${activeTab === 1 ? ' border-l border-t border-r rounded-t text-indigo-700' : 'text-indigo-400 hover:text-blue-800'}`}
            
            onClick={() => handleTabClick(1)}
          >
            Wwh
          </a>
        </li>
        <li className="mr-1 cursor-pointer">
          <a
            className={`inline-block py-2 px-4 font-semibold ${activeTab === 2 ? 'border-l border-t border-r rounded-t text-indigo-700' : 'text-indigo-400 hover:text-blue-800'}`}
      
            onClick={() => handleTabClick(2)}
          >
            Team Work
          </a>
        </li>
        <li className="mr-1 cursor-pointer">
          <a
            className={`inline-block py-2 px-4 font-semibold ${activeTab === 3 ? 'border-l border-t border-r rounded-t text-indigo-700' : 'text-indigo-400 hover:text-blue-800'}`}
           
            onClick={() => handleTabClick(3)}
          >
            Pto
          </a>
        </li>
        <li className="mr-1 cursor-pointer">
          <a
            className={`inline-block py-2 px-4 font-semibold ${activeTab === 4 ? 'border-l border-t border-r rounded-t text-indigo-700' : 'text-indigo-400 hover:text-blue-800'}`}
    
            onClick={() => handleTabClick(4)}
          >
            Disp
          </a>
        </li>

      </ul>

      </div>


        {content
        }

      </div>
    </div>

  )
}
