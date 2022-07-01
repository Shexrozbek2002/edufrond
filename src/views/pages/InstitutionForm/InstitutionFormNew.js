import React, { useContext, useEffect, useState, useRef } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import 'react-dropzone/examples/theme.css';
import request, { requestWithFile } from '../../../helpers/createRequest';
import { method, spread } from 'lodash';
import AuthContext from '../../../store/auth-context';
import { FormGroup, Input, Label } from 'reactstrap';
import './main.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillPlusSquare, AiFillCloseSquare, AiOutlineUpload } from "react-icons/ai";
import axios from 'axios';
const InstitutionFormNew = () => {
  const ctx = useContext(AuthContext);
  const [formDataState, setFormDataState] = useState(
    {
      all_research: { 
        quarantine_type:'',
        name_latin:'',
        name_uzb:'',
        type: '',
        description:'',
        status:true,
        country:[]
    },
    all_product: {
        product_status:true,
        product: []
    },
    all_phenology: {
        eggs:'',
        day_eggs:'',
        larva: '',
        day_larva: '',
        fungus:'',
        day_fungus:'',
        mature: '',
        day_mature: '',
        manipulation:'',
        day_m:'',
        prediction:'',
        month_eggs: [],
        month_larva: [],
        month_fungus:[],
        month_mature: [],
        month_m:[],
        confirmation_status:false
    },
    all_protect: {
        protect_status: true,
        agro_protect:'',
        bio_protect:'',
        chemistry_protect:''
    },
    all_photo: {
      photo_status:false
    },
    all_note: {  
        note_status: false
    },
    all_experiment: {   
        name: '',
        experiment_status:false
     },
     images: [],
     notes: [],
     experiences: [],
     agroVideo:[],
     bioVideo:[],
     chemicVideo:[]
    }
   )

  useEffect(() => {
   axios.get('https://edu.uzagrolab.uz/api/product')
   .then(information => {
  
    setNewProductName(information.data)
  })
  }, [])

  useEffect(() => {
    axios.get('https://edu.uzagrolab.uz/api/product/type')
    .then(information => {
    
     setNewProductTypes(information.data)
   })
   }, [])

   const [newProductNameValue, setNewProductNameValue] =useState('');
   const [newProductTypeValue, setNewProductTypeValue] =useState('');
  
 
  
  const [newProductName, setNewProductName] = useState([])
  const [newProductTypes, setNewProductTypes] = useState([])
  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [experiments, setExperiments] = useState([]);

  const [isPhenology, setIsPhenology] = useState(false);
  const [isProductTypeControl, setIsProductTypeControl] = useState(false);
  const [isProtect, setIsProtect] = useState(false);
  const [isFiles, setIsFiles] = useState(false);

  const [underQuarantine, setUnderQuarantine] = useState('');
  const [nameLatin, setNameLatin] = useState('');
  const [nameUzb, setNameUzb] = useState('');
  const [dangerType, setDangerType] = useState('');
  const [description, setDescription] = useState('');
  const [spreadCountry, setSpreadCountry] = useState([]);

  const [eggTemp, setEggTemp] = useState('');
  const [emonth, setEmonth] = useState([]);
  const [eday, setEday] = useState('');

  const [ltemp, setLtemp] = useState(''); //larva (lichinka)
  const [lmonth, setLmonth] = useState([]);
  const [lday, setLday] = useState('');

  const [ptemp, setPtemp] = useState(''); //pupa (g'umbak)
  const [pmonth, setPmonth] = useState([]);
  const [pday, setPday] = useState('');

  const [itemp, setItemp] = useState(''); //imago (yetuk)
  const [imonth, setImonth] = useState([]);
  const [iday, setIday] = useState('');

  const [rtemp, setRtemp] = useState(''); //reproduction (ko'payish)
  const [rmonth, setRmonth] = useState([]);
  const [rday, setRday] = useState('');

  const [prediction, setPrediction] = useState('');

  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productType, setPorductType] = useState([]);

  const [agro, setAgro] = useState('');
  const [bio, setBio] = useState('');
  const [chemic, setChemic] = useState('');

  const onDropPhoto = acceptedImages => {
    
    if (acceptedImages.length > 0) {
      setFormDataState({...formDataState, images: [...formDataState.images, ...acceptedImages]})
      setImages(acceptedImages);
      
    }
  };

  const onDropNotes = acceptedNotes => {
    if (acceptedNotes.length > 0) {
      setFormDataState({...formDataState, notes: [...formDataState.notes, ...acceptedNotes]})
      setNotes(acceptedNotes);
    }
  };

  const onDroptExperiments = acceptedtExperiments => {
    if (acceptedtExperiments.length > 0) {
      setFormDataState({...formDataState, experiences: [...formDataState.experiences, ...acceptedtExperiments]})
     
      setExperiments(acceptedtExperiments);
    }
  };
  
  
  const loadedCountries =(ctx) ? ctx.countries.map(c => {
  return { value: c.id, label: c.name_ru };
  }) : [];
  
  const productTypeOptions = newProductTypes.map(t => {
    return {value: t.id, label:t.product}
   })

   const productNameOptions = newProductName.map(t => {
    return {value: t.id, label:t.name}
   })


  const loadedMonths =(ctx) ?  ctx.months.map(m => {
    return { value: m.id, label: m.month };
  }): [];

  const loadedTypes =(ctx) ? ctx.productTypes.map(t => {
    return { value: t.id, label: t.product };
  }):[];

  //   const imageFiles = images.map(image => (
  //     <li key={image.name}>
  //       {image.name} - {image.size} bytes
  //     </li>
  //   ));


    




  

 /* ***************** */ 
  // file status
  const [imageFilesStatus, setImageFileStatus] = useState(false);
  const [noteFilesStatus, setNoteFileStatus] = useState(false);
  const [exprimentFilesStatus, setExprimentFileStatus] = useState(false);
  const [agrotechnicianVideo, setAgrotechnicianVideo] = useState('');
  const [biologicalVideo, setBiologicalVideo] = useState('');
  const [chemicalVideo, setChemicalVideo] = useState('');
    
  const [checkAgro, setCheckAgro] = useState(false)
  const [checkBio, setCheckBio] = useState(false)
  const [checkChemic, setCheckChemic] = useState(false)


  const isPhenoActive = () => {
    if (formDataState.all_phenology.eggs || formDataState.all_phenology.fungus || formDataState.all_phenology.larva || formDataState.all_phenology.mature || formDataState.all_phenology.manipulation || formDataState.all_phenology.day_eggs || formDataState.all_phenology.day_larva || formDataState.all_phenology.day_fungus || formDataState.all_phenology.day_mature || formDataState.all_phenology.day_m || formDataState.all_phenology.prediction || formDataState.all_phenology.month_eggs || formDataState.all_phenology.month_larva || formDataState.all_phenology.month_fungus || formDataState.all_phenology.month_mature || formDataState.all_phenology.month_m) {
      return true;
    }
    return false;
  };

  // 
  const isProtectionActive = () => {
    if (formDataState.all_protect.agro_protect || formDataState.all_protect.bio_protect || formDataState.all_protect.chemistry_protect) {
      return true;
    }
    return false;
  };


  // check
  const isProductDataActive = () => {
    if(formDataState.all_product.product){
      return true;
    }
    else{
      return false;
    }
  }
   
  const [productNameText, setProductNameText] = useState([]);
  const [productTypeText, setProductTypeText] = useState([]);

  const productNameRef = useRef();
  const productCodeRef = useRef();
  const productTypeRef = useRef();

  // const [arrProductName, setArrProductName] = useState('');
  // const [arrProductCode, setArrProductCode] = useState('');
  // const [arrProductType, setArrProductType] = useState('');

  const [product, setProduct] = useState('');
  const [product_hs_code, setProductHsCode] = useState('');
  const [type_product, setTypeProduct] = useState('');
  
  const [allArrProducts, setAllArrProducts] = useState([]);

  const addProduct = products =>{
  //  setAllArrProducts([...allArrProducts,products]); 
    if(product && productCodeRef.current.value !== "" && type_product){
      setAllArrProducts([...allArrProducts,products]);
      setNewProductNameValue('')
      //productNameRef.current.value="";
       productCodeRef.current.value="";
      //productTypeRef.current.value="";

      setNewProductTypeValue('')
      
     }
     else{
       alert("Qiymatlar to'liq kiritilmagan")
      setNewProductNameValue('');
      setProductHsCode('')
      setNewProductTypeValue('');
     }
  } 

 

 
  const sendAddProduct = _ => {
    setFormDataState({...formDataState, all_product: {...formDataState['all_product'], product: [...formDataState['all_product']['product'], {
      // arrProductName, arrProductCode, arrProductType
      product, product_hs_code, type_product
      }]}});
      addProduct({
        // arrProductName, arrProductCode, arrProductType
        product, product_hs_code, type_product
        })  
   // productCode('')
    // setArrProductName('');
    // setArrProductCode('');
    // setArrProductType('');
    setProduct('');
    setProductHsCode('');
    setTypeProduct('');
}


