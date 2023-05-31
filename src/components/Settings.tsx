import React, {useEffect, useState} from 'react'
import {
    Box,
    Button,
    dialogActionsClasses,
    FormControl,
    FormGroup,
    FormHelperText,
    IconButton,
    Modal,
    TextField, Tooltip
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import {useModal} from '../hooks/useModal';
import {useSwitchModeContext} from './SwitchModeProvider';

export interface SettingsRecord {
    q1: number
    q2: number
    q3: number
}

interface Props {
    settings: SettingsRecord
    onSubmit: (record: SettingsRecord) => void
}

export const Settings: React.FC<Props> = ({ settings, onSubmit }) => {
    const { switchMode } = useSwitchModeContext()

    const { isOpen, toggleOpen } = useModal()

    const [record, setRecord] = useState<SettingsRecord>(settings)

    const [errors, setErrors] = useState({
        'q1': '',
        'q2': '',
        'q3': '',
    })

    const [sumError, setSumError] = useState(false)

    const handleChange = (name: string, value: any) => {
        const isError = value === '' || Number(value) > 1

        setErrors(prevState => {
            return {
                ...prevState,
                [name]: isError ? 'Коэффициент должен равняться дробному числу в диапазоне от 0 до 1' : ''
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
        setSumError(Object.keys(record).reduce((acc, key) => acc += parseFloat(Number(record[key as keyof SettingsRecord]).toFixed(10)), 0) !== 1)
    }, [record])

    if (switchMode === 'MM') return null

    return (
        <>
            <Tooltip title={`Настроить коэффициенты: ${Object.keys(record).map(key => `${key}: ${record[key as keyof SettingsRecord]}`).join(', ')}`}>
                <IconButton size='small' onClick={toggleOpen}>
                    <TuneIcon />
                </IconButton>
            </Tooltip>
            <Modal open={isOpen} onClose={toggleOpen} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box width={200} bgcolor='white' padding={8} borderRadius={8}>
                    <FormGroup>
                        <FormControl style={{ padding: '4px 0' }}>
                            <TextField type='text' name='q1' label='Коэффициент q1' onChange={e => handleChange('q1', e.target.value)} value={record['q1']} style={{ padding: '8px 0px' }} />
                            {!!errors['q1'] && <FormHelperText error style={{ margin: '0 0 8px' }}>{errors['q1']}</FormHelperText>}
                        </FormControl>

                        <FormControl style={{ padding: '4px 0' }}>
                            <TextField type='number' name='q2' error={!!errors['q2']} label='Коэффициент q2' onChange={e => handleChange('q2', e.target.value)} value={record['q2']} style={{ padding: '8px 0px' }} />
                            {!!errors['q2'] && <FormHelperText error style={{ margin: '0 0 8px' }}>{errors['q2']}</FormHelperText>}
                        </FormControl>
                        <FormControl style={{ padding: '4px 0' }}>
                            <TextField type='number' name='q3' label='Коэффициент q3' onChange={e => handleChange('q3', e.target.value)} value={record['q3']} style={{ padding: '8px 0px' }} />
                            {!!errors['q3'] && <FormHelperText error style={{ margin: '0 0 8px' }}>{errors['q3']}</FormHelperText>}
                        </FormControl>
                        {sumError && <FormHelperText error style={{ margin: '0 0 8px' }}>Сумма коэффициентов должна равняться 1!</FormHelperText>}
                        <Button variant='contained' disabled={!!Object.values(errors).find(err => err) || sumError} onClick={() => handleSubmit()}>Изменить</Button>
                    </FormGroup>
                </Box>
            </Modal>
        </>
    )
}