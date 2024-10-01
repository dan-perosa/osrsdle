'use client'

import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBackground text-lightGray">
      <h1 className="text-5xl font-bold mb-8" style={{ color: '#E1C12B' }}>
        xx
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={() => handleNavigation('/quests')}
          className="px-6 py-3 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Quests
        </button>
        <button
          onClick={() => handleNavigation('/monsters')}
          className="px-6 py-3 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Monsters
        </button>
        <button
          onClick={() => handleNavigation('/equipments')}
          className="px-6 py-3 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
        >
          Equipments
        </button>
      </div>
    </div>
  );
};

export default HomePage;
