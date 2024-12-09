import { useEffect, useRef } from 'react'

type UseClickOutsideProps = {
	onClickOutside: () => void
}

const useClickOutside = ({ onClickOutside }: UseClickOutsideProps) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && ref.current !== event.target) onClickOutside()
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [onClickOutside])

	return ref
}

export default useClickOutside
