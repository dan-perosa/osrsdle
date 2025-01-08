'use client'

import { exec } from 'child_process';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, useEffect } from 'react';
import { BASE_URL } from './utils/baseUrl';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [showEquipment, setShowEquipment] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<true | false>(false)
  const [usernameLoginInput, setUsernameLoginInput] = useState<string>('')
  const [passwordLoginInput, setPasswordLoginInput] = useState<string>('')
  const [usernameCreateAccountInput, setUsernameCreateAccountInput] = useState<string>('')
  const [passwordCreateAccountInput, setPasswordCreateAccountInput] = useState<string>('')
  const [password2CreateAccountInput, setPassword2CreateAccountInput] = useState<string>('')
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('')
  const [createAccountErrorMessage, setCreateAccountErrorMessage] = useState<string>('')
  const [isCreateAccountVisible, setIsCreateAccountVisible] = useState<true | false>(false)
  const [jwtToken, setJwtToken] = useState<string>('')
  const [loading, setLoading] = useState<true | false>(true)
  const [loggingOut, setLoggingOut] = useState<true | false>(false)


  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      token && setJwtToken(token)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  })

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

  const handleCreateAccount = async () => {
    const usernameToCreate = usernameCreateAccountInput
    const passwordToCreate = passwordCreateAccountInput
    const password2ToCreate = password2CreateAccountInput

    if (!usernameToCreate || !passwordToCreate || !password2ToCreate) {
      setCreateAccountErrorMessage("Please fill all the required fields");
      return;
    }
    if (passwordToCreate !== password2ToCreate) {
      setCreateAccountErrorMessage("Passwords doesn't match")
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}user/create/`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameToCreate,
          password: passwordToCreate
        })
      });
      if (!response.ok) {
        throw new Error('Error creating account');
      }
      const data = await response.json();
      if (data.message === 'created') {
        window.location.reload()
      } else {
        setCreateAccountErrorMessage(data.message)
      }
    } catch (error) {
      console.error('Error', error)
      alert('Account creation failed');
    }

  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      const response = await fetch(`${BASE_URL}user/logout/`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: jwtToken,
        })
      });
      if (!response.ok) {
        throw new Error('Error creating account');
      }
      const data = await response.json();
      if (data.message === 'logged out') {
        localStorage.setItem('token', '')
        window.location.reload()
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.error('Error', error)
      alert('Logout failed');
    } finally {
      setLoggingOut(false)
    }
  }

  const handleLogin = async () => {
    const username = usernameLoginInput
    const password = passwordLoginInput
    if (!username || !password) {
      setLoginErrorMessage("Please fill all the required fields");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}user/login/`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      if (!response.ok) {
        throw new Error('Error logging in');
      }
      const data = await response.json();
      if (data.message === 'logged') {
        localStorage.setItem('token', data.token)
        window.location.reload()
      } else {
        setLoginErrorMessage(data.message)
      }
    } catch (error) {
      console.error('Error', error)
      alert('Login failed, check your credentials');
    }
  }

  const handleUsernameLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameLoginInput(e.target.value);
  };

  const handlePasswordLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordLoginInput(e.target.value);
  };

  const handleUsernameCreateAccountInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameCreateAccountInput(e.target.value);
  };

  const handlePasswordCreateAccountInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCreateAccountInput(e.target.value);
  };

  const handlePassword2CreateAccountInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword2CreateAccountInput(e.target.value);
  };

  if (loading) {
    return <div className="w-screen h-screen bg-darkBackground text-white flex items-center justify-center">Loading...</div>;
  }

  if (loggingOut) {
    return <div className="w-screen h-screen bg-darkBackground text-white flex items-center justify-center">Logging out...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden min-h-screen max-h-screen text-white gap-6">
      <div>
        <h1 className="text-5xl font-bold text-minigameHeader">
          OSRSdle
        </h1>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleNavigation('/quests')}
          className="px-4 py-2 bg-mainButton text-white rounded-lg shadow-lg hover:bg-secondaryButtonHover transition"
        >
          Quests
        </button>
        <button
          onClick={() => handleNavigation('/monsters')}
          className="px-4 py-2 bg-mainButton text-white rounded-lg shadow-lg hover:bg-secondaryButtonHover transition"
        >
          Monsters
        </button>
        <button
          onClick={toggleEquipment}
          className="px-4 py-2 bg-mainButton text-white rounded-lg shadow-lg hover:bg-secondaryButtonHover transition"
        >
          Equipments
        </button>
      </div>
      <div
        className={`flex flex-wrap mb-0 justify-center transition-transform duration-500 max-w-[60%] gap-4 ${
          showEquipment ? 'translate-y-0' : 'translate-y-[-2000px]'
        }`}
      >
        <button onClick={() => handleEquipmentTypeClick('equipments')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">All equipments (hard)</button>     
        <button onClick={() => handleEquipmentTypeClick('ammunition')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Ammunition</button>
        <button onClick={() => handleEquipmentTypeClick('body')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Body</button>
        <button onClick={() => handleEquipmentTypeClick('cape')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Cape</button>
        <button onClick={() => handleEquipmentTypeClick('feet')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Feet</button>
        <button onClick={() => handleEquipmentTypeClick('hands')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Hands</button>
        <button onClick={() => handleEquipmentTypeClick('head')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Head</button>
        <button onClick={() => handleEquipmentTypeClick('legs')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Legs</button>
        <button onClick={() => handleEquipmentTypeClick('neck')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Neck</button>
        <button onClick={() => handleEquipmentTypeClick('ring')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Ring</button>
        <button onClick={() => handleEquipmentTypeClick('shield')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Shield</button>
        <button onClick={() => handleEquipmentTypeClick('two-handed')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Two-handed</button>
        <button onClick={() => handleEquipmentTypeClick('weapon')} className="px-4 py-2 bg-additionalCenterButton text-white rounded-lg hover:bg-secondaryButtonHover">Weapon</button>
      </div>
      <div className={`flex flex-row gap-4 transition-transform duration-500 ${showEquipment ? 'translate-y-0' : 'translate-y-[-300%]'}`}>
        {jwtToken ? (
        <button 
        className='px-4 py-2 bg-lightGrayButton rounded-lg shadow-lg hover:bg-secondaryButtonHover transition'
        onClick={() => handleLogout()}
        >
          Logout</button>
        ) : (
        <button 
        className='px-4 py-2 bg-lightGrayButton rounded-lg shadow-lg hover:bg-secondaryButtonHover transition'
        onClick={() => setIsModalVisible(true)}
        >
          Login</button>
        )
      }
        <button 
        className='px-4 py-2 bg-lightGrayButton text-white rounded-lg shadow-lg hover:bg-secondaryButtonHover transition'
        onClick={() => router.push('/highscores')}
        >
          Higscores</button>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10" onClick={() => setIsModalVisible(false)}>
          <div className="bg-modal flex flex-col items-center p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <input
            value={usernameLoginInput}
            type="text" placeholder="User"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal transition text-black"
            onChange={handleUsernameLoginInputChange}
            />
            <input
            value={passwordLoginInput}
            type="password"
            placeholder="Password"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal transition text-black"
            onChange={handlePasswordLoginInputChange}
            />
            {loginErrorMessage && (
              <div className="mb-4 text-missRed animate-pulse">
                {loginErrorMessage}
              </div>
            )}
            <div className="flex justify-between gap-4">
              <button 
              className="px-4 py-2 bg-lightGrayButton text-white rounded-lg hover:bg-secondaryButtonHover"
              onClick={() => handleLogin()}
              >
                Login</button>
              <button
              className="px-4 py-2 bg-lightGrayButton text-white rounded-lg hover:bg-secondaryButtonHover"
              onClick={() => (setIsCreateAccountVisible(true), setIsModalVisible(false))}
              >
                Create Account</button>
            </div>
          </div>
        </div>
      )}
      {isCreateAccountVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setIsCreateAccountVisible(false)}>
          <div className="bg-modal flex flex-col items-center p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Create Account</h2>
            <input
            value={usernameCreateAccountInput}
            type="text" placeholder="User"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal transition text-black"
            onChange={handleUsernameCreateAccountInputChange}
            />
            <input
            value={passwordCreateAccountInput}
            type="password"
            placeholder="Password"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal transition text-black"
            onChange={handlePasswordCreateAccountInputChange}
            />
            <input
            value={password2CreateAccountInput}
            type="password"
            placeholder="Confirm Password"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal transition text-black"
            onChange={handlePassword2CreateAccountInputChange}
            />
            {createAccountErrorMessage && (
              <div className="mb-4 text-missRed animate-pulse">
                {createAccountErrorMessage}
              </div>
            )}
            <div className="flex justify-between gap-4">
              <button
              className="px-4 py-2 bg-lightGrayButton text-white rounded-lg hover:bg-secondaryButtonHover"
              onClick={() => handleCreateAccount()}
              >Create Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
