export async function handleVictory(arr: any[], token: string, minigame: string): Promise<void> {
    const len = arr.length;
    if (len >= 50) {
        return
    }
    const score = 50 - len;
    try {
        const response = await fetch('http://127.0.0.1:5000/user/sum_score/', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                list: arr,
                score: score,
                token: token,
                minigame: minigame
              }),
        });
        console.log(JSON.stringify({
            list: arr,
            score: score,
            token: token,
            minigame: minigame
          }))
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error('Error updating score:', error);
    } 
}