//  const deleteProduct = products => {
//   setAllArrProducts(allArrProducts.filter(ProductItem => ProductItem.arrProductCode !== products.arrProductCode));
  
//  }
const deleteProduct = products => {
  setAllArrProducts(allArrProducts.filter(ProductItem => ProductItem.product_hs_code !== products.product_hs_code));
  
 }
   
   const videoUploadRef = useRef()

   const onDroptVideoAgrotechnician = acceptagrotechnic  => {
      if(acceptagrotechnic.length>0){
        acceptagrotechnic.map(item => {
          if(item.type == "video/mp4"){
            setFormDataState({...formDataState, agroVideo: [...formDataState.agroVideo, ...acceptagrotechnic]})
            setAgrotechnicianVideo(acceptagrotechnic);
            setCheckAgro(true)
          }
          else{
            setAgrotechnicianVideo('')
            setCheckAgro(false)
            let refValue = videoUploadRef.current.innerHTML;
            refValue="Formati to'gri kelmadi"
          
          }
        })
        
      }
   
   }

   const onDroptVideoBiological = acceptbiological  => {
      if(acceptbiological.length>0){
        acceptbiological.map(item => {
          if(item.type == "video/mp4"){
            setFormDataState({...formDataState, bioVideo: [...formDataState.bioVideo, ...acceptbiological]})
            setBiologicalVideo(acceptbiological)
            setCheckBio(true)
          }
          else{
            setBiologicalVideo('')
            setCheckBio(false);
            let refValue = videoUploadRef.current.innerHTML;
            refValue="Formati to'gri kelmadi"
            document.querySelector('.aaaa').innerHTML=refValue
          }
          
        })
        
      }

   }

   const onDroptVideoChemical = acceptchemical  => {
      if(acceptchemical.length>0){
        acceptchemical.map(item => {
          if(item.type == "video/mp4"){
            setFormDataState({...formDataState, chemicVideo: [...formDataState.chemicVideo, ...acceptchemical]})
            setChemicalVideo(acceptchemical)
            setCheckChemic(true)
          }
          else{
   
            setChemicalVideo('');
            setCheckChemic(false);
            let refValue = videoUploadRef.current.innerHTML;
            refValue="Formati to'gri kelmadi"
            document.querySelector('.aaaa').innerHTML=refValue
          }  
        })
       
        
      }
  
   }

   const OncontrolSelectType = (e) => {
      if(e == 'Заракунанда'){
        setIsProductTypeControl(true)
      }
      else{
        setIsProductTypeControl(false)
      }
     
   }




  useEffect(() => {
    if(images.length > 0){
      setImageFileStatus(true)
    }
    else{
      setImageFileStatus(false)
    }
    if(notes.length > 0){
      setNoteFileStatus(true)
    }
    else{
      setNoteFileStatus(false)
    }
    if(experiments.length > 0){
      setExprimentFileStatus(true)
    }
    else{
      setExprimentFileStatus(false)
    }
  },[images,notes,experiments])
  


  const [spreadCountryValue, setSpreadCountryValue] = useState([])
  useEffect(() => {
     if(spreadCountry){
     
  
     }
  },[spreadCountry])


   /*  new allState */

 
     
   


   /*  new allState */

   









  const handleSubmit = e => {
    e.preventDefault();
   // const countryValues =[spreadCountry.map(c => c.value)];
  
   
  //  const allInformationJsonFile = new FormData();

  //  if(images.length !== 0){
  //     for(let i = 0; i < images.length; i++){
  //         allInformationJsonFile.append('photo', images[i]);
  //     }
  //  }
  
  //  if(notes.length !== 0){
  //   for(let i = 0; i < notes.length; i++){
  //     allInformationJsonFile.append('note', notes[i]);
  //   }
  //  }
   
  //  if(experiments.length !== 0){
  //   for(let i = 0; i < experiments.length; i++){
  //     allInformationJsonFile.append('experiment', experiments[i]);
  //   }
  //  }

  // //  allInformationJsonFile.append('agro_vedio', agrotechnicianVideo)
  // //  allInformationJsonFile.append('bio_vedio', biologicalVideo)
  // //  allInformationJsonFile.append('bio_vedio', chemicalVideo)



  const allNewJsonForm = `{
    "all_research": { 
      "quarantine_type": ${parseInt(formDataState.all_research.quarantine_type)},
      "name_latin": ${(formDataState.all_research.name_latin.length>0) ? `"${formDataState.all_research.name_latin}"` : null },
      "name_uzb": ${(formDataState.all_research.name_uzb.length>0) ? `"${formDataState.all_research.name_uzb}"` : null},
      "type": ${(formDataState.all_research.type.length>0) ? `"${formDataState.all_research.type}"` : null},
      "description": ${(formDataState.all_research.description.length>0) ? `"${formDataState.all_research.description}"` : null},
      "status": true,
      "country":${(formDataState.all_research.country.length>0) ? "[" + formDataState.all_research.country  + "]": "[]"}
  },
  "all_product": {
      "product_status":${isProductDataActive()},
      "product":${(allArrProducts.length>0) ? JSON.stringify(allArrProducts) : "[]"}
  },
  "all_phenology": {
      "eggs":${(formDataState.all_phenology.eggs.length>0) ? `"${formDataState.all_phenology.eggs}"` : null},
      "day_eggs": ${(formDataState.all_phenology.day_eggs.length>0) ? `"${formDataState.all_phenology.day_eggs}"` : null},
      "larva": ${(formDataState.all_phenology.larva.length>0) ? `"${formDataState.all_phenology.larva}"` : null},
      "day_larva": ${(formDataState.all_phenology.day_larva.length>0) ? `"${formDataState.all_phenology.day_larva}"` : null},
      "fungus": ${(formDataState.all_phenology.fungus.length>0) ? `"${formDataState.all_phenology.fungus}"` : null},
      "day_fungus":${(formDataState.all_phenology.day_fungus.length>0) ? `"${formDataState.all_phenology.day_fungus}"` : null},
      "mature": ${(formDataState.all_phenology.mature.length>0) ? `"${formDataState.all_phenology.mature}"` : null},
      "day_mature": ${(formDataState.all_phenology.day_mature.length>0) ? `"${formDataState.all_phenology.day_mature}"` : null},
      "manipulation":${(formDataState.all_phenology.manipulation.length>0) ? `"${formDataState.all_phenology.manipulation}"` : null},
      "day_m":${(formDataState.all_phenology.day_m.length>0) ? `"${formDataState.all_phenology.day_m}"` : null},
      "prediction":${(formDataState.all_phenology.prediction.length>0) ? `"${formDataState.all_phenology.prediction}"` : null},
      "month_eggs": ${(formDataState.all_phenology.month_eggs.length>0) ? "[" + formDataState.all_phenology.month_eggs + "]" : "[]"},
      "month_larva": ${(formDataState.all_phenology.month_larva.length>0) ? "[" + formDataState.all_phenology.month_larva + "]" : "[]"},
      "month_fungus":${(formDataState.all_phenology.month_fungus.length>0) ? "[" + formDataState.all_phenology.month_fungus + "]" : "[]"},
      "month_mature": ${(formDataState.all_phenology.month_mature.length>0) ? "[" + formDataState.all_phenology.month_mature + "]" : "[]"},
      "month_m": ${(formDataState.all_phenology.month_m.length>0) ? "[" + formDataState.all_phenology.month_m + "]" : "[]"},
      "pheno_status": ${isPhenoActive()}
  },
  "all_protect": {
      "protect_status": ${isProtectionActive()},
      "agro_protect":${(formDataState.all_protect.agro_protect) ? `"${formDataState.all_protect.agro_protect}"` : null},
      "bio_protect":${(formDataState.all_protect.bio_protect) ? `"${formDataState.all_protect.bio_protect}"` : null},
      "chemistry_protect":${(formDataState.all_protect.chemistry_protect) ? `"${formDataState.all_protect.chemistry_protect}"` : null}
  },
  "all_photo": {
      "photo_status": ${imageFilesStatus}
  },
  "all_note": {
      "note_status": ${noteFilesStatus}
  },
  "all_experiment": {   
      "experiment_status": ${exprimentFilesStatus}
   }

  }`

  




   //allInformationJsonFile.append("document", allNewJsonForm);
  const formData = new FormData();
  formData.append('document',allNewJsonForm);
  if(formDataState.images.length !== 0){
    for(let i=0; i<formDataState.images.length; i++){
       formData.append('images', formDataState.images[i]);
    }
  }
  if(formDataState.notes.length !== 0){
    for(let i=0; i<formDataState.notes.length; i++){
       formData.append('notes', formDataState.notes[i]);
    }
  }
  if(formDataState.experiences.length !== 0){
    for(let i=0; i<formDataState.experiences.length; i++){
       formData.append('experiences', formDataState.experiences[i]);
    }
  }
  if(formDataState.agroVideo.length !== 0){
    for(let i=0; i<formDataState.agroVideo.length; i++){
       formData.append('agroVideo', formDataState.agroVideo[i]);
    }
  }
  if(formDataState.bioVideo.length !== 0){
    for(let i=0; i<formDataState.bioVideo.length; i++){
       formData.append('bioVideo', formDataState.bioVideo[i]);
    }
  }
  if(formDataState.chemicVideo.length !== 0){
    for(let i=0; i<formDataState.chemicVideo.length; i++){
       formData.append('chemicVideo', formDataState.chemicVideo[i]);
    }
  }

  



    // Object.keys(formDataState).forEach(key => {
    //   Object.keys(formDataState[key]).forEach((key2, index) => {
    //     if(Array.isArray(formDataState[key][key2]) && key !== 'images'){
    //     //  formData.append(key2, JSON.stringify(formDataState[key][key2]))
    //     } else if(key === 'images' || key === 'videos' || key === 'notes' || key ==='experiences' || key === 'agroVideo' || key === 'bioVideo' || key === 'chemicVideo' ) {
    //       formData.append(key + index, formDataState[key][key2])
    //     } else {
    //   //    formData.append(key2, formDataState[key][key2])
    //     }
        
    //   })
    // })
  requestWithFile.post('https://edu.uzagrolab.uz/api/alldata/', formData)
  .then(res => {
    toast.success('Malumotlaringiz qabul qilindi!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    document.querySelector(".errorName").innerHTML=""
  })
   .catch(err =>{ 
    toast.error('Bunday zararkunanda mavjud !', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

      document.querySelector(".errorName").innerHTML="Bunday zararkunanda mavjud !"
     })
    
  };

  const handleChangeSelect = (value, type) => {
    if(type === 'quarantine'){
      setFormDataState({...formDataState, all_research: {...formDataState.all_research, quarantine_type: value}})
     
    } else if(type === 'type'){
      setFormDataState({...formDataState, all_research: {...formDataState.all_research, type: value}})
    
    } else if(type === 'countries'){
      setFormDataState({...formDataState, all_research: {...formDataState.all_research, country: value.map(item => item.value)}})
      setSpreadCountry(value)
    
    } else if(type === 'product_name'){
      setNewProductNameValue(value.name)
     // setArrProductName(value.value)
      setProduct(value.value)
    } else if(type === 'product_type'){
      setNewProductTypeValue(value.product);
    //  setArrProductType(value.value)
    setTypeProduct(value.value)
    } else if(type=== 'emonths'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, month_eggs: value.map(item => item.value)}})
      setEmonth(value)
     
    } else if(type === 'lmonths'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, month_larva: value.map(item => item.value)}})
      setLmonth(value)
    } else if(type === 'pmonths'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, month_fungus: value.map(item => item.value)}});
      setPmonth(value)
    } else if (type === 'imonths'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, month_mature: value.map(item => item.value)}});
      setImonth(value)
    } else if(type === 'rmonths'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, month_m: value.map(item => item.value)}});
      setRmonth(value)
    }

  }

  const handleChangeInput = (value, type) =>  {
     if(type === 'name_lotin'){
      setFormDataState({...formDataState, all_research: {...formDataState.all_research, name_latin: value}})
    
     } else if(type === "nameuzb"){
      setFormDataState({...formDataState, all_research: {...formDataState.all_research, name_uzb: value}})
     
     } else if(type === 'descriptions'){
      setFormDataState({...formDataState, all_research: {...formDataState.all_research, description: value}})
    
     }
     if(type === 'product_code'){
      setProductHsCode(value);
     // setArrProductCode(value);
     //setProductCode(value)
     } else if(type === "eggtemp"){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, eggs: value}});
    
     } else if(type === 'eggday'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, day_eggs: value}});
    
     } else if(type === 'ltemp'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, larva: value}});
     
     } else if(type === 'lday'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, day_larva: value}});
    
     } else if(type === 'ptemp'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, fungus: value}});
    
     } else if(type === 'pday'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, day_fungus: value}});
    
     } else if(type === 'itemp'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, mature: value}});
     
     } else if(type === 'iday'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, day_mature: value}});
     
     } else if(type === 'rtemp'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, manipulation: value}});
   
     } else if(type === 'rday'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, day_m: value}});
   
     } else if (type === 'predictions'){
      setFormDataState({...formDataState, all_phenology: {...formDataState.all_phenology, prediction: value}});
    
     } else if( type === 'agroes'){
      setFormDataState({...formDataState, all_protect: {...formDataState.all_protect, agro_protect: value}});
   
     } else if(type === 'bios'){
      setFormDataState({...formDataState, all_protect: {...formDataState.all_protect, bio_protect: value}});
     
     } else if (type === 'chemices'){
      setFormDataState({...formDataState, all_protect: {...formDataState.all_protect, chemistry_protect: value}});
   
     }
  }

 


  return (
    <Row>
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <Col md="10" xs="12" className="m-auto institutFormStyle">
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group>
            <Form.Label className="text-center d-block">Зарарли организм</Form.Label>
            <Form.Label>Карантин ёки нокарантин</Form.Label>
            <Form.Select
              className="form-control"
              required
              value={formDataState.all_research.quarantine_type}
              onChange={e => handleChangeSelect(e.target.value, 'quarantine')}
            >
              <option value="" disabled>
                Танлаш...
              </option>
              <option value="1">Карантин</option>
              <option value="2">Бошқа зарарли организм</option>
            </Form.Select>
            </Form.Group>
            <Form.Group>
              <label>Номи (лотин)</label>
               <label className='errorName'></label>
              <Form.Control
                type="text"
                required
                value={formDataState.all_research.name_latin}
                onChange={e => {
                  handleChangeInput(e.target.value, 'name_lotin')
                }}
              />
            </Form.Group>
            <Form.Group>
              <label>Номи (ўзб)</label>
              <Form.Control
                type="text"
                required
                value={formDataState.all_research.name_uzb}
                onChange={e => { handleChangeInput(e.target.value, 'nameuzb')}}
                
                
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Тури</Form.Label>
              <Form.Select
                className="form-control"
                required
                value={formDataState.all_research.type}
                onChange={e =>{ 
                  OncontrolSelectType(e.target.value)
                  handleChangeSelect(e.target.value, 'type')}}
              >
                <option value="" disabled>
                  Танлаш...
                </option>
                <option value="Заракунанда">Заракунанда</option>
                <option value="Бегона ўт">Бегона ўт</option>
                <option value="Касаллик">Касаллик</option>
                <option value="Вирус">Вирус</option>
                <option value="Бактерия">Бактерия</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <label>Таснифи</label>
              <Form.Control
                type="text"
                value={formDataState.all_research.description}
                onChange={e =>handleChangeInput(e.target.value, 'descriptions')  }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Кенг тарқалган давлатлар</Form.Label>
              <Select
                options={loadedCountries}
                isMulti
                // value={formDataState.all_research.country}
                value ={spreadCountry}
                onChange={e => handleChangeSelect(e, 'countries')}
              />
            </Form.Group>
          <hr></hr>
          

          {/*******   Yangilanish   ********/}

            <section className="newProductStyle">
                <div className="row">
                    <div className="col-12">
                    <Form.Label className="text-center d-block">Маҳсулот</Form.Label>
                    </div>
                </div>
                <div className="row productRow">
                <div className="col-4">
                  
                  <Form.Group>
                    <Form.Label>Номи</Form.Label>
                    <Select
              
                      placeholder="Select..."
                      options={productNameOptions}
                       value={newProductNameValue}
                      // onChange={e => {
                      //  setNewProductNameValue(e.name)
                      //  setArrProductName(e.value)
              
                      // }}
                      onChange={e =>{
                        setProductNameText([...productNameText , e.label])
                        handleChangeSelect(e, 'product_name')}}
                    />
                    
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group>
                    <label>ТН ВЭД код</label>
                    <Form.Control
                      ref={productCodeRef}
                      type="text"
                     // value={arrProductCode}
                     value={product_hs_code}
                      onChange={e =>handleChangeInput(e.target.value, 'product_code')}                  
                    />
                  </Form.Group>
                </div>
                <div className="col-4">
                  <Form.Group>
                    <Form.Label>Тури</Form.Label>
                    <Select
                     // ref={productTypeRef}
                      placeholder="Select..."
                      options={productTypeOptions}
                      value={newProductTypeValue}
                      onChange={e =>{
                        setProductTypeText([...productTypeText , e.label])
                        handleChangeSelect(e, 'product_type')} }
                    />
                  </Form.Group>
                </div>
                <div className="col-1 productRowIcon">
                  <span>
                    <AiFillPlusSquare className='PlusIconStyle' onClick={sendAddProduct}/>
                  </span>  
                </div>
                </div>
            
                <div className="arrayProductForm">
                  {
                    allArrProducts.map((product, idProduct) => {
                      return(
                        <div className="row AddInputValue" key={idProduct}>
                        <div className="col-4">
                          {/* <p>{product.arrProductName}</p> */}
                          <p>{productNameText[idProduct]}</p>

                        </div>
                        <div className="col-3">
                        {/* <p>{product.arrProductCode}</p> */}
                        <p>{product.product_hs_code}</p>

                        </div>
                        <div className="col-4">
                          {/* <p>{product.arrProductType}</p> */}
                          <p>{productTypeText[idProduct]}</p>
                        </div>
                        <div className="col-1 closeIconStyle">
                          <AiFillCloseSquare className='PlusIconStyle CloseIconStyle' onClick={e =>deleteProduct(product)}/>
                        </div>
                    </div> 
                      )
                    })
                  }           
                      
                </div>           
            </section>

          {/*******   Yangilanish   ********/}
          
          <hr></hr>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={isPhenology}
                onChange={e => {
                 setIsPhenology(e.target.checked);
                }}
              />{' '}
              Фенология
            </Label>
          </FormGroup>

          {isPhenology && isProductTypeControl &&(
            <>
              <Form.Group>
                <Form.Label className="text-center d-block">Тухум</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={formDataState.all_phenology.eggs}
                  onChange={e => handleChangeInput(e.target.value, 'eggtemp')  }
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={emonth}
                  onChange={e =>  handleChangeSelect(e, 'emonths')  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={formDataState.all_phenology.day_eggs}
                  onChange={e => handleChangeInput(e.target.value, 'eggday')  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-center d-block">Личинка</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={formDataState.all_phenology.larva}
                  onChange={e =>handleChangeInput(e.target.value, 'ltemp') }  
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={lmonth}
                  onChange={e =>handleChangeSelect(e, 'lmonths')  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={formDataState.all_phenology.day_larva}
                  onChange={e =>handleChangeInput(e.target.value, 'lday')  }     
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-center d-block">Ғумбак</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={formDataState.all_phenology.fungus}
                  onChange={e =>handleChangeInput(e.target.value, 'ptemp')}          
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={pmonth}
                  onChange={e => handleChangeSelect(e, 'pmonths') }
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={formDataState.all_phenology.day_fungus}
                  onChange={e =>handleChangeInput(e.target.value, 'pday')  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-center d-block">Етук зот</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={formDataState.all_phenology.mature}
                  onChange={e =>handleChangeInput(e.target.value, 'itemp')}     
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={imonth}
                  onChange={e => {
                    handleChangeSelect(e, 'imonths')
            
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={formDataState.all_phenology.day_mature}
                  onChange={e =>handleChangeInput(e.target.value, 'iday') }   
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-center d-block">Купайиши</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={formDataState.all_phenology.manipulation}
                  onChange={e =>handleChangeInput(e.target.value, 'rtemp')   }   
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={rmonth}
                  onChange={e => handleChangeSelect(e, 'rmonths')     }
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={formDataState.all_phenology.day_m}
                  onChange={e =>handleChangeInput(e.target.value, 'rday')}
                />
              </Form.Group>

              <Form.Group>
                <label>Башорат</label>
                <Form.Control
                  type="text"
                  value={formDataState.all_phenology.prediction}
                  onChange={e =>handleChangeInput(e.target.value, 'predictions')}
                />
              </Form.Group>
            </>
          )}

          {/******    Qarshi kurash yangilanish    ******/}

          <hr></hr>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={isProtect}
                onChange={e => {
                  setIsProtect(e.target.checked);
                }}
              />{' '}
              Қарши кураш
            </Label>
          </FormGroup>

          {isProtect && (
            <>
            <div className="row fightStyle">
              <div className="col-4 firstFightCol">
                <Form.Group>
                  <label className="mt-2">Aгротехник</label>
                  <Form.Control
                    type="text"
                    // value={agro}
                    value={formDataState.all_protect.agro_protect}
                    onChange={e => handleChangeInput(e.target.value, 'agroes')}
                  />
                </Form.Group>
                  <Dropzone onDrop={onDroptVideoAgrotechnician} multiple={false} acccept="video/*">
                    {({ getRootProps, getInputProps }) => (
                      <section className='EnterVideoStyle'>
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <AiOutlineUpload className='videoUploadStyle'/>
                          <p>Video Tanlang</p> 
                          {checkAgro ? <p>Video Yuklandi</p> : <p ref={videoUploadRef} className="aaaa">Video yuklamagan</p>}
                        </div>
                      </section>
                    )}
                  </Dropzone>
              </div>
              <div className="col-4">
                <Form.Group>
                  <label>Биологик</label>
                  <Form.Control
                    type="text"
                    // value={bio}
                    value={formDataState.all_protect.bio_protect}
                    onChange={e => handleChangeInput(e.target.value, 'bios') }
                  />
                </Form.Group>
                <Dropzone onDrop={onDroptVideoBiological} multiple={false} acccept="video/*">
                    {({ getRootProps, getInputProps }) => (
                      <section className='EnterVideoStyle'>
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <AiOutlineUpload className='videoUploadStyle'/>
                          <p>Video Tanlang</p> 
                          {checkBio ? <p>Video Yuklandi</p> : <p ref={videoUploadRef} className="aaaa">Video yuklamagan</p>}
                        </div>
                      </section>
                    )}
                  </Dropzone>
              </div>
              <div className="col-4">
                <Form.Group>
                  <label>Кимёвий</label>
                  <Form.Control
                    type="text"
                    value={formDataState.all_protect.chemistry_protect}
                    onChange={e => handleChangeInput(e.target.value, 'chemices')   }
                  />
                </Form.Group>
                   <Dropzone onDrop={onDroptVideoChemical} multiple={false} acccept="video/*">
                    {({ getRootProps, getInputProps }) => (
                      <section className='EnterVideoStyle'>
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <AiOutlineUpload className='videoUploadStyle'/>
                          <p>Video Tanlang</p> 
                          {checkChemic ? <p>Video Yuklandi</p> : <p ref={videoUploadRef} className="aaaa">Video yuklamagan</p>}
                        </div>
                      </section>
                    )}
                  </Dropzone>
              </div>
            </div>
             
             
             
            </>
          )}

          {/******    Qarshi kurash yangilanish    ******/}
        

          <hr></hr>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={isFiles}
                onChange={e => {
                  setIsFiles(e.target.checked);
                }}
              />{' '}
              Файллар
            </Label>
          </FormGroup>

          {isFiles && (
            <>
              <Form.Group>
                <label>Фото</label>
                <Dropzone onDrop={onDropPhoto} acccept="image/png,image/jpeg,image/gif,image/jpg">
                  {({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Файл танланг</p>
                        {images.length > 0 ? <p>Файллар юкланди</p> : null}
                         {images.length > 0 ? setImageFileStatus(true) : setImageFileStatus(false)}
                      </div>
                      {/* <aside>
                    <h4>Images</h4>
                    <ul>{imageFiles}</ul>
                  </aside> */}
                    </section>
                  )}
                </Dropzone>
              </Form.Group>
              <Form.Group>
                <label>Қўл ёзмалар</label>
                <Dropzone onDrop={onDropNotes} acccept="image/png,image/jpeg,image/gif,image/jpg">
                  {({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Файл танланг</p>
                        {notes.length > 0 ? <p>Файллар юкланди</p> : null}
                        {notes.length > 0 ? setNoteFileStatus(true) : setNoteFileStatus(false)} 
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Form.Group>

              <Form.Group>
                <label>Тажрибалар</label>
                <Dropzone onDrop={onDroptExperiments} acccept="image/png,image/jpeg,image/gif,image/jpg">
                  {({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Файл танланг</p>
                        {experiments.length > 0 ? <p>Файллар юкланди</p> : null}
                        {experiments.length > 0 ? setExprimentFileStatus(true) : setExprimentFileStatus(false)} 
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Form.Group>
            </>
          )}

          <Form.Group className="text-center">
            <Button className="mt-3" variant="primary" type="submit">
              Сақлаш
            </Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default InstitutionFormNew;
