import { getAllPeople, getSuggestedMovies } from "../APIAccess";
import { ICharacter } from "../interfaces/ICharacter";
const apiAccess = require('../APIAccess')
jest.setTimeout(30000);

test('Gets people', async () => {
    // Doesn't work
    //expect(await getAllPeople()).toBeInstanceOf(ICharacter); 

    expect(await getAllPeople()).toHaveLength(87); 
});

test('Gets movies', async () => {
    let userID = 609074512;
    expect(await getSuggestedMovies(userID)).toHaveLength(7);
    let fakeUserID = 1;
    expect(await getSuggestedMovies(fakeUserID)).toStrictEqual({"message": "Internal server error", "statusCode": 500})
});

