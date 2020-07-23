import React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class Data extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         offset: 0,
         data: [],
         perPage: 10,
         currentPage: 0
      };
      this.handlePageClick = this.handlePageClick.bind(this);
   }

   receivedData() {
      axios
         .get(`https://corona.lmao.ninja/v2/jhucsse`)
         .then(res => {
            const data = res.data;
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map(item => 
               <>
               <table>
                  <tbody>
                     <tr>
                        <th>Country</th>
                        <th>Confirmed Cases</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                     </tr>

                     <tr key={item.coordinates.latitude + item.coordinates.longitude + Math.random()}>
                        <td>{item.province}, {item.country}</td>
                        <td>{item.stats.confirmed}</td>
                        <td>{item.stats.deaths}</td>
                        <td>{item.stats.recovered}</td>
                     </tr>
                  </tbody>
               </table>
               </>
            )

            this.setState({
               pageCount: Math.ceil(data.length / this.state.perPage),
               
               postData
            })
         });
   }
   handlePageClick = (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;

      this.setState({
         currentPage: selectedPage,
         offset: offset
      }, () => {
         this.receivedData()
      });
   };

   componentDidMount() {
         this.receivedData()
   }
   render() {
      return (
         <div>
            {this.state.postData}
            <ReactPaginate
               previousLabel={"prev"}
               nextLabel={"next"}
               breakLabel={"..."}
               breakClassName={"break-me"}
               pageCount={this.state.pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               onPageChange={this.handlePageClick}
               containerClassName={"pagination"}
               subContainerClassName={"pages pagination"}
               activeClassName={"active"}
            />
         </div>
      )
   }
}

export default Data;


// return (
//    <>
//       {loading ? (
//       "Loading..."
//       ) : (
//       <table>
//          <tbody>
//             <tr>
//                <th>Country</th>
//                <th>Confirmed Cases</th>
//                <th>Deaths</th>
//                <th>Recovered</th>
//             </tr>

//             {data.map(({ country, province, stats, coordinates }) => (
//             <tr key={coordinates.latitude + coordinates.longitude + Math.random()}>
//                <td>{province}, {country}</td>
//                <td>{stats.confirmed}</td>
//                <td>{stats.deaths}</td>
//                <td>{stats.recovered}</td>
//             </tr>
//             ))}
//          </tbody>
//       </table>
//       )}
//    </>
// );