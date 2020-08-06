import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from './Table/Table'
import { TableStyles } from './Table/TableStyles'

function App() {
   const [data, setData] = useState([]);

   // Get the data from the API
   useEffect(() => {
      const fetchData = async() => {
         const result = await axios.get('https://corona.lmao.ninja/v2/jhucsse');
         setData(result.data);
      };

      fetchData();
   }, []);

   // Create the table head & populate it with the data that comes from the API
   const columns = React.useMemo (
      () => [
         {
            Header: 'Country',
            columns: [
               {
                  Header: 'Province',
                  accessor: properties => properties.province ? properties.province : "*No data*"
               },
               {
                  Header: 'Country',
                  accessor: 'country',
               },
            ],
         },
         {
            Header: 'Info >',
            columns: [
               {
                  Header: 'Confirmed Case',
                  accessor: 'stats.confirmed',
               },
               {
                  Header: 'Deaths',
                  accessor: 'stats.deaths',
               },
               {
                  Header: 'Recovered',
                  accessor: 'stats.recovered',
               },
               {
                  Header: 'Updated At',
                  accessor: 'updatedAt',
               },
               {
                  Header: 'View on Google Maps',
                  accessor: properties => properties.coordinates.latitude + ',' + properties.coordinates.longitude,
                  Cell: ({cell: {value}}) => (
                     <a href={`https://www.google.com/maps/@${value},7.75z`} style={{display: "flex", color: "#fff"}}>Open in Maps
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1200px-Google_Maps_icon_%282020%29.svg.png" alt="Google Maps icon" style={{height: "20px", paddingLeft: "5px"}}/>
                     </a>
                  )
               },
            ],
         },
      ],
      []
   )

   return (
      <TableStyles>
         <Table columns={columns} data={data} />
      </TableStyles>
   );
}

export default App;