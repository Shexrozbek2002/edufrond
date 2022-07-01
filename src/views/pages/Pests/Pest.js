import React, { useState, useEffect, useContext } from 'react';
import { Col, Table } from 'react-bootstrap';
import { fetchRequest } from '../../../helpers/createRequest';
import { Loader } from '../../../vibe';
import AuthContext from '../../../store/auth-context';
import axios from 'axios';
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
// import './results.css';
import './Pests.css'

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}




const Pest = ({ match }) => {
  const pestId = match.params.pestId;

  const ctx = useContext(AuthContext);

  const [pest, setPest] = useState({
    id: null,

  });
  const [pestProduct, setPestProduct] = useState({});
  const [pestPheno, setPestPheno] = useState({});
  const [pestProtect, setPestProtect] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const agrovideo =`https://edu.uzagrolab.uz${pest['all_protect'] ? pest.all_protect.agro_vedio: null}`
  const biovideo =`https://edu.uzagrolab.uz${pest['all_protect'] ? pest.all_protect.bio_vedio: null}`
  const Chemistryvideo =`https://edu.uzagrolab.uz${pest['all_protect'] ? pest.all_protect.chemistry_vedio: null}`

   const [pestIdInformation, setPestIdInformation] = useState([]);

  useEffect(() => {
    axios.get(`https://edu.uzagrolab.uz/api/alldataa/${pestId}/`)
    .then((res) => {
      setPestIdInformation(res.data)
      setPest(res.data)
    })
  },[])

  /*   **************  Manager btn  ********** */

  // research Manager
  const ResearchBtn = () => {
    const statusFormData = new FormData()
    statusFormData.append("confirmation_status",true)
    axios({
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      url:`https://edu.uzagrolab.uzapi/research/check/${pest.all_research.id}/`,
      data: statusFormData
     })
     .then(res => {
      toast.success('Малумотиз тасдиқланди', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
    .catch(err => {
      toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        console.log("Error: ", err)
    })
    
  }

  const ResearchNoBtn = () => {
    const statusFormData = new FormData()
    statusFormData.append("confirmation_status",false)
   
    axios({
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      url:`https://edu.uzagrolab.uz/api/research/check/${pest.all_research.id}/`,
      data: statusFormData
     })
     .then(res => {
      toast.success('Малумотиз тасдиқланмади', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
    .catch(err => {
      toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        console.log("Error: ", err)
    })
    
  }
  
  
  // Phenology Manager
  const PhenologyBtn = () => {
    const statusFormData = new FormData()
    statusFormData.append("confirmation_status",true)
    axios({
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      url:`https://edu.uzagrolab.uz/api/phenology/check/${pest.all_phenology.id}/`,
      data: statusFormData
     })
     .then(res => {
      toast.success('Малумотиз тасдиқланди', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
    .catch(err => {
      toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        console.log("Error: ", err)
    })
    
  }

  const PhenologyNoBtn = () => {
    const statusFormData = new FormData()
    statusFormData.append("confirmation_status",false)
    axios({
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      url:`https://edu.uzagrolab.uz/api/phenology/check/${pest.all_phenology.id}/`,
      data:statusFormData
     })
     .then(res => {
      toast.success('Малумотиз тасдиқланмади', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
    .catch(err => {
      toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        console.log("Error: ", err)
    })
    
  }

  //Product Manager
  
  const ProductBtn = () => {
    const statusFormData = new FormData()
    statusFormData.append("confirmation_status",true)
    axios({
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      url:`https://edu.uzagrolab.uz/api/product/check/${pest.all_product.id}/`,
      data: statusFormData
     })
     .then(res => {
      toast.success('Малумотиз тасдиқланди', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
    .catch(err => {
      toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        console.log("Error: ", err)
    })
    
  }

  const ProductNoBtn = () => {
    const statusFormData = new FormData()
    statusFormData.append("confirmation_status",false)
    axios({
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      url:`https://edu.uzagrolab.uz/api/product/check/${pest.all_product.id}/`,
      data: statusFormData
     })
     .then(res => {
      toast.success('Малумотиз тасдиқланмади', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
    .catch(err => {
      toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        console.log("Error: ", err)
    })
    
  }

 // Exprement Manager
    
    const ExprementBtn = () => {
      const statusFormData = new FormData()
      statusFormData.append("confirmation_status",true)
      axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        url:`https://edu.uzagrolab.uz/api/experiment/check/${pest.experiments_out[0].id}/`,
        data: statusFormData
       })
       .then(res => {
        toast.success('Малумотиз тасдиқланди', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(err => {
        toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log("Error: ", err)
      })
      
    }
  
    const ExprementNoBtn = () => {
      const statusFormData = new FormData()
      statusFormData.append("confirmation_status",false)
      axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        url:`https://edu.uzagrolab.uz/api/experiment/check/${pest.experiments_out[0].id}/`,
        data: statusFormData
       })
       .then(res => {
        toast.success('Малумотиз тасдиқланмади', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(err => {
        toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log("Error: ", err)
      })
      
    }


    // Notes Manager
    
    const NotesBtn = () => {
      const statusFormData = new FormData()
      statusFormData.append("confirmation_status",true)
      axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        url:`https://edu.uzagrolab.uz/api/note/check/${pest.notes_out[0].id}/`,
        data: statusFormData
       })
       .then(res => {
        toast.success('Малумотиз тасдиқланди', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(err => {
        toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log("Error: ", err)
      })
    }
  
    const NotesNoBtn = () => {
      const statusFormData = new FormData()
      statusFormData.append("confirmation_status",false)
      axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        url:`https://edu.uzagrolab.uz/api/note/check/${pest.notes_out[0].id}/`,
        data: statusFormData
       })
       .then(res => {
        toast.success('Малумотиз тасдиқланмади', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(err => {
        toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log("Error: ", err)
      })
    }

    // Photos Manager
    

    const PhotosBtn = () => {
      const statusFormData = new FormData()
      statusFormData.append("confirmation_status",true)
      axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        url:`https://edu.uzagrolab.uz/api/photo/check/${pest.photos[0].id}/`,
        data: statusFormData
       })
       .then(res => {
        toast.success('Малумотиз тасдиқланди', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(err => {
        toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log("Error: ", err)
      })
    }
  
    const PhotosNoBtn = () => {
      const statusFormData = new FormData()
      statusFormData.append("confirmation_status",false)
      axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        url:`https://edu.uzagrolab.uz/api/photo/check/${pest.photos[0].id}/`,
        data: statusFormData
       })
       .then(res => {
        toast.success('Малумотиз тасдиқланмади', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(err => {
        toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log("Error: ", err)
      })
    }


    // protect manager
   

    const ProtectBtn = () => {
      const statusFormData = new FormData()
      statusFormData.append("confirmation_status",true)
      axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        url:`https://edu.uzagrolab.uz/api/protect/check/${pest.all_protect.id}/`,
        data: statusFormData
       })
       .then(res => {
        toast.success('Малумотиз тасдиқланди', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(err => {
        toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          console.log("Error: ", err)
      })
    }
  
    const  ProtectNoBtn = () => {
      const statusFormData = new FormData()
      statusFormData.append("confirmation_status",false)
      axios({
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
        url:`https://edu.uzagrolab.uz/api/protect/check/${pest.all_protect.id}/`,
        data:statusFormData
       })
       .then(res => {
        toast.success('Малумотиз тасдиқланмади', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      .catch(err => {
        toast.error('Сизга малумотни озгартириш ҳуқуқи берилмаган', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
    }

  /*   **************  Manager btn  ********** */


  



  const  karantin = pest['all_research'] ? pest.all_research.quarantine_type: '';
  useEffect(() => {
     if(karantin == '1'){
       document.querySelector('.karantinParag').innerHTML="Karantin"
     }
     else{
      document.querySelector('.karantinParag').innerHTML="Boshqa zarali organizm"
     }
  }, [])

  console.log(pest)
  
  return (
    <Col md="12" className="">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
{/* Same as */}
<ToastContainer />
      <div className="">
        {!isLoading ? (
          <div className='AllStyle'>
          
            <h3 className='sectionText'>Зарарли организм</h3>
             <ol>
              <li>
                 <strong>Карантин ёки Зарарли организм</strong>
                 <p className='karantinParag'></p>
              </li>
              <li>
                 <strong>Номи (ўзб)</strong> 
                 <p>{pest['all_research'] ? pest.all_research.name_uzb : "Malumot yoq"}</p>
              </li>
              <li>
                 <strong>Номи (лотин)</strong>
                 <p>{pest['all_research'] ? pest.all_research.name_latin : "Malumot yoq"}</p>
              </li>
              <li>
                 <strong>Тури</strong>
                 <p>{pest['all_research'] ? pest.all_research.type : "Malumot yoq"}</p>
              </li>
              <li>
                 <strong>Зарарланиши мумкин бўлган маҳсулотлар</strong>
                 <p>{pest['all_product'] ? pest.all_product.product.map(product => (product['product']['name'])).join(' ') : "Malumot yoq"}</p>
              </li>
              <li>
                 <strong>Кенг тарқалган давлатлар</strong>
                 <p>{pest['all_research'] ? pest.all_research.country.map(country => (country['name_ru'])).join(' ') : "Malumot yoq"}</p>
              </li>
              <li>
                  <strong>Таснифи</strong>
                  <p>{pest['all_research'] ? pest.all_research.description : "Malumot yoq"}</p>
              </li>
              <li>
                 <strong>Тизимга малумот киритган шахс</strong>
                 <p>{pest['all_research'] ?( pest['all_research']['created_by'] ? pest['all_research']['created_by'].full_name : 'Malumotlar hali yangilanmagan') : "Malumot yoq"}</p>
              </li>
            
               <li>
                  <strong>Тизимдаги малумотни янгилаган шахс</strong>
                    <p>{pest['all_research'] ? (pest['all_research']['updated_by'] ? pest['all_research']['updated_by'].full_name : pest['all_research']['updated_by']): "Malumot yoq"}</p>
              </li>
               <div className='btn-box'>
                <Button color="success" onClick = {ResearchBtn}>Тасдиқлайман</Button>
                <Button color="danger" onClick = {ResearchNoBtn}>Тасдиқламайман</Button>
               </div>
             </ol>
           
             
           {
            pest['all_phenology'] ?( pest['all_phenology'].pheno_status ? (  
                <div>
                   <h3 className='sectionText'>Фенология</h3>
                   <ol>
                 
                <li>
                   <strong>Тухум куни</strong>
                  <p>{pest['all_phenology'] ? pest.all_phenology.day_eggs : "Malumot yoq"}</p>
                </li>
                <li>
                   <strong>Тухум ойи</strong>    
                   <p>{pest['all_phenology'] ? pest.all_phenology.month_eggs.map(product => (product['month'])).join(' ') : "Malumot yoq"}</p>
                </li>
                <li>
                   <strong>Тухум градус</strong>    
                   <p>{pest['all_phenology'] ? pest.all_phenology.eggs : "Malumot yoq"}</p>
                </li>
                <li>
                  <strong>Ғумбак куни</strong>
                  <p>{pest['all_phenology'] ? pest.all_phenology.day_fungus : "Malumot yoq"}</p> 
                </li>
                <li>
                   <strong>Ғумбак градус</strong>   
                    <p>{pest['all_phenology'] ? pest.all_phenology.fungus : "Malumot yoq"}</p>
                </li>
                <li>
                   <strong>Гумбак ойи</strong>  
                   <p>{pest['all_phenology'] ? pest.all_phenology.month_fungus.map(product => (product['month'])).join(' ') : "Malumot yoq"}</p>
                </li>
                <li>
                  <strong>Личинка куни</strong>
                  <p>{pest['all_phenology'] ? pest.all_phenology.day_larva : "Malumot yoq"}</p>
                </li>
                <li>
                   <strong>Личинка градус</strong>  
                   <p>{pest['all_phenology'] ? pest.all_phenology.larva : "Malumot yoq"}</p>
                </li>
                <li>
                  <strong>Личинка ойи</strong>  
                  <p>{pest['all_phenology'] ? pest.all_phenology.month_larva.map(product => (product['month'])).join(' ') : "Malumot yoq"}</p> 
                </li> 
                <li>
                  <strong>Етук зот куни</strong>
                  <p>{pest['all_phenology'] ? pest.all_phenology.day_mature : "Malumot yoq"}</p>
                </li>
                <li>
                  <strong>Етук зот ойи</strong> 
                 <p>{pest['all_phenology'] ? pest.all_phenology.month_mature.map(product => (product['month'])).join(' ') : "Malumot yoq"}</p>
                </li>
                <li>
                   <strong>Кўпайиш куни</strong>
                   <p>{pest['all_phenology'] ? pest.all_phenology.day_m : "Malumot yoq"}</p>
                </li>
                <li>
                   <strong>Кўпайиши ойи</strong>    
                   <p>{pest['all_phenology'] ? pest.all_phenology.month_m.map(product => (product['month'])).join(' ') : "Malumot yoq"}</p>   
                </li>
                <li>
                   <strong>Кўпайиши градус</strong>
                   <p>{pest['all_phenology'] ? pest.all_phenology.manipulation : "Malumot yoq"}</p>
                </li>
                <li>
                   <strong>Башорат</strong>    
                   <p>{pest['all_phenology'] ? pest.all_phenology.prediction : "Malumot yoq"}</p>
                </li>
                <li>
                  <strong>Тизимга малумот киритган шахс</strong>
                  <p>{pest['all_phenology'] ? pest.all_phenology.created_by.full_name : "Malumot  yoq"}</p>
                </li>
            
                <li>
                <strong>Тизимдаги малумотни янгилаган шахс</strong>
                   <p>{pest['all_phenology'] ? (pest['all_phenology']['updated_by'] ? pest['all_phenology']['updated_by'].full_name : pest['all_phenology']['updated_by']): "Malumot yoq"}</p>
                </li>
                  <div className='btn-box'>
                    <Button color="success" onClick = {PhenologyBtn}>Тасдиқлайман</Button>
                    <Button color="danger" onClick = {PhenologyNoBtn} >Тасдиқламайман</Button>
                </div>
                   </ol>
                </div>   
               
            ) : '') : ''
           }
          

             <h3 className='sectionText'>Маҳсулот</h3>
             <ol>
               <li>
                 <strong>Махсулот номи</strong>       
                 <p>{pest['all_product'] ? pest.all_product.product.map(product => (product['product']['name'])).join(' ') : "Malumot yoq"}</p>  
               </li>
               <li>
                 <strong>Махсулот ҳс cоде</strong>   
                 <p>{pest['all_product'] ? pest.all_product.product.map(product => (product['product_hs_code'])) : "Malumot yoq"}</p>
               </li>
               <li>
                 <strong>Махсулот тури</strong>   
                 <p>{pest['all_product'] ? pest.all_product.product.map(product => (product['type_product']['product'])) : "Malumot yoq"}</p> 
               </li>
               <li>
                 <strong>Тизимга малумот киритган шахс</strong>
                 <p>{pest['all_product'] ? pest.all_product.created_by.full_name : "Malumot yoq"}</p>
               </li>
                <li>
                 <strong>Тизимдаги малумотни янгилаган шахс</strong>
                 <p>{pest['all_product'] ? (pest['all_product']['updated_by'] ? pest['all_product']['updated_by'].full_name : pest['all_product']['updated_by']): "Malumot yoq"}</p>
               </li>
               <div className='btn-box'>
                  <Button color="success"  onClick = {ProductBtn}>Тасдиқлайман</Button>
                  <Button color="danger"  onClick = {ProductNoBtn}>Тасдиқламайман</Button>
               </div>
             </ol>
          
             
             <h3 className='sectionText'>Тажрибалар</h3>
             <ol>
              <li>
                  <strong>Номлари: </strong>
                <ol className='nameOl'>
                  {
                    pest['experiments_out'] ? pest['experiments_out'][0]['experiment'].map((item, keyId) => {
                      return(
                        <li key={keyId} className="fileName">
                          <BsFillFileEarmarkFill className='fileIcon'/>
                          <a href={item.experiment} className="fileA" download>Эхпрементс Филе {keyId+1}</a>
                        </li>
                        
                      )
                    }) : null
                  }
                 </ol>
               </li>
               <li>
                <strong>Тизимга малумот киритган шахсs</strong>
                <p>{pest['experiments_out'] ? pest['experiments_out'][0].created_by.full_name : "Malumot yoq"}</p>
               </li>
              
               <li>
               <strong>Тизимдаги малумотни янгилаган шахс</strong>
                 <p>{pest['experiments_out'] ? (pest['experiments_out'][0]['updated_by'] ? pest['experiments_out'][0]['updated_by'].full_name : pest['experiments_out']['updated_by']): "Malumot yoq"}</p>
              </li>
              <div className='btn-box'>
                <Button color="success" onClick = {ExprementBtn}>Тасдиқлайман</Button>
                <Button color="danger" onClick = {ExprementNoBtn}>Тасдиқламайман</Button>
               </div>
             </ol>
            
             
             <h3 className='sectionText'>Қўлёзмалар</h3>
                <ol>
                  <li>
                            <strong>Номлари:</strong>
                    <ol className='nameOl'>
                      {
                        pest['notes_out'] ? pest['notes_out'][0]['note'].map((item, keyId) => {
                          return(
                            <li key={keyId} className="fileName">
                              <BsFillFileEarmarkFill className='fileIcon'/>
                               <a href={item.note} key={keyId} className="fileA" download>Нотес Филе {keyId+1}</a>
                            </li>
                           
                          )
                        }) : null
                      }
                    </ol>
                 </li>
                 <li>
                    <strong>Tizimga malumot kiritgan shaxs</strong>
                    <p>{pest['notes_out'] ? pest['notes_out'][0].created_by.full_name : "Malumot yoq"}</p>
                 </li>
               
                  <li>
                    <strong>Тизимдаги малумотни янгилаган шахс</strong>
                      <p>{pest['notes_out'] ? (pest['notes_out'][0]['updated_by'] ? pest['notes_out'][0]['updated_by'].full_name : pest['notes_out']['updated_by']): "Malumot yoq"}</p>
                 </li> 
                 <div className='btn-box'>
                   <Button color="success" onClick = {NotesBtn}>Тасдиқлайман</Button>
                   <Button color="danger" onClick = {NotesNoBtn}>Тасдиқламайман</Button>
                 </div>
                </ol>
                  
             <h3 className='sectionText'>Расмлар</h3>
               <ol>
                 <li>
                          <strong>Номлари: </strong>
                    <>
                      {
                        pest['photos'] ? pest['photos'][0]['photo'].map((item, keyId) => {
                          //${item.photo}
                          return(
                            <div className='img-block' key={keyId}>
                                <img className='editImgStyle' src={"https://edu.uzagrolab.uz" + item.photo} key={keyId} alt="Rasm kiritilmagan"/>
                            </div>
                          
                          )
                        }) : null
                      }
                    </>
                 </li>
                 <li> 
                   <strong>Тизимга  малумот киритган шахс</strong>
                   <p>{pest['photos'] ? pest['photos'][0].created_by.full_name : "Malumot yoq"}</p>
                 </li>
              
                  <li>
                     <strong>Тизимдаги малумотни янгилаган шахс</strong>
                      <p>{pest['photos'] ? (pest['photos'][0]['updated_by'] ? pest['photos'][0]['updated_by'].full_name : pest['photos']['updated_by']): "Malumot yoq"}</p>
                 </li>
                 <div className='btn-box'>
                   <Button color="success" onClick = {PhotosBtn}>Тасдиқлайман</Button>
                   <Button color="danger" onClick = {PhotosNoBtn}>Тасдиқламайман</Button>
                  </div>
               </ol>    

             <h3 className='sectionText'>Қарши кураш</h3>
               <ol>
                 <li>
                   <div className='div_block'>
                     <div className='Video-box'>
                        <strong>Агротехник қарши кураш</strong>       
                      <p>{pest['all_protect'] ? pest.all_protect.agro_protect : null}</p>
                      <strong>Агро Видео</strong>
                      <video className='VideoStyle' controls src={agrovideo}></video>
                     </div>
                     <div className='Video-box'> 
                      <strong>Биологик қарши кураш</strong>       
                      <p>{pest['all_protect'] ? pest.all_protect.bio_protect : null}</p>
                      <strong>Био Видео</strong>
                      <video className='VideoStyle' controls src={biovideo}></video>
                     </div>
                     <div className='Video-box'>
                        <strong>Кимёвий қарши кураш</strong>       
                        <p>{pest['all_protect'] ? pest.all_protect.chemistry_protect : null}</p>
                        <strong>Чемистрй Видео</strong>
                        <video className='VideoStyle' controls src={Chemistryvideo}></video>
                     </div>
                   </div>
                 </li>
                 <li>
                   <strong>Тизимга  малумот киритган шахс</strong>
                   <p>{pest['all_protect'] ? pest.all_protect.created_by.full_name : "Malumot yoq"}</p>
                 </li>
              
                  <li>
                    <strong>Тизимдаги малумотни янгилаган шахс</strong>
                    <p>{pest['all_protect'] ? (pest['all_protect']['updated_by'] ? pest['all_protect']['updated_by'].full_name : pest['all_protect']['updated_by']): "Malumot yoq"}</p>
                  </li>
                  <div className='btn-box'>
                   <Button color="success" onClick = {ProtectBtn}>Тасдиқлайман</Button>
                   <Button color="danger" onClick = {ProtectNoBtn}>Тасдиқламайман</Button>
                  </div>
               </ol>  
    
          </div>
        ) : (
          <Loader type="spin" />
        )}
      </div>
    </Col>
  );
};

export default Pest;
