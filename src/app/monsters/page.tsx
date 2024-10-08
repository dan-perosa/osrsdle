'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


interface Monster {
  id: number;
  image: string;
  monster_name: string;
  monster_name_color: string;
  members: string;
  members_color: string;
  combat_level: number;
  combat_level_color: string;
  combat_level_arrow: string;
  hitpoints: number;
  hitpoints_color: string;
  hitpoints_arrow: string; 
  attack_level: number;
  attack_level_color: string;
  attack_level_arrow: string;
  defence_level: number;
  defence_level_color: string;
  defence_level_arrow: string;
  magic_level: number;
  magic_level_color: string;
  magic_level_arrow: string;
  ranged_level: number;
  ranged_level_color: string;
  ranged_level_arrow: string;
  stab_defence: number;
  stab_defence_color: string;
  stab_defence_arrow: string;
  slash_defence: number;
  slash_defence_color: string;
  slash_defence_arrow: string;
  crush_defence: number;
  crush_defence_color: string;
  crush_defence_arrow: string;
  magic_defence: number;
  magic_defence_color: string;
  magic_defence_arrow: string;
  light_ranged_defence: number;
  light_ranged_defence_color: string;
  light_ranged_defence_arrow: string;
  standard_ranged_defence: number;
  standard_ranged_defence_color: string;
  standard_ranged_defence_arrow: string;
  heavy_ranged_defence: number;
  heavy_ranged_defence_color: string;
  heavy_ranged_defence_arrow: string;
}

