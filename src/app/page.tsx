'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [showEquipment, setShowEquipment] = useState(false);

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const toggleEquipment = () => {
    setShowEquipment((prev) => !prev);
  };

  const handleEquipmentTypeClick = (slot: string) => {
    if (slot === 'equipments') {
      router.push(`/equipments/`)
    } else {
      router.push(`/equipments/${slot}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden min-h-screen max-h-screen bg-darkBackground text-lightGray gap-6">
      <div>
        <h1 className="text-5xl font-bold" style={{ color: '#E1C12B' }}>
          OSRSdle
        </h1>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleNavigation('/quests')}
          className="px-4 py-2 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Quests
        </button>
        <button
          onClick={() => handleNavigation('/monsters')}
          className="px-4 py-2 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Monsters
        </button>
        <button
          onClick={toggleEquipment}
          className="px-4 py-2 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Equipments
        </button>
      </div>
      <div
        className={`flex flex-wrap mb-0 justify-center transition-transform duration-500 max-w-[60%] gap-4 ${
          showEquipment ? 'translate-y-0' : 'translate-y-[400%]'
        }`}
      >
        <button onClick={() => handleEquipmentTypeClick('feet')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Feet</button>
        <button onClick={() => handleEquipmentTypeClick('legs')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Legs</button>
        <button onClick={() => handleEquipmentTypeClick('hands')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Hands</button>
        <button onClick={() => handleEquipmentTypeClick('ammunition')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Ammunition</button>
        <button onClick={() => handleEquipmentTypeClick('neck')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Neck</button>
        <button onClick={() => handleEquipmentTypeClick('ring')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Ring</button>
        <button onClick={() => handleEquipmentTypeClick('two-handed')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Two-handed</button>
        <button onClick={() => handleEquipmentTypeClick('shield')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Shield</button>
        <button onClick={() => handleEquipmentTypeClick('body')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Body</button>
        <button onClick={() => handleEquipmentTypeClick('head')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Head</button>
        <button onClick={() => handleEquipmentTypeClick('weapon')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Weapon</button>
        <button onClick={() => handleEquipmentTypeClick('cape')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Cape</button>
        <button onClick={() => handleEquipmentTypeClick('equipments')} className="px-4 py-2 bg-gray-800 text-white rounded-lg">All equipments (hard)</button>     
      </div>
    </div>
  );
};

export default HomePage;
