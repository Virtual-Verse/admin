"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
// Import your Auth Store
import { useAuthStore } from "@/store/auth.store";
import { Sidebar } from './sidebar'; // We reuse Sidebar component for mobile nav

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore(); // Use real auth store

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex h-16 items-center justify-between px-4 md:px-6">
      {/* Mobile Sidebar Toggle */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {/* Reuse the Sidebar component inside the mobile sheet for consistency */}
          <div className="p-4">
            <Sidebar />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop App Name / Logo (Optional, since it's also in sidebar) */}
      <div className="hidden md:flex items-center gap-2 font-semibold">
        {/* You can leave this empty or add breadcrumbs here later */}
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* User Avatar and Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              {/* Use real user data */}
              <AvatarImage src="" alt={user?.email || "User"} />
              <AvatarFallback>{user?.email?.[0].toUpperCase() ?? 'A'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Admin</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}