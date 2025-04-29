import { PieceType } from "@/types/checkers";

interface CheckersPieceProps {
  type: PieceType;
}

const CheckersPiece = ({ type }: CheckersPieceProps) => {
  if (!type) return null;
  
  let pieceClass = "";
  
  if (type === "white") {
    pieceClass = "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-gray-300 shadow-inner";
  } else if (type === "black") {
    pieceClass = "w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border-2 border-gray-700 shadow-inner";
  } else if (type === "white-king") {
    pieceClass = "w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-yellow-400 shadow-inner";
  } else if (type === "black-king") {
    pieceClass = "w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border-2 border-yellow-400 shadow-inner";
  }

  const isKing = type === "white-king" || type === "black-king";
  
  return (
    <div className={pieceClass}>
      {isKing && <span className="text-yellow-400 font-bold">👑</span>}
    </div>
  );
};

export default CheckersPiece;
