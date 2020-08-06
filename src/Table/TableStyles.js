import styled from 'styled-components'

export const TableStyles = styled.div`
   padding: 1rem;

   table {
      width: 80%;
      margin: 0 auto;
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid black;

      tr {
         background: #46637f;
      }
      
      tr th {
         color: #dd5;
      }

      th, td {
         color: #fff;
         margin: 0;
         text-align: left;
         font-size: 16px;
         padding: 0.5rem;
         border-bottom: 1px solid gray;
         font-family: Arial, Helvetica, sans-serif;

         :last-child {
            border-right: 0;
         }
      }
   }

   .pagination {
      width: 80%;
      margin: 20px auto;
      text-align: center;
   }
   .pagination button {
      background: #46637f;
      color: #fff;
      padding: 5px 20px;
      outline: none;
      border: none;
      cursor: pointer;
      border-radius: 5px;
   }
   .pagination select {
      background: #46637f;
      color: #fff;
      padding: 5px 20px;
      outline: none;
      border: none;
      border-radius: 5px;
   }
`