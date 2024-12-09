import { Task } from '@/lib/types/task'
import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

type TaskContextMenu = {
	taskId: number
	menuX: number
	menuY: number
}

const initialState = {
	tasks: [],
	taskContextMenu: null,
}

export interface ISlice {
	tasks: Task[]
	setTasks: (tasks: Task[]) => void
	updateTask: (task: Partial<Task>) => void
	taskContextMenu: TaskContextMenu | null
	setTaskContextMenu: (taskContextMenu: TaskContextMenu | null) => void
}

const Slice: StateCreator<ISlice> = set => {
	return {
		...initialState,
		setTasks: (tasks: Task[]) => set({ tasks }),
		updateTask: (task: Partial<Task>) =>
			set(state => ({ tasks: state.tasks.map(t => (t.id === task.id ? { ...t, ...task } : t)) })),
		setTaskContextMenu: (taskContextMenu: TaskContextMenu | null) => set({ taskContextMenu }),
	}
}

export const useAppStore = create<ISlice>()(
	persist(
		(...a) => ({
			...Slice(...a),
		}),
		{
			name: 'lunka-tech-store',
		}
	)
)
