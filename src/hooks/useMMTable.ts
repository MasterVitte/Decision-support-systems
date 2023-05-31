import {useTable} from './useTable';
import {useEffect, useState} from 'react';
import {TableRecord} from '../components/CoreTable';

export const useMMTable = () => {
    const { columns, rows, addRow } = useTable()

    const [computedRows, setComputedRows] = useState(rows)
    const [answer, setAnswer] = useState<TableRecord>({})
    const [answerIndex, setAnswerIndex] = useState(0)

    useEffect(() => {
        setComputedRows(rows.map(record => {
                return {
                    ...record,
                    'column-4': Math.min(record['column-1'], record['column-2'], record['column-3']).toFixed(2),
                }
        }))
    }, [rows])

    useEffect(() => {
        const row = computedRows.reduce((acc, record, index) => {
            if (!acc?.id || Number(acc?.['column-4']) < Number(record['column-4'])) {
                setAnswerIndex(index + 1)
                acc = record
            }
            return acc
        }, {})

        setAnswer(row)
    }, [computedRows])

    return { columns, rows: computedRows, addRow, answer, answerIndex }
}