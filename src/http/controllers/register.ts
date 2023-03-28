import { PrismaUserRepository } from '@/repositories/prima-users'
import { RegisterUseCase } from '@/use-case/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { name, email, password } = registerBodySchema.parse(request.body)

	try {
		const usersRepository = new PrismaUserRepository()
		await new RegisterUseCase(usersRepository).execute({
			name,
			email,
			password,
		})
	} catch (error) {
		return reply.status(409).send()
	}

	return reply.status(201).send()
}
