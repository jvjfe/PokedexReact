import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Pokedex.css';
import typeMap from '../services/types.js'; // Mapeamento dos tipos

function Pokedex() {
    const [pokemonData, setPokemonData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("info");
    const [isShiny, setIsShiny] = useState(false); // Estado para "shiny"
    const [modalVisible, setModalVisible] = useState(false); // Para controlar a visibilidade do modal
    const [selectedAbility, setSelectedAbility] = useState(""); // Para armazenar a habilidade selecionada

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
            setPokemonData(response.data);
        } catch (error) {
            setPokemonData(null); // Limpar se não encontrar o Pokémon
        }
    };

    const getFormattedTypes = (types) => {
        return types.map((type) => {
            const typeInfo = typeMap[type.type.name];
            return (
                <span
                    key={type.type.name}
                    className="pokemon-type"
                    style={{ backgroundColor: typeInfo.color }}
                >
                    {typeInfo.icon} {typeInfo.name}
                </span>
            );
        });
    };

    const getStats = (stats) => {
        return stats.map((stat) => (
            <div key={stat.stat.name} className="stat-item">
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
            </div>
        ));
    };

    const getAbilities = (abilities) => {
        return abilities.map((ability) => (
            <span
                key={ability.ability.name}
                className="pokemon-ability"
                onClick={() => handleAbilityClick(ability.ability.name)}
            >
                {ability.ability.name}
            </span>
        ));
    };

    const handleAbilityClick = (ability) => {
        setSelectedAbility(ability); // Armazenar a habilidade clicada
        setModalVisible(true); // Mostrar o modal
    };

    const handleCloseModal = () => {
        setModalVisible(false); // Fechar o modal
    };

    const getWeaknessesAndResistances = (types) => {
        // Aqui você pode configurar uma lógica para calcular fraquezas e resistências
        return (
            <div>
                <div><strong>Fraquezas:</strong> Fogo, Água</div>
                <div><strong>Resistências:</strong> Elétrico, Pedra</div>
            </div>
        );
    };

    const handleShinyToggle = () => {
        setIsShiny((prevState) => !prevState); // Alterna o estado shiny
    };

    return (
        <div className="pokedex-container">
            <div className="pokedex">
                <h2 className="pokedex-header">Pokédex</h2>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                    placeholder="Pesquise por nome ou número"
                />
                <button onClick={handleSearch} className="search-button">Buscar</button>

                {pokemonData ? (
                    <>
                        <div className="tabs">
                            <button
                                className={`tab ${activeTab === "info" ? "active" : ""}`}
                                onClick={() => setActiveTab("info")}
                            >
                                Informações
                            </button>
                            <button
                                className={`tab ${activeTab === "stats" ? "active" : ""}`}
                                onClick={() => setActiveTab("stats")}
                            >
                                Status
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === "info" && (
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
                                    <button className="shiny-button" onClick={handleShinyToggle}>
                                        {isShiny ? "Normal" : "Shiny"}
                                    </button>
                                </div>
                            )}

                            {activeTab === "stats" && (
                                <div className="pokemon-stats">
                                    <div className="pokemon-abilities">
                                        <strong>Habilidades:</strong> {getAbilities(pokemonData.abilities)}
                                    </div>
                                    <div className="pokemon-weaknesses-resistances">
                                        {getWeaknessesAndResistances(pokemonData.types)}
                                    </div>
                                    <div className="pokemon-base-stats">
                                        {getStats(pokemonData.stats)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Pokémon não encontrado!</p>
                )}
            </div>

            {/* Modal */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedAbility}</h2>
                        <p>Descrição sobre a habilidade: [Adicione a descrição da habilidade aqui]</p>
                        <button onClick={handleCloseModal} className="close-modal">Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pokedex;
