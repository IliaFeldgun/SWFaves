import { peopleURL } from "./config"

export async function getAllPeople()
{
    let peopleResult = await fetch(peopleURL);
        
    return await peopleResult.json();
        
}
