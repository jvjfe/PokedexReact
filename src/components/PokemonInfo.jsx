import React from "react";
import typeMap from "../services/types.js";

function PokemonInfo({ pokemonData, isShiny, setIsShiny }) {
    const getFormattedTypes = (types) => {
        return types.map((type) => {
            const typeInfo = typeMap[type.type.name];
            return (
                <span key={type.type.name} className="pokemon-type" style={{ backgroundColor: typeInfo.color }}>
                    {typeInfo.icon} {typeInfo.name}
                </span>
            );
        });
    };

    return (
        <div className="pokemon-info">
            <img
                src={pokemonData.sprites[isShiny ? "front_shiny" : "front_default"]}
                alt={pokemonData.name}
                className="pokemon-img"
            />
            <p><strong>Nome:</strong> {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
            <p><strong>Numero da Pokédex:</strong> {pokemonData.id}</p>
            <p><strong>Altura:</strong> {pokemonData.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemonData.weight / 10} kg</p>
            <div className="pokemon-types">{getFormattedTypes(pokemonData.types)}</div>
            <button className="shiny-button" onClick={() => setIsShiny((prevState) => !prevState)}>
                {isShiny ? "Normal" : "Shiny"}
            </button>
        </div>
    );
}

export default PokemonInfo;
