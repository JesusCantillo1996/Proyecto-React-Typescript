import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IndexedPokemon, ListPokemon } from "../interfaces/pokemos.interfaces";
import { useEffect, useState } from "react";
import { getColorFromUrl } from "../utils/colors";
import { Link } from "react-router-dom";

interface PokemonCardProps{
    pokemon: ListPokemon;
}

const PokemonCard = ({pokemon}: PokemonCardProps) => {
    const [ pokemonColor, setPokemonColor] = useState <string | null > 
    (null)

    const getPokemonColor = async () => {
        const color = await getColorFromUrl(pokemon.image);
        if (color) setPokemonColor(color);
    };

    useEffect(() => {
        getPokemonColor();
    },[]);


    return (
    
    <Card sx={{backgroundColor: pokemonColor}}>
        <CardActionArea>
            <Link to={`pokemon/${pokemon.name}`} style=
            {{textDecoration: "none", color: "white"}}>
            <CardMedia 
                component="img" 
                image={pokemon.image} 
                title={pokemon.name}
                sx={{ height: 100, objectFit: "contain" }}
            />
            <CardContent>
                <Box 
                    sx={{display: "flex",
                    justifyContent:"center",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white"
                }}
                >
                <Typography sx={{textTransform: "capitalize"}}>
                        {pokemon.name}
                </Typography>
                
                <Typography sx={{textTransform: "capitalize"}}>
                        #{pokemon.pokedexNumber}
                </Typography>
                </Box>
            </CardContent>
            </Link>
        </CardActionArea>
        
        </Card>
    );
};
export default PokemonCard;
