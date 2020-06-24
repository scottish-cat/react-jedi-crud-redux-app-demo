import {nanoid} from "nanoid";

export const starshipsColumns = [
    'name',
    'model',
    'crew',
    'passengers',
    'cost_in_credits',
]

export const getStarships = async () => {
    const starshipsResponse = await (await fetch('https://swapi.dev/api/starships')).json();

    return starshipsResponse.results.map(({name, model, crew, passengers, cost_in_credits}) => ({
        name,
        model,
        crew,
        passengers,
        cost_in_credits,
        beloved: false,
        id: nanoid()
    }))
}
