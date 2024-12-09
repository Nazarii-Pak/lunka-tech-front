export type UserRole = 'employee' | 'manager'

export type User = {
	id: string
	name: string
	surname: string
	role: UserRole
}
