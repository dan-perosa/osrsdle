import { BASE_URL } from "./baseUrl";

export async function updateUserSelectedList(token: string, minigame: string, selectedList: any[]): Promise<string | undefined | []> {
    try {
        console.log(JSON.stringify({
            token: token,
            minigame: minigame,
            selected_list: selectedList
          }))
        // const response = await fetch(`${BASE_URL}user/update_user_selected_list/`, {
        const response = await fetch(`${BASE_URL}user/update_user_selected_list/`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                token: token,
                minigame: minigame,
                selected_list: selectedList,
              }),
        });
        const data = await response.json()
        console.log(data)
        return data.selected_list
    } catch (error) {
        console.error('Error updating score:', error);
    } 
}