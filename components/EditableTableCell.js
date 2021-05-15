import tableStyles from '../styles/Table.module.css'

const EditableTableCell = ({cellAttrs, handleEmployeeTableCell}) => {
    return (
        <td className={tableStyles.tableData}>
            <input type={cellAttrs.type} name={cellAttrs.name} id={cellAttrs.id} value={cellAttrs.inputValue} rowid={cellAttrs.rowid} onChange={handleEmployeeTableCell} className={tableStyles.tableInput}/>
        </td>
    )
}

export default EditableTableCell