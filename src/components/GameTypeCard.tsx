import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface GameTypeCardProps {
  title: string;
  description: string;
  image: string;
  playersOnline: number;
  path: string;
  type: "chess" | "checkers";
}

const GameTypeCard = ({ title, description, image, playersOnline, path, type }: GameTypeCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div 
        className="h-48 w-full bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
      />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="outline" className="bg-secondary">
            {playersOnline} онлайн
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted p-3 text-center">
            <div className="text-sm font-medium">Мин. ставка</div>
            <div className="text-lg font-bold">50 ₽</div>
          </div>
          <div className="rounded-lg bg-muted p-3 text-center">
            <div className="text-sm font-medium">Макс. выигрыш</div>
            <div className="text-lg font-bold">10 000 ₽</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={path}>Играть сейчас</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameTypeCard;