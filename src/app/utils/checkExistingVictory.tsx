import { BASE_URL } from "./baseUrl";

interface DataToReturn {
    selected_list: string;
    victory: boolean
}

export async function checkExistingVictory(token: string, minigame: string): Promise<undefined | DataToReturn> {
    try {
        console.log(JSON.stringify({
            token: token,
            minigame: minigame
          }))
        const response = await fetch(`${BASE_URL}user/check_existing_victory/`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                token: token,
                minigame: minigame
              }),
        });
        const data = await response.json()
        console.log(data)
        const dataToReturn = {
            'selected_list': data.selected_list,
            'victory': data.victory
        } 
        return dataToReturn
    } catch (error) {
        console.error('Error updating score:', error);
    } 
}