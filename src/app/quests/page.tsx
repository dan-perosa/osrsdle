'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { release } from 'os';

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

  const fetchQuests = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/quests/', {
          mode: 'cors',
          method: 'GET',
        });
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuest = data[randomIndex];
    setRandomQuest(randomQuest)
    console.log(randomQuest)
    setQuests(data);
  } catch (error) {
    console.error('Erro ao buscar quests:', error);
  }
};

  useEffect(() => {
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

  const handleQuestSelect = (quest: Quest) => {
    const questToAdd = findSelectedQuestColorsAndArrows(quest)
    setSelectedQuests(prevQuests => [...prevQuests, questToAdd]);
    setUserInput('')
    console.log(quest)
    setQuests(prevQuests => prevQuests.filter(q => q.Name !== quest.Name));
    setFilteredQuests([]);
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
      console.log(quest['Quest Points'] === randomQuest['Quest Points'])
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
      'Release DateArrow': '',
    }
    return questDataToReturn
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-darkBackground text-lightGray p-6">
      <div className='flex flex-col items-center justify-center w-[100%] relative z-0'>
        <div className='flex flex-col items-center justify-center w-[100%]'>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#E1C12B' }}>
            Quests
          </h1>
          <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="mb-4 px-4 py-2 border rounded-lg bg-gray-800 text-lightGray focus:outline-none w-[34%]"
              placeholder="Guess the quest name"
            />
        </div>
        <div className="bg-gray-700 rounded-lg w-full max-w-md shadow-lg mb-4 max-h-[150px] overflow-auto">
          {filteredQuests.length > 0 && (
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
          )}
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-[100%]'>
        {selectedQuests.length > 0 && (
          <table className="bg-gray-800 text-lightGray border border-gray-600 w-[85%]">
            <thead>
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
              {selectedQuests && selectedQuests.map(quest => 
                <tr key={quest.ID} className="hover:bg-gray-700 divide-x-2">
                  <td className={quest.NameColor}>{quest.Name}</td>
                  <td className={quest.DifficultyColor}>{quest.Difficulty}</td>
                  <td className={quest.LengthColor}>{quest.Length}</td>
                  <td className={quest['Quest PointsColor']}>{quest['Quest Points']}</td>
                  <td className={quest['Release DateColor']}>{quest['Release Date']}</td>
                  <td className={quest.SeriesColor}>{quest.Series}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default QuestsPage;
