import { FC } from 'react'
import { useSearchParams } from 'next/navigation'

import users from '@/mocks/users'
import { useAppStore } from '@/store'

interface TaskDrawerContentProps {
	onClose: () => void
}

const TaskDrawerContent: FC<TaskDrawerContentProps> = ({ onClose }) => {
	const searchParams = useSearchParams()
	const { tasks, updateTask } = useAppStore()

	const taskId = searchParams.get('taskId')

	const task = tasks.find(t => t.id?.toString() === taskId)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const data = new FormData(e.target as HTMLFormElement)

		const result = Object.fromEntries(data.entries())

		updateTask({ id: Number(taskId), ...result })

		onClose()
	}

	if (!task) return <div className='text-black'>Task not found</div>

	return (
		<div className='flex flex-col gap-4 p-4 text-black w-full'>
			<h1 className='text-2xl font-bold text-center'>Task {taskId}</h1>
			<form className='flex flex-col gap-4 w-full text-xl' onSubmit={handleSubmit}>
				<label htmlFor='title'>
					<p>Title</p>
					<input
						type='text'
						id='title'
						name='title'
						defaultValue={task.title}
						className='p-2 w-full border rounded-xl'
					/>
				</label>
				<label htmlFor='description'>
					<p>Description</p>
					<input
						type='text'
						id='description'
						name='description'
						defaultValue={task.description}
						className='p-2 w-full border rounded-xl'
					/>
				</label>

				<div className='flex gap-2'>
					<label htmlFor='startTime'>
						<p>Start </p>
						<input
							type='time'
							id='startTime'
							name='startTime'
							defaultValue={task.startTime}
							className='p-2 w-full border rounded-xl'
						/>
					</label>
					<label htmlFor='endTime'>
						<p>End</p>
						<input
							type='time'
							id='endTime'
							name='endTime'
							defaultValue={task.endTime}
							className='p-2 w-full border rounded-xl'
						/>
					</label>
				</div>

				<select name='assignTo' id='assignTo' defaultValue={task.assignTo} className='p-2 w-full border rounded-xl'>
					<option value=''>Select User</option>
					{users.map(user => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>

				<select name='priority' id='priority' defaultValue={task.priority} className='p-2 w-full border rounded-xl'>
					<option value=''>Select Priority</option>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</select>
				<div className='flex justify-center gap-6 pt-6'>
					<button onClick={onClose} type='button' className='bg-red-500 text-white px-4 py-2 rounded-md'>
						Cancel
					</button>
					<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>
						Save
					</button>
				</div>
			</form>
		</div>
	)
}

export default TaskDrawerContent
