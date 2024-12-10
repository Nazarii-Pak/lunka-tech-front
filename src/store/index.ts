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
	_isHydrated: boolean
	setHydrated: (isHydrated: boolean) => void
}

const Slice: StateCreator<ISlice> = set => {
	return {
		...initialState,
		setTasks: (tasks: Task[]) => set({ tasks }),
		updateTask: (task: Partial<Task>) =>
			set(state => ({ tasks: state.tasks.map(t => (t.id === task.id ? { ...t, ...task } : t)) })),
		setTaskContextMenu: (taskContextMenu: TaskContextMenu | null) => set({ taskContextMenu }),
		_isHydrated: false,
		setHydrated: (isHydrated: boolean) => set({ _isHydrated: isHydrated }),
	}
}

export const useAppStore = create<ISlice>()(
	persist(
		(...a) => ({
			...Slice(...a),
		}),
		{
			name: 'lunka-tech-store',
			onRehydrateStorage: () => state => {
				state?.setHydrated(true)
			},
		}
	)
)
