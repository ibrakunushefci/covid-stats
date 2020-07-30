import React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

class Data extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         offset: 0,
         data: [],
         perPage: 12,
         currentPage: 0
      };
      this.handlePageClick = this.handlePageClick.bind(this);
   }

   receivedData() {
      axios
         .get(`https://corona.lmao.ninja/v2/jhucsse`)
         .then(res => {
            const data = res.data;

            const newArray = data.filter(function(cases) {
               if(cases.stats.confirmed >= 100000 && cases.stats.recovered >= 100) {
                  return <tr><td>{cases.province}, {cases.country}</td></tr>
                  // const newArray2 = data.map(item =>
                  // )
               }
            })
            console.log(newArray)

            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map(item => 
               <tr key={item.coordinates.latitude + item.coordinates.longitude + Math.random()}>
                  <td>{item.province}, {item.country}</td>
                  <td>{item.stats.confirmed}</td>
                  <td>{item.stats.deaths}</td>
                  <td>{item.stats.recovered}</td>
               </tr>
            )

            this.setState({
               pageCount: Math.ceil(data.length / this.state.perPage),
               
               postData,
               newArray
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
      // console.log("Coming data", this.state.newArray)

      return (
         <div>
            <table>
               <tbody>
                  <tr>
                     <th>Country</th>
                     <th>Confirmed Cases</th>
                     <th>Deaths</th>
                     <th>Recovered</th>
                  </tr>

                  {this.state.postData}
               </tbody>
            </table>
            
            <ReactPaginate
               previousLabel={"prev"}
               nextLabel={"next"}
               breakLabel={"..."}
               breakClassName={"break-me"}
               pageCount={this.state.pageCount}
               marginPagesDisplayed={1}
               pageRangeDisplayed={2}
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