"use strict";

const Player = (name) => {
  const _name = name;
  
  const getName = () => {
    return _name;
  }

  return {
    getName
  }
}

const gameboard = (() => {
  const _gameboardArray = ["x", null, null, null, "0", "0", "X", "0", "0"];

  const getBoardState = () => {
    return _gameboardArray;
  }

  return {
    getBoardState
  }
})();

const displayController = (() => {
  const displayBoard = () => {
    gameboard.getBoardState().forEach(item => {
      const boardTile = document.createElement("p");
      boardTile.innerText = item;
      document.querySelector(".gameboard").appendChild(boardTile);
    });
  }

  return {
    displayBoard
  }
})();