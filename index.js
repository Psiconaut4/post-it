'use strict';

// Função para salvar os post-its no LocalStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.post-it').forEach(note => {
        const textArea = note.querySelector('.text-area');
        notes.push({
            text: textArea.innerHTML,
            left: note.style.left,
            top: note.style.top
        });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Função para carregar os post-its do LocalStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const board = document.getElementById("board");
    notes.forEach(noteData => {
        const note = document.createElement("div");
        note.classList.add("post-it");
        
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "X";
        closeButton.classList.add("close-btn");
        closeButton.onclick = function() {
            board.removeChild(note);
            saveNotes(); // Salva após remover
        };
        
        const textArea = document.createElement("div");
        textArea.classList.add("text-area");
        textArea.contentEditable = "true";
        textArea.innerHTML = noteData.text;
        textArea.oninput = saveNotes; // Salva ao editar texto

        note.appendChild(closeButton);
        note.appendChild(textArea);
        
        note.style.left = noteData.left;
        note.style.top = noteData.top;
        
        board.appendChild(note);
        addDragEvents(note);
    });
}

// Carrega os post-its ao carregar a página
document.addEventListener("DOMContentLoaded", loadNotes);

document.getElementById("addNote").addEventListener("click", function() {
    const board = document.getElementById("board");
    const note = document.createElement("div");
    note.classList.add("post-it");

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.classList.add("close-btn");
    closeButton.onclick = function() {
        board.removeChild(note);
        saveNotes(); // Salva após remover
    };

    const textArea = document.createElement("div");
    textArea.classList.add("text-area");
    textArea.contentEditable = "true";
    textArea.oninput = saveNotes; // Salva ao editar texto

    note.appendChild(closeButton);
    note.appendChild(textArea);
    
    note.style.left = Math.random() * (board.clientWidth - 160) + "px";
    note.style.top = Math.random() * (board.clientHeight - 160) + "px";
    
    board.appendChild(note);
    addDragEvents(note);
    saveNotes(); // Salva após criar
});

function addDragEvents(element) {
    let offsetX, offsetY, isDragging = false;
    
    const startDrag = (e) => {
        isDragging = true;
        const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - element.offsetLeft;
        offsetY = clientY - element.offsetTop;
        element.style.zIndex = 1000;
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
        element.style.zIndex = 1;
        saveNotes(); // Salva ao terminar de arrastar
    };

    element.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", endDrag);

    element.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("touchend", endDrag);
}