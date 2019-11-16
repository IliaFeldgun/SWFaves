import { peopleURL } from "./config"

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
            await getPeople(jsonResult.next)
        }

        jsonResult.results.forEach((element: { name: string; }) => {
                SWPeople.push(element.name);
        })
    }
}
