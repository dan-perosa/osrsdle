'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../utils/baseUrl';

interface UserScore {
  user: string;
  score: number;
}

const HighScoresPage: React.FC = () => {
  const router = useRouter();
  const [highscores, setHighscores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 50;

  const fetchHighScores = async () => {
    try {
      const response = await fetch(`${BASE_URL}user/get_highscores/`);
      const data = await response.json();
      setHighscores(data);
    } catch (error) {
      console.error('Error fetching highscores:', error);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighScores();
  }, []);


  if (loading) {
    return <div className="w-screen h-screen bg-darkBackground text-white flex items-center justify-center">Loading...</div>;
  }

  if (apiError) {
    return <div className="w-screen h-screen bg-darkBackground text-white flex items-center justify-center">API Error</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen h-screen text-white p-6 w-full items-center">
      <h1 className="text-4xl font-bold mb-4 text-minigameHeader">
        Highscores
      </h1>
      <div className="w-[80%] max-h-[75%] overflow-auto">
        <table className="bg-highscoreTableBg text-white border border-hidden table-fixed w-full box-white">
          <thead className='sticky top-0 bg-modal text-sm z-0'>
            <tr>
              <th className="py-2 border-b border-gray-600">Rank</th>
              <th className="py-2 border-b border-gray-600">User</th>
              <th className="py-2 border-b border-gray-600">Points</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-600'>
            {highscores.toReversed().map((userScore, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="py-2 text-center">{index+1}</td>
                <td className="py-2 text-center">{userScore.user}</td>
                <td className="py-2 text-center">{userScore.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row items-center justify-center fixed bottom-4 gap-4'>
        <div>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-lightGrayButton text-white rounded-lg shadow-lg hover:bg-secondaryButtonHover transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighScoresPage;
