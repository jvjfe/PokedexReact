import axios from "axios";

export const getPokemon = async (pokemon) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const speciesResponse = await axios.get(response.data.species.url);

        // Buscar a descrição em português, se disponível
        const descricaoPt = speciesResponse.data.flavor_text_entries.find(
            (entry) => entry.language.name === "pt"
        )?.flavor_text;

        // Se não houver em português, buscar a descrição em inglês
        const descricaoEn = speciesResponse.data.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
        )?.flavor_text;

        // Se não houver descrição em português ou inglês, retorna uma mensagem padrão
        const descricaoFinal = descricaoPt || descricaoEn || "Descrição não disponível";

        return {
            nome: response.data.name,
            id: response.data.id,
            imagem: response.data.sprites.other["official-artwork"].front_default, // Imagem normal
            imagemShiny: response.data.sprites.other["official-artwork"].front_shiny, // Imagem shiny
            altura: response.data.height / 10,
            peso: response.data.weight / 10,
            tipos: response.data.types.map(t => t.type.name),
            descricao: descricaoFinal,
        };
    } catch (error) {
        console.error("Erro ao buscar o Pokémon:", error);
        return null;
    }
};
