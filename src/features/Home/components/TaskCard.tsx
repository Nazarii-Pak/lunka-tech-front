/* eslint-disable indent */
'use client'

import { Task } from '@/lib/types/task'
import { cn } from '@/utils'
import { useDraggable } from '@dnd-kit/core'

import { FC } from 'react'

type TaskCardProps = {
	task: Task
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
	})

	const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className='flex flex-col gap-1 p-1 rounded text-sm cursor-grab bg-gray-700'
			style={style}
		>
			<p className='text-center text-md md:text-lg font-medium underline'>{task.title}</p>
			<p className='truncate'>{task.description}</p>
			<p
				className={cn('text-center text-sm md:text-base rounded-md', {
					'bg-blue-300 text-black': task.priority === 'low',
					'bg-orange-300 text-black': task.priority === 'medium',
					'bg-purple-300 text-white': task.priority === 'high',
				})}
			>{`${task.startTime} - ${task.endTime}`}</p>
		</div>
	)
}

export default TaskCard
