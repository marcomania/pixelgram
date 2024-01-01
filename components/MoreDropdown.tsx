'use client' 

import { useEffect, useRef, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { useTheme } from "next-themes";

import { ActivitySquareIcon, BookmarkIcon, ChevronLeft, LogOutIcon, Menu, Moon, MoonIcon, SettingsIcon, Sun } from "lucide-react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

function MoreDropdown() {
  const [showModeToggle, setShowModeToggle] = useState(false);
  const [open , setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Close the dropdown when the user clicks outside
    function handleOutsideClick(event: MouseEvent) {
      if (!event.target) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowModeToggle(false);
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);


  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button 
          onClick={() => setOpen(!open)}
          variant={'ghost'} 
          size={'lg'} 
          className="md:w-full !justify-start space-x-2 !px-3"
        >
          <Menu/>
          <div className="hidden lg:block">More</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        ref={ref}  
        className={cn(
          "w-64 !rounded-xl !p-0 transition-opacity",
          !open && "opacity-0"
        )} 
        align="end" 
        alignOffset={-40}
      >
        {!showModeToggle && (
          <>
            <DropdownMenuItem className="menuItem"><SettingsIcon className="mr-2"/> Settings</DropdownMenuItem>
            <DropdownMenuItem className="menuItem"><ActivitySquareIcon className="mr-2"/> Your activity</DropdownMenuItem>
            <DropdownMenuItem className="menuItem"><BookmarkIcon className="mr-2"/> Saved</DropdownMenuItem>
            <DropdownMenuItem className="menuItem" onClick={() => setShowModeToggle(true)} >
              {theme === "dark" ?  <Moon size={20} /> : <Sun size={20} /> } Switch appearance
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="menuItem"><LogOutIcon className="mr-2"/> Log out</DropdownMenuItem>
          </>
        )}
        {showModeToggle && (
          <>
            <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
              <ChevronLeft size={18} onClick={() => setShowModeToggle(false)} />
              <p className="font-bold ml-1">Switch appearance</p>
              {theme === "dark" ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>
            <Label htmlFor="dark-mode" className="menuItem">
              Dark Mode
              <DropdownMenuItem className=" ml-auto !p-0">
                
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light");
                  }}
                />
              </DropdownMenuItem>
            </Label>
          </>
        )}
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MoreDropdown