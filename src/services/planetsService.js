import {nanoid} from "nanoid";

export const planetsColumns = [
    'name',
    'climate',
    'terrain',
    'diameter',
    'population',
]

export const getPlanets = async () => {
    const planetsResponse = await (await fetch('https://swapi.dev/api/planets')).json();

    return planetsResponse.results.map(({name, climate, terrain, diameter, population}) => ({
        name,
        climate,
        terrain,
        diameter,
        population,
        beloved: false,
        id: nanoid()
    }))
}
