import { addDays, format } from 'date-fns'
import { Task } from '@/lib/types/task'
import users from '@/mocks/users'

const generateRandomTask = (userId: string, date: string): Task => {
	const randomHour = Math.floor(Math.random() * (18 - 8 + 1)) + 8
	const randomMinute = Math.floor(Math.random() * 60)
	const startTime = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`

	const endHour = randomHour + 1
	const endTime = `${endHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`

	const priorities: Task['priority'][] = ['low', 'medium', 'high']
	const priority = priorities[Math.floor(Math.random() * priorities.length)]
	const id = Date.now() + Math.random()
	const title = `Task ${id.toString().slice(-3).replace('.', '')}`

	return {
		id,
		priority,
		title,
		description: `Description (${id})`,
		date: format(date, 'yyyy-MM-dd'),
		startTime,
		endTime,
		assignTo: userId,
	}
}

const generateTasks = async (numOfDays: number, numOfTasksPerDay: number) => {
	const currentDate = new Date()
	const tasks: Task[] = []
	const userIdList = users.map(user => user.id)

	for (let dayOffset = 0; dayOffset < numOfDays; dayOffset++) {
		const date = addDays(currentDate, dayOffset)
		const dateString = format(date, 'yyyy-MM-dd')

		userIdList.forEach(userId => {
			if (Math.random() < 0.5) {
				for (let i = 0; i < numOfTasksPerDay; i++) {
					const task = generateRandomTask(userId, dateString)
					tasks.push(task)
				}
			}
		})
	}

	return tasks
}

export default generateTasks
