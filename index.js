'use strict';

// Salva os post-its no LocalStorage, incluindo texto, posição e cor.
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.post-it').forEach(note => {
        const textArea = note.querySelector('.text-area');
        notes.push({
            text: textArea.innerHTML, // Texto do post-it
            left: note.style.left, // Posição horizontal
            top: note.style.top, // Posição vertical
            color: note.style.backgroundColor // Cor do post-it
        });
    });
    localStorage.setItem('notes', JSON.stringify(notes)); // Atualiza o LocalStorage
}

// Função para criar um post-it reutilizável
function createPostIt(data = {}) {
    const board = document.getElementById("board");
    const note = document.createElement("div");
    note.classList.add("post-it");

    // Botão de fechar o post-it
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.classList.add("close-btn");
    closeButton.onclick = function() {
        board.removeChild(note); // Remove o post-it
        saveNotes(); // Atualiza LocalStorage
    };

    // Criar seletor de cores (botão que abre a janela)
    const colorButton = document.createElement("button");
    colorButton.innerHTML = "🎨";
    colorButton.classList.add("color-btn");
    colorButton.onclick = function() {
        colorMenu.classList.toggle("visible"); // Alterna a visibilidade do menu
    };

    // Menu de seleção de cores
    const colorMenu = document.createElement("div");
    colorMenu.classList.add("color-menu");

    // Adiciona as opções de cores ao menu
    ["yellow", "pink", "lightblue", "lightgreen", "black"].forEach(color => {
        const colorOption = document.createElement("div");
        colorOption.classList.add("color-option");
        colorOption.style.backgroundColor = color;
        colorOption.onclick = function() {
            note.style.backgroundColor = color; // Altera a cor do post-it
            // Fecha o menu após selecionar
            if (color === "black") {
                textArea.style.color = "white"; // Altera a cor da fonte para branco
            } else {
                textArea.style.color = "black"; // Altera a cor da fonte para preto
            }
            colorMenu.classList.remove("visible"); // Fecha o menu
            saveNotes(); // Atualiza o LocalStorage
        };
        colorMenu.appendChild(colorOption);
    });

    // Área de texto do post-it
    const textArea = document.createElement("div");
    textArea.classList.add("text-area");
    textArea.contentEditable = "true"; // Permite edição
    textArea.spellcheck = false; // Desabilita verificação ortográfica
    textArea.innerHTML = data.text || ""; // Define texto, se disponível
    textArea.oninput = saveNotes; // Salva ao modificar texto

    // Configurações de posição e cor
    note.style.left = data.left || Math.random() * (board.clientWidth - 160) + "px";
    note.style.top = data.top || Math.random() * (board.clientHeight - 160) + "px";
    note.style.backgroundColor = data.color || "yellow"; // Define cor padrão

    // Adiciona os elementos ao post-it
    note.appendChild(closeButton);
    note.appendChild(colorButton); // Adiciona botão de seleção de cores
    note.appendChild(colorMenu); // Adiciona o menu de cores
    note.appendChild(textArea);
    board.appendChild(note);


    addDragEvents(note); // Permite arrastar o post-it
}

// Carrega os post-its salvos no LocalStorage e recria os elementos na página.
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const signatureNote = {
        text: `  (\\ /) \n  ( . .)♥ \n c(”)(”) developed by \n        oPsiconaut4`, 
        left: "",
        top: "",
        color: "lightblue"
    }

    const aviso = {
        text: "Agora estamos com domínio próprio! na url: <a href='https://postit.psiconaut4.com.br'>https://postit.psiconaut4.com.br</a>",
        left: "",
        top: "",
        color: "pink"
    }

    const hasAviso = notes.some( n=> n.text === aviso.text);
    const hasSignature = notes.some( n=> n.text === signatureNote.text);
    if (!hasSignature && !hasAviso) {
        notes.push(signatureNote);
        notes.push(aviso);
        localStorage.setItem('notes', JSON.stringify(notes)); // Atualiza o LocalStorage
    }

    notes.forEach(noteData => createPostIt(noteData)); // Utiliza função reutilizável para criar post-its
}

// Adiciona um novo post-it ao clicar no botão "Adicionar Post-it"
document.getElementById("addNote").addEventListener("click", () => createPostIt());

// Adiciona funcionalidade de arrastar e soltar para os post-its
function addDragEvents(element) {
    let offsetX, offsetY, isDragging = false;

    const startDrag = (e) => {
        isDragging = true;
        const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - element.offsetLeft;
        offsetY = clientY - element.offsetTop;
        element.style.zIndex = 1000; // Eleva o post-it na ordem de empilhamento
    };

    const moveDrag = (e) => {
        if (!isDragging) return;
        const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
        element.style.left = clientX - offsetX + "px";
        element.style.top = clientY - offsetY + "px";
    };

    const endDrag = () => {
        isDragging = false;
        element.style.zIndex = 1; // Retorna o post-it à camada padrão
        saveNotes(); // Atualiza LocalStorage com novas posições
    };

    // Eventos para arrastar com o mouse
    element.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", endDrag);

    // Eventos para arrastar com toque (mobile)
    element.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("touchend", endDrag);
}

// Limpar Board com confirmação
document.getElementById("close-all-notes").addEventListener("click", () => {
    //Exibe caixa de confirmação
    if (confirm("Você tem certeza que deseja limpar todos os post-its?")) {
        const board = document.getElementById("board");
        board.innerHTML = ""; // Limpa o quadro
        localStorage.removeItem('notes'); // Remove os post-its do LocalStorage
        }
});

// Carrega os post-its ao iniciar a página
document.addEventListener("DOMContentLoaded", loadNotes);