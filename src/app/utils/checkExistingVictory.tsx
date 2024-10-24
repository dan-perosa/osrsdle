export async function checkExistingVictory(token: string, minigame: string): Promise<string | undefined | []> {
    try {
        const response = await fetch('http://127.0.0.1:5000/user/check_existing_victory/', {
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
        return data.selected_list
    } catch (error) {
        console.error('Error updating score:', error);
    } 
}