import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create a sample user (you'll replace this with actual Clerk users)
  const user = await prisma.user.upsert({
    where: { email: 'demo@flowpilot.com' },
    update: {},
    create: {
      clerkId: 'user_demo_123',
      email: 'demo@flowpilot.com',
      name: 'Demo User',
    },
  })

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      color: '#3b82f6',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-15'),
      status: 'ACTIVE',
      userId: user.id,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Mobile App Development',
      description: 'Build cross-platform mobile application',
      color: '#10b981',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-05-01'),
      status: 'ACTIVE',
      userId: user.id,
    },
  })

  // Create sample tasks
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'Design Homepage Layout',
        description: 'Create wireframes and mockups for the new homepage',
        status: 'TODO',
        priority: 'HIGH',
        estimatedHours: 8,
        position: 0,
        userId: user.id,
        projectId: project1.id,
      },
      {
        title: 'Set up Development Environment',
        description: 'Configure Next.js, Tailwind, and database',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        estimatedHours: 4,
        position: 1,
        userId: user.id,
        projectId: project1.id,
      },
      {
        title: 'User Authentication',
        description: 'Implement Clerk authentication system',
        status: 'REVIEW',
        priority: 'HIGH',
        estimatedHours: 6,
        position: 0,
        userId: user.id,
        projectId: project2.id,
      },
      {
        title: 'API Integration',
        description: 'Connect frontend with backend APIs',
        status: 'DONE',
        priority: 'MEDIUM',
        estimatedHours: 12,
        position: 1,
        userId: user.id,
        projectId: project2.id,
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })