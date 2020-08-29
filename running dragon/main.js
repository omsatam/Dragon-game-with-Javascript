cross = true;
score = 0;


game = new Audio('sounds/gamesound1.mp3');
jump = new Audio('sounds/jump.mp3');
gameend = new Audio('sounds/kill.mp3');

setTimeout(() =>{
    game.play()
},1000);

// Navigating the DOM for updating score and gameover
scoreContainer = document.querySelector('.score');
gameover = document.getElementById('gameover');


document.onkeydown = function (e) {
    hero = document.querySelector('#hero');
    console.log("Key code is: ", e.keyCode)
    // For jumping our hero to avoid obstacle
    if (e.keyCode == 38) {
        jump.play()
        hero.classList.add('animatehero');
        setTimeout(() => {
            hero.classList.remove('animatehero');
        }, 900);
    }
    // For moving our hero forward
    if (e.keyCode == 39) {
        heroX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
        if (heroX < 1290)
        hero.style.left = heroX + 40 + "px";
    }
    // For moving our hero backward
    if (e.keyCode == 37) {
        heroX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
        console.log(heroX);
        if (heroX > 10){
        hero.style.left = (heroX - 40) + "px";
        }
    }
}

// Function for checking the collision of our characters
setInterval(() => {
    hero = document.querySelector('#hero');
    villain = document.querySelector('.villain');
    // Calculating the left and top distance of hero
    dx = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(hero, null).getPropertyValue('top'));
    // console.log(dx,dy);

    // Calculating the left and top distance of villain
    ox = parseInt(window.getComputedStyle(villain, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(villain, null).getPropertyValue('top'));
    // console.log(ox,oy); 

    // Checking distance between our hero and villain
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)

    // Setting a suitable threshold to see the collision
    if (offsetX < 150 && offsetY < 120) {
        gameend.play();
        gameover.innerHTML = "Game Over - Reload to Try Again";
        villain.classList.remove('animatevillain');
        
        game.pause();
        setTimeout(() => {
              gameend.pause();
          //  game.pause();
        }, 850);
    }

    // If collision is not there then for updating score
    else if (offsetX < 160 && cross) {
        score += 1;
        // console.log(score);
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1200);

        // For increasing the speed of our villain by reducing the animation speed
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(villain, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            villain.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 100);

// Function for updating score
function updateScore(score) {
    scoreContainer.innerHTML = `Your Score:  ${score}`;
}
