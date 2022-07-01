import React, { useEffect, useState, useContext } from 'react';
import { Col, Form, Row} from 'react-bootstrap';
import { Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import queryString from 'query-string';
import _ from 'lodash';
//import PaginationC from 'react-js-pagination';
import './main.css';
import { Loader } from '../../../vibe';
import { request } from '../../../helpers/createRequest';
import "./NewStyleTable.css"
import { Table } from 'reactstrap';
import axios from "axios";
import Pagination from "react-js-pagination";
import Select from 'react-select';

const Pests = (props, { location }) => {

  const [pests, setPests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dangerType, setDangerType] = useState('');

  const ctx = useContext(AuthContext);

  const [count, setCount] = useState(0);

  const queryParams = queryString.parse(window.location.search);

  const [zararProduct, setZararProduct] = useState([])

  const [tableInfo, setTableInfo] = useState([])
  useEffect(()=> {
    axios.get('https://edu.uzagrolab.uz/api/product').then(res => {
      setZararProduct(res.data)
    })
  }, [])
 // console.log("Zararkunanda: ", zararProduct)


  const productNameOptions = zararProduct.map(t => {
    return {value: t.id, label:t.name}
   })

   const [productNameValue, setProductNameValue] = useState('')


  const [arrproduct, setArrProduct] = useState([])
  const ProductNameFilter = (e) => {
    setArrProduct([])
    console.log("Tanlangaguas:", e.label);
    if(e.label == 'Барчаси'){
      setTableInfo(newTableInformation)
    }
    else {
       let a = newTableInformation.map(item => { 
        
       item.all_product.product.map(item1 => {
           
          if(item1.product.name.includes(e.label)){
    
            arrproduct.push(item)
             setArrProduct([...arrproduct, arrproduct])
           //tableInfo.push(item);
           //setTableInfo([...tableInfo, tableInfo])
          }
       
        }).filter(value => value)
    
  
        })
          setArrProduct([])
          console.log("Arrproduct: ", arrproduct)
          setTableInfo(arrproduct)
    } 
     
   
     
    
  
      
    
   
   
   }
  




  const getPests = async () => {
    setIsLoading(true);
    const pests = await request
      .get('alldata/', {
        params: {
          page: queryParams.page,
          type: queryParams.type,
        },
      })
      .then(res => res.data)
      .catch(e => {
        alert('Натижалар топилмади!');
      });
    setIsLoading(false);
    return pests;
  };

  useEffect(async () => {
    if (ctx.isLoggedIn) {
      const pestsData = await getPests();
      if (pestsData) {
        setPests(pestsData.results);
        setCount(pestsData.count);
      }
    }
  }, [queryParams.page, queryParams.type]);


 // filter function
   const onFilter = (itemValue) => {
    
      if(itemValue == 'Барчаси'){
        setTableInfo(newTableInformation)
      }
      else{
        let a =  newTableInformation.map(item => { 
          if(itemValue == item.all_research.type){
            return item
            //setNewTableInformation([...newTableInformation, item] )
          }
          
        }).filter(value=> value)
        setTableInfo(a)
        setTableInfo2([])
      }

    };


    const [unFiltered, setUnFiltered] =useState(false)
    // const onFilterKarantin = (itemValue) => {  
    //   if(itemValue==''){
    //     setTableInfo2(tableInfo)
    //   }
    //   else{
    //     let a = tableInfo.filter(item=> itemValue === item.all_research.quarantine_type)
    //     console.log(a,"aaa");
    //     setTableInfo2(a)
    //     setUnFiltered(true)
    //   }
    // }

    const onFilterKarantin = (itemValue) => {
      if(itemValue == ''){
        setTableInfo(newTableInformation)
      }
      else{
        let a =  newTableInformation.map(item => { 
          if(itemValue == item.all_research.quarantine_type){
            return item
            //setNewTableInformation([...newTableInformation, item] )
          }
          
        }).filter(value=> value)
        setTableInfo(a)
        setTableInfo2([])
      }

    }


   
  const InputFilter = (itemValue) => {
    if(itemValue.length==0){
      setTableInfo(newTableInformation)
    }
    else{
       let a =  newTableInformation.map(item => { 
      if(item.all_research.name_latin.includes(itemValue)){
         return item
        //setNewTableInformation([...newTableInformation, item] )
      }
      
     }).filter(value=> value);

     setTableInfo(a)
    }
   
   }


















  // pagination function
  // const onPageChange = nextPage => {
  //   props.history.push({ search: queryString.stringify({ ...queryParams, page: nextPage }, { skipNull: true }) });
  // };




  //   const deleteSample = async s => {
  //     if (window.confirm('Намуна натижасини ўчиришни хохлайсизми?')) {
  //       await fetchRequest.delete('samples/' + s.id).then(res => {
  //         if (res.status == 204) {
  //           setSamples(samples.filter(item => item.id != s.id));
  //         }
  //       });
  //     }
  //   };

  // const checkDateForDelete = createdAt => {
  //   if (moment(createdAt).isAfter(moment().subtract(1, 'hours'))) {
  //     return true;
  //     console.log(true);
  //   } else {
  //     return false;
  //     console.log(false);
  //   }
  // };

    // const onExport = async () => {
    //   const res = await fetchRequest
    //     .get('excel/samples', {
    //       responseType: 'blob', // important
    //       params: queryParams,
    //     })
    //     .then(response => {
    //       // const headerLine = response.data.headers['content-disposition']
    //       const url = window.URL.createObjectURL(new Blob([response.data]));
    //       const link = document.createElement('a');
    //       link.href = url;
    //       link.setAttribute('download', 'Натижалар.xls');
    //       document.body.appendChild(link);
    //       link.click();
    //       link.remove();
    //       return 1;
    //     });
    // };

  const [dataTable, setDataTable] = useState([
    {activePage: 15}
  ]);

  function handlePageChange(pageNumber) {
  //  console.log(`active page is ${pageNumber}`);
    setDataTable({activePage: pageNumber});
  }

  

  const [newTableInformation, setNewTableInformation] = useState([])
  useEffect(()=> {
   axios.get('https://edu.uzagrolab.uz/api/alldata2/')
   .then(res => {
    setNewTableInformation(res.data)
    setTableInfo(res.data)
    console.log("Res: ", res)
   // console.log("Table informatio=: ", res.data)
   })
  },[])
  
  const [tableInfo2, setTableInfo2] = useState([])
 // console.log("Table information: ", tableInfo)






  return (
    <Col md="12">
       <div className="pest-head">
          <div className="row">
            <div className="col-3">
               <Form.Select
                  className="form-control mb-4"
                  required
                  onChange={e => onFilter(e.target.value)}
                  >
                  <option value='Барчаси'>Заракунанда тури</option>
                  <option value="Заракунанда">Заракунанда</option>
                  <option value="Бегона ўт">Бегона ўт</option>
                  <option value="Касаллик">Касаллик</option>
                  <option value="Вирус">Вирус</option>
                  <option value="Бактерия">Бактерия</option>
               </Form.Select> 
            </div>
            <div className="col-3">
              <Form.Select
                  className="form-control mb-4"
                  required
                  
                  onChange={e => onFilterKarantin(e.target.value)}
                >
                  <option value={''}>Карантин ёки бошқа зарарли организмлар</option>
                  <option value='1'>Карантин</option>
                  <option value='2'>Бошқа зарарли организм</option>
                
            </Form.Select>
            </div>
            <div className="col-3">
            <Select
                options={productNameOptions}
              // value={productNameValue}
              placeholder="Зарарланиши мумкин бўлган маҳсулотлар"
              onChange={e => {
                ProductNameFilter(e)
              }}
             />
            </div><br/>
            <div className="col-3">
              <Input type="text" placeholder="Махсулот номини киритинг..." onChange = {e => InputFilter(e.target.value)}/>
            </div>
             <br/>
          </div>
       </div>
     
      
       
      
     
       
     
      <div className="table-flow">
        {!isLoading ? (
          <Table className="table-result" responsive={true}>
            <thead>
              <tr>
                <th>#</th>
                <th>Лотин номи</th>
                <th>Узбекча номи</th> 
                <th>Тури</th>
                <th>Зарарланиши мумкин бўлган маҳсулотлар</th>
                <th>Карантин ёки бошқа зарарли организмлар</th>
                <th>Маълумот</th>
                <th>Таҳрир</th>
              </tr>
            </thead>
            <tbody>
              {
                   tableInfo ?  tableInfo.map((pst, idx) => {
                         return (
                           <tr key={idx}>
                             <td>{idx+1}</td>
                             <td>{pst.all_research.name_latin}</td>
                             <td>{pst.all_research.name_uzb}</td>
                             <td>{pst.all_research.type}</td>
                             <td>{pst.all_product.product.map(item => item.product.name).join(' , ')}  </td>
                             <td>
                               {
                                 pst.all_research.quarantine_type == '1' ? 'Карантин' : 'бошқа зарарли организм'
     
                                 
                                 
                               }  
                               </td>
                             <td>
                               <Link to={`/pests/${pst.id}`} className="btn btn-info my-0 d-inline-block">
                                 <i className="fa fa-info"></i>
                               </Link>
                             </td>
                             <td>
                               <Link to={`/edit/${pst.id}`} className="btn btn-success my-0" color="danger">
                                 <i className="fa fa-edit white" />
                               </Link>
                             </td>
                           </tr>
                         );
                       }): ""
              }
            </tbody> 
                        
            {/* <tbody>
              {
              tableInfo?
              tableInfo2.length===0
                ? !unFiltered? tableInfo.map((pst, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{pst.all_research.name_latin}</td>
                        <td>{pst.all_research.name_uzb}</td>
                        <td>{pst.all_research.type}</td>
                        <td>{pst.all_product.product.map(item => item.product.name).join(' , ')}  </td>
                        <td>
                          {
                            pst.all_research.quarantine_type == '1' ? 'Карантин' : 'бошқа зарарли организм'

                            
                            
                          }  
                          </td>
                        <td>
                          <Link to={`/pests/${pst.id}`} className="btn btn-info my-0 d-inline-block">
                            <i className="fa fa-info"></i>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/edit/${pst.id}`} className="btn btn-success my-0" color="danger">
                            <i className="fa fa-edit white" />
                          </Link>
                        </td>
                      </tr>
                    );
                  }):""
                : tableInfo2.map((pst, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx+1}</td>
                      <td>{pst.all_research.name_latin}</td>
                      <td>{pst.all_research.name_uzb}</td>
                      <td>{pst.all_research.type}</td>
                      <td>{pst.all_product.product.map(item => item.product.name)}  </td>
                      <td>
                        {
                          pst.all_research.quarantine_type == '1' ? 'Карантин' : 'бошқа зарарли организм'   
                        }  
                        </td>
                      <td>
                        <Link to={`/pests/${pst.id}`} className="btn btn-info my-0 d-inline-block">
                          <i className="fa fa-info"></i>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/edit/${pst.id}`} className="btn btn-success my-0" color="danger">
                          <i className="fa fa-edit white" />
                        </Link>
                      </td>
                    </tr>
                  );
                }):""}
            </tbody>  */}


          </Table>
        ) : (
          <Loader type="spin" />
        )}
      </div>
      <Col-4>
        <Pagination
            activePage={dataTable.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={4}
            onChange={handlePageChange.bind(this)}
          />
      </Col-4>

      {/* {!isLoading && (
        <PaginationC
          activePage={parseInt(queryParams.page || 1)}
          itemsCountPerPage={10}
          totalItemsCount={count}
          pageCount={Math.ceil(parseInt(count) / 10)}
          pageRangeDisplayed={3}
          itemClass={`page-item`}
          linkClass={`page-link`}
          onChange={p => onPageChange(p)}
        />
      )} */}
    </Col>
  );
};

export default Pests;
