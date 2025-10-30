'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Ensure next-themes uses the `class` attribute so Tailwind's dark: class strategy works.
  return (
    <NextThemesProvider attribute="class" {...props}>
      {children}
    </NextThemesProvider>
  )
}
