require('dotenv').config();

/*const apiURL = process.env.API_URL;
const peoplePath = process.env.PEOPLE_PATH;
const peopleURL = apiURL + peoplePath!;*/
const peopleURL = "https://swapi.co/api/people"

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
