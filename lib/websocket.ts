import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { NextApiResponse } from 'next'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export const configureSocket = (server: NetServer) => {
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    addTrailingSlash: false,
  })

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('join-project', (projectId) => {
      socket.join(projectId)
      console.log(`Socket ${socket.id} joined project ${projectId}`)
    })

    socket.on('task-updated', (data) => {
      socket.to(data.projectId).emit('task-updated', data)
    })

    socket.on('task-created', (data) => {
      socket.to(data.projectId).emit('task-created', data)
    })

    socket.on('task-deleted', (data) => {
      socket.to(data.projectId).emit('task-deleted', data)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  return io
}