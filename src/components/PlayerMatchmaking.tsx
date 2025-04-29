import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, UsersIcon, DollarSignIcon, TimerIcon } from "lucide-react";

interface PlayerMatchmakingProps {
  gameType: "chess" | "checkers";
}

const PlayerMatchmaking = ({ gameType }: PlayerMatchmakingProps) => {
  const [betAmount, setBetAmount] = useState(100);
  const [timeControl, setTimeControl] = useState(5);
  const [isSearching, setIsSearching] = useState(false);
  const [ratingRange, setRatingRange] = useState([1000, 1600]);
  const [useRatingRange, setUseRatingRange] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // В реальном приложении здесь был бы код для начала поиска соперника
    setTimeout(() => {
      setIsSearching(false);
      // Здесь был бы код для перенаправления на игровую страницу после нахождения соперника
    }, 5000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Поиск соперника</CardTitle>
        <CardDescription>
          Настройте параметры поиска и начните игру в {gameType === "chess" ? "шахматы" : "шашки"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quick">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="quick" className="flex-1">Быстрый поиск</TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">Расширенный</TabsTrigger>
          </TabsList>

          <TabsContent value="quick">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Ставка</Label>
                  <span className="font-medium">{betAmount} ₽</span>
                </div>
                <Slider
                  value={[betAmount]}
                  min={50}
                  max={1000}
                  step={50}
                  onValueChange={(value) => setBetAmount(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Контроль времени</Label>
                  <span className="font-medium">{timeControl} мин</span>
                </div>
                <Slider
                  value={[timeControl]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => setTimeControl(value[0])}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Ставка</Label>
                  <span className="font-medium">{betAmount} ₽</span>
                </div>
                <Slider
                  value={[betAmount]}
                  min={50}
                  max={5000}
                  step={50}
                  onValueChange={(value) => setBetAmount(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Контроль времени</Label>
                  <span className="font-medium">{timeControl} мин</span>
                </div>
                <Slider
                  value={[timeControl]}
                  min={1}
                  max={60}
                  step={1}
                  onValueChange={(value) => setTimeControl(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rating-range">Диапазон рейтинга</Label>
                  <Switch
                    id="rating-range"
                    checked={useRatingRange}
                    onCheckedChange={setUseRatingRange}
                  />
                </div>
                {useRatingRange && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm">{ratingRange[0]}</span>
                      <span className="text-sm">{ratingRange[1]}</span>
                    </div>
                    <Slider
                      value={ratingRange}
                      min={500}
                      max={2500}
                      step={100}
                      onValueChange={setRatingRange}
                    />
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSearch} 
          disabled={isSearching} 
          className="w-full"
        >
          {isSearching ? (
            <>
              <UsersIcon className="mr-2 h-4 w-4 animate-pulse" />
              Поиск соперника...
            </>
          ) : (
            <>
              <SearchIcon className="mr-2 h-4 w-4" />
              Найти соперника
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlayerMatchmaking;