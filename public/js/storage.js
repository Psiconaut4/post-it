import { createPostIt } from './postit.js';

export function saveNotes() {
    const notes = [];
    document.querySelectorAll('.post-it').forEach(note => {
        const textArea = note.querySelector('.text-area');
        notes.push({
            text: textArea.innerHTML,
            left: note.style.left,
            top: note.style.top,
            color: note.style.backgroundColor
        });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

export function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const signatureNote = {
        text: `  (\\ /) \n  ( . .)♥ \n c(”)(”) developed by \n        oPsiconaut4`,
        left: "",
        top: "",
        color: "lightblue"
    };

    const aviso = {
        text: "Agora estamos com domínio próprio! na url: <a href='https://postit.psiconaut4.com.br'>https://postit.psiconaut4.com.br</a>",
        left: "",
        top: "",
        color: "pink"
    };

    const hasAviso = notes.some(n => n.text === aviso.text);
    const hasSignature = notes.some(n => n.text === signatureNote.text);
    if (!hasAviso && !hasSignature) {
        notes.push(signatureNote, aviso);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    notes.forEach(noteData => createPostIt(noteData));
}
