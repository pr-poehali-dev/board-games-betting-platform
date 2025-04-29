
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Piece = {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  color: "white" | "black";
}

type Square = {
  piece: Piece | null;
  position: string;
}

const initialBoard: Square[][] = Array(8).fill(null).map((_, rankIdx) => {
  return Array(8).fill(null).map((_, fileIdx) => {
    const position = `${String.fromCharCode(97 + fileIdx)}${8 - rankIdx}`;
    let piece: Piece | null = null;
    
    // Пешки
    if (rankIdx === 1) piece = { type: "pawn", color: "black" };
    if (rankIdx === 6) piece = { type: "pawn", color: "white" };
    
    // Ладьи
    if ((rankIdx === 0 || rankIdx === 7) && (fileIdx === 0 || fileIdx === 7)) {
      piece = { type: "rook", color: rankIdx === 0 ? "black" : "white" };
    }
    
    // Кони
    if ((rankIdx === 0 || rankIdx === 7) && (fileIdx === 1 || fileIdx === 6)) {
      piece = { type: "knight", color: rankIdx === 0 ? "black" : "white" };
    }
    
    // Слоны
    if ((rankIdx === 0 || rankIdx === 7) && (fileIdx === 2 || fileIdx === 5)) {
      piece = { type: "bishop", color: rankIdx === 0 ? "black" : "white" };
    }
    
    // Ферзи
    if ((rankIdx === 0 || rankIdx === 7) && fileIdx === 3) {
      piece = { type: "queen", color: rankIdx === 0 ? "black" : "white" };
    }
    
    // Короли
    if ((rankIdx === 0 || rankIdx === 7) && fileIdx === 4) {
      piece = { type: "king", color: rankIdx === 0 ? "black" : "white" };
    }
    
    return { piece, position };
  });
});

interface ChessBoardProps {
  onMove?: (from: string, to: string) => void;
  timeWhite: number;
  timeBlack: number;
  currentTurn: "white" | "black";
}

