"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // 1. Move to Top Center
      position="top-center"
      // 2. Custom Styling Options
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/70 group-[.toaster]:dark:bg-slate-950/70 group-[.toaster]:backdrop-blur-md group-[.toaster]:text-foreground group-[.toaster]:border-border/50 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          // 3. Custom Success Style (Sage Green Border & Text)
          success:
            "group-[.toaster]:!border-[#516e56] group-[.toaster]:!text-[#516e56] group-[.toaster]:!bg-white/90",
          // 4. Custom Error Style (Soft Red)
          error:
            "group-[.toaster]:!border-red-500/50 group-[.toaster]:!text-red-600 group-[.toaster]:!bg-white/90",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }