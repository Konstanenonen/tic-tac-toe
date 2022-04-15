"use strict";

// Player objec factory function
const Player = (name, marker) => {
  const _name = name;
  const _marker = marker;

  const getName = () => {
    return _name;
  }

  const getMarker = () => {
    return _marker;
  }

  return {
    getName,
    getMarker
  }
}

const player1 = Player("Player1", "X");
const player2 = Player("Player2", "O");

// Module for the gameboard state
const gameboard = (() => {
  let _gameboardArray = [null, null, null, null, null, null, null, null, null];

  const getBoardState = () => {
    return _gameboardArray;
  }

  const updateBoard = (marker, index) => {
    if (_gameboardArray[index] !== null) {
      return;
    }
    _gameboardArray[index] = marker;
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
  }

  const addEventListeners = (player) => {
    const tiles = document.getElementsByClassName("tile");
    const tilesArray = Array.from(tiles);
    tilesArray.forEach((tile, index) => {
      tile.addEventListener("click", () => {
        updateBoard(player.getMarker(), index);
        game.changeTurn();
      });
    })
  }

  return {
    updateBoard,
    getBoardState,
    displayBoard,
    addEventListeners
  }
})();

// Module to display the game state
const game = (() => {
  let _currentPlayer = player1;

  const changeTurn = () => {
    if (_currentPlayer === player1) {
      _currentPlayer = player2;
    } else {
      _currentPlayer = player1;
    }

    gameboard.displayBoard();
    gameboard.addEventListeners(_currentPlayer);
  }

  return {
    changeTurn
  }
})();

game.changeTurn();