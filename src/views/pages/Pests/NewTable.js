import React, {useState, useEffect} from "react";
import { Table } from 'reactstrap';
import Pagination from "react-js-pagination";
import axios from "axios";
import "./NewStyleTable.css"
function NewTable() {

    const [dataTable, setDataTable] = useState([
      {activePage: 15}
    ]);


   function handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      setDataTable({activePage: pageNumber});
    }


  //  const [loading, setLoading] = useState(false);
  //  const [currentPage, setCurrentPage] = useState(1);
  //  const [postsPerPage, setPostsPerPage] = useState(10);
   
  //  useEffect(() => {
  //    const fetchPosts = async () => {
  //        setLoading(true);
  //        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  //        setDataTable(res.data);
  //        setLoading(false);
  //    }
  //    fetchPosts()
  //  }, [])
 
  //  // Get current posts
  //  const indexOfLastPost = currentPage * postsPerPage;
  //  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //  const currentPosts = dataTable.slice(indexOfFirstPost, indexOfLastPost)


    return(
        <div className="newTable">
            <Table bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {/* {
            currentPosts.map((item, id) => {
              return(
                <tr key={id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.userId}</td>
                  <td>{item.title}</td>
               </tr>
              )
            })
          } */}
         
         
         
        </tbody>
            </Table>
      <Col-4>
        <Pagination
            activePage={dataTable.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={4}
            onChange={handlePageChange.bind(this)}
          />
      </Col-4>
        </div>
    )
}

export default NewTable;