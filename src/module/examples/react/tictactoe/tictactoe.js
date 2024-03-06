/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/* eslint-disable no-restricted-syntax */

import { html } from "https://esm.sh/htm@3.1.1/react";
import { createRoot } from "https://esm.sh/react-dom@18.2.0";
import { useState } from "https://esm.sh/react@18.2.0";

const calculateWinner = (squares) => {
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
    for (const [a, b, c] of lines) {
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return undefined;
};

const Square = ({ value, onSquareClick }) => {
    return html`
        <button className="square" onClick=${onSquareClick}>${value}</button>
    `;
};

const Board = ({ xIsNext, squares, onPlay }) => {
    const handleClick = (i) => {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return html`
        <div className="status">${status}</div>
        <div className="board-row">
            <${Square}
                value=${squares[0]}
                onSquareClick=${() => handleClick(0)}
            />
            <${Square}
                value=${squares[1]}
                onSquareClick=${() => handleClick(1)}
            />
            <${Square}
                value=${squares[2]}
                onSquareClick=${() => handleClick(2)}
            />
        </div>
        <div className="board-row">
            <${Square}
                value=${squares[3]}
                onSquareClick=${() => handleClick(3)}
            />
            <${Square}
                value=${squares[4]}
                onSquareClick=${() => handleClick(4)}
            />
            <${Square}
                value=${squares[5]}
                onSquareClick=${() => handleClick(5)}
            />
        </div>
        <div className="board-row">
            <${Square}
                value=${squares[6]}
                onSquareClick=${() => handleClick(6)}
            />
            <${Square}
                value=${squares[7]}
                onSquareClick=${() => handleClick(7)}
            />
            <${Square}
                value=${squares[8]}
                onSquareClick=${() => handleClick(8)}
            />
        </div>
    `;
};

const Game = () => {
    const [history, setHistory] = useState([
        Array.from({ length: 9 }).fill(undefined),
    ]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = 0 === currentMove % 2;
    const currentSquares = history[currentMove];

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove);
    };

    const moves = history.map((_square, move) => {
        let description;
        if (0 < move) {
            description = `Go to move #${move}`;
        } else {
            description = "Go to game start";
        }
        return html`
            <li key=${move}>
                <button onClick=${() => jumpTo(move)}>${description}</button>
            </li>
        `;
    });

    return html`
        <div className="game">
            <div className="game-board">
                <${Board}
                    xIsNext=${xIsNext}
                    squares=${currentSquares}
                    onPlay=${handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>
                    ${moves}
                </ol>
            </div>
        </div>
    `;
};

export default class TicTacToeModule extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: "open" });

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = import.meta.resolve("./tictactoe.css");
        this.shadowRoot.append(link);

        createRoot(this.shadowRoot).render(html`<${Game} />`);
    }
}
