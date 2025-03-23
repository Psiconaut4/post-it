'use strict'
 // Evento para adicionar um novo post-it ao clicar no botão
 document.getElementById("addNote").addEventListener("click", function() {
    const board = document.getElementById("board");
    const note = document.createElement("div"); // Cria um novo post-it
    note.classList.add("post-it");

    // Cria o botão "X" para remover o post-it
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.classList.add("close-btn");
    closeButton.onclick = function() {
        board.removeChild(note); // Remove o post-it ao clicar no botão
    };

    // Criando a área de texto separada
    const textArea = document.createElement("div");
    textArea.classList.add("text-area");
    textArea.contentEditable = "true"; // Permite edição do texto

    // Adicionando os elementos dentro do post-it
    note.appendChild(closeButton); 
    note.appendChild(textArea);
    
    // Posiciona o post-it em uma posição aleatória dentro do board
    note.style.left = Math.random() * (board.clientWidth - 160) + "px";
    note.style.top = Math.random() * (board.clientHeight - 160) + "px";
    
    board.appendChild(note); // Adiciona o post-it ao board
    addDragEvents(note); // Adiciona os eventos de arrastar e soltar
});

// Função para adicionar eventos de arrastar e soltar nos post-its
function addDragEvents(element) {
    let offsetX, offsetY, isDragging = false;
    
    // Evento de clique para iniciar o arraste
    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        element.style.zIndex = 1000; // Traz o post-it para frente
    });
    
    // Evento de movimento do mouse para arrastar o post-it
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        element.style.left = e.clientX - offsetX + "px";
        element.style.top = e.clientY - offsetY + "px";
    });
    
    // Evento para soltar o post-it ao soltar o botão do mouse
    document.addEventListener("mouseup", () => {
        isDragging = false;
        element.style.zIndex = 1; // Retorna à posição normal
    });
}