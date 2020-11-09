import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.PureComponent {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
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
      date: "",
      time: "",
      text: "",
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  componentDidMount() {
    // const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
    const apiUrl = 'http://192.168.1.9:3000/test';
    fetch(apiUrl)
      .then(response => response.json())
      // .then(data => this.setState({ data }));
      .then(data => {
        console.log('This is your data', data);
        this.setState({ 
          date: data.Date,
          time: data.Time,
          text: data.Text,
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } 

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // Map over each element in the board history.
    // The first parameter is the board and the second parameter is the index.
    const moves = history.map((board, move) => {
      let desc;
      if (move > 0) {
        const prevBoard = history[move - 1];
        const { row, col } = findChangedMove(board.squares, prevBoard.squares);
        desc = 'Go to move #' + move + ' (' + row + ', ' + col + ')';
      } else {
        desc = 'Go to game start';
      }
      const fontWeight = move === this.state.stepNumber ? 'bold' : 'normal';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            style={{fontWeight : fontWeight}}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.stepNumber === 9) {
      status = 'Game ends in a draw.';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{this.state.date}</div>
          <div>{this.state.time}</div>
          <div>{this.state.text}</div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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

function findChangedMove(squares, prevSquares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] !== prevSquares[i]) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      return {row, col};
    }
  }
  throw new Error("Not possible");
}

