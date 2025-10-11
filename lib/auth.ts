import { auth, currentUser } from '@clerk/nextjs/server'

export async function getCurrentUser() {
  const user = await currentUser()
  return user
}

export async function requireAuth() {
  const { userId } = auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  return userId
}