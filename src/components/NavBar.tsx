import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TriangleRightIcon, MenuIcon, DollarSignIcon, TrophyIcon, UserRoundIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <div className="flex flex-col gap-4 pt-6">
                <Link to="/" className="text-lg font-bold">
                  Шахматы & Шашки
                </Link>
                <div className="flex flex-col gap-2">
                  <Link to="/games/chess" className="flex items-center gap-2 py-2">
                    <TriangleRightIcon className="h-4 w-4" />
                    <span>Шахматы</span>
                  </Link>
                  <Link to="/games/checkers" className="flex items-center gap-2 py-2">
                    <TriangleRightIcon className="h-4 w-4" />
                    <span>Шашки</span>
                  </Link>
                  <Link to="/rating" className="flex items-center gap-2 py-2">
                    <TrophyIcon className="h-4 w-4" />
                    <span>Рейтинг</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <div className="relative size-8">
              <TriangleRightIcon className="absolute left-0 top-0 h-6 w-6 rotate-90 text-primary" />
              <TriangleRightIcon className="absolute bottom-0 right-0 h-6 w-6 -rotate-90 text-primary" />
            </div>
            <span className="hidden font-bold sm:inline-block">Шахматы & Шашки</span>
          </Link>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Игры</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <Link to="/games/chess" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    <div className="mb-2 mt-4 text-lg font-medium">Шахматы</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Классическая игра в шахматы с возможностью делать ставки
                    </p>
                  </Link>
                  <Link to="/games/checkers" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                    <div className="mb-2 mt-4 text-lg font-medium">Шашки</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Динамичная игра в шашки на реальные деньги
                    </p>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/rating" className="flex items-center gap-2 px-4 py-2">
                <TrophyIcon className="h-4 w-4" />
                <span>Рейтинг</span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4" />
                <span>500 ₽</span>
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                <AvatarFallback>ИП</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(true)}>
                Войти
              </Button>
              <Button size="sm" onClick={() => setIsLoggedIn(true)}>
                Регистрация
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;