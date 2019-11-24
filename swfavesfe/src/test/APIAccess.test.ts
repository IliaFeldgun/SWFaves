import { getAllPeople, getSuggestedMovies } from "../APIAccess";

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
    expect(await getSuggestedMovies(fakeUserID)).toHaveLength(0);
});

