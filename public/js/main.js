import { createPostIt } from './postit.js';
import { loadNotes } from './storage.js';

document.addEventListener("DOMContentLoaded", loadNotes);  // Carrega os post-its salvos no LocalStorage ao carregar a página

document.getElementById("addNote").addEventListener("click", () => createPostIt()); // Adiciona um novo post-it ao clicar no botão "Adicionar Post-it"

document.getElementById("close-all-notes").addEventListener("click", () => {
    if (confirm("Você tem certeza que deseja limpar todos os post-its?")) {
        const board = document.getElementById("board");
        board.innerHTML = "";
        localStorage.removeItem('notes');
    } // Limpa o quadro e remove os post-its do LocalStorage
});
