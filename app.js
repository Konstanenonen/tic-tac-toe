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

    getBoardState();

    displayController.displayBoard();

    displayController.changeTurn();
  }

  return {
    updateBoard,
    getBoardState
  }
})();

// Module to display the game state
const displayController = (() => {
  let _playerTurn = player1;

  const changeTurn = () => {
    if (_playerTurn === player1) {
      _playerTurn = player2;
    } else {
      _playerTurn = player1;
    }
  }

  const displayBoard = () => {
    const boardContainer = document.querySelector(".gameboard");
    boardContainer.innerHTML = "";
    gameboard.getBoardState().forEach((item, index) => {
      const boardTile = document.createElement("div");
      boardTile.innerText = item;
      boardTile.addEventListener("click", () => {
        gameboard.updateBoard(_playerTurn.getMarker(), index);
      })
      boardContainer.appendChild(boardTile);
    });
  }

  return {
    displayBoard,
    changeTurn
  }
})();

displayController.displayBoard();