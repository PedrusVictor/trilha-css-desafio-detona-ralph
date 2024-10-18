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

    },
    actions: {
        countDownTimeId: setInterval(coutDown, 1000),

    }
};

function playSound(){
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
    })(state.values.lastPosition) )
    
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
        })
    })
}

function coutDown() {



    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime
    if (state.values.currentTime < 1) {
        alert("game over! O seu resultado foi: " + state.values.result)
        clearInterval(state.actions.countDownTimeId)
    }

}
function initialize() {

    state.view.timeLeft.textContent = state.values.currentTime
    moveEnemy();
    addListenerHitBox();

}

initialize();
