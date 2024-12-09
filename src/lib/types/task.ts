export type TaskPriority = 'low' | 'medium' | 'high'

export type Task = {
	id: number
	title: string
	description: string
	priority: TaskPriority
	date: string // ISO 8601 date string
	startTime: string
	endTime: string
	assignTo: string
}
