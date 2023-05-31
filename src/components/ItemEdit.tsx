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
import React, {useState} from 'react';
import {TableRecord} from './CoreTable';
import EditIcon from '@mui/icons-material/Edit';
import {useModal} from '../hooks/useModal';

interface Props {
    item: TableRecord
    rowNames: string[]
    onSubmit: (row: TableRecord) => void
}

export const ItemEdit: React.FC<Props> = ({ item, rowNames, onSubmit }) => {
    const { isOpen, toggleOpen } = useModal()

    const [record, setRecord] = useState<TableRecord>(item)

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
                        if (rowNames.filter(rowName => rowName !== item['column-0']).find(rowName => rowName === value)) {
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

    return (
        <>
            <Tooltip title={`Редактировать вариант выбора ${item['column-0']}`}>
                <IconButton size='small' onClick={toggleOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Modal open={isOpen} onClose={toggleOpen} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box width={200} bgcolor='white' padding={8} borderRadius={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>Редактировать</h2>
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
                        <Button variant='contained' disabled={!!Object.values(errors).find(err => err)} onClick={() => handleSubmit()}>Изменить</Button>
                    </FormGroup>
                </Box>
            </Modal>
        </>
    )
}