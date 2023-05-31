import {
    Box,
    Button,
    FormControl,
    FormGroup,
    FormHelperText,
    IconButton,
    Modal,
    TextField,
    Tooltip
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {TableRecord} from './CoreTable';
import AddIcon from '@mui/icons-material/Add';
import {useModal} from '../hooks/useModal';

interface Props {
    rowNames: string[]
    onSubmit: (row: TableRecord) => void
}

export const ItemCreate: React.FC<Props> = ({ rowNames, onSubmit }) => {
    const { isOpen, toggleOpen } = useModal()

    const [record, setRecord] = useState<TableRecord>({})

    const [errors, setErrors] = useState({
        'column-0': '',
        'column-1': '',
        'column-2': '',
        'column-3': '',
    })

    const handleChange = (name: string, value: any) => {
        setErrors(prevState => {
            return {
                ...prevState,
                [name]: (() => {
                    if (name === 'column-0') {
                        if (rowNames.find(rowName => rowName === value)) {
                            return 'Такой вариант уже существует!'
                        }
                        if (value === '') return 'Вводимое значение должно быть заполнено!'
                    }
                    if (value === '') return 'Вводимое значение должно быть числом!'
                    return ''
                })()
            }
        })

        setRecord(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const handleSubmit = () => {
        onSubmit(record)
        toggleOpen()
    }

    useEffect(() => {
        if (isOpen) {
            setRecord({
                'column-0': 'Новый вариант',
                'column-1': 0,
                'column-2': 0,
                'column-3': 0,
                'column-4': 0,
            })
        }
    }, [isOpen])

    return (
        <>
            <Tooltip title='Добавить новый вариант выбора'>
                <IconButton size='small' onClick={toggleOpen}><AddIcon/></IconButton>
            </Tooltip>
            <Modal open={isOpen} onClose={toggleOpen} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box width={200} bgcolor='white' padding={8} borderRadius={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>Создать</h2>
                    <FormGroup>
                        <FormControl style={{ padding: '4px 0' }}>
                            <TextField type='text' name='column-0' label='Название' onChange={e => handleChange('column-0', e.target.value)} value={record['column-0']} style={{ padding: '8px 0px' }} />
                            {!!errors['column-0'] && <FormHelperText error style={{ margin: '0 0 8px' }}>{errors['column-0']}</FormHelperText>}
                        </FormControl>
                        <FormControl style={{ padding: '4px 0' }}>
                            <TextField type='number' name='column-1' error={!!errors['column-1']} label='Критерий F1' onChange={e => handleChange('column-1', e.target.value)} value={record['column-1']} style={{ padding: '8px 0px' }} />
                            {!!errors['column-1'] && <FormHelperText error style={{ margin: '0 0 8px' }}>{errors['column-1']}</FormHelperText>}
                        </FormControl>
                        <FormControl style={{ padding: '4px 0' }}>
                            <TextField type='number' name='column-2' label='Критерий F2' onChange={e => handleChange('column-2', e.target.value)} value={record['column-2']} style={{ padding: '8px 0px' }} />
                            {!!errors['column-2'] && <FormHelperText error style={{ margin: '0 0 8px' }}>{errors['column-2']}</FormHelperText>}
                        </FormControl>
                        <FormControl style={{ padding: '4px 0' }}>
                            <TextField type='number' name='column-3' label='Критерий F3' onChange={e => handleChange('column-3', e.target.value)} value={record['column-3']} style={{ padding: '8px 0px' }} />
                            {!!errors['column-3'] && <FormHelperText error style={{ margin: '0 0 8px' }}>{errors['column-3']}</FormHelperText>}
                        </FormControl>
                        <Button variant='contained' disabled={!!Object.values(errors).find(err => err)} onClick={() => handleSubmit()}>Добавить</Button>
                    </FormGroup>
                </Box>
            </Modal>
        </>
    )
}