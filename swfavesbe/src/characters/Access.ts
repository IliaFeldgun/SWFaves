import { peopleURL } from "../config"
import fetch from "node-fetch"

export async function getAllPeople()
{
    var SWPeople: string[] = [];

    await getPeople(peopleURL)

    return SWPeople;

    async function getPeople(URL : string)
    {
        let peopleResult = await fetch(URL);
        
        let jsonResult = await peopleResult.json();
        
        if (jsonResult.next != null)
        {
            getPeople(jsonResult.next)
        }

        jsonResult.results.forEach((element: { name: string; }) => {
                SWPeople.push(element.name);
        })
    }
}
