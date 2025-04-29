import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/utils/checkersUtils";

interface CheckersStatusProps {
  timeWhite: number;
  timeBlack: number;
  currentTurn: "white" | "black";
}

const CheckersStatus = ({ timeWhite, timeBlack, currentTurn }: CheckersStatusProps) => {
  return (
    <div className="flex justify-between w-full mb-2">
      <Badge 
        variant="outline" 
        className={`px-3 py-1 ${currentTurn === "black" ? "bg-black text-white" : ""}`}
      >
        ⏱ {formatTime(timeBlack)}
      </Badge>
      
      <div className="text-sm font-medium">
        {currentTurn === "white" ? "Ваш ход" : "Ход соперника"}
      </div>
      
      <Badge 
        variant="outline" 
        className={`px-3 py-1 ${currentTurn === "white" ? "bg-primary/10 text-primary" : ""}`}
      >
        ⏱ {formatTime(timeWhite)}
      </Badge>
    </div>
  );
};

export default CheckersStatus;
