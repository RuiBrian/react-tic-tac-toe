import React, { useState, useEffect } from "react";
import Board from "./Board";

const updateScroll = () => {
  let element = document.getElementById("history");
  element.scrollTop = element.scrollHeight;
};

const calculateWinner = (squares) => {
  // Win conditions
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const initialHistory = [
  {
    squares: Array(9).fill(null),
  },
];

const Game = () => {
  const [history, setHistory] = useState(initialHistory);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    updateScroll();
  }, []);

  const handleResetRequest = () => {
    setHistory(initialHistory);
    setStepNumber(0);
    setXIsNext(true);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const handleClick = (i) => {
    const hist = history.slice(0, stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();

    // Return early if there is a winner or if square is filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "x" : "o";

    setHistory(
      hist.concat([
        {
          squares: squares,
        },
      ]),
    );
    setStepNumber(hist.length);
    setXIsNext(!xIsNext);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((_, move) => {
    const description = move ? "move " + move : "game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  let status = "";
  if (winner) {
    status = "winner: " + winner;
  } else if (history.length !== 10) {
    status = "player: " + (xIsNext ? "x" : "o");
  } else {
    status = "draw";
  }

  return (
    <div className="game">
      <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      <div className="game-info">
        <div id="status">{status}</div>
        <div id="history">
          <ol>{moves}</ol>
        </div>
        <button onClick={() => handleResetRequest()} className="resetButton">
          reset
        </button>
      </div>
    </div>
  );
};

export default Game;
