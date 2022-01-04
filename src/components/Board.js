import React from "react";
import Square from "./Square";

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
        {Array(3)
          .fill(null)
          .map((item1, i) => {
            return (
              <div className="board-row" key={i}>
                {Array(3)
                  .fill(null)
                  .map((item2, j) => {
                    return this.renderSquare(3 * i + j);
                  })}
              </div>
            );
          })}
      </div>
    );
  }
}

export default Board;
