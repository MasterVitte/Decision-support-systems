import {useMMTable} from '../hooks/useMMTable';
import {useBLTable} from '../hooks/useBLTable';
import React from 'react';
import {CoreTable} from './CoreTable';
import CalculateIcon from '@mui/icons-material/Calculate';
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from '@mui/material';
import {useSwitchModeContext} from './SwitchModeProvider';

export const Table = () => {
    const { switchMode } = useSwitchModeContext()

    const { columns: MMColumns, rows: MMRows, answer: MMAnswer, answerIndex: MMAnswerIndex } = useMMTable()
    const { columns: BLColumns, settings, rows: BLRows, answer: BLAnswer, answerIndex: BLAnswerIndex} = useBLTable()

    const columns = {
        'MM': MMColumns,
        'BL': BLColumns,
    }

    const rows = {
        'MM': MMRows,
        'BL': BLRows,
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CoreTable columns={columns[switchMode]} data={rows[switchMode]} ignoreFunctionInColumnCompare={false} overscanRowCount={4} key={switchMode} />
            <Box style={{ padding: '8px 0' }} width={450}>
                {switchMode === 'MM' ? <Accordion>
                    <AccordionSummary
                        expandIcon={<CalculateIcon />}
                    >
                        <Typography>Ответ: Вариант {MMAnswer?.['column-0']}: {MMAnswer?.['column-4']}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Матрица решений |Eij| дополняется столбцом из наименьших результатов Eir каждой строки.
                        <Box style={{ padding: 4 }} />
                        {rows[switchMode].map((row, index) => {
                            return (
                                <Typography>
                                    {`E${index + 1}r = Math.min(${row['column-1']}, ${row['column-2']}, ${row['column-3']}) = ${row['column-4']}`}
                                </Typography>
                            )
                        })}
                        <Box style={{ padding: 4 }} />
                        Наибольшее значение Eir:
                        <Box style={{ padding: 4 }} />
                        {`Zmm = (${rows[switchMode].map(row => row['column-4']).join(', ')}) = ${MMAnswer['column-4']}`}
                        <Box style={{ padding: 4 }} />
                        Было выявлено, что вариант {MMAnswerIndex} с наибольшим значением {MMAnswer['column-4']} является наилучшим (оптимальным) вариантом
                    </AccordionDetails>
                </Accordion>
                    : <Accordion>
                        <AccordionSummary
                            expandIcon={<CalculateIcon />}
                        >
                            <Typography>Ответ: Вариант {BLAnswer?.['column-0']}: {BLAnswer?.['column-4']}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Матрица решений |Eij| дополняется столбцом, содержащим математическое ожидание значений каждой из строки.
                            <Box style={{ padding: 4 }} />
                            {rows[switchMode].map((row, index) => {
                                return (
                                    <Typography>
                                        {`E${index + 1}r = ${row['column-1']} * ${settings.q1} + ${row['column-2']} * ${settings.q2} + ${row['column-3']} * ${settings.q3} = ${row['column-4']}`}
                                    </Typography>
                                )
                            })}
                            <Box style={{ padding: 4 }} />
                            Наибольшее значение Eir:
                            <Box style={{ padding: 4 }} />
                            {`Zbl = (${rows[switchMode].map(row => row['column-4']).join(', ')}) = ${BLAnswer['column-4']}`}
                            <Box style={{ padding: 4 }} />
                            Было выявлено, что вариант {BLAnswerIndex} с наибольшим значением {BLAnswer['column-4']} является наилучшим (оптимальным) вариантом
                        </AccordionDetails>
                    </Accordion>}
            </Box>
        </div>
    )
}