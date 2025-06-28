import { saveNotes } from './storage.js';

export function addDragEvents(element) {
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
        saveNotes();
    };

    element.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", endDrag);

    element.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("touchend", endDrag);
}
