var gameBoardIds = [["0","1","2","3"],
                    ["4","5","6","7"],
                    ["8","9","10","11"],
                    ["12","13","14","15"]];

var gameBoardValues = [[null,null,null,null],
                        [null,null,null,null],
                        [null,null,null,null],
                        [null,null,null,null]];


addRandomValue();
document.addEventListener('keyup',logKey);

var myVal = document.getElementById('num');

var started = false;
var score = 0

function logKey(e) {
    if(!started) {
        document.getElementById('label').innerHTML = "Score:"
        document.getElementById('score').innerHTML = score;
    }
    switch (e.code) {
        case 'ArrowDown':
            console.log('Down');
            sumDown();
            moveDown();
            break;
        case 'ArrowUp':
            console.log('Up')
            sumUp();
            moveUp();
            break;
        case 'ArrowLeft':
            console.log('Left');
            sumLeft();
            moveLeft();
            break;
        case 'ArrowRight':
            console.log('Right');
            sumRight();
            moveRight();
            break;            
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * 4);
}

function addRandomValue() {
    var count = 0;
    for (arr_index in gameBoardValues) {
        if (gameBoardValues[arr_index].includes(null)) {
            count++;
        }
    }
    if (count == 0) {
        console.log(count);
        return 0;
        // document.removeEventListener('keyup',logKey);
        // gameOver();
    }
    do {
        var i = getRandomInt();
        var j = getRandomInt();
    }while(gameBoardValues[i][j]);
    gameBoardValues[i][j] = 2;
    updateBoard(gameBoardIds[i][j],gameBoardValues[i][j]);
    // if (count == 1) {
    //     console.log(0);
    //     document.removeEventListener('keyup',logKey);
    //     gameOver();
    // }
}

function gameOver() {
    document.getElementById('label').innerHTML = "Your score was " + String(score);
    document.getElementById('score').innerHTML = "Refresh page to play again!";
}

function updateBoard(id,val) {
    var gameSpace = document.getElementById(id);
    gameSpace.innerHTML = "<p>" + String(val) + "</p>";
}

function redrawBoard() {
    document.getElementById('score').innerHTML = score;
    for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            if (gameBoardValues[i][j]) {
                updateBoard(gameBoardIds[i][j],gameBoardValues[i][j]);
            }else{
                var gameSpace = document.getElementById(gameBoardIds[i][j]);
                gameSpace.innerHTML = "";
            }
        }
    }
}

function moveDown() {
    for (var j=0; j < 4; j++) {
        for (var i=3; i > 0; i--) {
            if (gameBoardValues[i][j]) {
                continue;
            }
            for (var k=i-1; k>-1; k--) {
                if (!gameBoardValues[k][j]){
                    continue;
                }
                gameBoardValues[i][j] = gameBoardValues[k][j];
                gameBoardValues[k][j] = null;
                break;
            }
        }
    }
    redrawBoard();
    addRandomValue();
}

function moveUp() {
    for (var j=0; j < 4; j++) {
        for (var i=0; i < 3; i++) {
            if (gameBoardValues[i][j]) {
                continue;
            }
            for (var k=i+1; k<4; k++) {
                if (!gameBoardValues[k][j]){
                    continue;
                }
                gameBoardValues[i][j] = gameBoardValues[k][j];
                gameBoardValues[k][j] = null;
                break;
            }
        }
    }
    redrawBoard();
    addRandomValue();
}

function moveLeft() {
    for (var i=0; i < 4; i++) {
        for (var j=0; j < 3; j++) {
            if (gameBoardValues[i][j]) {
                continue;
            }
            for (var k=j+1; k<4; k++) {
                if (!gameBoardValues[i][k]){
                    continue;
                }
                gameBoardValues[i][j] = gameBoardValues[i][k];
                gameBoardValues[i][k] = null;
                break;
            }
        }
    }
    redrawBoard();
    addRandomValue();
}

function moveRight() {
    for (var i=0; i < 4; i++) {
        for (var j=3; j > 0; j--) {
            if (gameBoardValues[i][j]) {
                continue;
            }
            for (var k=j-1; k>-1; k--) {
                if (!gameBoardValues[i][k]){
                    continue;
                }
                gameBoardValues[i][j] = gameBoardValues[i][k];
                gameBoardValues[i][k] = null;
                break;
            }
        }
    }
    redrawBoard();
    addRandomValue();
}

function sumDown() {
    for (var j=0; j<4; j++) {
        for (var i=3; i>0; i--) {
            if(gameBoardValues[i][j]) {
                for (var k=i-1; k>-1; k--) {
                    if(gameBoardValues[k][j]) {
                        if(gameBoardValues[i][j]==gameBoardValues[k][j]) {
                            gameBoardValues[i][j] += gameBoardValues[k][j];
                            gameBoardValues[k][j] = null;
                            score += gameBoardValues[i][j];
                            i=k;
                        }
                        break;
                    }
                }
            }
        }
    }
}

function sumUp() {
    for (var j=0; j<4; j++) {
        for (var i=0; i<3; i++) {
            if(gameBoardValues[i][j]) {
                for (var k=i+1; k<4; k++) {
                    if(gameBoardValues[k][j]) {
                        if(gameBoardValues[i][j]==gameBoardValues[k][j]) {
                            gameBoardValues[i][j] += gameBoardValues[k][j];
                            gameBoardValues[k][j] = null;
                            score += gameBoardValues[i][j];
                            i=k;
                        }
                        break;
                    }
                }
            }
        }
    }
}

function sumLeft() {
    for (var i=0; i<4; i++) {
        for (var j=0; j<3; j++) {
            if(gameBoardValues[i][j]) {
                for (var k=j+1; k<4; k++) {
                    if(gameBoardValues[i][k]) {
                        if(gameBoardValues[i][j]==gameBoardValues[i][k]) {
                            gameBoardValues[i][j] += gameBoardValues[i][k];
                            gameBoardValues[i][k] = null;
                            score += gameBoardValues[i][j];
                            j=k;
                        }
                        break;
                    }
                }
            }
        }
    }
}

function sumRight() {
    for (var i=0; i<4; i++) {
        for (var j=3; j>0; j--) {
            if(gameBoardValues[i][j]) {
                for (var k=j-1; k>-1; k--) {
                    if(gameBoardValues[i][k]) {
                        if(gameBoardValues[i][j]==gameBoardValues[i][k]) {
                            gameBoardValues[i][j] += gameBoardValues[i][k];
                            gameBoardValues[i][k] = null;
                            score += gameBoardValues[i][j];
                            j=k;
                        }
                        break;
                    }
                }
            }
        }
    }
}