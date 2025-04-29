import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { DollarSignIcon, TrophyIcon, UsersIcon, SearchIcon, ChevronRightIcon } from "lucide-react";
import NavBar from "@/components/NavBar";
import GameTypeCard from "@/components/GameTypeCard";
import PlayerMatchmaking from "@/components/PlayerMatchmaking";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"chess" | "checkers">("chess");

  // Топ игроки - данные для примера
  const topPlayers = [
    { id: 1, name: "Александр В.", avatar: "https://i.pravatar.cc/150?img=1", rating: 2345, winnings: 125000 },
    { id: 2, name: "Елена К.", avatar: "https://i.pravatar.cc/150?img=5", rating: 2280, winnings: 98500 },
    { id: 3, name: "Михаил П.", avatar: "https://i.pravatar.cc/150?img=3", rating: 2210, winnings: 86700 },
  ];

  // Активные игры - данные для примера
  const liveGames = [
    { id: 1, player1: "Игорь С.", player2: "Анна Д.", stake: 500, type: "chess" },
    { id: 2, player1: "Сергей М.", player2: "Ольга В.", stake: 1000, type: "checkers" },
    { id: 3, player1: "Петр К.", player2: "Мария Л.", stake: 750, type: "chess" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero секция */}
      <section className="hero-gradient py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Играйте в шахматы и шашки <span className="text-primary">на реальные деньги</span>
              </h1>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                Проверьте свои навыки, соревнуйтесь с игроками со всего мира и выигрывайте!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  Начать игру
                </Button>
                <Button variant="outline" size="lg">
                  Как это работает
                </Button>
              </div>
              
              <div className="flex items-center mt-8 gap-6">
                <div className="flex items-center">
                  <UsersIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>1200+ игроков онлайн</span>
                </div>
                <div className="flex items-center">
                  <DollarSignIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>От 50₽ за игру</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1588412079929-790b9f593d8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Шахматы" 
                className="rounded-lg shadow-lg mx-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                <TrophyIcon className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Секция игр */}
      <section className="py-16 px-4 game-container">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Выберите игру</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <GameTypeCard 
              title="Шахматы"
              description="Классическая игра в шахматы с возможностью делать ставки"
              image="https://images.unsplash.com/photo-1580541631971-a0e1263a6ee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              playersOnline={768}
              path="/games/chess"
              type="chess"
            />
            
            <GameTypeCard 
              title="Шашки"
              description="Динамичная игра в шашки на реальные деньги"
              image="https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              playersOnline={412}
              path="/games/checkers"
              type="checkers"
            />
          </div>
          
          <div className="bg-card rounded-xl shadow-xl p-6 mb-12">
            <h3 className="text-2xl font-bold mb-4">Быстрый поиск соперника</h3>
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chess" | "checkers")}>
              <TabsList className="w-full mb-6">
                <TabsTrigger value="chess" className="flex-1">Шахматы</TabsTrigger>
                <TabsTrigger value="checkers" className="flex-1">Шашки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chess">
                <div className="grid md:grid-cols-2 gap-8">
                  <PlayerMatchmaking gameType="chess" />
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-medium">Текущие игры в шахматы</h4>
                    {liveGames
                      .filter(game => game.type === "chess")
                      .map(game => (
                        <Card key={game.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                  Шахматы
                                </Badge>
                                <span>{game.player1} vs {game.player2}</span>
                              </div>
                              <div className="font-medium">{game.stake} ₽</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    <Button variant="outline" className="w-full">
                      Смотреть все игры
                      <ChevronRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="checkers">
                <div className="grid md:grid-cols-2 gap-8">
                  <PlayerMatchmaking gameType="checkers" />
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-medium">Текущие игры в шашки</h4>
                    {liveGames
                      .filter(game => game.type === "checkers")
                      .map(game => (
                        <Card key={game.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-secondary/10 text-secondary">
                                  Шашки
                                </Badge>
                                <span>{game.player1} vs {game.player2}</span>
                              </div>
                              <div className="font-medium">{game.stake} ₽</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    <Button variant="outline" className="w-full">
                      Смотреть все игры
                      <ChevronRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Секция рейтинга */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Лучшие игроки</h2>
            <Link to="/rating">
              <Button variant="outline">
                Полный рейтинг
                <ChevronRightIcon className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {topPlayers.map((player, index) => (
              <Card key={player.id} className={`stats-card ${index === 0 ? 'border-primary/50 border-2' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.name.split(' ')[0][0]}{player.name.split(' ')[1][0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{player.name}</div>
                      <div className="text-sm text-muted-foreground">Рейтинг: {player.rating}</div>
                    </div>
                    {index === 0 && <TrophyIcon className="h-6 w-6 text-yellow-500 ml-auto" />}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-muted rounded-md">
                      <div className="text-sm text-muted-foreground">Выигрыш</div>
                      <div className="font-bold">{player.winnings.toLocaleString()} ₽</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-md">
                      <div className="text-sm text-muted-foreground">Позиция</div>
                      <div className="font-bold">#{index + 1}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA секция */}
      <section className="bg-primary/10 py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы испытать свои навыки?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Регистрируйтесь прямо сейчас, пополняйте счет и начинайте играть на реальные деньги!
          </p>
          <Button size="lg">
            Начать игру
          </Button>
        </div>
      </section>
      
      {/* Футер */}
      <footer className="bg-card border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="relative size-8">
                  <TrophyIcon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-bold">Шахматы & Шашки</span>
              </div>
            </div>
            
            <div className="flex gap-8">
              <Link to="/about" className="text-muted-foreground hover:text-foreground">О нас</Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link>
              <Link to="/support" className="text-muted-foreground hover:text-foreground">Поддержка</Link>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © 2025 Шахматы & Шашки. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
