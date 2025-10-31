import type { NextRequest } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const localUser = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!localUser) {
      return Response.json({ error: "User not found" }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: localUser.id,
      },
      include: {
        tasks: {
          include: {
            subtasks: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return Response.json(projects)
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const localUser = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!localUser) {
      return Response.json({ error: "User not found" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, color, startDate, endDate } = body

    const project = await prisma.project.create({
      data: {
        name,
        description,
        color: color || "#3b82f6",
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        userId: localUser.id,
      },
      include: {
        tasks: true,
      },
    })

    return Response.json(project)
  } catch (error) {
    console.error("Failed to create project:", error)
    return Response.json({ error: "Failed to create project" }, { status: 500 })
  }
}
