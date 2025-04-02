'use strict';

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
    
    // Evento de clique para iniciar o arraste (mouse e toque)
    const startDrag = (e) => {
        isDragging = true;
        const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - element.offsetLeft;
        offsetY = clientY - element.offsetTop;
        element.style.zIndex = 1000; // Traz o post-it para frente
    };

    // Evento de movimento para arrastar o post-it (mouse e toque)
    const moveDrag = (e) => {
        if (!isDragging) return;
        const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
        element.style.left = clientX - offsetX + "px";
        element.style.top = clientY - offsetY + "px";
    };

    // Evento para soltar o post-it (mouse e toque)
    const endDrag = () => {
        isDragging = false;
        element.style.zIndex = 1; // Retorna à posição normal
    };

    // Adiciona eventos de mouse
    element.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", endDrag);

    // Adiciona eventos de toque
    element.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("touchend", endDrag);
}