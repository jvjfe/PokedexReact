import React from "react";

function PokemonStats({ pokemonData, handleAbilityClick }) {
    // Função para formatar o nome da habilidade
    const formatAbilityName = (name) => {
        return name
            .replace(/-/g, " ") // Substitui "-" por espaço
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra
    };

    // Função para formatar os nomes dos status
    const formatStatName = (name) => {
        return name.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra
    };

    // Função para gerar a barra de progresso do status
    const renderStatBar = (stat) => {
        const percentage = (stat.base_stat / 255) * 100; // Calcula a porcentagem do valor do status
        return (
            <div className="stat-bar-container">
                <div className="stat-bar" style={{ width: `${percentage}%` }}>
                    <span className="stat-number">{stat.base_stat}</span>
                </div>
            </div>
        );
    };

    // Função para gerar as habilidades
    const getAbilities = (abilities) => {
        return abilities
            .map((ability) => (
                <span
                    key={ability.ability.name}
                    className="pokemon-ability"
                    onClick={() => handleAbilityClick(ability.ability.name)}
                    style={{ cursor: "pointer", textDecoration: "underline", color: "#ffcb05" }}
                >
                    {formatAbilityName(ability.ability.name)}
                </span>
            ))
            .reduce((prev, curr) => [prev, ", ", curr]); // Adiciona vírgulas entre as habilidades
    };

    // Calcula o status total (soma dos valores de todos os status)
    const calculateTotalStats = (stats) => {
        return stats.reduce((total, stat) => total + stat.base_stat, 0);
    };

    // Exibe a barra de progresso do status total
    const renderTotalStatBar = (totalStats) => {
        const maxTotalStats = 255 * 6; // Considerando 6 stats no total (HP, Attack, Defense, etc.)
        const percentage = (totalStats / maxTotalStats) * 100; // Calcula a porcentagem
        return (
            <div className="stat-bar-container">
                <div className="stat-bar total-stat-bar" style={{ width: `${percentage}%` }}>
                    <span className="stat-number">{totalStats}</span>
                </div>
            </div>
        );
    };

    // Calcula o total de status do Pokémon
    const totalStats = calculateTotalStats(pokemonData.stats);

    return (
        <div className="pokemon-stats">
            <div className="pokemon-abilities">
                <strong>Habilidades:</strong> {getAbilities(pokemonData.abilities)}
            </div>

            <div className="pokemon-base-stats">
                <h3>Status:</h3>
                {pokemonData.stats.map((stat) => (
                    <div key={stat.stat.name} className="stat-item">
                        <strong>{formatStatName(stat.stat.name)}:</strong>
                        {renderStatBar(stat)}
                    </div>
                ))}

                <div className="stat-item">
                    <strong>Status Total:</strong>
                    {renderTotalStatBar(totalStats)}
                </div>
            </div>
        </div>
    );
}

export default PokemonStats;
