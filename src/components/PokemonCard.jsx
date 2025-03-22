import React from 'react';

const PokemonCard = ({ pokemon, isShiny, handleShinyToggle, typeMap }) => {
    if (!pokemon) {
        return null;
    }

    const { name, sprites, types, abilities, id, height, weight, stats } = pokemon;

    const getShinyImage = () => {
        return isShiny ? sprites.front_shiny : sprites.front_default;
    };

    return (
        <div className="pokemon-card">
            <h2>{name && name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <img src={getShinyImage()} alt={name} className="pokemon-img" />

            <div className="pokemon-types">
                {types && types.map((type, index) => {
                    const typeDetails = typeMap[type.type.name];
                    return (
                        <span
                            key={index}
                            className="pokemon-type"
                            style={{ backgroundColor: typeDetails.color }}
                        >
                            {typeDetails.icon} {typeDetails.name}
                        </span>
                    );
                })}
            </div>

            <div className="pokemon-stats">
                <p>ID: {id}</p>
                <p>Altura: {height / 10} m</p>
                <p>Peso: {weight / 10} kg</p>
                <p>Habilidades: {abilities && abilities.map((ability, index) => (
                    <span key={index}>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</span>
                ))}</p>
            </div>

            <label className="shiny-checkbox-container">
                <input type="checkbox" checked={isShiny} onChange={handleShinyToggle} />
                <span>Exibir Shiny</span>
            </label>
        </div>
    );
};

export default PokemonCard;
