import { peopleURL, pagePath } from "../config"
import fetch from "node-fetch"

export async function getAllPeople()
{
    let SWPeople: string[] = [];
    let promises: Promise<any>[] = []

    let firstPeople = await getPeople(peopleURL)

    pushPeople(SWPeople, firstPeople);

    if (firstPeople.next != null)
    {
        let pages = Math.ceil(firstPeople.count / firstPeople.results.length)
        
        for (let page = 2; page <= pages; page++)
        {
            promises.push(getPeople(peopleURL,page));
        }

        await Promise.all(promises).then(responses => responses.forEach(element => pushPeople(SWPeople,element)))
    }

    return SWPeople;

    async function getPeople(URL : string, page? : number)
    {
        let peopleResult;

        if (!page)
        {
            peopleResult = await fetch(URL);
        }
        else 
        {
            peopleResult = await fetch(URL + pagePath + page)
        }

        return peopleResult.json();
    }

    async function pushPeople(array, peopleResult)
    {
        peopleResult.results.forEach((element: { name: string; }) => {
            array.push(element.name);
    })
    }
}
