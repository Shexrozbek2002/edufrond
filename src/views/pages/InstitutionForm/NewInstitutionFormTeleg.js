import React, { useContext, useEffect, useState } from 'react';
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

const NewInstitutionFormTeleg = () => {
  const ctx = useContext(AuthContext);

  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [experiments, setExperiments] = useState([]);

  const [isPhenology, setIsPhenology] = useState(false);
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
      setImages(acceptedImages);
      console.log(images);
    }
  };

  const onDropNotes = acceptedNotes => {
    if (acceptedNotes.length > 0) {
      setNotes(acceptedNotes);
    }
  };

  const onDroptExperiments = acceptedtExperiments => {
    if (acceptedtExperiments.length > 0) {
      setExperiments(acceptedtExperiments);
    }
  };
  
  
    const loadedCountries =Array.isArray(ctx) ? ctx.countries.map(c => {
    return { value: c.id, label: c.name_ru };
    }):[];
  
  

  const loadedMonths =Array.isArray(ctx) ? ctx.months.map(m => {
    return { value: m.id, label: m.month };
  }):[];

  const loadedTypes =Array.isArray(ctx) ? ctx.productTypes.map(t => {
    return { value: t.id, label: t.product };
  }):[];

  //   const imageFiles = images.map(image => (
  //     <li key={image.name}>
  //       {image.name} - {image.size} bytes
  //     </li>
  //   ));

  const fetchPost = data => {
    request
      .post('final/', {
        quarantine_type: data.quarantine_type,
        name_latin: data.name_latin,
        name_uzb: data.name_uzb,
        type: data.type,
        description: data.description,
        country: data.country,
        eggs: data.eggs,
        month_eggs: data.month_eggs,
        day_eggs: data.day_eggs,
        larva: data.larva,
        month_larva: data.month_larva,
        day_larva: data.day_larva,
        fungus: data.fungus,
        month_fungus: data.month_fungus,
        day_fungus: data.day_fungus,
        mature: data.mature,
        month_mature: data.month_mature,
        day_mature: data.day_mature,
        manipulation: data.manipulation,
        month_m: data.month_m,
        day_m: data.day_m,
        prediction: data.prediction,
        product: data.product,
        product_hs_code: data.product_hs_code,
        type_product: data.type_product,
        agro_protect: data.agro_protect,
        bio_protect: data.bio_protect,
        chemistry_protect: data.chemistry_protect,
      })
      .then(res => {
        console.log(res);
      });
  };


  const [firstFiles, setFirstFiles] = useState([])
  const [lastFiles, setLastFiles] = useState([])
  const [secondFiles, setSecondFiles] = useState([])
  // files comment //

   /* ****************  */
    
  const [imageFilesStatus, setImageFileStatus] = useState(false);
  const [noteFilesStatus, setNoteFileStatus] = useState(false);
  const [exprimentFilesStatus, setExprimentFileStatus] = useState(false);




  const fetchFiles = (photo, note, experiment) => {
    if (photo.length !== 0) {
      const photoData = new FormData();
      for (let i = 0; i < photo.length; i++) {
        setFirstFiles(photo[i])
        photoData.append('photo', photo[i]);
      }
      requestWithFile.post('photo/', photoData).then(res => {
        console.log(res);
      });
    }
    if (note.length !== 0) {
      const noteData = new FormData();
      for (let i = 0; i < note.length; i++) {
        setLastFiles(note[i])
        noteData.append('note', note[i]);
      }
      requestWithFile.post('note/', noteData).then(res => {
        console.log(res);
      });
    }
    if (experiment.length !== 0) {
      const experimentData = new FormData();
      for (let i = 0; i < experiment.length; i++) {
        setSecondFiles(experiment[i])
        experimentData.append('experiment', experiment[i]);
      }
      requestWithFile.post('experiment/', experimentData).then(res => {
        console.log(res);
      });
    }
  };
  // files comment //





  const isPhenoActive = () => {
    if (eggTemp || ltemp || ptemp || itemp || rtemp) {
      return true;
    }
    return false;
  };

  const isProtectionActive = () => {
    if (agro || bio || chemic) {
      return true;
    }
    return false;
  };


  const isFormDataActive = () => {
    if(nameLatin || nameUzb || dangerType || description ){
      return true;
    }
    else{
      return false;
    }
  }

  const isProductDataActive = () => {
    if(productName || productCode){
      return true;
    }
    else{
      return false;
    }
  }



  const [onePostCheck, setOnePostCheck] = useState(false)
  const [twoPostCheck, setTwoPostCheck] = useState(false)
  const [threePostCheck, setThreePostCheck] = useState(false)
  const [fourPostCheck, setFourPostCheck] = useState(false)

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







  const handleSubmit = e => {
    e.preventDefault();

   // const countryValues = spreadCountry.map(c => c.value);


    const formData = new FormData();
    formData.append('form_status', isFormDataActive());
    formData.append('quarantine_type', parseInt(underQuarantine));
    formData.append('name_latin', nameLatin);
    formData.append('name_uzb', nameUzb);
    formData.append('type', dangerType);
    formData.append('description', description);
    if (spreadCountry.length !== 0) {
      for (let i = 0; i < spreadCountry.length; i++) {
        formData.append('country', spreadCountry[i].value);
      }
    }

    if (images.length !== 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append('photos', images[i]);
      }
    }

    if (notes.length !== 0) {
      for (let i = 0; i < notes.length; i++) {
        formData.append('notes', notes[i]);
      }
    }
    if (experiments.length !== 0) {
      for (let i = 0; i < experiments.length; i++) {
        formData.append('experiments', experiments[i]);
      }
    }

    const phenoData = new FormData();
    phenoData.append('pheno_status', isPhenoActive());
    phenoData.append('eggs', eggTemp);
    if (emonth.length !== 0) {
      if (emonth.length !== 0) {
        for (let i = 0; i < emonth.length; i++) {
          phenoData.append('month_eggs', emonth[i].value);
        }
      }
      // formData.append('month_eggs[]', emonth.map(em => parseInt(em.value)));
    }
    phenoData.append('day_eggs', eday);
    phenoData.append('larva', ltemp);
    if (lmonth.length !== 0) {
      if (lmonth.length !== 0) {
        for (let i = 0; i < lmonth.length; i++) {
          phenoData.append('month_larva', lmonth[i].value);
        }
      }
      // formData.append('month_larva[]', lmonth.map(lm => parseInt(lm.value)));
    }
    phenoData.append('day_larva', lday);
    phenoData.append('fungus', ptemp);
    if (pmonth.length !== 0) {
      if (pmonth.length !== 0) {
        for (let i = 0; i < pmonth.length; i++) {
          phenoData.append('month_fungus', pmonth[i].value);
        }
      }
      // formData.append('month_fungus[]', pmonth.map(pm => parseInt(pm.value)));
    }
    phenoData.append('day_fungus', pday);
    phenoData.append('mature', itemp);
    if (imonth.length !== 0) {
      if (imonth.length !== 0) {
        for (let i = 0; i < imonth.length; i++) {
          phenoData.append('month_mature', imonth[i].value);
        }
      }
      // formData.append('month_mature[]', imonth.map(im => parseInt(im.value)));
    }
    phenoData.append('day_mature', iday);
    phenoData.append('manipulation', rtemp);
    if (rmonth.length !== 0) {
      if (rmonth.length !== 0) {
        for (let i = 0; i < rmonth.length; i++) {
          phenoData.append('month_m', rmonth[i].value);
        }
      }
      // formData.append('month_m[]', rmonth.map(rm => parseInt(rm.value)));
    }
    phenoData.append('day_m', rday);
    phenoData.append('prediction', prediction);

    const productData = new FormData();
    productData.append('product_status',isProductDataActive())
    productData.append('product', productName);
    productData.append('product_hs_code', productCode);
    if (productType.length !== 0) {
      if (productType.length !== 0) {
        for (let i = 0; i < productType.length; i++) {
          productData.append('type_product', productType[i].value);
        }
      }
      // formData.append('type_product[]', productType.map(pt => parseInt(pt.value)));
    }

    const protectData = new FormData();

    protectData.append('protect_status', isProtectionActive());
    protectData.append('agro_protect', agro);
    protectData.append('bio_protect', bio);
    protectData.append('chemistry_protect', chemic);

    // for(let i = 0; i < images.length; i++){
    //   formData.append('photo', images[i]);
    // }
    // for(let i = 0; i < notes.length; i++){
    //   formData.append('note', notes[i]);
    // }
    // for(let i = 0; i < experiments.length; i++){
    //   formData.append('experiment', experiments[i]);
    // }

   /* requestWithFile.post('research/', formData).then(res => {
      console.log(res);
      console.log("Qaytgan status: ", res.status);
      if(res.status==201){
        setOnePostCheck(true)
      }
    });
    */

  /*  requestWithFile.post('product/', productData).then(res => {
      console.log(res);
      console.log("Qaytgan status: ", res.status);
      if(res.status==201){
        toast.success("Kiritilgan ma'lumot bazaga qo'shildi!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      setNameLatin("");
      setUnderQuarantine("");
      setNameUzb("");
      setDangerType("");
      setDescription("");
      setSpreadCountry([]);
      setProductName("");
      setProductCode("");
      setPorductType([]);
      setIsPhenology(false);
      setEggTemp('');
      setEmonth([]);
      setEday("");
      setLtemp("");
      setLmonth([]);
      setLday('');
      setPtemp("");
      setPmonth([]);
      setPday("");
      setItemp("");
      setImonth([]);
      setIday('');
      setRtemp('');
      setRmonth([]);
      setRday('');
      setPrediction('');
      setIsProtect(false);
      setAgro('');
      setBio('');
      setChemic('');
      setIsFiles(false)
    });*/

   /* requestWithFile.post('phenology/', phenoData).then(res => {
      console.log(res);
      console.log("Qaytgan status: ", res.status);
      if(res.status==201){
        setThreePostCheck(true)
      }
    });*/

    // comment post 4
   /* requestWithFile.post('protection/', protectData).then(res => {
      console.log(res);
      console.log("Qaytgan status: ", res.status);
      if(res.status==201){
        setFourPostCheck(true)
      }
    });*/



    // requestWithFile.post('final/', formData).then(res => {
    //   if (res.status === 201) {
    //     alert('Маълумот киритилди!');
    //   }
    // });

   // fetchPost(data);

   //  fetchFiles(images, notes, experiments);

   const allInformationJsonFile = new FormData();
 
   if(images.length !== 0){
    
    for(let i = 0; i < images.length; i++){
        allInformationJsonFile.append('photo', images[i]);
    }
    }
 if(notes.length !== 0){
 
  for(let i = 0; i < notes.length; i++){
    allInformationJsonFile.append('note', notes[i]);
  }
 } 
 
 if(experiments.length !== 0){
  
  for(let i = 0; i < experiments.length; i++){
    allInformationJsonFile.append('experiment', experiments[i]);
  }
 }
 





   const allNewJsonForm = `{
    "all_research": { 
      "quarantine_type": ${parseInt(underQuarantine)},
      "name_latin": ${(nameLatin) ? `"${nameLatin}"` : null },
      "name_uzb": ${(nameUzb) ? `"${nameUzb}"` : null},
      "type": ${(dangerType) ? `"${dangerType}"` : null},
      "description": ${(description) ? `"${description}"` : null},
      "country":${(spreadCountry.length) ? `"${spreadCountry}"` : "[]"}
  },
  "all_product": {
      "product_hs_code": ${(productCode) ? `"${productCode}" `: null},
      "product": [1],
      "product_status": ${true},
      "confirmation_status":${true},
      "type_product":${(productType.length) ? `"${productType}"` : "sshe"}
  },
  "all_phenology": {
      "eggs":${(eggTemp) ? `"${eggTemp}" `: null},
      "day_eggs": ${(eday) ? `"${eday}"` : null},
      "larva": ${(ltemp) ? `"${ltemp}"` : null},
      "day_larva": ${(lday) ? `"${lday}"` : null},
      "fungus": ${(ptemp) ? `"${ptemp}"` : null},
      "day_fungus":${(pday) ? `"${pday}"` : null},
      "mature": ${(itemp) ? `"${itemp}"` : null},
      "day_mature": ${(iday) ? `"${iday}"`: null},
      "manipulation":${(rtemp) ? `"${rtemp}"` : null},
      "day_m":${(rday) ? `"${rday}"` : null},
      "prediction":${(prediction) ? `"${prediction}"` : null},
      "month_eggs": ${(emonth.length) ? `"${emonth}"` : "[]"},
      "month_larva": ${(lmonth.length) ? `"${lmonth}"` : "[]"},
      "month_fungus":${(pmonth.length) ? `"${pmonth}"` : "[]"},
      "month_mature": ${(imonth.length) ? `"${imonth}"` : "[]"},
      "month_m": ${(rmonth.length) ? `"${rmonth}"` : "[]"}
  },
  "all_protect": {
      "agro_protect":${(agro) ? `"${agro}" `: null},
      "bio_protect":${(bio) ? `"${bio}"` : null},
      "chemistry_protect":${(chemic) ? `"${chemic}"` : null}
  },
  "all_photo": {
      "photo_status": ${imageFilesStatus}
  },
  "all_note": {
      "name": ${null},
      "note_status": ${noteFilesStatus},
      "notes": ${null}
  },
  "all_experiment": {   
      "name": ${null},
      "experiment_status": ${exprimentFilesStatus}
   }

  }`

   console.log("Umumiy Json: ", allNewJsonForm)


  //  const blob = new Blob([allNewJsonForm], {
  //   type: 'application/json'
  // });
  
  allInformationJsonFile.append("document", allNewJsonForm);
  
   requestWithFile.post('/alldata/', allInformationJsonFile )


  };

  return (
    <Row>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <Col md="6" xs="12" className="m-auto">
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group>
            <Form.Label className="text-center d-block">Зарарли организм</Form.Label>
            <Form.Label>Карантин ёки нокарантин</Form.Label>
            <Form.Select
              className="form-control"
              required
              value={underQuarantine}
              onChange={e => {
                setUnderQuarantine(e.target.value);
              }}
            >
              <option value="" disabled>
                Танлаш...
              </option>
              <option value="1">Ҳа</option>
              <option value="2">Йўқ</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <label>Номи (лотин)</label>
            <Form.Control
              type="text"
              required
              value={nameLatin}
              onChange={e => {
                setNameLatin(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <label>Номи (ўзб)</label>
            <Form.Control
              type="text"
              required
              value={nameUzb}
              onChange={e => {
                setNameUzb(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Тури</Form.Label>
            <Form.Select
              className="form-control"
              required
              value={dangerType}
              onChange={e => {
                setDangerType(e.target.value);
              }}
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
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Кенг тарқалган давлатлар</Form.Label>
            <Select
              options={loadedCountries}
              isMulti
              value={spreadCountry}
              onChange={e => {
                setSpreadCountry(e);

              }}
            />
          </Form.Group>

          <hr></hr>
          <Form.Group>
            <Form.Label className="text-center d-block">Маҳсулот</Form.Label>
            <label>Номи</label>
            <Form.Control
              type="text"
              required
              value={productName}
              onChange={e => {
                setProductName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <label>ТН ВЭД код</label>
            <Form.Control
              type="text"
              value={productCode}
              onChange={e => {
                setProductCode(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Тури</Form.Label>
            <Select
              placeholder="Маҳсулот турини танланг"
              options={loadedTypes}
              isMulti
              value={productType}
              onChange={e => {
                setPorductType(e);
              }}
            />
          </Form.Group>

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

          {isPhenology && (
            <>
              <Form.Group>
                <Form.Label className="text-center d-block">Тухум</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={eggTemp}
                  onChange={e => {
                    setEggTemp(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={emonth}
                  onChange={e => {
                    setEmonth(e);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={eday}
                  onChange={e => {
                    setEday(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-center d-block">Личинка</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={ltemp}
                  onChange={e => {
                    setLtemp(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={lmonth}
                  onChange={e => {
                    setLmonth(e);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={lday}
                  onChange={e => {
                    setLday(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-center d-block">Ғумбак</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={ptemp}
                  onChange={e => {
                    setPtemp(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={pmonth}
                  onChange={e => {
                    setPmonth(e);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={pday}
                  onChange={e => {
                    setPday(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-center d-block">Етук зот</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={itemp}
                  onChange={e => {
                    setItemp(e.target.value);
                  }}
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
                    setImonth(e);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={iday}
                  onChange={e => {
                    setIday(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-center d-block">Купайиши</Form.Label>
                <label>C°</label>
                <Form.Control
                  type="text"
                  value={rtemp}
                  onChange={e => {
                    setRtemp(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <label>Даври</label>
                <Select
                  placeholder="Ойни танланг"
                  options={loadedMonths}
                  isMulti
                  value={rmonth}
                  onChange={e => {
                    setRmonth(e);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Кун"
                  value={rday}
                  onChange={e => {
                    setRday(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <label>Башорат</label>
                <Form.Control
                  type="text"
                  value={prediction}
                  onChange={e => {
                    setPrediction(e.target.value);
                  }}
                />
              </Form.Group>
            </>
          )}

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
              <Form.Group>
                <label className="mt-2">Aгротехник</label>
                <Form.Control
                  type="text"
                  value={agro}
                  onChange={e => {
                    setAgro(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <label>Биологик</label>
                <Form.Control
                  type="text"
                  value={bio}
                  onChange={e => {
                    setBio(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <label>Кимёвий</label>
                <Form.Control
                  type="text"
                  value={chemic}
                  onChange={e => {
                    setChemic(e.target.value);
                  }}
                />
              </Form.Group>
            </>
          )}

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

export default NewInstitutionFormTeleg;
