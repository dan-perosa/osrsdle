'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleVictory } from '../../utils/handleVictory'
import { checkExistingVictory } from '../../utils/checkExistingVictory'


interface Equipment {
  id: number;
  image: string;
  equipment_name: string;
  equipment_name_color: string;
  members: string;
  members_color: string;
  stab_attack: number;
  stab_attack_color: string;
  stab_attack_arrow: string;
  slash_attack: number;
  slash_attack_color: string;
  slash_attack_arrow: string;
  crush_attack: number;
  crush_attack_color: string;
  crush_attack_arrow: string;
  magic_attack: number;
  magic_attack_color: string;
  magic_attack_arrow: string;
  ranged_attack: number;
  ranged_attack_color: string;
  ranged_attack_arrow: string;
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
  ranged_defence: number;
  ranged_defence_color: string;
  ranged_defence_arrow: string;
  strength: number;
  strength_color: string;
  strength_arrow: string;
  ranged_strength: number;
  ranged_strength_color: string;
  ranged_strength_arrow: string;
  magic_damage: string;
  magic_damage_color: string;
  magic_damage_arrow: string;
  prayer: number;
  prayer_color: string;
  prayer_arrow: string;
  weight: number;
  weight_color: string;
  weight_arrow: string;
}

const EquipmentsPage: React.FC = () => {
    const router = useRouter();
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
    const [selectedEquipments, setSelectedEquipments] = useState<Equipment[]>([]);
    const [randomEquipment, setRandomEquipment] = useState<Equipment>()
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState<true | false>(true)
    const [apiError, setApiError] = useState<true | false>(false)
    const [isVictoryPopupVisible, setIsVictoryPopupVisible] = useState(false);
    const [firstHint, setFirstHint] = useState<string | null>(null)
    const [isFirstHintPopupVisible, setIsFirstHintPopupVisible] = useState<true | false>(false)
    const [firstHintButtonVisible, setFirstHintButtonVisible] = useState<true | false>(false)
    const [secondHint, setSecondHint] = useState<string | null>(null)
    const [secondHintButtonVisible, setSecondHintButtonVisible] = useState<true | false>(false) 
    const [isSecondHintPopupVisible, setIsSecondHintPopupVisible] = useState<true | false>(false)
    const [thirdHint, setThirdHint] = useState<string | null>(null)
    const [thirdHintButtonVisible, setThirdHintButtonVisible] = useState<true | false>(false) 
    const [isThirdHintPopupVisible, setIsThirdHintPopupVisible] = useState<true | false>(false)
    const [jwtToken, setJwtToken] = useState<string>('')
  
    const fetchEquipments = async () => {
      try {
      const response = await fetch('http://127.0.0.1:5000/equipments/body', {
            mode: 'cors',
            method: 'GET',
          });
      const data = await response.json();
      setEquipments(data);

      const response2 = await fetch('http://127.0.0.1:5000/daily_body_equipment/', {
            mode: 'cors',
            method: 'GET',
          });
      const data2 = await response2.json();
      setRandomEquipment(data2)
      console.log(data2)
      const token = localStorage.getItem('token')
      if (token) {
        const selectedList = await checkExistingVictory(token, 'body')
        console.log(selectedList)
        if (selectedList === '' || selectedList === undefined) {
          return
        }
        setIsVictoryPopupVisible(true)
        typeof selectedList === 'object' && setSelectedEquipments(selectedList)
      }
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
      setApiError(true)
    } finally {
      setLoading(false)
    }
  };
  
    useEffect(() => {
      const token = localStorage.getItem('token')
      token && setJwtToken(token)
      fetchEquipments();
    }, []);  
  
    useEffect(() => {
      if (userInput === '') {
        setFilteredEquipments([]);
        return;
      }
  
      const lowercasedInput = userInput.toLowerCase();
      const filtered = equipments.filter(equipment =>
        equipment.equipment_name.toLowerCase().includes(lowercasedInput)
      );
  
      setFilteredEquipments(filtered);
    }, [userInput]);
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setUserInput(e.target.value);
    };

    const handleEquipmentSelect = async (equipment: Equipment) => {
      const equipmentToAdd = findSelectedEquipmentColorsAndArrows(equipment)
      setSelectedEquipments(prevEquipments => [...prevEquipments, equipmentToAdd]);
      setUserInput('')
      setEquipments(prevEquipments => prevEquipments.filter(m => m.id !== equipment.id));
      setFilteredEquipments([]);
      // checks win
    if (randomEquipment && randomEquipment.id === equipment.id) {
        setIsVictoryPopupVisible(true)
        if (jwtToken !== '') {
          const arrayToPassToApi = [...selectedEquipments]
          arrayToPassToApi.push(equipmentToAdd)
          await handleVictory(arrayToPassToApi, jwtToken, 'body')
        }
    }
    // checks hints
    else if (selectedEquipments.length > 10 && selectedEquipments.length < 20) {
      setFirstHintButtonVisible(true)
    }

    else if (selectedEquipments.length >= 20 && selectedEquipments.length < 30) {
      setSecondHintButtonVisible(true)
    }

    else if (selectedEquipments.length >= 30) {
      setThirdHintButtonVisible(true)
    }
    };

    const getFirstHint = () => {
      const twoFirstLetters = randomEquipment && randomEquipment?.equipment_name[0] + randomEquipment?.equipment_name[1]
      const formatedFirstHint = `The first two letters of the equipment name are '${twoFirstLetters}'`
      setFirstHint(formatedFirstHint)
      setIsFirstHintPopupVisible(true)
    }

    const getSecondHint = () => {
      const equipmentNameWordsSplited = randomEquipment?.equipment_name.split(' ')
      const numberOfLettersInWords = equipmentNameWordsSplited && equipmentNameWordsSplited.map(word => word.length).join(', ')
      const formatedSecondHint = `The equipment name has ${equipmentNameWordsSplited?.length} words with ${numberOfLettersInWords} letters respectively`
      setSecondHint(formatedSecondHint)
      setIsSecondHintPopupVisible(true)
    }

    const getThirdHint = () => {
      let formatedThirdHint = ''
      if (randomEquipment?.equipment_name.includes('(')) {
        const splitedFirstParenthesis = randomEquipment.equipment_name.split('(', 2)[1]
        const splitedSecondParenthesis = splitedFirstParenthesis.split(')', 2)[0]
        formatedThirdHint = `The equipment name includes () and the first parenthesis contains "${splitedSecondParenthesis}"`
      } else {
        const equipmentNameArray = randomEquipment?.equipment_name.split(' ') 
        const lastEquipmentNameWord = equipmentNameArray && equipmentNameArray[equipmentNameArray.length - 1]
        formatedThirdHint = `The equipment name does not include () and the last word is ${lastEquipmentNameWord}`
      }
      setThirdHint(formatedThirdHint)
      setIsThirdHintPopupVisible(true)
    }

    const red = 'py-2 border-b border-gray-600 text-center bg-red-500'
    const green = 'py-2 border-b border-gray-600 text-center bg-green-500'
    const orange = 'py-2 border-b border-gray-600 text-center bg-orange-500'

    const findSelectedEquipmentColorsAndArrows = (equipment: Equipment) => {

        let equipmentNameColorToReturn = (equipment?.equipment_name === randomEquipment?.equipment_name) ? green : red
        let membersColorToReturn = (equipment?.members === randomEquipment?.members) ? green : red
        let stabAttackColorToReturn = (equipment?.stab_attack === randomEquipment?.stab_attack) ? green : red
        let slashAttackColorToReturn = (equipment?.slash_attack === randomEquipment?.slash_attack) ? green : red
        let crushAttackColorToReturn = (equipment?.crush_attack === randomEquipment?.crush_attack) ? green : red
        let magicAttackColorToReturn = (equipment?.magic_attack === randomEquipment?.magic_attack) ? green : red
        let rangedAttackColorToReturn = (equipment?.ranged_attack === randomEquipment?.ranged_attack) ? green : red
        let stabDefenceColorToReturn = (equipment?.stab_defence === randomEquipment?.stab_defence) ? green : red
        let slashDefenceColorToReturn = (equipment?.slash_defence === randomEquipment?.slash_defence) ? green : red
        let crushDefenceColorToReturn = (equipment?.crush_defence === randomEquipment?.crush_defence) ? green : red
        let magicDefenceColorToReturn = (equipment?.magic_defence === randomEquipment?.magic_defence) ? green : red
        let rangedDefenceColorToReturn = (equipment?.ranged_defence === randomEquipment?.ranged_defence) ? green : red
        let strengthColorToReturn = (equipment?.strength === randomEquipment?.strength) ? green : red
        let rangedStrengthColorToReturn = (equipment?.ranged_strength === randomEquipment?.ranged_strength) ? green : red
        let magicDamageColorToReturn = (equipment?.magic_damage === randomEquipment?.magic_damage) ? green : red
        let prayerColorToReturn = (equipment?.prayer === randomEquipment?.prayer) ? green : red
        let weightColorToReturn = (equipment?.weight === randomEquipment?.weight) ? green : red
        
        const equipmentNameWords = equipment.equipment_name.split('(')[0]
        const onlyEquipmentNameWords = equipmentNameWords.split(' ').filter(m => m !== '')
        onlyEquipmentNameWords.map(word => {
            if (randomEquipment && randomEquipment.equipment_name.toLowerCase().includes(word.toLowerCase()) && equipmentNameColorToReturn === red) {
                equipmentNameColorToReturn = orange
            }
        })

      let stabAttackArrowToReturn = equipment.stab_attack > (randomEquipment?.stab_attack || 0) ? '↓' : equipment.stab_attack < (randomEquipment?.stab_attack || 0) ? '↑' : '';
      let slashAttackArrowToReturn = equipment.slash_attack > (randomEquipment?.slash_attack || 0) ? '↓' : equipment.slash_attack < (randomEquipment?.slash_attack || 0) ? '↑' : '';
      let crushAttackArrowToReturn = equipment.crush_attack > (randomEquipment?.crush_attack || 0) ? '↓' : equipment.crush_attack < (randomEquipment?.crush_attack || 0) ? '↑' : '';
      let magicAttackArrowToReturn = equipment.magic_attack > (randomEquipment?.magic_attack || 0) ? '↓' : equipment.magic_attack < (randomEquipment?.magic_attack || 0) ? '↑' : '';
      let rangedAttackArrowToReturn = equipment.ranged_attack > (randomEquipment?.ranged_attack || 0) ? '↓' : equipment.ranged_attack < (randomEquipment?.ranged_attack || 0) ? '↑' : '';
      let stabDefenceArrowToReturn = equipment.stab_defence > (randomEquipment?.stab_defence || 0) ? '↓' : equipment.stab_defence < (randomEquipment?.stab_defence || 0) ? '↑' : '';
      let slashDefenceArrowToReturn = equipment.slash_defence > (randomEquipment?.slash_defence || 0) ? '↓' : equipment.slash_defence < (randomEquipment?.slash_defence || 0) ? '↑' : '';
      let crushDefenceArrowToReturn = equipment.crush_defence > (randomEquipment?.crush_defence || 0) ? '↓' : equipment.crush_defence < (randomEquipment?.crush_defence || 0) ? '↑' : '';
      let magicDefenceArrowToReturn = equipment.magic_defence > (randomEquipment?.magic_defence || 0) ? '↓' : equipment.magic_defence < (randomEquipment?.magic_defence || 0) ? '↑' : '';
      let rangedDefenceArrowToReturn = equipment.ranged_defence > (randomEquipment?.ranged_defence || 0) ? '↓' : equipment.ranged_defence < (randomEquipment?.ranged_defence || 0) ? '↑' : '';
      let strengthArrowToReturn = equipment.strength > (randomEquipment?.strength || 0) ? '↓' : equipment.strength < (randomEquipment?.strength || 0) ? '↑' : '';
      let rangedStrengthArrowToReturn = equipment.ranged_strength > (randomEquipment?.ranged_strength || 0) ? '↓' : equipment.ranged_strength < (randomEquipment?.ranged_strength || 0) ? '↑' : '';
      let magicDamageArrowToReturn = equipment.magic_damage > (randomEquipment?.magic_damage || 0) ? '↓' : equipment.magic_damage < (randomEquipment?.magic_damage || 0) ? '↑' : '';
      let prayerArrowToReturn = equipment.prayer > (randomEquipment?.prayer || 0) ? '↓' : equipment.prayer < (randomEquipment?.prayer || 0) ? '↑' : '';
      let weightArrowToReturn = equipment.weight > (randomEquipment?.weight || 0) ? '↓' : equipment.weight < (randomEquipment?.weight || 0) ? '↑' : '';
      
      const EquipmentDataToReturn: Equipment = {
        id: equipment.id,
        image: equipment.image,
        equipment_name: equipment.equipment_name,
        equipment_name_color: equipmentNameColorToReturn,
        members: equipment.members,
        members_color: membersColorToReturn,
        stab_attack: equipment.stab_attack,
        stab_attack_color: stabAttackColorToReturn,
        stab_attack_arrow: stabAttackArrowToReturn,
        slash_attack: equipment.slash_attack,
        slash_attack_color: slashAttackColorToReturn,
        slash_attack_arrow: slashAttackArrowToReturn,
        crush_attack: equipment.crush_attack,
        crush_attack_color: crushAttackColorToReturn,
        crush_attack_arrow: crushAttackArrowToReturn,
        magic_attack: equipment.magic_attack,
        magic_attack_color: magicAttackColorToReturn,
        magic_attack_arrow: magicAttackArrowToReturn,
        ranged_attack: equipment.ranged_attack,
        ranged_attack_color: rangedAttackColorToReturn,
        ranged_attack_arrow: rangedAttackArrowToReturn,
        stab_defence: equipment.stab_defence,
        stab_defence_color: stabDefenceColorToReturn,
        stab_defence_arrow: stabDefenceArrowToReturn,
        slash_defence: equipment.slash_defence,
        slash_defence_color: slashDefenceColorToReturn,
        slash_defence_arrow: slashDefenceArrowToReturn,
        crush_defence: equipment.crush_defence,
        crush_defence_color: crushDefenceColorToReturn,
        crush_defence_arrow: crushDefenceArrowToReturn,
        magic_defence: equipment.magic_defence,
        magic_defence_color: magicDefenceColorToReturn,
        magic_defence_arrow: magicDefenceArrowToReturn,
        ranged_defence: equipment.ranged_defence,
        ranged_defence_color: rangedDefenceColorToReturn,
        ranged_defence_arrow: rangedDefenceArrowToReturn,
        strength: equipment.strength,
        strength_color: strengthColorToReturn,
        strength_arrow: strengthArrowToReturn,
        ranged_strength: equipment.ranged_strength,
        ranged_strength_color: rangedStrengthColorToReturn,
        ranged_strength_arrow: rangedStrengthArrowToReturn,
        magic_damage: equipment.magic_damage,
        magic_damage_color: magicDamageColorToReturn,
        magic_damage_arrow: magicDamageArrowToReturn,
        prayer: equipment.prayer,
        prayer_color: prayerColorToReturn,
        prayer_arrow: prayerArrowToReturn,
        weight: equipment.weight,
        weight_color: weightColorToReturn,
        weight_arrow: weightArrowToReturn,
      }
      return EquipmentDataToReturn
    }
  
    if (loading) {
      return <div className="w-screen h-screen bg-darkBackground text-white flex items-center justify-center">Loading...</div>;
    }
  
    if (apiError) {
      return <div className="w-screen h-screen bg-darkBackground text-white flex items-center justify-center">API Error</div>;
    }
    
    return (
      <div className="flex flex-col items-center min-h-screen text-lightGray p-6 w-full">
        <div className='flex flex-col items-center justify-center w-full '>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#E1C12B' }}>
            Body Slot Equipment
          </h1>
          <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="mb-4 px-4 py-2 border rounded-lg bg-gray-800 text-lightGray focus:outline-none"
              placeholder="Guess the equipment name"
            />
        </div>
        {filteredEquipments.length > 0 && (
        <div className="bg-gray-700 rounded-lg w-full max-w-md shadow-lg mb-4 max-h-[120px] overflow-auto z-10">
            <ul>
              {filteredEquipments.map(equipment => (
                <li
                  key={equipment.id}
                  onClick={() => handleEquipmentSelect(equipment)}
                  className="cursor-pointer hover:bg-gray-600 p-2"
                >
                  {equipment.equipment_name}
                </li>
              ))}
            </ul>
        </div>
        )}
        {selectedEquipments.length > 0 && (
        <div className="fixed flex flex-col items-center w-full top-40 z-0 max-h-[62%]">
          <div className="flex flex-col overflow-auto max-h-full w-[85%]">
            <table className="bg-gray-800 text-lightGray border border-hidden table-auto w-full">
              <thead className='sticky top-0 bg-gray-800 border-hidden text-sm'>
                <tr>
                  <th className="py-2 border-b border-gray-600">Image</th>
                  <th className="py-2 border-b border-gray-600">Name</th>
                  <th className="py-2 border-b border-gray-600">Members</th>
                  <th className="py-2 border-b border-gray-600">Stab Attack</th>
                  <th className="py-2 border-b border-gray-600">Slash Attack</th>
                  <th className="py-2 border-b border-gray-600">Crush Attack</th>
                  <th className="py-2 border-b border-gray-600">Magic Attack</th>
                  <th className="py-2 border-b border-gray-600">Ranged Attack</th>
                  <th className="py-2 border-b border-gray-600">Stab Defence</th>
                  <th className="py-2 border-b border-gray-600">Slash Defence</th>
                  <th className="py-2 border-b border-gray-600">Crush Defence</th>
                  <th className="py-2 border-b border-gray-600">Magic Defence</th>
                  <th className="py-2 border-b border-gray-600">Ranged Defence</th>
                  <th className="py-2 border-b border-gray-600">Strength</th>
                  <th className="py-2 border-b border-gray-600">Ranged Strength</th>
                  <th className="py-2 border-b border-gray-600">Magic Damage</th>
                  <th className="py-2 border-b border-gray-600">Prayer</th>
                  <th className="py-2 border-b border-gray-600">Weight</th>
                </tr>
              </thead>
              <tbody>
                {selectedEquipments && selectedEquipments.toReversed().map(equipment => (
                  <tr key={equipment.id} className="divide-x-2">
                    <td>
                      <div className='flex item-center justify-center h-full w-full'>
                        <img src={equipment.image} alt="" />
                      </div>
                    </td>
                    <td className={equipment.equipment_name_color}>{equipment.equipment_name}</td>
                    <td className={equipment.members_color}>{equipment.members}</td>
                    <td className={equipment.stab_attack_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.stab_attack_arrow}</div>
                        <div>{equipment.stab_attack}</div>
                        <div>{equipment.stab_attack_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.slash_attack_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.slash_attack_arrow}</div>
                        <div>{equipment.slash_attack}</div>
                        <div>{equipment.slash_attack_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.crush_attack_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.crush_attack_arrow}</div>
                        <div>{equipment.crush_attack}</div>
                        <div>{equipment.crush_attack_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.magic_attack_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.magic_attack_arrow}</div>
                        <div>{equipment.magic_attack}</div>
                        <div>{equipment.magic_attack_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.ranged_attack_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.ranged_attack_arrow}</div>
                        <div>{equipment.ranged_attack}</div>
                        <div>{equipment.ranged_attack_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.stab_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.stab_defence_arrow}</div>
                        <div>{equipment.stab_defence}</div>
                        <div>{equipment.stab_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.slash_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.slash_defence_arrow}</div>
                        <div>{equipment.slash_defence}</div>
                        <div>{equipment.slash_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.crush_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.crush_defence_arrow}</div>
                        <div>{equipment.crush_defence}</div>
                        <div>{equipment.crush_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.magic_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.magic_defence_arrow}</div>
                        <div>{equipment.magic_defence}</div>
                        <div>{equipment.magic_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.ranged_defence_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.ranged_defence_arrow}</div>
                        <div>{equipment.ranged_defence}</div>
                        <div>{equipment.ranged_defence_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.strength_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.strength_arrow}</div>
                        <div>{equipment.strength}</div>
                        <div>{equipment.strength_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.ranged_strength_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.ranged_strength_arrow}</div>
                        <div>{equipment.ranged_strength}</div>
                        <div>{equipment.ranged_strength_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.magic_damage_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.magic_damage_arrow}</div>
                        <div>{equipment.magic_damage}</div>
                        <div>{equipment.magic_damage_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.prayer_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.prayer_arrow}</div>
                        <div>{equipment.prayer}</div>
                        <div>{equipment.prayer_arrow}</div>
                      </div>
                    </td>
                    <td className={equipment.weight_color}>
                      <div className='flex flex-row justify-evenly'>
                        <div>{equipment.weight_arrow}</div>
                        <div>{equipment.weight}</div>
                        <div>{equipment.weight_arrow}</div>
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
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-lightGray mb-4">
              Congratulations!
            </h2>
            <p className="text-lg text-lightGray">
              You've guessed the equipment correctly!
            </p>
            <p className="text-lg text-lightGray">
              The equipment was {randomEquipment?.equipment_name}
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Finish
            </button>
          </div>
        </div>
      )}
        {isFirstHintPopupVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-lightGray mb-4">
              The hint is
            </h2>
            <p className="text-lg text-lightGray">
              {firstHint}
            </p>
            <button
              onClick={() => setIsFirstHintPopupVisible(false)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
        {isSecondHintPopupVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-lightGray mb-4">
              The hint is
            </h2>
            <p className="text-lg text-lightGray">
              {secondHint}
            </p>
            <button
              onClick={() => setIsSecondHintPopupVisible(false)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
        {isThirdHintPopupVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-lightGray mb-4">
              The hint is
            </h2>
            <p className="text-lg text-lightGray">
              {thirdHint}
            </p>
            <button
              onClick={() => setIsThirdHintPopupVisible(false)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
        <div className='flex flex-row items-center justify-center fixed bottom-4 gap-4'>
          <div>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Back
            </button>
          </div>
          {firstHintButtonVisible && (
          <div>
            <button
              onClick={() => getFirstHint()}
              className="px-6 py-3 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Hint 1
            </button>
          </div>
          )}
          {secondHintButtonVisible && (
          <div>
            <button
              onClick={() => getSecondHint()}
              className="px-6 py-3 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Hint 2
            </button>
          </div>
          )}
          {thirdHintButtonVisible && (
          <div>
            <button
              onClick={() => getThirdHint()}
              className="px-6 py-3 bg-darkGreen text-lightGray rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Hint 3
            </button>
          </div>
          )}
        </div>
      </div>
    );
  };
  
  export default EquipmentsPage;