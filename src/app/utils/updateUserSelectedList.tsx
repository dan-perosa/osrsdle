import { BASE_URL } from "./baseUrl";

export async function updateUserSelectedList(token: string, minigame: string, selectedList: any[]): Promise<string | undefined | []> {
    try {
        console.log(JSON.stringify({
            token: token,
            minigame: minigame,
            selected_list: selectedList
          }))
        // const response = await fetch(`${BASE_URL}user/update_user_selected_list/`, {
        const response = await fetch('http://127.0.0.1:5000/users/update_user_selected_list/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                token: token,
                minigame: minigame,
                selected_list: selectedList
              }),
        });
        const data = await response.json()
        console.log(data)
        return data.selected_list
    } catch (error) {
        console.error('Error updating score:', error);
    } 
}