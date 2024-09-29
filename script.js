const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('input');

let text = '';
let progress = 0;
let isDrawing = false;
let scrollPosition = 0;
let backgroundImage = new Image();

backgroundImage.src = 'jhk-1726419652908.jpg'; // 请替换为您的实际图片URL

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

input.addEventListener('change', (e) => {
    text = e.target.value;
    progress = 0;
    scrollPosition = 0;
    isDrawing = true;
    animate();
});

function drawBackground() {
    ctx.globalAlpha = 0.3; // 设置背景透明度
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0; // 重置透明度
}

function drawText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    
    ctx.font = '80px "Ma Shan Zheng", cursive';
    ctx.fillStyle = 'rgba(0, 0, 0, ' + (progress / 100) + ')';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    const charWidth = 100;
    const visibleChars = Math.floor(canvas.width / charWidth);
    const startIndex = Math.floor(scrollPosition / charWidth);
    const endIndex = Math.min(startIndex + visibleChars, text.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const x = (i - startIndex) * charWidth + charWidth / 2 - (scrollPosition % charWidth);
        const y = canvas.height / 2;
        ctx.fillText(text[i], x, y);
    }
}

function animate() {
    if (!isDrawing) return;

    drawText();
    progress += 1;

    if (progress >= 100) {
        progress = 100;
        scrollPosition += 2;
        if (scrollPosition > (text.length - 1) * 100) {
            isDrawing = false;
        }
    }

    requestAnimationFrame(animate);
}

backgroundImage.onload = () => {
    console.log('背景图片加载完成');
    drawBackground();
};

// 预加载字体
document.fonts.ready.then(() => {
    console.log('字体加载完成');
    drawBackground();
});
