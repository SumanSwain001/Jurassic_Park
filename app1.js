let dino = document.querySelector(".dino");
let gameOver = document.querySelector(".gameOver");
let obstacle = document.querySelector(".obstacle");
let obstacleAni = document.querySelector(".obstacleAni");
let scoreContent = document.querySelector(".scoreContent");

score = 0;
cross = true;

audio = new Audio('music.mp3');
audiodie = new Audio('gameover.mp3');
// setTimeout(()=>{
audio.play();
// },1000);

document.onkeydown = (e) => {
    console.log("Key code is:", e);
    if (e.key == "ArrowUp") {
        dino.classList.add("animateDino");
        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 700);
    }

    if (e.key == "ArrowRight") {
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox + 110 + 'px';
    }

    if (e.key == "ArrowLeft") {
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox - 110 + 'px';
    }

}

setInterval(() => {
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 93 && offsetY < 52) {
        gameOver.innerHTML = 'Game Over, Reload to play again.';
        obstacle.classList.remove("obstacleAni");
        audiodie.play();
        audio.pause();
        setTimeout(() => {
            audiodie.pause();
        }, 1000);
        dino.classList.add("downDino");
        dino.style.bottom = -115 + 'px'
    }
    else if (offsetX < 100 && cross) {
        score++
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.01;
            obstacle.style.animationDuration = newDur + 's';
            console.log("New animation duration :", newDur);
        }, 500);
    }

}, 10);

let updateScore = (score) => {
    scoreContent.innerHTML = "Your Score: " + score;
}
