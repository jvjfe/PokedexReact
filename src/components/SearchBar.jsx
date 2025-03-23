import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

    // Função para buscar os Pokémons
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm) {
                setSuggestions([]);
                return;
            }

            setLoading(true);

            try {
                // Fazendo a requisição para pegar todos os Pokémons
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");
                const allPokemons = response.data.results;

                // Filtrando os Pokémons que começam com a string digitada
                const filteredSuggestions = allPokemons.filter((pokemon) =>
                    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
                );

                setSuggestions(filteredSuggestions);
            } catch (error) {
                console.error("Erro ao buscar sugestões:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimeout = setTimeout(fetchSuggestions, 300); // Delay para melhorar performance

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
        handleSearch(suggestion.name); // Chama a função de pesquisa com o nome do Pokémon
        setSuggestions([]); // Limpa as sugestões após a seleção
        setIsSuggestionsVisible(false); // Fecha as sugestões
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!searchTerm) {
                // Se o campo estiver vazio, pesquisa um Pokémon aleatório
                handleSearchRandom();
            } else if (suggestions.length > 0) {
                // Realiza a pesquisa com o primeiro Pokémon quando pressionar Enter
                handleSearch(suggestions[0].name);
                setSuggestions([]); // Limpa as sugestões após a pesquisa
                setIsSuggestionsVisible(false); // Fecha as sugestões
            }
        }
    };

    const handleFocus = () => {
        // Abre a lista de sugestões quando a caixa de pesquisa for focada
        setIsSuggestionsVisible(true);
    };

    const handleBlur = () => {
        // Deixa as sugestões abertas enquanto o usuário interage com elas
        setTimeout(() => setIsSuggestionsVisible(false), 200); // Delay para interação
    };

    // Função para pesquisar um Pokémon aleatório
    const handleSearchRandom = async () => {
        try {
            const randomId = Math.floor(Math.random() * 1000) + 1; // Gerar um ID aleatório entre 1 e 1000
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            handleSearch(response.data.name); // Chama a função de pesquisa com o nome do Pokémon aleatório
        } catch (error) {
            console.error("Erro ao buscar Pokémon aleatório:", error);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown} // Ação para pressionar Enter
                onFocus={handleFocus} // Abre sugestões ao focar
                onBlur={handleBlur} // Fecha sugestões ao sair
                className="search-bar"
                placeholder="Pesquise por nome ou número"
            />
            <button onClick={() => (searchTerm ? handleSearch(searchTerm) : handleSearchRandom())} className="search-button">
                Buscar
            </button>

            {loading && <div className="loading">Carregando...</div>}

            {/* Exibe a lista de sugestões */}
            {isSuggestionsVisible && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.name}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {/* Apenas exibe o nome do Pokémon */}
                            {suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
