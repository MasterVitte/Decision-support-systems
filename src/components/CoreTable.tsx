import BaseTable, {BaseTableProps} from 'react-base-table'
import 'react-base-table/styles.css'
import React from 'react';

export interface TableRecord {
    [key: string]: any
}

export const CoreTable: React.FC<Partial<BaseTableProps<TableRecord>>> = (props) => {
    return (
        <BaseTable<TableRecord> width={450} height={250} {...props} />
    )
}