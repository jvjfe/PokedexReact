import React from "react";

function AbilityModal({ modalVisible, setModalVisible, abilityName, abilityDescription }) {
    // Verifica se o modal deve ser exibido
    if (!modalVisible) return null;

    // Função para formatar o nome da habilidade
    const formatAbilityName = (name) => {
        if (!name) return ''; // Se não houver nome, retorna uma string vazia
        return name
            .replace(/-/g, " ") // Substitui "-" por espaço
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{formatAbilityName(abilityName)}</h2>
                <p>{abilityDescription}</p>
                <button onClick={() => setModalVisible(false)} className="close-modal">Fechar</button>
            </div>
        </div>
    );
}

export default AbilityModal;
