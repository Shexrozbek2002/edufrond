import React, {useState, useEffect} from "react";
import { Table } from 'reactstrap';
import BootstrapTable , {row, cell, formatExtraData} from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import axios from "axios";

function NewTable() {

   const [dataTable, setDataTable] = useState([]);
   const [loading, setLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage, setPostsPerPage] = useState(10);
  
  useEffect(()=>{
     axios.get("https://edu.uzagrolab.uz/api/worker/resalt/")
     .then(res => {

      setDataTable(res.data)
     })
     .catch(err => {
      
     })
  },[])



  const columns = [
    {
      dataField: '#',
      text: '#',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      sort: true,
    },
    {
      dataField:"user",
      text:"Ф.И.Ш",
      sort:true
    },
    {
      dataField:"Зарарлирганизм",
      text:"ЗАРАРЛИ ОРГАНИЗМ",
      sort:true
    },
    {
        dataField:"Маҳсулот",
        text:"Маҳсулот",
        sort:true
    },
    {
      dataField:"Тажрибалар",
      text:"Тажрибалар",
      sort:true
    },
    {
      dataField:"Фенология",
      text:"Фенология",
      sort:true
    },
    {
      dataField:"Фото",
      text:"Фото",
      sort:true
    },
    {
      dataField:"Қаршикураш",
      text:"ҚАРШИ КУРАШ	",
      sort:true
   },
   {
    dataField:"Қўлёзмалар",
    text:"Қўлёзмалар",
    sort:true
   },
  //  {
  //   //dataField:"sum",
  //   text:"Йиъгинди",
  //   formatter: () => {
  //     return (dataTable.Зарарлирганизм + dataTable.Маҳсулот + dataTable.Тажрибалар)
  //   },
  //   sort:true
  //  }
  {
    dataField:"Сумма",
    text:"Сумма",
    sort:true
   },
]





    return(
        <div className="newTable">
            {/* <Table bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>F.I.SH</th>
            <th>Зарарли организм</th>
            <th>Маҳсулот</th>
            <th>Тажрибалар</th>
            <th>Фенология</th>
            <th>Фото</th>
            <th>Қарши кураш</th>
            <th>Қўл ёзмалар</th>
          </tr>
        </thead>

        <tbody>
          
         { dataTable.map((item,id) => {
              return(
                <tr key={id}>
                  <th scope="row">{id+1}</th>
                  <td>{item.user}</td>
                  <td>{item.Зарарлирганизм}</td>
                  <td>{item.Маҳсулот}</td>
                  <td>{item.Тажрибалар}</td>
                  <td>{item.Фенология}</td>
                  <td>{item.Фото}</td>
                  <td>{item.Қаршикураш}</td>
                  <td>{item.Қўлёзмалар}</td>
                </tr>
              )
            })}
       
        </tbody>
            </Table> */}

              <BootstrapTable
               data={dataTable} 
               columns={columns} 
               keyField="id"
               key={Math.floor(Math.random()*10000)}
               pagination={paginationFactory()}
               />
        </div>
    )
}

export default NewTable;