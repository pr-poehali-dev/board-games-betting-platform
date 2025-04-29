
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { DollarSignIcon, HelpCircleIcon, HomeIcon } from "lucide-react";
import NavBar from "@/components/NavBar";
import ChessBoard from "@/components/ChessBoard";
import GameChat from "@/components/GameChat";

const ChessGame = () => {
  const navigate = useNavigate();
  const [timeWhite, setTimeWhite] = useState(300); // 5 минут в секундах
  const [timeBlack, setTimeBlack] = useState(300);
  const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");
  const [gameState, setGameState] = useState<"waiting" | "playing" | "finished">("waiting");
  const [stakeAmount, setStakeAmount] = useState(200); // Сумма ставки
  const [opponent, setOpponent] = useState({
    name: "Михаил П.",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 1850
  });
  
  useEffect(() => {
    // Симуляция поиска соперника
    const timeout = setTimeout(() => {
      setGameState("playing");
      
      // Запускаем таймер
      const timer = setInterval(() => {
        if (currentTurn === "white") {
          setTimeWhite(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setGameState("finished");
              return 0;
            }
            return prev - 1;
          });
        } else {
          setTimeBlack(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setGameState("finished");
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [currentTurn]);
  
  const handleMove = (from: string, to: string) => {
    // В реальном приложении здесь был бы код для проверки хода и отправки на сервер
    console.log(`Move from ${from} to ${to}`);
    
    // Меняем ход после каждого хода
    setCurrentTurn(prev => prev === "white" ? "black" : "white");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto max-w-6xl py-6 px-4">
        {gameState === "waiting" ? (
          <Card className="max-w-md mx-auto p-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-2xl font-bold">Поиск соперника</div>
              <div className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="h-4 bg-muted rounded w-36"></div>
                </div>
              </div>
              <Progress value={65} className="w-full" />
              <p className="text-center text-muted-foreground">
                Поиск соперника с рейтингом 1800-1900...
              </p>
              <Button variant="outline" onClick={() => navigate("/")}>
                Отменить поиск
              </Button>
            </div>
          </Card>
        ) : gameState === "playing" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                  <HomeIcon className="mr-2 h-4 w-4" />
                  На главную
                </Button>
                <Badge variant="outline" className="text-md bg-primary/10 font-medium">
                  <DollarSignIcon className="mr-2 h-4 w-4" />
                  Ставка: {stakeAmount} ₽
                </Badge>
                <Button variant="outline" size="sm">
                  <HelpCircleIcon className="mr-2 h-4 w-4" />
                  Правила
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  {/* Информация о верхнем игроке (черные) */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={opponent.avatar} />
                        <AvatarFallback>МП</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{opponent.name}</div>
                        <div className="text-sm text-muted-foreground">Рейтинг: {opponent.rating}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-black text-white">
                      Черные
                    </Badge>
                  </div>
                  
                  <ChessBoard 
                    onMove={handleMove} 
                    timeWhite={timeWhite} 
                    timeBlack={timeBlack} 
                    currentTurn={currentTurn} 
                  />
                  
                  {/* Информация о нижнем игроке (белые) */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                        <AvatarFallback>ВЫ</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Вы</div>
                        <div className="text-sm text-muted-foreground">Рейтинг: 1830</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-white text-black border-2">
                      Белые
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-full">
              <div className="sticky top-20">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Информация об игре</h3>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ставка:</span>
                        <span className="font-medium">{stakeAmount} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Возможный выигрыш:</span>
                        <span className="font-medium text-green-600">{(stakeAmount * 1.9).toFixed(0)} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Контроль времени:</span>
                        <span className="font-medium">5 мин</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID игры:</span>
                        <span className="text-sm">CHS-{Math.floor(10000 + Math.random() * 90000)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="h-[400px]">
                  <GameChat opponentName={opponent.name} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card className="max-w-md mx-auto p-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-2xl font-bold">Игра завершена</div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <div className="text-xl font-medium">Победитель: {opponent.name}</div>
                <div className="text-muted-foreground mt-2">Время истекло</div>
              </div>
              <div className="flex justify-between w-full">
                <div className="text-center">
                  <div className="text-muted-foreground">Изменение рейтинга</div>
                  <div className="text-red-500 font-medium">-15</div>
                </div>
                <div className="text-center">
                  <div className="text-muted-foreground">Выигрыш</div>
                  <div className="text-red-500 font-medium">0 ₽</div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate("/")}>
                  На главную
                </Button>
                <Button onClick={() => {
                  setTimeWhite(300);
                  setTimeBlack(300);
                  setCurrentTurn("white");
                  setGameState("waiting");
                }}>
                  Новая игра
                </Button>
              </div>
            </div>
          </Card>
        )}
      </main>
      
      <footer className="bg-card border-t py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Шахматы & Шашки. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChessGame;
