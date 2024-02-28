import { useEffect, useState } from "react";
import { DetailPokemon } from "../interfaces/pokemos.interfaces";
import { POKEMON_API_POKEMON_URL } from "../constants";
import { httpClients } from "../api/httpClient";
import { getColorFromUrl } from "../utils/colors";

interface UsePokemonProps{
    pokemonName: string | undefined;
}

const usePokemon = ({pokemonName}: UsePokemonProps) => {
    const [pokemon,setPokemon] =useState<DetailPokemon | null> (null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (pokemonName){
            fetchPokemon();
        }
    }, [pokemonName])

    useEffect(() =>{
        if(pokemon){
            getPokemonColor();
        }
    },[pokemon]);

    const getPokemonColor = async () => {
        if (pokemon?.sprites?.other["official-artwork"]?.front_default){
            const color = await getColorFromUrl(pokemon.sprites.other["official-artwork"].front_default);
            if (color) setPokemon({ ...pokemon, color})
        }
    }

    const fetchPokemon = async () => {
        if(pokemonName) {
            setIsLoading(true)
            const url = `${POKEMON_API_POKEMON_URL}/${pokemonName}`;
            const result = await httpClients.get<DetailPokemon>(url);
            if (result?.data){
                setPokemon(result.data)
            }
            setIsLoading(false)
        

        } 

    };

    return {
        pokemon,
        isLoading
    };
};

export default usePokemon;