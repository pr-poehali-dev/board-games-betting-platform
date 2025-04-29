export type PieceType = "white" | "black" | "white-king" | "black-king" | null;
export type BoardType = PieceType[][];
export type Position = [number, number];
export type Direction = [number, number];

export interface CheckersBoardProps {
  onMove: (from: string, to: string) => void;
  timeWhite: number;
  timeBlack: number;
  currentTurn: "white" | "black";
}
