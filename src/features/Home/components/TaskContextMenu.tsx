'use client'

import { useAppStore } from '@/store'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

type TaskContextMenuProps = {
	taskId: number
}

const TaskContextMenu: FC<TaskContextMenuProps> = ({ taskId }) => {
	const router = useRouter()
	const { taskContextMenu, setTaskContextMenu } = useAppStore()

	const { menuX, menuY, taskId: taskIdContextMenu } = taskContextMenu || {}

	const handleOpenTaskDetails = () => {
		setTaskContextMenu(null)
		router.push(`?taskId=${taskId}`, { scroll: false })
	}

	if (!taskContextMenu || taskIdContextMenu !== taskId) return null

	return (
		<div
			className='bg-gray-900 p-2 rounded-md text-white'
			style={{
				position: 'absolute',
				left: `${menuX}px`,
				top: `${menuY}px`,
				zIndex: 50, // Ensure it's on top of other elements
			}}
		>
			<button onClick={handleOpenTaskDetails}>View Details</button>
		</div>
	)
}

export default TaskContextMenu
