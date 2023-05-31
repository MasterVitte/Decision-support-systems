import {useTable} from './useTable';
import {useEffect, useState} from 'react';
import {TableRecord} from '../components/CoreTable';

export const useBLTable = () => {
    const { columns, rows, addRow, settings } = useTable()

    const [computedRows, setComputedRows] = useState(rows)
    const [answer, setAnswer] = useState<TableRecord>({})
    const [answerIndex, setAnswerIndex] = useState(0)

    useEffect(() => {
        setComputedRows(rows.map(record => {
            return {
                ...record,
                'column-4': ((parseFloat(record['column-1']) * settings.q1) + (parseFloat(record['column-2']) * settings.q2) + (parseFloat(record['column-3']) * settings.q3)).toFixed(2),
            }
        }))
    }, [rows, settings])

    useEffect(() => {
        const row = computedRows.reduce((acc, record, index) => {
            if (!acc?.id || parseFloat(acc?.['column-4']) < parseFloat(record['column-4'])) {
                setAnswerIndex(index + 1)
                acc = record
            }
            return acc
        }, {})

        setAnswer(row)
    }, [computedRows])

    return { columns, rows: computedRows, settings, addRow, answer, answerIndex }
}