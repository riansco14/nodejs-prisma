import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class InMemoryUserRepository {
	public users: any[] = []

	async create(data: Prisma.UserCreateInput) {
		this.users.push(data)
	}

	async findUnique(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		return user
	}
}
