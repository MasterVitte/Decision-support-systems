import {Tooltip} from '@mui/material';
import React from 'react';
import {useSwitchModeContext} from './SwitchModeProvider';

interface Props {
    title?: string
}

export const MatrixColumn: React.FC<Props> = ({ title }) => {
    const {switchMode} = useSwitchModeContext()

    return <Tooltip title={switchMode === 'MM' ? 'Матрица решений - дополняется столбцом из наименьших результатов каждой строки' : 'Матрица решений дополняется столбцом, содержащим математическое ожидание значений каждой из строки'}>
        <span>{title}</span>
    </Tooltip>
}