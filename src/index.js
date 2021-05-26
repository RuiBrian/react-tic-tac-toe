import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/styles.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // Render board using loops
    return (
      <div className="game-board">
        {Array(3).fill(null).map((item1, i) => {
          return (<div className="board-row" key={i}>
            {Array(3).fill(null).map((item2, j) => {
              return this.renderSquare(3 * i + j)
            })}
          </div>)
        })}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleResetRequest() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // Return early if there is a winner or if square is filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'x' : 'o';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  /* Executes after component is rendered */
  componentDidUpdate() {
    updateScroll();
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const description = move ?
        'move ' + move :
        'game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      )
    });

    let status;
    if (winner) {
      status = 'winner: ' + winner;
    } else if (history.length != 10) {
      status = 'player: ' + (this.state.xIsNext ? 'x' : 'o');
    } else {
      status = 'draw';
    }

    return (
      <div className="game">
        <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game-info">
          <div id="status">{status}</div>
          <div id="history"><ol>{moves}</ol></div>
          <button onClick={() => this.handleResetRequest()} className="resetButton">reset</button>
        </div>
      </div>
    );
  }
}

function updateScroll() {
  let element = document.getElementById("history");
  element.scrollTop = element.scrollHeight;
}

function calculateWinner(squares) {
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
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
