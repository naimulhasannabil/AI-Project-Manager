import { SignedOut, SignedIn, RedirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Home() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        {redirect('/dashboard')}
      </SignedIn>
    </>
  )
}