const ChessBoard = ({ onMove, timeWhite, timeBlack, currentTurn }: ChessBoardProps) => {
  const [board, setBoard] = useState<Square[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const getPieceIcon = (piece: Piece): string => {
    const icons = {
      pawn: { white: "♙", black: "♟" },
      rook: { white: "♖", black: "♜" },
      knight: { white: "♘", black: "♞" },
      bishop: { white: "♗", black: "♝" },
      queen: { white: "♕", black: "♛" },
      king: { white: "♔", black: "♚" }
    };
    
    return icons[piece.type][piece.color];
  };
  
  const handleSquareClick = (position: string) => {
    // Если уже выбрана клетка
    if (selectedSquare) {
      // Найдем координаты выбранной клетки
      const [fromRank, fromFile] = selectedSquare.split("");
      const fromRankIdx = 8 - parseInt(fromFile);
      const fromFileIdx = fromRank.charCodeAt(0) - 97;
      
      // Найдем координаты целевой клетки
      const [toRank, toFile] = position.split("");
      const toRankIdx = 8 - parseInt(toFile);
      const toFileIdx = toRank.charCodeAt(0) - 97;
      
      // Проверим, что цель - это не та же самая клетка
      if (selectedSquare === position) {
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }
      
      // Проверим, что цель - это один из возможных ходов
      if (possibleMoves.includes(position)) {
        // Копируем доску
        const newBoard = [...board.map(rank => [...rank])];
        
        // Переместим фигуру
        newBoard[toRankIdx][toFileIdx].piece = newBoard[fromRankIdx][fromFileIdx].piece;
        newBoard[fromRankIdx][fromFileIdx].piece = null;
        
        setBoard(newBoard);
        setSelectedSquare(null);
        setPossibleMoves([]);
        
        // Вызов колбэка после хода
        if (onMove) onMove(selectedSquare, position);
      } else {
        // Если клик по своей фигуре, выбираем ее
        const square = board[toRankIdx][toFileIdx];
        if (square.piece && square.piece.color === currentTurn) {
          setSelectedSquare(position);
          // Здесь должна быть логика для определения возможных ходов
          // В простом примере просто разрешим ходить на 1 клетку в любом направлении
          const possiblePositions = [];
          for (let dr = -1; dr <= 1; dr++) {
            for (let df = -1; df <= 1; df++) {
              if (dr === 0 && df === 0) continue;
              
              const newRankIdx = toRankIdx + dr;
              const newFileIdx = toFileIdx + df;
              
              if (newRankIdx >= 0 && newRankIdx < 8 && newFileIdx >= 0 && newFileIdx < 8) {
                const newPos = `${String.fromCharCode(97 + newFileIdx)}${8 - newRankIdx}`;
                possiblePositions.push(newPos);
              }
            }
          }
          setPossibleMoves(possiblePositions);
        } else {
          setSelectedSquare(null);
          setPossibleMoves([]);
        }
      }
    } else {
      // Найдем координаты клетки
      const [rank, file] = position.split("");
      const rankIdx = 8 - parseInt(file);
      const fileIdx = rank.charCodeAt(0) - 97;
      
      // Проверим, что на клетке есть фигура текущего игрока
      const square = board[rankIdx][fileIdx];
      if (square.piece && square.piece.color === currentTurn) {
        setSelectedSquare(position);
        
        // Здесь должна быть логика для определения возможных ходов
        // В простом примере просто разрешим ходить на 1 клетку в любом направлении
        const possiblePositions = [];
        for (let dr = -1; dr <= 1; dr++) {
          for (let df = -1; df <= 1; df++) {
            if (dr === 0 && df === 0) continue;
            
            const newRankIdx = rankIdx + dr;
            const newFileIdx = fileIdx + df;
            
            if (newRankIdx >= 0 && newRankIdx < 8 && newFileIdx >= 0 && newFileIdx < 8) {
              const newPos = `${String.fromCharCode(97 + newFileIdx)}${8 - newRankIdx}`;
              possiblePositions.push(newPos);
            }
          }
        }
        setPossibleMoves(possiblePositions);
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        <div className={cn(
          "px-4 py-2 rounded-md font-mono text-lg",
          currentTurn === "black" ? "bg-primary/10 font-bold" : "bg-muted"
        )}>
          ♚ {formatTime(timeBlack)}
        </div>
        <div className="px-4 py-2 rounded-md bg-muted">
          {currentTurn === "white" ? "Ваш ход" : "Ход соперника"}
        </div>
        <div className={cn(
          "px-4 py-2 rounded-md font-mono text-lg",
          currentTurn === "white" ? "bg-primary/10 font-bold" : "bg-muted"
        )}>
          ♔ {formatTime(timeWhite)}
        </div>
      </div>
      
      <div className="grid grid-cols-8 border border-border">
        {board.map((rank, rankIdx) => 
          rank.map((square, fileIdx) => {
            const isBlack = (rankIdx + fileIdx) % 2 === 1;
            const isSelected = selectedSquare === square.position;
            const isPossibleMove = possibleMoves.includes(square.position);
            
            return (
              <div 
                key={square.position}
                className={cn(
                  "w-14 h-14 flex items-center justify-center text-3xl cursor-pointer relative",
                  isBlack ? "bg-gray-700" : "bg-yellow-50",
                  isSelected && "ring-2 ring-primary bg-primary/20",
                  isPossibleMove && "ring-2 ring-primary/50"
                )}
                onClick={() => handleSquareClick(square.position)}
              >
                {square.piece && getPieceIcon(square.piece)}
                
                {/* Координаты клетки */}
                {(rankIdx === 7) && (
                  <div className="absolute bottom-0 right-1 text-xs text-gray-500">
                    {String.fromCharCode(97 + fileIdx)}
                  </div>
                )}
                {(fileIdx === 0) && (
                  <div className="absolute top-0 left-1 text-xs text-gray-500">
                    {8 - rankIdx}
                  </div>
                )}
                
                {/* Индикатор возможного хода */}
                {isPossibleMove && !square.piece && (
                  <div className="absolute w-3 h-3 rounded-full bg-primary/40"></div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      <div className="mt-4 w-full flex justify-between">
        <Button variant="outline" size="sm">
          Предложить ничью
        </Button>
        <Button variant="destructive" size="sm">
          Сдаться
        </Button>
      </div>
    </div>
  );
};

export default ChessBoard;
