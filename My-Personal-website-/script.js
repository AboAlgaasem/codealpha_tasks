const words = ["Web Designer", "Full Stack Developer", "AI Developer"];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = words[wordIndex];
const typedTextElement = document.getElementById("typed-text");

function typeLetter() {
    if (letterIndex < currentWord.length) {
        typedTextElement.textContent += currentWord[letterIndex];
        letterIndex++;
        setTimeout(typeLetter, 150);
    } else {
        setTimeout(deleteText, 1000); 
    }
}
function deleteText() {
    if (letterIndex > 0) {
        typedTextElement.textContent = currentWord.substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(deleteText, 100);
    } else {
        wordIndex = (wordIndex + 1) % words.length; 
        currentWord = words[wordIndex];
        setTimeout(typeLetter, 500);
    }
}
typeLetter();
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('section-visible');
        }
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (rect.top <= window.innerHeight && rect.bottom >= 0);
}
