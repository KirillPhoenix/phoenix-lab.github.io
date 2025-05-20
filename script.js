document.addEventListener('DOMContentLoaded', () => {
    const sparksContainer = document.querySelector('.sparks');
    for (let i = 0; i < 500; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = `${Math.random() * 100}vw`;
        spark.style.top = `${Math.random() * 100}vh`;
        spark.style.animationDelay = `${Math.random() * 1.5}s`;
        sparksContainer.appendChild(spark);
    }
});

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 3000);
});

const headerTitle = document.querySelector('.header-title');
const originalText = headerTitle.getAttribute('data-text');
let currentText = originalText.split('');

function glitchText() {
    currentText = currentText.map(char => {
        if (Math.random() > 0.8) {
            return String.fromCharCode(33 + Math.random() * 94);
        }
        return char;
    });
    headerTitle.textContent = currentText.join('');
    setTimeout(() => {
        headerTitle.textContent = originalText;
    }, 100);
}

setInterval(glitchText, 2000);

// MATRIX
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];
let mouseX = 0;

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff6f61';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const speed = Math.abs(mouseX - i * fontSize) < 50 ? 2 : 1;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i] += speed;
    }
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
});

setInterval(draw, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
