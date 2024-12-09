'use client'

import { FC } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Task } from '@/lib/types/task'
import TaskCard from './TaskCard'

type DateColumnProps = {
	tasks: Task[]
	over: string
}

const DateColumn: FC<DateColumnProps> = ({ tasks, over }) => {
	const { setNodeRef } = useDroppable({
		id: over,
	})

	const sortedByStartTimeTasks = tasks.sort((a, b) => a.startTime.localeCompare(b.startTime))

	return (
		<div className='p-2 border border-gray-600  text-gray-200' style={{ minHeight: '80px' }}>
			<div className='flex flex-col gap-2 h-full w-full' ref={setNodeRef}>
				{sortedByStartTimeTasks.map(task => (
					<TaskCard task={task} key={task.id} />
				))}
			</div>
		</div>
	)
}

export default DateColumn
