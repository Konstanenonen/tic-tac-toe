"use strict";

// Player object factory function
const Player = (name, marker) => {
  const _name = name;
  const _marker = marker;

  const getName = () => {
    return _name;
  };

  const getMarker = () => {
    return _marker;
  };

  return {
    getName,
    getMarker,
  };
};

const player1 = Player("Player1", "X");
const player2 = Player("Player2", "O");

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
  };
})();

// Module to actually play the game
const game = (() => {
  let _currentPlayer = player1;

  const addEventListeners = (marker) => {
    const tiles = document.getElementsByClassName("tile");
    const tilesArray = Array.from(tiles);
    tilesArray.forEach((tile, index) => {
      if (tile.innerText !== "") {
        return;
      }
      tile.addEventListener("click", () => {
        gameboard.updateBoard(marker, index);
        game.changeTurn();
        game.checkForEnd();
      });
    });
  };

  const changeTurn = () => {
    if (_currentPlayer === player1) {
      _currentPlayer = player2;
    } else {
      _currentPlayer = player1;
    }

    gameboard.displayBoard();
    game.addEventListeners(_currentPlayer.getMarker());
  };

  const checkForEnd = () => {
    const boardState = gameboard.getBoardState();

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
      console.log("Win");
    } else if (boardState.every((tile) => tile !== null)) {
      console.log("It's a tie!");
    }
  };

  return {
    changeTurn,
    addEventListeners,
    checkForEnd,
  };
})();

game.changeTurn();
