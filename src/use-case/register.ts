import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/prima-users'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface RegisterUseCaseRequest {
	name: string
	email: string
	password: string
}

export class RegisterUseCase {
	constructor(private usersRepository: any) {}

	async execute({ name, email, password }: RegisterUseCaseRequest) {
		const password_hash = await hash(password, 6)

		const prismaUsersRepository = new PrismaUserRepository()

		const userWithSameEmail = await prismaUsersRepository.findUnique(email)

		if (userWithSameEmail) {
			throw new Error('Email already exists')
		}

		await this.usersRepository.create({ email, name, password_hash })
	}
}