const MonstersPage: React.FC = () => {
    const router = useRouter();
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>([]);
    const [selectedMonsters, setSelectedMonsters] = useState<Monster[]>([]);
    const [randomMonster, setRandomMonster] = useState<Monster>()
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState<true | false>(true)
    const [apiError, setApiError] = useState<true | false>(false)
    const [isVictoryPopupVisible, setIsVictoryPopupVisible] = useState(false);
  
    const fetchMonsters = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/monsters/', {
            mode: 'cors',
            method: 'GET',
          });
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomMonster = data[randomIndex];
      setRandomMonster(randomMonster)
      console.log(randomMonster)
      setMonsters(data);
    } catch (error) {
      console.error('Erro ao buscar monstros:', error);
      setApiError(true)
    } finally {
        setLoading(false)
    }
  };
  
    useEffect(() => {
      fetchMonsters();
    }, []);  
  
    useEffect(() => {
      if (userInput === '') {
        setFilteredMonsters([]);
        return;
      }
  
      const lowercasedInput = userInput.toLowerCase();
      const filtered = monsters.filter(monster =>
        monster.monster_name.toLowerCase().includes(lowercasedInput)
      );
  
      setFilteredMonsters(filtered);
    }, [userInput]);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUserInput(e.target.value);
    };

    const handleMonsterSelect = async (monster: Monster) => {
      const monsterToAdd = await findSelectedMonsterColorsAndArrows(monster)
      setSelectedMonsters(prevMonsters => [...prevMonsters, monsterToAdd]);
      setUserInput('')
      setMonsters(prevMonsters => prevMonsters.filter(m => m.id !== monster.id));
      setFilteredMonsters([]);
      // checks win
      if (randomMonster) {
        if (randomMonster.id === monster.id) {
          setIsVictoryPopupVisible(true)
        }
      }
    };

    const red = 'py-2 border-b border-gray-600 text-center bg-red-500'
    const green = 'py-2 border-b border-gray-600 text-center bg-green-500'
    const orange = 'py-2 border-b border-gray-600 text-center bg-orange-500'

    const findSelectedMonsterColorsAndArrows = (monster: Monster) => {

        let monsterNameColorToReturn = (monster?.monster_name === randomMonster?.monster_name) ? green : red
        let membersColorToReturn = (monster?.members === randomMonster?.members) ? green : red
        let combatLevelColorToReturn = (monster?.combat_level === randomMonster?.combat_level) ? green : red
        let hitpointsColorToReturn = (monster?.hitpoints === randomMonster?.hitpoints) ? green : red
        let attackLevelColorToReturn = (monster?.attack_level === randomMonster?.attack_level) ? green : red
        let defenceLevelColorToReturn = (monster?.defence_level === randomMonster?.defence_level) ? green : red
        let magicLevelColorToReturn = (monster?.magic_level === randomMonster?.magic_level) ? green : red
        let rangedLevelColorToReturn = (monster?.ranged_level === randomMonster?.ranged_level) ? green : red
        let stabDefenceColorToReturn = (monster?.stab_defence === randomMonster?.stab_defence) ? green : red
        let slashDefenceColorToReturn = (monster?.slash_defence === randomMonster?.slash_defence) ? green : red
        let crushDefenceColorToReturn = (monster?.crush_defence === randomMonster?.crush_defence) ? green : red
        let magicDefenceColorToReturn = (monster?.magic_defence === randomMonster?.magic_defence) ? green : red
        let lightRangedDefenceColorToReturn = (monster?.light_ranged_defence === randomMonster?.light_ranged_defence) ? green : red
        let standardRangedDefenceColorToReturn = (monster?.standard_ranged_defence === randomMonster?.standard_ranged_defence) ? green : red
        let heavyRangedDefenceColorToReturn = (monster?.heavy_ranged_defence === randomMonster?.heavy_ranged_defence) ? green : red
        
        const monsterNameWords = monster.monster_name.split('(')[0]
        const onlyMonsterNameWords = monsterNameWords.split(' ').filter(m => m !== '')
        onlyMonsterNameWords.map(word => {
            if (randomMonster && randomMonster.monster_name.includes(word) && monsterNameColorToReturn === red) {
                monsterNameColorToReturn = orange
            }
        })
        
      let combatLevelArrowToReturn = monster.combat_level > (randomMonster?.combat_level || 0) ? '↓' : monster.combat_level < (randomMonster?.combat_level || 0) ? '↑' : '';
      let hitpointsArrowToReturn = monster.hitpoints > (randomMonster?.hitpoints || 0) ? '↓' : monster.hitpoints < (randomMonster?.hitpoints || 0) ? '↑' : '';
      let attackLevelArrowToReturn = monster.attack_level > (randomMonster?.attack_level || 0) ? '↓' : monster.attack_level < (randomMonster?.attack_level || 0) ? '↑' : '';
      let defenceLevelArrowToReturn = monster.defence_level > (randomMonster?.defence_level || 0) ? '↓' : monster.defence_level < (randomMonster?.defence_level || 0) ? '↑' : '';
      let magicLevelArrowToReturn = monster.magic_level > (randomMonster?.magic_level || 0) ? '↓' : monster.magic_level < (randomMonster?.magic_level || 0) ? '↑' : '';
      let rangedLevelArrowToReturn = monster.ranged_level > (randomMonster?.ranged_level || 0) ? '↓' : monster.ranged_level < (randomMonster?.ranged_level || 0) ? '↑' : '';
      let stabDefenceArrowToReturn = monster.stab_defence > (randomMonster?.stab_defence || 0) ? '↓' : monster.stab_defence < (randomMonster?.stab_defence || 0) ? '↑' : '';
      let slashDefenceArrowToReturn = monster.slash_defence > (randomMonster?.slash_defence || 0) ? '↓' : monster.slash_defence < (randomMonster?.slash_defence || 0) ? '↑' : '';
      let crushDefenceArrowToReturn = monster.crush_defence > (randomMonster?.crush_defence || 0) ? '↓' : monster.crush_defence < (randomMonster?.crush_defence || 0) ? '↑' : '';
      let magicDefenceArrowToReturn = monster.magic_defence > (randomMonster?.magic_defence || 0) ? '↓' : monster.magic_defence < (randomMonster?.magic_defence || 0) ? '↑' : '';
      let lightRangedDefenceArrowToReturn = monster.light_ranged_defence > (randomMonster?.light_ranged_defence || 0) ? '↓' : monster.light_ranged_defence < (randomMonster?.light_ranged_defence || 0) ? '↑' : '';
      let standardRangedDefenceArrowToReturn = monster.standard_ranged_defence > (randomMonster?.standard_ranged_defence || 0) ? '↓' : monster.standard_ranged_defence < (randomMonster?.standard_ranged_defence || 0) ? '↑' : '';
      let heavyRangedDefenceArrowToReturn = monster.heavy_ranged_defence > (randomMonster?.heavy_ranged_defence || 0) ? '↓' : monster.heavy_ranged_defence < (randomMonster?.heavy_ranged_defence || 0) ? '↑' : '';
      
      const MonsterDataToReturn: Monster = {
        id: monster.id,
        image: monster.image,
        monster_name: monster.monster_name,
        monster_name_color: monsterNameColorToReturn,
        members: monster.members,
        members_color: membersColorToReturn,
        combat_level: monster.combat_level,
        combat_level_color: combatLevelColorToReturn,
        combat_level_arrow: combatLevelArrowToReturn,
        hitpoints: monster.hitpoints,
        hitpoints_color: hitpointsColorToReturn,
        hitpoints_arrow: hitpointsArrowToReturn,
        attack_level: monster.attack_level,
        attack_level_color: attackLevelColorToReturn,
        attack_level_arrow: attackLevelArrowToReturn,
        defence_level: monster.defence_level,
        defence_level_color: defenceLevelColorToReturn,
        defence_level_arrow: defenceLevelArrowToReturn,
        magic_level: monster.magic_level,
        magic_level_color: magicLevelColorToReturn,
        magic_level_arrow: magicLevelArrowToReturn,
        ranged_level: monster.ranged_level,
        ranged_level_color: rangedLevelColorToReturn,
        ranged_level_arrow: rangedLevelArrowToReturn,
        stab_defence: monster.stab_defence,
        stab_defence_color: stabDefenceColorToReturn,
        stab_defence_arrow: stabDefenceArrowToReturn,
        slash_defence: monster.slash_defence,
        slash_defence_color: slashDefenceColorToReturn,
        slash_defence_arrow: slashDefenceArrowToReturn,
        crush_defence: monster.crush_defence,
        crush_defence_color: crushDefenceColorToReturn,
        crush_defence_arrow: crushDefenceArrowToReturn,
        magic_defence: monster.magic_defence,
        magic_defence_color: magicDefenceColorToReturn,
        magic_defence_arrow: magicDefenceArrowToReturn,
        light_ranged_defence: monster.light_ranged_defence,
        light_ranged_defence_color: lightRangedDefenceColorToReturn,
        light_ranged_defence_arrow: lightRangedDefenceArrowToReturn,
        standard_ranged_defence: monster.standard_ranged_defence,
        standard_ranged_defence_color: standardRangedDefenceColorToReturn,
        standard_ranged_defence_arrow: standardRangedDefenceArrowToReturn,
        heavy_ranged_defence: monster.heavy_ranged_defence,
        heavy_ranged_defence_color: heavyRangedDefenceColorToReturn,
        heavy_ranged_defence_arrow: heavyRangedDefenceArrowToReturn,
      }
      return MonsterDataToReturn
    }
  
    if (loading) {
      return <div className="w-screen h-screen bg-darkBackground text-white flex items-center justify-center">Loading...</div>;
    }
  
    if (apiError) {
      return <div className="w-screen h-screen bg-darkBackground text-white flex items-center justify-center">API Error</div>;
    }
    
    return (
      <div className="flex flex-col items-center min-h-screen bg-darkBackground text-lightGray p-6 w-full">
        <div className='flex flex-col items-center justify-center w-full '>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#E1C12B' }}>
            Monsters
          </h1>
          <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="mb-4 px-4 py-2 border rounded-lg bg-gray-800 text-lightGray focus:outline-none"
              placeholder="Guess the monster name"
            />
        </div>
        {filteredMonsters.length > 0 && (
        <div className="bg-gray-700 rounded-lg w-full max-w-md shadow-lg mb-4 max-h-[120px] overflow-auto z-10">
            <ul>
              {filteredMonsters.map(monster => (
                <li
                  key={monster.id}
                  onClick={() => handleMonsterSelect(monster)}
                  className="cursor-pointer hover:bg-gray-600 p-2"
                >
                  {monster.monster_name}
                </li>
              ))}
            </ul>
        </div>
        )}
        {selectedMonsters.length > 0 && (
        <div className="fixed flex flex-col items-center w-full top-40 z-0">
          <div className="overflow-auto max-h-96 w-[85%]">
            <table className="bg-gray-800 text-lightGray border border-hidden table-auto w-full">
              <thead className='sticky top-0 bg-gray-800 border-hidden text-sm'>
                <tr>
                  <th className="py-2 border-b border-gray-600">Image</th>
                  <th className="py-2 border-b border-gray-600">Name</th>
                  <th className="py-2 border-b border-gray-600">Members</th>
                  <th className="py-2 border-b border-gray-600">Combat Level</th>
                  <th className="py-2 border-b border-gray-600">Hitpoints</th>
                  <th className="py-2 border-b border-gray-600">Attack Level</th>
                  <th className="py-2 border-b border-gray-600">Defence Level</th>
                  <th className="py-2 border-b border-gray-600">Magic Level</th>
                  <th className="py-2 border-b border-gray-600">Ranged Level</th>
                  <th className="py-2 border-b border-gray-600">Stab Defence</th>
                  <th className="py-2 border-b border-gray-600">Slash Defence</th>
                  <th className="py-2 border-b border-gray-600">Crush Defence</th>
                  <th className="py-2 border-b border-gray-600">Magic Defence</th>
                  <th className="py-2 border-b border-gray-600">Light Ranged Defence</th>
                  <th className="py-2 border-b border-gray-600">Standard Ranged Defence</th>
                  <th className="py-2 border-b border-gray-600">Heavy Ranged Defence</th>
                </tr>
              </thead>
              <tbody>
                {selectedMonsters && selectedMonsters.toReversed().map(monster => (
                  <tr key={monster.id} className="divide-x-2">
                    <td>
                      <div className='flex item-center justify-center h-full w-full'>
                        <img src={monster.image} alt="" />
                      </div>
                    </td>
                    <td className={monster.monster_name_color}>{monster.monster_name}</td>
                    <td className={monster.members_color}>{monster.members}</td>
                    <td className={monster.combat_level_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.combat_level_arrow}</div>
                        <div>{monster.combat_level}</div>
                        <div>{monster.combat_level_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.hitpoints_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.hitpoints_arrow}</div>
                        <div>{monster.hitpoints}</div>
                        <div>{monster.hitpoints_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.attack_level_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.attack_level_arrow}</div>
                        <div>{monster.attack_level}</div>
                        <div>{monster.attack_level_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.defence_level_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.defence_level_arrow}</div>
                        <div>{monster.defence_level}</div>
                        <div>{monster.defence_level_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.magic_level_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.magic_level_arrow}</div>
                        <div>{monster.magic_level}</div>
                        <div>{monster.magic_level_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.ranged_level_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.ranged_level_arrow}</div>
                        <div>{monster.ranged_level}</div>
                        <div>{monster.ranged_level_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.stab_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.stab_defence_arrow}</div>
                        <div>{monster.stab_defence}</div>
                        <div>{monster.stab_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.slash_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.slash_defence_arrow}</div>
                        <div>{monster.slash_defence}</div>
                        <div>{monster.slash_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.crush_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.crush_defence_arrow}</div>
                        <div>{monster.crush_defence}</div>
                        <div>{monster.crush_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.magic_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.magic_defence_arrow}</div>
                        <div>{monster.magic_defence}</div>
                        <div>{monster.magic_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.light_ranged_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.light_ranged_defence_arrow}</div>
                        <div>{monster.light_ranged_defence}</div>
                        <div>{monster.light_ranged_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.standard_ranged_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.standard_ranged_defence_arrow}</div>
                        <div>{monster.standard_ranged_defence}</div>
                        <div>{monster.standard_ranged_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={monster.heavy_ranged_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{monster.heavy_ranged_defence_arrow}</div>
                        <div>{monster.heavy_ranged_defence}</div>
                        <div>{monster.heavy_ranged_defence_arrow}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
        {isVictoryPopupVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-lightGray mb-4">
              Congratulations!
            </h2>
            <p className="text-lg text-lightGray">
              You've guessed the monster correctly!
            </p>
            <p className="text-lg text-lightGray">
              The monster was {randomMonster?.monster_name}
            </p>
            <button
              onClick={() => router.push('/equipments')}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      )}
        <div className='fixed bottom-4'>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Back
          </button>
        </div>
      </div>
    );
  };
  
  export default MonstersPage;