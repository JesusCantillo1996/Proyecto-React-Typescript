import { useEffect, useState } from "react"
import { IndexedPokemon, IndexedType, ListPokemon, PokemonByTypeListResponse, PokemonListResponse } from "../interfaces/pokemos.interfaces"
import { POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL, POKEMON_TYPE } from "../constants"
import { httpClients } from "../api/httpClient"

const usePokemons = () => {
    const [pokemons,setPokemons] = useState<ListPokemon[]>([])
    const [nextUrl, setNetxUrl] = useState<string | null> 
    (POKEMON_API_POKEMON_URL);

    const [selectedType, setSelectedType] = useState<IndexedType | null>(null)

    useEffect(() => {
        if (selectedType){
            fetchPokemonsByType()
        }else{
            fetchPokemon();
        }
    },[selectedType]);

    const fetchPokemonsByType = async () => {
        if (selectedType) {
            const result = await httpClients.get <PokemonByTypeListResponse>
            (selectedType.url);

            if (result?.data?.pokemon) {
                const listPokemons = result.data.pokemon.map((p) =>
                IndexedPokemonToListPokemon(p.pokemon)
                );
                setPokemons(listPokemons);
                setNetxUrl(POKEMON_API_POKEMON_URL);
            }
        }
    }

    const IndexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon) => {
        const pokedexNumber = parseInt(indexedPokemon.url.replace(`${POKEMON_API_POKEMON_URL}/`, "").
        replace("/", ""))

        const listPokemon: ListPokemon ={
            name: indexedPokemon.name,
            url: indexedPokemon.url,
            image: `${POKEMON_IMAGES_BASE_URL}/${pokedexNumber}.png`,
            pokedexNumber
        }
        return listPokemon
    }

    const fetchPokemon = async () => {
        if (nextUrl) {
            const result = await httpClients.get<PokemonListResponse>(nextUrl)
            if (result?.data.results){
                const listPokemons = result.data.results.map(p => IndexedPokemonToListPokemon(p))
                setPokemons([...pokemons, ...listPokemons])
                setNetxUrl(result.data.next)
            }
        }

        

    }

    return {
        pokemons,
        fetchNextPage: fetchPokemon,
        hasMorePokemon: !! nextUrl,
        pokemonTypes: POKEMON_TYPE,
        selectedType,
        setSelectedType,
        setPokemons,

    }
}

export default usePokemons