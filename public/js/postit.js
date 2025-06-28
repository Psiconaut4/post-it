import { saveNotes } from './storage.js';
import { addDragEvents } from './drag.js';

export function createPostIt(data = {}) {
    const board = document.getElementById("board");
    const note = document.createElement("div");
    note.classList.add("post-it"); 

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.classList.add("close-btn");
    closeButton.onclick = () => {
        board.removeChild(note);
        saveNotes();
    }; 

    const colorButton = document.createElement("button");
    colorButton.innerHTML = "🎨";
    colorButton.classList.add("color-btn");

    const colorMenu = document.createElement("div");
    colorMenu.classList.add("color-menu");

    colorButton.onclick = () => {
        colorMenu.classList.toggle("visible");
    };

    const textArea = document.createElement("div");
    textArea.classList.add("text-area");
    textArea.contentEditable = "true";
    textArea.spellcheck = false;
    textArea.innerHTML = data.text || "";
    textArea.oninput = saveNotes;

    ["yellow", "pink", "lightblue", "lightgreen", "black"].forEach(color => {
        const option = document.createElement("div");
        option.classList.add("color-option");
        option.style.backgroundColor = color;
        option.onclick = () => {
            note.style.backgroundColor = color;
            textArea.style.color = (color === "black") ? "white" : "black";
            colorMenu.classList.remove("visible");
            saveNotes();
        };
        colorMenu.appendChild(option);
    });

    note.style.left = data.left || Math.random() * (board.clientWidth - 160) + "px";
    note.style.top = data.top || Math.random() * (board.clientHeight - 160) + "px";
    note.style.backgroundColor = data.color || "yellow";

    note.appendChild(closeButton);
    note.appendChild(colorButton);
    note.appendChild(colorMenu);
    note.appendChild(textArea);
    board.appendChild(note);

    addDragEvents(note);
}
