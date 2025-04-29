import { BoardType, PieceType, Position, Direction } from "@/types/checkers";

// Преобразование секунд в формат мм:сс
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// Инициализация шашечной доски
export const initializeBoard = (): BoardType => {
  const board: BoardType = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Расставляем черные шашки (в верхней части доски)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = "black";
      }
    }
  }
  
  // Расставляем белые шашки (в нижней части доски)
  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = "white";
      }
    }
  }
  
  return board;
};

// Конвертация строкового ID ячейки в координаты
export const cellIdToPosition = (cellId: string): Position => {
  return cellId.split("-").map(Number) as Position;
};

// Конвертация координат в строковый ID ячейки
export const positionToCellId = (position: Position): string => {
  return position.join("-");
};

// Определение возможных ходов для выбранной ячейки
export const calculatePossibleMoves = (cellId: string, board: BoardType): string[] => {
  const [row, col] = cellIdToPosition(cellId);
  const piece = board[row][col];
  
  if (!piece) return [];
  
  const moves: string[] = [];
  const isKing = piece === "white-king" || piece === "black-king";
  const isWhite = piece === "white" || piece === "white-king";
  
  // Направления движения (для обычных шашек - только вперед, для дамок - в любом направлении)
  const directions: Direction[] = isKing 
    ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] 
    : isWhite ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
  
  // Проверяем простые ходы
  directions.forEach(([dr, dc]) => {
    const newRow = row + dr;
    const newCol = col + dc;
    
    if (isValidPosition([newRow, newCol]) && !board[newRow][newCol]) {
      moves.push(positionToCellId([newRow, newCol]));
    }
  });
  
  // Проверяем взятия
  directions.forEach(([dr, dc]) => {
    const newRow = row + dr * 2;
    const newCol = col + dc * 2;
    const midRow = row + dr;
    const midCol = col + dc;
    
    if (
      isValidPosition([newRow, newCol]) && 
      !board[newRow][newCol] && 
      board[midRow][midCol] && 
      isOpponent(board[midRow][midCol], isWhite)
    ) {
      moves.push(positionToCellId([newRow, newCol]));
    }
  });
  
  return moves;
};

// Проверка валидности позиции
export const isValidPosition = (position: Position): boolean => {
  const [row, col] = position;
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

// Проверка, является ли шашка шашкой противника
export const isOpponent = (piece: PieceType, isWhiteTurn: boolean): boolean => {
  if (!piece) return false;
  
  return isWhiteTurn
    ? piece === "black" || piece === "black-king"
    : piece === "white" || piece === "white-king";
};

// Выполнение хода на доске
export const makeMove = (
  board: BoardType, 
  fromCellId: string, 
  toCellId: string
): BoardType => {
  const [fromRow, fromCol] = cellIdToPosition(fromCellId);
  const [toRow, toCol] = cellIdToPosition(toCellId);
  
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
  
  return newBoard;
};
