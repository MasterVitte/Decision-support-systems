import {TableRecord} from '../components/CoreTable';
import {ColumnShape} from 'react-base-table';
import {createElement, useState} from 'react';
import {ItemDelete} from '../components/ItemDelete';
import {ItemEdit} from '../components/ItemEdit';
import {ItemCreate} from '../components/ItemCreate';
import {SwitchMode} from '../components/SwitchMode';
import {Settings, SettingsRecord} from '../components/Settings';
import {MatrixColumn} from '../components/MatrixColumn';
import {CriterionColumn} from '../components/CriterionColumn';
import {VariantColumn} from '../components/VariantColumn';

export const useTable = () => {
    const [settings, setSettings] = useState<SettingsRecord>({
        q1: 0.5,
        q2: 0.3,
        q3: 0.2,
    })

    const [rows, setRows] = useState<TableRecord[]>([
        {
            id: 'row-0',
            'column-0': 'E1',
            'column-1': 0,
            'column-2': 0,
            'column-3': 0,
            'column-4': 0,
        },
        {
            id: 'row-1',
            'column-0': 'E2',
            'column-1': 0,
            'column-2': 0,
            'column-3': 0,
            'column-4': 0,
        },

        {
            id: 'row-2',
            'column-0': 'E3',
            'column-1': 0,
            'column-2': 0,
            'column-3': 0,
            'column-4': 0,
        },
        {
            id: 'row-3',
            'column-0': 'E4',
            'column-1': 0,
            'column-2': 0,
            'column-3': 0,
            'column-4': 0,
        }
    ])

    const addRow = (row: TableRecord) => {
        setRows(prevState => {
            return [...prevState, {...row, id: 'row-' + prevState.length}]
        })
    }

    const editRow = (row: TableRecord) => {
        setRows(prevState => {
            const state = [...prevState]
            const index = prevState.findIndex(stateRow => stateRow.id === row.id)
            state.splice(index, 1, row)
            return state
        })
    }

    const deleteRow = (rowId: string) => setRows(prevState => prevState.filter(item => item.id !== rowId))

    const addSettings = (recordSettings: SettingsRecord) => {
        setSettings(recordSettings)
    }

    const [columns] = useState<ColumnShape<TableRecord>[]>([
        {
            key: 'column-0',
            dataKey: 'column-0',
            title: '',
            width: 400,
            resizable: true,
            headerRenderer: () => createElement(SwitchMode),
            cellRenderer: ({ rowData }) => createElement(VariantColumn, { title: 'Вариант выбора', label: rowData['column-0'] })
        },
        {
            key: 'column-1',
            dataKey: 'column-1',
            title: 'F1',
            width: 300,
            resizable: true,
            headerRenderer: ({column}) => createElement(CriterionColumn,
                {
                    label: column.title,
                    title: 'Критерий выбора',
                })
        },
        {
            key: 'column-2',
            dataKey: 'column-2',
            title: 'F2',
            width: 300,
            resizable: true,
            headerRenderer: ({column}) => createElement(CriterionColumn,
                {
                    label: column.title,
                    title: 'Критерий выбора',
                })
        },
        {
            key: 'column-3',
            dataKey: 'column-3',
            title: 'F3',
            width: 300,
            resizable: true,
            headerRenderer: ({column}) => createElement(CriterionColumn,
                {
                    label: column.title,
                    title: 'Критерий выбора',
                })
        },
        {
            key: 'column-4',
            dataKey: 'column-4',
            title: 'Eir',
            width: 300,
            resizable: true,
            headerRenderer: ({column}) => createElement(MatrixColumn,
                {
                    title: column.title,
                })
        },
        {
            key: 'edit',
            width: 200,
            headerRenderer: ({column}) => createElement(Settings,
                {settings, onSubmit: addSettings}),
            cellRenderer: ({rowData}) => createElement(ItemEdit, { rowNames: rows.map(row => row['column-0']), item: rowData, onSubmit: (data) => editRow(data)})
        },
        {
            key: 'delete',
            width: 200,
            headerRenderer: ({column}) => createElement(ItemCreate, { rowNames: rows.map(row => row['column-0']), onSubmit: addRow }),
            cellRenderer: ({rowData}) => createElement(ItemDelete, { item: rowData, onDelete: deleteRow })
        },
    ])

    return {columns, rows, addRow, deleteRow, settings}
}