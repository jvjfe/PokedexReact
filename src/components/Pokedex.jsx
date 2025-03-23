import React, { useState } from "react";
import axios from "axios";
import "../styles/Pokedex.css";
import typeMap from "../services/types.js";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import PokemonInfo from "./PokemonInfo";
import PokemonStats from "./PokemonStats";
import AbilityModal from "./AbilityModal";

function Pokedex() {
    const [pokemonData, setPokemonData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("info");
    const [isShiny, setIsShiny] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAbility, setSelectedAbility] = useState("");
    const [abilityDescription, setAbilityDescription] = useState("");

    const handleSearch = async () => {
        if (!searchTerm) {
            // Se não houver termo de busca, busca um Pokémon aleatório
            const randomId = Math.floor(Math.random() * 898) + 1; // 898 é o número de Pokémons até o momento
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            setPokemonData(response.data);
            return;
        }

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
            setPokemonData(response.data);
        } catch (error) {
            setPokemonData(null);
        }
    };

    const handleAbilityClick = async (abilityName) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/ability/${abilityName}`);
            const abilityEffect = response.data.effect_entries.find(entry => entry.language.name === "en");
            setSelectedAbility(abilityName);
            setAbilityDescription(abilityEffect ? abilityEffect.effect : "Descrição não disponível.");
            setModalVisible(true);
        } catch (error) {
            setAbilityDescription("Erro ao carregar descrição.");
            setModalVisible(true);
        }
    };

    return (
        <div className="pokedex-container">
            <div className="pokedex">
                <h2 className="pokedex-header">Pokédex</h2>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

                {pokemonData ? (
                    <>
                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        <div className="tab-content">
                            {activeTab === "info" && (
                                <PokemonInfo pokemonData={pokemonData} isShiny={isShiny} setIsShiny={setIsShiny} />
                            )}
                            {activeTab === "stats" && (
                                <PokemonStats pokemonData={pokemonData} handleAbilityClick={handleAbilityClick} />
                            )}
                        </div>
                    </>
                ) : (
                    <p>Pokémon não encontrado ou erro ao carregar dados!</p>
                )}
            </div>

            <AbilityModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                abilityName={selectedAbility}
                abilityDescription={abilityDescription}
            />
        </div>
    );
}

export default Pokedex;
