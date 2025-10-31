import type { NextRequest } from "next/server"
import { getAuth, clerkClient } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Map Clerk userId to our local Prisma User.id by looking up clerkId
    let localUser = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!localUser) {
      try {
        const clerkUser = await clerkClient.users.getUser(userId)
        const email = clerkUser.emailAddresses?.[0]?.emailAddress || `${userId}@clerk.local`
        const name =
          [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || (clerkUser.username ?? undefined)
        localUser = await prisma.user.create({
          data: {
            clerkId: userId,
            email: email,
            name: name,
            avatar: clerkUser.profileImageUrl || undefined,
          },
        })
      } catch (err) {
        console.error("Failed to fetch/create local user for clerk userId", userId, err)
        return Response.json({ error: "User not found" }, { status: 401 })
      }
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: localUser.id,
      },
      include: {
        project: true,
        assignee: true,
        subtasks: true,
      },
      orderBy: {
        position: "asc",
      },
    })

    return Response.json(tasks)
  } catch (error) {
    console.error("Failed to fetch tasks:", error)
    return Response.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Map Clerk userId to our local Prisma User.id by looking up clerkId
    let localUser = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!localUser) {
      try {
        const clerkUser = await clerkClient.users.getUser(userId)
        const email = clerkUser.emailAddresses?.[0]?.emailAddress || ""
        const name =
          [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || (clerkUser.username ?? undefined)
        localUser = await prisma.user.create({
          data: {
            clerkId: userId,
            email: email || `${userId}@clerk.local`,
            name: name,
            avatar: clerkUser.profileImageUrl || undefined,
          },
        })
      } catch (err) {
        console.error("Failed to fetch/create local user for clerk userId", userId, err)
        return Response.json({ error: "User not found" }, { status: 401 })
      }
    }

    const body = await request.json()
    const { title, description, projectId, status, priority, dueDate, estimatedHours } = body

    let finalProjectId = projectId
    if (!projectId) {
      const defaultProject = await prisma.project.findFirst({
        where: {
          userId: localUser.id,
          name: "My Tasks",
        },
      })

      if (defaultProject) {
        finalProjectId = defaultProject.id
      } else {
        const newProject = await prisma.project.create({
          data: {
            name: "My Tasks",
            description: "Default project for tasks without a specific project",
            userId: localUser.id,
          },
        })
        finalProjectId = newProject.id
      }
    }

    // Get the highest position in the current status column
    const lastTask = await prisma.task.findFirst({
      where: {
        userId: localUser.id,
        status: status || "TODO",
      },
      orderBy: {
        position: "desc",
      },
    })

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        estimatedHours,
        position: lastTask ? lastTask.position + 1 : 0,
        userId: localUser.id,
        projectId: finalProjectId,
      },
      include: {
        project: true,
        assignee: true,
        subtasks: true,
      },
    })

    return Response.json(newTask)
  } catch (error) {
    console.error("Failed to create task:", error)
    return Response.json({ error: "Failed to create task" }, { status: 500 })
  }
}
