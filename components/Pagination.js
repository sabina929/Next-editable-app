import paginationStyles from '../styles/Pagination.module.css'

const Pagination = ({employeesPerPage, employees, currentPage, paginate}) => {
    const pageNumbers = [];
    const totalEmployees = employees.length;
    for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
          pageNumbers.push(i);
    }

    return (
        <article className={paginationStyles.paginationContainer}>
            <ul className={paginationStyles.listContainer}>
                {
                    pageNumbers.length === 0 ? <li className={`${paginationStyles.listItem} ${paginationStyles.selected}`} onClick={() => paginate(1)}><div className={paginationStyles.div}>1</div></li> : null
                }
                
                {
                    pageNumbers.map(pageNumber => {
                        return (
                        <li key={pageNumber} className={`${paginationStyles.listItem} ${pageNumber === currentPage ? paginationStyles.selected : null}`} onClick={() => paginate(pageNumber)}><div className={paginationStyles.div}>{pageNumber}</div></li>
                    )
                })
                }
            </ul>
        </article>
    )
}

export default Pagination