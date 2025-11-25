// src/components/layout/dashboard-layout.tsx
import React from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar'; // We'll create this next

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Hidden on small screens, visible on medium and up */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40 p-4">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background">
          <Header />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}