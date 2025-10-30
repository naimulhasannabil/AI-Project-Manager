import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Project Manager',
  description: 'Notion × Trello × ChatGPT for modern project management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClerkProvider
            appearance={{
              baseTheme: dark,
              variables: {
                colorBackground: 'hsl(222.2 84% 4.9%)',
                colorInputBackground: 'hsl(217.2 32.6% 17.5%)',
                colorInputText: 'hsl(210 40% 98%)',
                colorText: 'hsl(210 40% 98%)',
                colorTextSecondary: 'hsl(215 20.2% 65.1%)',
                colorPrimary: 'hsl(210 40% 98%)',
                colorTextOnPrimaryBackground: 'hsl(222.2 47.4% 11.2%)',
                borderRadius: 'var(--radius)',
              },
              elements: {
                formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
                card: 'bg-card text-card-foreground shadow-sm',
                footer: 'text-muted-foreground',
              }
            }}
          >
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}