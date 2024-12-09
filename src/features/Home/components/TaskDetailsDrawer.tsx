'use client'

import { FC, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import TaskDrawerContent from './TaskDrawerContent'

const TaskDetailsDrawer: FC = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const taskId = searchParams.get('taskId')

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (taskId) setIsOpen(true)
	}, [taskId])

	const handleClose = () => {
		const params = new URLSearchParams(searchParams)
		params.delete('taskId')
		router.push(`?${params.toString()}`, { scroll: false })
		setIsOpen(false)
	}

	if (!taskId) return null

	return (
		<>
			<Transition show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-50' onClose={handleClose}>
					<div className='fixed inset-0 bg-black/50' aria-hidden='true' onClick={handleClose} />
					<div className='fixed inset-y-0 right-0 flex lg:max-w-md xl:max-w-2xl w-full bg-gray-200'>
						<TaskDrawerContent onClose={handleClose} />
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default TaskDetailsDrawer
