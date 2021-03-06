import React from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'

function Table({ columns, data }) {
   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,

      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
   } = useTable (
      {
         columns,
         data,
         initialState: { pageIndex: 0, pageSize: 15 }
      },
      useSortBy,
      usePagination
   )

   return (
      <>
         <h4 style={{width: "80%", margin: "10px auto", textAlign: "right"}}>Covid-19 data sourced from Johns Hopkins University, updated every 10 minutes</h4>
         <table {...getTableProps()}>
         <thead>
            {headerGroups.map(headerGroup => (
               <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting.
                  // We can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{width: 'calc(100% / 7)'}}>
                     {column.render('Header')}
                     
                     <span>
                     {column.isSorted
                        ? column.isSortedDesc
                           ? ' 🔽'
                           : ' 🔼'
                        : ''}
                     </span>
                  </th>
               ))}
               </tr>
            ))}
         </thead>
         <tbody {...getTableBodyProps()}>
            {page.map(
               (row, i) => {
               prepareRow(row);
               return (
                  <tr {...row.getRowProps()}>
                     {row.cells.map(cell => {
                        return (
                           <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        )
                     })}
                  </tr>
               )}
            )}
         </tbody>
         </table>

         <br/>
         <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
               {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
               {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
               {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
               {'>>'}
            </button>{' '}
            <span>
               Page{' '}
               <strong>
                  {pageIndex + 1} of {pageOptions.length}
               </strong>{' '}
            </span>
            <span>
               | Go to page:{' '}
               <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                     const page = e.target.value ? Number(e.target.value) - 1 : 0
                     gotoPage(page)
                  }}
                  style={{ width: '100px' }}
               />
            </span>{' '}
            <select value={pageSize} onChange={e => {setPageSize(Number(e.target.value))}}>
               {[15, 30, 50, 100, 200].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                     Show {pageSize}
                  </option>
               ))}
            </select>
         </div>
      </>
   )
}

export default Table