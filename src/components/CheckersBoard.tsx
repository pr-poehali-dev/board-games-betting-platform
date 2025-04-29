import { useState, useEffect } from "react";
import { BoardType } from "@/types/checkers";
import { 
  initializeBoard, 
  calculatePossibleMoves, 
  makeMove, 
  cellIdToPosition 
} from "@/utils/checkersUtils";
import CheckersCell from "./checkers/CheckersCell";
import CheckersStatus from "./checkers/CheckersStatus";

interface CheckersBoardProps {
  onMove: (from: string, to: string) => void;
  timeWhite: number;
  timeBlack: number;
  currentTurn: "white" | "black";
}

const CheckersBoard = ({ 
  onMove, 
  timeWhite, 
  timeBlack, 
  currentTurn 
}: CheckersBoardProps) => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [board, setBoard] = useState<BoardType>([]);

  // Инициализация доски
  useEffect(() => {
    setBoard(initializeBoard());
  }, []);
  
  const handleCellClick = (cellId: string) => {
    const [row, col] = cellIdToPosition(cellId);
    const piece = board[row]?.[col];
    
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
      setPossibleMoves(calculatePossibleMoves(cellId, board));
      return;
    }
    
    // Если выбрана ячейка и кликаем на возможный ход
    if (selectedCell && possibleMoves.includes(cellId)) {
      // Выполняем ход
      const newBoard = makeMove(board, selectedCell, cellId);
      setBoard(newBoard);
      
      // Сбрасываем выбор
      setSelectedCell(null);
      setPossibleMoves([]);
      
      // Вызываем обработчик хода
      onMove(selectedCell, cellId);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <CheckersStatus 
        timeWhite={timeWhite}
        timeBlack={timeBlack}
        currentTurn={currentTurn}
      />
      
      <div className="border-2 border-gray-200 dark:border-gray-700 shadow-md">
        <div className="grid grid-cols-8">
          {Array(8).fill(null).map((_, row) =>
            Array(8).fill(null).map((_, col) => {
              const cellId = `${row}-${col}`;
              return (
                <CheckersCell
                  key={cellId}
                  cellId={cellId}
                  piece={board[row]?.[col]}
                  isSelected={selectedCell === cellId}
                  isPossibleMove={possibleMoves.includes(cellId)}
                  isDarkCell={(row + col) % 2 === 1}
                  onClick={handleCellClick}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckersBoard;
