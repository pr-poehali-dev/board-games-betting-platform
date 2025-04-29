import CheckersPiece from "./CheckersPiece";
import { PieceType } from "@/types/checkers";

interface CheckersCellProps {
  cellId: string;
  piece: PieceType;
  isSelected: boolean;
  isPossibleMove: boolean;
  isDarkCell: boolean;
  onClick: (cellId: string) => void;
}

const CheckersCell = ({
  cellId,
  piece,
  isSelected,
  isPossibleMove,
  isDarkCell,
  onClick
}: CheckersCellProps) => {
  const cellClass = `
    w-12 h-12 md:w-16 md:h-16 
    flex items-center justify-center 
    relative
    ${isDarkCell ? 'bg-black/80' : 'bg-white'}
    ${isSelected ? 'ring-2 ring-yellow-400' : ''}
    ${isPossibleMove ? 'ring-2 ring-green-400' : ''}
    transition-all duration-150
  `;

  return (
    <div 
      className={cellClass}
      onClick={() => onClick(cellId)}
    >
      {piece && <CheckersPiece type={piece} />}
      
      {/* Можно раскомментировать для отладки */}
      {/* <span className="absolute bottom-0 right-1 text-xs opacity-50">
        {cellId}
      </span> */}
    </div>
  );
};

export default CheckersCell;
