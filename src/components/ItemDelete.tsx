import DeleteIcon from '@mui/icons-material/Delete';
import {Box, Button, IconButton, Modal, Tooltip} from '@mui/material';
import React from 'react';
import {useModal} from '../hooks/useModal';
import {TableRecord} from './CoreTable';

interface Props {
    item: TableRecord
    onDelete: (rowId: string) => void
}

export const ItemDelete: React.FC<Props> = ({ item, onDelete }) => {
    const { isOpen, toggleOpen } = useModal()

    const handleDelete = () => onDelete(item.id)

    return (
        <>
            <Tooltip title={`Удалить вариант выбора ${item['column-0']}`}>
                <IconButton size='small' onClick={toggleOpen}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Modal open={isOpen} onClose={toggleOpen} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box width={200} bgcolor='white' padding={8} borderRadius={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>Удалить?</h2>
                    <Box>
                        <Button size='small' style={{ margin: '0 4px' }} variant='contained' onClick={toggleOpen}>Нет</Button>
                        <Button size='small' style={{ margin: '0 4px' }} variant='contained' onClick={handleDelete}>Да</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}