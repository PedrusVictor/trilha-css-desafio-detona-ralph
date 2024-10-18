const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        vida: document.querySelector("#vida"),
    },
    values: {
        timeId: null,
        gameVelocity: 1000,

        hitPosition: 0,
        lastPosition: null,
        result: 0,
        currentTime: 60,
        life: 3,
      


    },
    actions: {
        countDownTimeId: setInterval(coutDown, 1000),

    }
};

function resetGame(){
    
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2
    audio.play()
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });


    let randomNumber = (((exc) => {
        let rdn = Math.floor(Math.random() * 9)
        if (rdn === exc) {
            return rdn - exc
        }
        return rdn
    })(state.values.lastPosition))

    let randomSquare = state.view.squares[randomNumber]


    randomSquare.classList.add("enemy")
    state.values.lastPosition = randomNumber
    state.values.hitPosition = randomSquare.id
}

function moveEnemy() {
    state.values.timeId = setInterval(randomSquare, state.values.gameVelocity)
}
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {

            if (square.id === state.values.hitPosition) {

                state.values.result++
                state.view.score.textContent = state.values.result

                state.values.hitPosition = null
                playSound();
            }
            else {

                state.values.life--;
                state.view.vida.textContent ="x"+ state.values.life
                playSound();
            }
        })
    })
}

function coutDown() {



    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime
    if (state.values.currentTime < 1 || state.values.life < 1) {
        
        clearInterval(state.actions.countDownTimeId)
        clearInterval(state.values.timeId)
        alert("game over! O seu resultado foi: " + state.values.result)
        window.location.reload()
    }

}
function initialize() {
   
    state.values.score=0
    state.view.timeLeft.textContent = state.values.currentTime
    state.view.score.textContent = state.values.score
    state.view.vida.textContent = state.values.life
    
    moveEnemy();
    addListenerHitBox();

}

initialize();
