import { peopleURL, filmsURL, pagePath } from "./config"
import fetch from "node-fetch"

export async function getAllSWAPIFilms()
{
    return getAllSWAPIFromURL(filmsURL);
}

export async function getAllSWAPIPeople()
{
    return getAllSWAPIFromURL(peopleURL);
}

async function getAllSWAPIFromURL(path : string)
{
    let SWAPIResults: any[] = [];
    let promises: Promise<any>[] = []

    let firstPeople = await getPage(path)

    pushPage(SWAPIResults, firstPeople.results);

    if (firstPeople.next != null)
    {
        let pages = Math.ceil(firstPeople.count / firstPeople.results.length)
        
        for (let page = 2; page <= pages; page++)
        {
            promises.push(getPage(path,page));
        }

        await Promise.all(promises).then(responses => responses.forEach(element => pushPage(SWAPIResults, element.results)))
    }

    return SWAPIResults;

    async function pushPage(SWAPIResults : Array<any>, pageResults : Array<any>)
    {
        pageResults.forEach((element) => {SWAPIResults.push(element)});
    }

    async function getPage(URL : string, page? : number)
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
}