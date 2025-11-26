// src/components/layout/sidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // To highlight active link
import { HomeIcon, BookTextIcon, UsersIcon, GraduationCapIcon, TrophyIcon, ClipboardListIcon, BanknoteIcon, Link2Icon, TrendingUp, Medal } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Families", href: "/families", icon: UsersIcon },
    { name: "Students", href: "/students", icon: GraduationCapIcon },
    { name: "Library", href: "/library-resources", icon: BookTextIcon },
    { name: "Quizzes", href: "/quizzes", icon: ClipboardListIcon },
    { name: "Badges", href: "/badges", icon: TrophyIcon },
    { name: "Progress", href: "/student-progress", icon: TrendingUp },
    { name: "Assignments", href: "/assignments", icon: Link2Icon },
    { name: "Achievements", href: "/achievements", icon: Medal },
    { name: "Fees", href: "/fee-payments", icon: BanknoteIcon }, // Placeholder for future module
  ];

  return (
    <nav className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold mb-6 px-3">Virtual Verse</h2>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary 
            ${pathname === item.href ? 'bg-primary text-primary-foreground hover:text-white' : 'text-muted-foreground'}`}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}