import React from 'react';
import {Switch, Tooltip, Typography} from '@mui/material';
import {useSwitchModeContext} from './SwitchModeProvider';

export const SwitchMode = () => {
    const { switchMode, setSwitchMode } = useSwitchModeContext()

    return (
        <>
            <Tooltip title={switchMode === 'BL' ? 'Критерий Байеса Лапласа' : 'Минимаксный критерий'}>
                <Typography fontSize={13}>{switchMode}</Typography>
            </Tooltip>
            <Tooltip title={switchMode === 'MM' ? 'Переключить на критерий Байеса Лапласа' : 'Переключить на минимаксный критерий'}>
                <Switch size='small' checked={switchMode === 'BL'} onChange={e => setSwitchMode(e.target.checked ? 'BL' : 'MM')}/>
            </Tooltip>

        </>
    )
}