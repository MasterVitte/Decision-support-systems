import React from 'react'
import {Tooltip} from '@mui/material';

interface Props {
    title: string
    label?: string
}

export const VariantColumn: React.FC<Props> = ({ title, label }) => {
    return (
        <Tooltip title={title}>
            <span>{label}</span>
        </Tooltip>
    )
}