"use strict";

// Player object factory function
const Player = (name, marker) => {
  let _name = name;
  const _marker = marker;

  const getName = () => {
    return _name;
  };

  const getMarker = () => {
    return _marker;
  };

  const setName = (name) => {
    _name = name;
  }

  return {
    getName,
    setName,
    getMarker,
  };
};

// Module for the gameboard state
const gameboard = (() => {
  let _gameboardArray = [null, null, null, null, null, null, null, null, null];

  const getBoardState = () => {
    return _gameboardArray;
  };

  const updateBoard = (marker, index) => {
    if (_gameboardArray[index] !== null) {
      return;
    }
    _gameboardArray[index] = marker;
  };

  const resetBoard = () => {
    _gameboardArray = [null, null, null, null, null, null, null, null, null];
  }

  const displayBoard = () => {
    const boardContainer = document.querySelector(".gameboard");
    boardContainer.innerHTML = "";
    gameboard.getBoardState().forEach((item) => {
      const boardTile = document.createElement("div");
      boardTile.classList.add("tile");
      boardTile.innerText = item;
      boardContainer.appendChild(boardTile);
    });
  };

  return {
    updateBoard,
    getBoardState,
    displayBoard,
    resetBoard
  };
})();

// Module to actually play the game
const game = (() => {
  const _player1 = Player("Player 1", "X");
  const _player2 = Player("Player 2", "O");
  let _currentPlayer = _player1;

  const addEventListeners = () => {
    const tiles = document.getElementsByClassName("tile");
    const tilesArray = Array.from(tiles);

    tilesArray.forEach((tile, index) => {
      if (tile.innerText !== "") {
        return;
      }

      tile.addEventListener("click", () => {
        gameboard.updateBoard(_currentPlayer.getMarker(), index);
        gameboard.displayBoard();
        game.checkForEnd();
        game.changeTurn();
      });
    });
  };

  const changeTurn = () => {
    if (_currentPlayer === _player1) {
      _currentPlayer = _player2;
    } else {
      _currentPlayer = _player1;
    }

    game.addEventListeners();
  };

  const checkForEnd = () => {
    const boardState = gameboard.getBoardState();
    const endingText = document.createElement("p");
    endingText.classList.add("end-text");

    if (
      (boardState[0] === boardState[1] && boardState[1] === boardState[2] && boardState[1] !== null) ||
      (boardState[3] === boardState[4] && boardState[4] === boardState[5] && boardState[4] !== null) ||
      (boardState[6] === boardState[7] && boardState[7] === boardState[8] && boardState[7] !== null) ||
      (boardState[0] === boardState[3] && boardState[3] === boardState[6] && boardState[3] !== null) ||
      (boardState[1] === boardState[4] && boardState[4] === boardState[7] && boardState[4] !== null) ||
      (boardState[2] === boardState[5] && boardState[5] === boardState[8] && boardState[5] !== null) ||
      (boardState[0] === boardState[4] && boardState[4] === boardState[8] && boardState[4] !== null) ||
      (boardState[2] === boardState[4] && boardState[4] === boardState[6] && boardState[4] !== null)
    ) {
      endingText.innerText = `${_currentPlayer.getName()} wins the game!`;
      document.querySelector(".ending-area").appendChild(endingText);

      setTimeout(() => {
        document.querySelector(".gameboard").classList.add("hide");
        document.querySelector(".game-form").classList.remove("hide");
        document.querySelector(".first").innerText = "Player 1 = X"
        document.querySelector(".second").innerText = "Player 2 = O"
      }, 2000);
    } else if (boardState.every((tile) => tile !== null)) {
      endingText.innerText = "It is a Tie!";
      document.querySelector(".ending-area").appendChild(endingText);

      setTimeout(() => {
        document.querySelector(".gameboard").classList.add("hide");
        document.querySelector(".game-form").classList.remove("hide");
        document.querySelector(".first").innerText = "Player 1 = X"
        document.querySelector(".second").innerText = "Player 2 = O"
      }, 2000);
    }
  };

  const startGame = () => {
    document.querySelector(".game-form").addEventListener("submit", (event) => {
      event.preventDefault();

      document.querySelector(".gameboard").classList.remove("hide");
      document.querySelector(".game-form").classList.add("hide");
      document.querySelector(".ending-area").innerHTML = "";

      _currentPlayer = _player1;
      gameboard.resetBoard();
      gameboard.displayBoard();
      game.addEventListeners();

      _player1.setName(document.getElementById("player1").value);
      _player2.setName(document.getElementById("player2").value);

      document.querySelector(".first").innerText = `${_player1.getName()} = ${_player1.getMarker()}`;
      document.querySelector(".second").innerText = `${_player2.getName()} = ${_player2.getMarker()}`;
    })
  }

  return {
    changeTurn,
    addEventListeners,
    checkForEnd,
    startGame
  };
})();

game.startGame();