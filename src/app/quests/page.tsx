'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleVictory } from '../utils/handleVictory'
import { checkExistingVictory } from '../utils/checkExistingVictory'


interface Quest {
  Difficulty: string;
  ID: number;
  Length: string;
  Name: string;
  'Quest Points': number;
  'Release Date': string;
  Series: string;
  DifficultyColor: string;
  IDColor: string;
  LengthColor: string;
  NameColor: string;
  'Quest PointsColor': string;
  'Release DateColor': string;
  SeriesColor: string;
  'Quest PointsArrow': string;
  'Release DateArrow': string;
}

const QuestsPage: React.FC = () => {
  const router = useRouter();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [filteredQuests, setFilteredQuests] = useState<Quest[]>([]);
  const [selectedQuests, setSelectedQuests] = useState<Quest[]>([]);
  const [randomQuest, setRandomQuest] = useState<Quest>()
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState<true | false>(true)
  const [apiError, setApiError] = useState<true | false>(false)
  const [isVictoryPopupVisible, setIsVictoryPopupVisible] = useState(false);
  const [jwtToken, setJwtToken] = useState<string>('')

  const fetchQuests = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/quests/', {
          mode: 'cors',
          method: 'GET',
        });
    const data = await response.json();
    const sortedData = data.sort((a: Quest, b: Quest) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0))
    setQuests(sortedData);
    const response2 = await fetch('http://127.0.0.1:5000/daily_quest/', {
        mode: 'cors',
        method: 'GET',
      });
    const data2 = await response2.json();
    setRandomQuest(data2)
    console.log(data2)
    const token = localStorage.getItem('token')
    if (token) {
      const selectedList = await checkExistingVictory(token, 'quests')
      console.log(selectedList)
      if (selectedList === '' || selectedList === undefined) {
        return
      }
      setIsVictoryPopupVisible(true)
      typeof selectedList === 'object' && setSelectedQuests(selectedList)
    }
  } catch (error) {
    console.error('Erro ao buscar quests:', error);
    setApiError(true)
  } finally {
    setLoading(false)
  }
};

  useEffect(() => {
    const token = localStorage.getItem('token')
    token && setJwtToken(token)
    fetchQuests();
  }, []);


  useEffect(() => {
    if (userInput === '') {
      setFilteredQuests([]);
      return;
    }

    const lowercasedInput = userInput.toLowerCase();
    const filtered = quests.filter(quest =>
      quest.Name.toLowerCase().includes(lowercasedInput)
    );

    setFilteredQuests(filtered);
  }, [userInput]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleQuestSelect = async (quest: Quest) => {
    const questToAdd = findSelectedQuestColorsAndArrows(quest)
    setSelectedQuests(prevQuests => [...prevQuests, questToAdd]);
    setUserInput('')
    setQuests(prevQuests => prevQuests.filter(q => q.Name !== quest.Name));
    setFilteredQuests([]);
    // checks win
    if (randomQuest) {
      if (randomQuest.Name === quest.Name) {
        setIsVictoryPopupVisible(true)
        if (jwtToken !== '') {
          const arrayToPassToApi = [...selectedQuests]
          arrayToPassToApi.push(questToAdd)
          await handleVictory(arrayToPassToApi, jwtToken, 'quests')
        }
      }
    }
  };

  const findSelectedQuestColorsAndArrows = (quest: Quest) => {
    let difficultyColorToReturn = 'py-2 border-b border-gray-600 text-center bg-red-500'
    let idColorToReturn = 'py-2 border-b border-gray-600 text-center bg-red-500'
    let lengthColorToReturn = 'py-2 border-b border-gray-600 text-center bg-red-500'
    let nameColorToReturn = 'py-2 border-b border-gray-600 text-center bg-red-500'
    let questpointsColorToReturn = 'py-2 border-b border-gray-600 text-center bg-red-500'
    let releasedateColorToReturn = 'py-2 border-b border-gray-600 text-center bg-red-500'
    let seriesColorToReturn = 'py-2 border-b border-gray-600 text-center bg-red-500'
    let questPointsArrow = ''
    let releaseDateArrow = ''
    if (quest?.Difficulty === randomQuest?.Difficulty) {
      difficultyColorToReturn = 'py-2 border-b border-gray-600 text-center bg-green-500'
    }
    if (quest?.ID === randomQuest?.ID) {
      idColorToReturn = 'py-2 border-b border-gray-600 text-center bg-green-500'
    }
    if (quest?.Length === randomQuest?.Length) {
      lengthColorToReturn = 'py-2 border-b border-gray-600 text-center bg-green-500'
    }
    if (quest?.Name === randomQuest?.Name) {
      nameColorToReturn = 'py-2 border-b border-gray-600 text-center bg-green-500'
    }
    if (quest.Series === randomQuest?.Series) {
      seriesColorToReturn = 'py-2 border-b border-gray-600 text-center bg-green-500'
    }
    if (randomQuest) {
      questPointsArrow = quest['Quest Points'] > (randomQuest['Quest Points'] || 0) ? '↓' : quest['Quest Points'] < (randomQuest['Quest Points'] || 0) ? '↑' : '';
      releaseDateArrow = Date.parse(quest['Release Date']) > (Date.parse(randomQuest['Release Date']) || 0) ? '↓' : Date.parse(quest['Release Date']) < (Date.parse(randomQuest['Release Date']) || 0) ? '↑' : '';
      if (quest['Quest Points'] === randomQuest['Quest Points']) {
        questpointsColorToReturn = 'py-2 border-b border-gray-600 text-center bg-green-500'
      }
      if (quest['Release Date'] === randomQuest['Release Date']) {
        releasedateColorToReturn = 'py-2 border-b border-gray-600 text-center bg-green-500'
      }
    }

    const questDataToReturn: Quest = {
      Difficulty: quest.Difficulty,
      ID: quest.ID,
      Length: quest.Length,
      Name: quest.Name,
      'Quest Points': quest['Quest Points'],
      'Release Date': quest['Release Date'],
      Series: quest.Series,
      DifficultyColor: difficultyColorToReturn,
      IDColor: idColorToReturn,
      LengthColor: lengthColorToReturn,
      NameColor: nameColorToReturn,
      'Quest PointsColor': questpointsColorToReturn,
      'Release DateColor': releasedateColorToReturn,
      SeriesColor: seriesColorToReturn,
      'Quest PointsArrow': questPointsArrow,
      'Release DateArrow': releaseDateArrow,
    }
    return questDataToReturn
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
          Quests
        </h1>
        <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 border rounded-lg bg-gray-800 text-lightGray focus:outline-none"
            placeholder="Guess the quest name"
          />
      </div>
      {filteredQuests.length > 0 && (
      <div className="bg-gray-700 rounded-lg w-full max-w-md shadow-lg mb-4 max-h-[120px] overflow-auto z-10">
          <ul>
            {filteredQuests.map(quest => (
              <li
                key={quest.ID}
                onClick={() => handleQuestSelect(quest)}
                className="cursor-pointer hover:bg-gray-600 p-2"
              >
                {quest.Name}
              </li>
            ))}
          </ul>
      </div>
      )}
      {selectedQuests.length > 0 && (
        <div className="fixed flex flex-col items-center w-full top-40 z-0 max-h-[62%]">
          <div className="flex flex-col overflow-auto max-h-full w-[85%]">
            <table className="bg-gray-800 text-lightGray border border-hidden table-auto w-full">
              <thead className='sticky top-0 bg-gray-800 border-hidden text-sm'>
              <tr>
                <th className="py-2 border-b border-gray-600">Name</th>
                <th className="py-2 border-b border-gray-600">Difficulty</th>
                <th className="py-2 border-b border-gray-600">Length</th>
                <th className="py-2 border-b border-gray-600">Quest Points</th>
                <th className="py-2 border-b border-gray-600">Release Date</th>
                <th className="py-2 border-b border-gray-600">Series</th>
              </tr>
            </thead>
            <tbody>
              {selectedQuests && selectedQuests.toReversed().map(quest => (
                <tr key={quest.ID} className="hover:bg-gray-700 divide-x-2">
                  <td className={quest.NameColor}>{quest.Name}</td>
                  <td className={quest.DifficultyColor}>{quest.Difficulty}</td>
                  <td className={quest.LengthColor}>{quest.Length}</td>
                  <td className={quest['Quest PointsColor']}>
                    <div className='flex flex-row justify-evenly'>
                      <div>{quest['Quest PointsArrow']}</div>
                      <div>{quest['Quest Points']}</div>
                      <div>{quest['Quest PointsArrow']}</div>
                    </div>
                  </td>
                  <td className={quest['Release DateColor']}>
                    <div className='flex flex-row justify-evenly'>
                      <div>{quest['Release DateArrow']}</div>
                      <div>{quest['Release Date']}</div>
                      <div>{quest['Release DateArrow']}</div>
                    </div>
                  </td>
                  <td className={quest.SeriesColor}>{quest.Series}</td>
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
            You've guessed the quest correctly!
          </p>
          <p className="text-lg text-lightGray">
            The quest was {randomQuest?.Name}, released in {randomQuest?.['Release Date']}
          </p>
          <button
            onClick={() => router.push('/monsters')}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Next
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
      </div>
    </div>
  );
};

export default QuestsPage;
