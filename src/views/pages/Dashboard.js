import React, { Component, useState, useEffect } from 'react';
import reactFeature from '../../assets/images/react-feature.svg';
import sassFeature from '../../assets/images/sass-feature.svg';
import bootstrapFeature from '../../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Table } from 'reactstrap';






function Dashboard() {

  const [tableKarantin, setTableKarantin] = useState([])
  const [tableNoKarantin, setTableNoKarantin] = useState([])
  const [tableAllKarantin, setTableAllKarantin] = useState([])
  
useEffect(()=>{
  axios.get("https://edu.uzagrolab.uz/api/quarantine/resalt/")
  .then(res => {
    setTableKarantin(res.data.Karantin)
    setTableNoKarantin(res.data.Karantinemas)
    setTableAllKarantin(res.data.UmumiyKarantin)
  })
  .catch(err => {
   
  })
},[])




  return(
    <div className="newTable">
     <Table bordered responsive>
<thead>
<tr>
    <th></th>
    <th>КАРАНТИН</th>
    <th>Бошқа зарарли организмлар </th>
    <th>Умумий</th>
  </tr>
</thead>
<tbody>
<tr>
    <td></td>
    <td>{tableKarantin.Karantinsoni}</td>
    <td>{tableNoKarantin.Karantinsoni}</td>
    <td>{tableAllKarantin.Organizm}</td>
  </tr>
  <tr>
    <td>Вирус</td>
    <td>{tableKarantin.Вирус}</td>
    <td>{tableNoKarantin.Вирус}</td>
    <td>{tableAllKarantin.Вирус}</td>
  </tr>
  <tr>
    <td>Касаллик</td>
    <td>{tableKarantin.Касаллик}</td>
    <td>{tableNoKarantin.Касаллик}</td>
    <td>{tableAllKarantin.Касаллик}</td>
  </tr>
  <tr>
    <td>Заракунанда</td>
    <td>{tableKarantin.Заракунанда}</td>
    <td>{tableNoKarantin.Заракунанда}</td>
    <td>{tableAllKarantin.Заракунанда}</td>
  </tr>
  <tr>
    <td>Бегона ўт</td>
    <td>{tableKarantin.Бегонаўт}</td>
    <td>{tableNoKarantin.Бегонаўт}</td>
    <td>{tableAllKarantin.Бегона}</td>
  </tr>
  <tr>
    <td>Бактерия</td>
    <td>{tableKarantin.Бактерия}</td>
    <td>{tableNoKarantin.Бактерия}</td>
    <td>{tableAllKarantin.Бактерия}</td>
  </tr>

</tbody>

    </Table> 
</div>
  )
}


export default Dashboard


// class Dashboard extends Component {
//   render() {
//     const heroStyles = {
//       padding: '50px 0 70px',
//     };

//     return (
//       <div>
//         <Row>
//           <Col md={6}>
//             <div className="home-hero" style={heroStyles}>
//               <h1>Welcome to Institution.</h1>
//               <p className="text-muted"></p>
//             </div>
//           </Col>
//         </Row>














//         {/* <Row>
//           <Col md={6}>
//             <Card>
//               <CardBody className="display-flex">
//                 <img src={reactFeature} style={{ width: 70, height: 70 }} alt="react.js" aria-hidden={true} />
//                 <div className="m-l">
//                   <h2 className="h4">React.js</h2>
//                   <p className="text-muted">Built to quickly get your MVPs off the ground.</p>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md={6}>
//             <Card>
//               <CardBody className="display-flex">
//                 <img src={bootstrapFeature} style={{ width: 70, height: 70 }} alt="Bootstrap" aria-hidden={true} />
//                 <div className="m-l">
//                   <h2 className="h4">Bootstrap 4</h2>
//                   <p className="text-muted">The most popular framework to get your layouts built.</p>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={6}>
//             <Card>
//               <CardBody className="display-flex">
//                 <img src={sassFeature} style={{ width: 70, height: 70 }} alt="Sass" aria-hidden={true} />
//                 <div className="m-l">
//                   <h2 className="h4">Sass</h2>
//                   <p className="text-muted">Easily change the design system styles to fit your needs.</p>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md={6}>
//             <Card>
//               <CardBody className="display-flex">
//                 <img src={responsiveFeature} style={{ width: 70, height: 70 }} alt="Responsive" aria-hidden={true} />
//                 <div className="m-l">
//                   <h2 className="h4">Responsive</h2>
//                   <p className="text-muted">Designed for screens of all sizes.</p>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row> */}
//       </div>
//     );
//   }
// }

// export default Dashboard;
