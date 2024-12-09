'use client'

import { FC, Fragment, useEffect, useState } from 'react'
import { format, addDays } from 'date-fns'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import DateColumn from './components/DateColumn'
import { Task } from '@/lib/types/task'
import generateTasks from '@/utils/generateTasks'
import users from '@/mocks/users'

const HomePage: FC = () => {
	const [taskList, setTaskList] = useState<Task[]>([])

	useEffect(() => {
		generateTasks(7, 2).then(setTaskList)
	}, [])

	const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

	const getTasksForUserAndDate = (userId: string, date: string) => {
		return taskList.filter(task => task.assignTo === userId && task.date === date)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (!over) return

		const taskId = active.id as string
		const targetPlace = over.id as string
		const userId = targetPlace.split('&')[0]
		const date = targetPlace.split('&')[1]

		const draggedTask = taskList.find(task => task.id.toString() === taskId.toString())

		if (draggedTask) {
			setTaskList(prevTasks =>
				prevTasks.map(task =>
					task.id === draggedTask.id ? { ...task, date: format(date, 'yyyy-MM-dd'), assignTo: userId } : task
				)
			)
		}
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='py-4 px-2 overflow-x-auto xl:max-w-screen'>
				<div className='grid grid-cols-8  min-w-[1000px] p-4 border border-gray-700 rounded-lg bg-gray-800'>
					{/* Header Row */}
					<div className='font-bold text-center text-gray-200 border-b border-gray-600'></div>
					{dates.map(date => (
						<div key={format(date, 'dd MMM')} className='font-bold text-center text-gray-200 border-b border-gray-600'>
							{format(date, 'dd MMM')}
						</div>
					))}

					{/* Rows */}
					{users.map(user => (
						<Fragment key={user.id}>
							{/* User Column */}
							<div className='p-2 text-lg md:text-2xl font-medium text-gray-200 border border-gray-600 bg-gray-700'>
								<p>
									{user.name} {user.surname}
								</p>
								<p className='text-sm text-gray-400'>{user.role}</p>
							</div>
							{dates.map(date => (
								<DateColumn
									key={format(date, 'yyyy-MM-dd')}
									over={`${user.id}&${format(date, 'yyyy-MM-dd')}`}
									tasks={getTasksForUserAndDate(user.id, format(date, 'yyyy-MM-dd'))}
								/>
							))}
						</Fragment>
					))}
				</div>
			</div>
		</DndContext>
	)
}

export default HomePage
