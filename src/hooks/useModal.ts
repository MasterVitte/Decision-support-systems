import {useState} from 'react';

export const useModal = () => {
    const [isOpen, setOpen] = useState(false)

    const toggleOpen = () => setOpen(prevState => !prevState)

    return { isOpen, toggleOpen }
}