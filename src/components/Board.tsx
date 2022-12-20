import Square from "./Square";

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
}

const Board = ({ squares, onClick }: BoardProps) => {
  const createSquare = (i: number, key: number) => {
    return <Square key={key} value={squares[i]} onClick={() => onClick(i)} />;
  };

  // Create board
  const cells = Array(3)
    .fill(null)
    .map((_, i) => {
      return (
        <div className="board-row" key={i}>
          {Array(3)
            .fill(null)
            .map((_, j) => {
              return createSquare(3 * i + j, j);
            })}
        </div>
      );
    });

  return <div className="game-board">{cells}</div>;
};

export default Board;
