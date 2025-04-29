import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface CheckersBoardProps {
  onMove: (from: string, to: string) => void;
  timeWhite: number;
  timeBlack: number;
  currentTurn: "white" | "black";
}

type PieceType = "white" | "black" | "white-king" | "black-king" | null;
type BoardType = PieceType[][];

// Преобразование секунд в формат мм:сс
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const CheckersBoard = ({ onMove, timeWhite, timeBlack, currentTurn }: CheckersBoardProps) => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [board, setBoard] = useState<BoardType>([]);

  // Инициализация доски
  useEffect(() => {
    const initialBoard: BoardType = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Расставляем черные шашки (в верхней части доски)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          initialBoard[row][col] = "black";
        }
      }
    }
    
    // Расставляем белые шашки (в нижней части доски)
    for (let row = 5; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          initialBoard[row][col] = "white";
        }
      }
    }
    
    setBoard(initialBoard);
  }, []);
  
  // Определяем возможные ходы для выбранной ячейки
  const calculatePossibleMoves = (cellId: string) => {
    const [row, col] = cellId.split("-").map(Number);
    const piece = board[row][col];
    
    if (!piece) return [];
    
    const moves: string[] = [];
    const isKing = piece === "white-king" || piece === "black-king";
    const isWhite = piece === "white" || piece === "white-king";
    
    // Направления движения (для обычных шашек - только вперед, для дамок - в любом направлении)
    const directions = isKing 
      ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] 
      : isWhite ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
    
    // Проверяем простые ходы
    directions.forEach(([dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && !board[newRow][newCol]) {
        moves.push(`${newRow}-${newCol}`);
      }
    });
    
    // Проверяем взятия
    directions.forEach(([dr, dc]) => {
      const newRow = row + dr * 2;
      const newCol = col + dc * 2;
      const midRow = row + dr;
      const midCol = col + dc;
      
      if (
        newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && 
        !board[newRow][newCol] && 
        board[midRow][midCol] && 
        (isWhite ? board[midRow][midCol] === "black" || board[midRow][midCol] === "black-king" 
              : board[midRow][midCol] === "white" || board[midRow][midCol] === "white-king")
      ) {
        moves.push(`${newRow}-${newCol}`);
      }
    });
    
    return moves;
  };
  
  const handleCellClick = (cellId: string) => {
    const [row, col] = cellId.split("-").map(Number);
    const piece = board[row][col];
    
    // Если ячейка уже выбрана, снимаем выбор
    if (selectedCell === cellId) {
      setSelectedCell(null);
      setPossibleMoves([]);
      return;
    }
    
    // Если выбираем ячейку с фигурой текущего игрока
    if (piece && ((piece.includes("white") && currentTurn === "white") || 
                  (piece.includes("black") && currentTurn === "black"))) {
      setSelectedCell(cellId);
      setPossibleMoves(calculatePossibleMoves(cellId));
      return;
    }
    
    // Если выбрана ячейка и кликаем на возможный ход
    if (selectedCell && possibleMoves.includes(cellId)) {
      const [fromRow, fromCol] = selectedCell.split("-").map(Number);
      const [toRow, toCol] = cellId.split("-").map(Number);
      
      // Копируем доску
      const newBoard = board.map(row => [...row]);
      
      // Проверяем, является ли ход взятием
      const isCapture = Math.abs(fromRow - toRow) === 2;
      
      if (isCapture) {
        const midRow = (fromRow + toRow) / 2;
        const midCol = (fromCol + toCol) / 2;
        newBoard[midRow][midCol] = null; // Удаляем взятую шашку
      }
      
      // Перемещаем шашку
      newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = null;
      
      // Проверяем, нужно ли превратить шашку в дамку
      if (newBoard[toRow][toCol] === "white" && toRow === 0) {
        newBoard[toRow][toCol] = "white-king";
      } else if (newBoard[toRow][toCol] === "black" && toRow === 7) {
        newBoard[toRow][toCol] = "black-king";
      }
      
      setBoard(newBoard);
      setSelectedCell(null);
      setPossibleMoves([]);
      
      // Вызываем обработчик хода
      onMove(selectedCell, cellId);
    }
  };
  
  const renderCell = (row: number, col: number) => {
    const cellId = `${row}-${col}`;
    const piece = board[row] && board[row][col];
    const isSelected = selectedCell === cellId;
    const isPossibleMove = possibleMoves.includes(cellId);
    
    const cellClass = `w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative
                     ${(row + col) % 2 === 0 ? 'bg-white' : 'bg-black/80'}
                     ${isSelected ? 'ring-2 ring-yellow-400' : ''}
                     ${isPossibleMove ? 'ring-2 ring-green-400' : ''}`;
    
    let pieceClass = "";
    if (piece === "white") {
      pieceClass = "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-gray-300 shadow-inner";
    } else if (piece === "black") {
      pieceClass = "w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border-2 border-gray-700 shadow-inner";
    } else if (piece === "white-king") {
      pieceClass = "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-yellow-400 shadow-inner";
    } else if (piece === "black-king") {
      pieceClass = "w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border-2 border-yellow-400 shadow-inner";
    }
    
    return (
      <div 
        key={cellId} 
        className={cellClass}
        onClick={() => handleCellClick(cellId)}
      >
        {piece && <div className={pieceClass}>
          {(piece === "white-king" || piece === "black-king") && (
            <span className="text-yellow-400 font-bold">👑</span>
          )}
        </div>}
        
        {/* Координаты для отладки */}
        {/* <span className="absolute bottom-0 right-1 text-xs opacity-50">
          {cellId}
        </span> */}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-2">
        <Badge 
          variant="outline" 
          className={`px-3 py-1 ${currentTurn === "black" ? "bg-black text-white" : ""}`}
        >
          ⏱ {formatTime(timeBlack)}
        </Badge>
        <div className="text-sm">
          {currentTurn === "white" ? "Ваш ход" : "Ход соперника"}
        </div>
        <Badge 
          variant="outline" 
          className={`px-3 py-1 ${currentTurn === "white" ? "bg-primary/10 text-primary" : ""}`}
        >
          ⏱ {formatTime(timeWhite)}
        </Badge>
      </div>
      
      <div className="border-2 border-gray-200 dark:border-gray-700 shadow-md">
        <div className="grid grid-cols-8">
          {Array(8).fill(null).map((_, row) =>
            Array(8).fill(null).map((_, col) => renderCell(row, col))
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckersBoard;