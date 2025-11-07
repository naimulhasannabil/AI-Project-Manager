import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
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
              variables: {
                colorPrimary: '#3b82f6',
                colorBackground: '#ffffff',
                colorInputBackground: '#ffffff',
                colorInputText: '#000000',
                borderRadius: '0.75rem',
              },
              elements: {
                formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
                card: 'bg-white dark:bg-gray-900 shadow-xl border dark:border-gray-800',
                headerTitle: 'text-gray-900 dark:text-white',
                headerSubtitle: 'text-gray-600 dark:text-gray-400',
                socialButtonsBlockButton: 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800',
                formFieldLabel: 'text-gray-700 dark:text-gray-300',
                formFieldInput: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white',
                footerActionLink: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
                identityPreviewText: 'text-gray-900 dark:text-white',
                identityPreviewEditButton: 'text-blue-600 dark:text-blue-400',
                formFieldInputShowPasswordButton: 'text-gray-600 dark:text-gray-400',
                otpCodeFieldInput: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white',
                formResendCodeLink: 'text-blue-600 dark:text-blue-400',
                footer: 'bg-white dark:bg-gray-900',
                footerActionText: 'text-gray-600 dark:text-gray-400',
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