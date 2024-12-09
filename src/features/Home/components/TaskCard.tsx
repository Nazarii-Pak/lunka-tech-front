'use client'

import { FC } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/utils'
import { Task } from '@/lib/types/task'
import TaskContextMenu from './TaskContextMenu'
import { useAppStore } from '@/store'
import useClickOutside from '@/hooks/useClickOutside'

type TaskCardProps = {
	task: Task
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
	const { setTaskContextMenu } = useAppStore()
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
	})

	const menuRef = useClickOutside({ onClickOutside: () => setTaskContextMenu(null) })

	const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined

	const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault()
		setTaskContextMenu({ taskId: task.id, menuX: event.pageX, menuY: event.pageY })
	}

	return (
		<div ref={menuRef}>
			<div
				ref={setNodeRef}
				onContextMenu={handleContextMenu}
				{...attributes}
				{...listeners}
				className='flex flex-col gap-1 p-1 rounded text-sm  bg-gray-700 cursor-grab'
				style={style}
			>
				<p className='text-center text-md md:text-lg pointer-events-auto font-medium underline'>{task.title}</p>
				<p className='truncate'>{task.description}</p>
				<p
					className={cn('text-center text-sm md:text-base rounded-md', {
						'bg-blue-300 text-black': task.priority === 'low',
						'bg-orange-300 text-black': task.priority === 'medium',
						'bg-purple-300 text-white': task.priority === 'high',
					})}
				>{`${task.startTime} - ${task.endTime}`}</p>
			</div>
			<TaskContextMenu taskId={task.id} />
		</div>
	)
}

export default TaskCard
