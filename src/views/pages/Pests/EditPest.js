import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import 'react-dropzone/examples/theme.css';
import request, { requestWithFile, fetchRequest } from '../../../helpers/createRequest';
// import { method, spread } from 'lodash';
import AuthContext from '../../../store/auth-context';
import { Loader } from '../../../vibe';


const EditPest = ({match}) => {

  const pestId = match.params.pestId;

  const ctx = useContext(AuthContext);

  const [pest, setPest] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [experiments, setExperiments] = useState([]);

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

  const getSelectOption = (loadedOpts, data) => {
      let selectedOptions = [];
      for(let i = 0; i < data.length; i++) {
        let ctry = loadedOpts.find(c => c.value === data[i])
        selectedOptions.push(ctry)
        console.log(ctry)
      }
      return selectedOptions;
  }

  useEffect(async () => {
    const pestData = await getPest(pestId);
    setPest(pestData);
    setIsLoading(false);

    if(pestData){
        // console.log(selectedCountries)
        setUnderQuarantine(pestData.quarantine_type)
        setNameLatin(pestData.name_latin)
        setNameUzb(pestData.name_uzb)
        setDangerType(pestData.type)
        setDescription(pestData.description)
        setSpreadCountry(getSelectOption(loadedCountries, pestData.country))
        setEggTemp(pestData.eggs)
        setEmonth(getSelectOption(loadedMonths, pestData.month_eggs))
        setEday(pestData.day_eggs)
        setLtemp(pestData.larva)
        setLmonth(getSelectOption(loadedMonths, pestData.month_larva))
        setLday(pestData.day_larva)
        setPtemp(pestData.fungus)
        setPmonth(getSelectOption(loadedMonths, pestData.month_fungus))
        setPday(pestData.day_fungus)
        setItemp(pestData.mature)
        setImonth(getSelectOption(loadedMonths, pestData.month_mature))
        setIday(pestData.day_mature)
        setRtemp(pestData.manipulation)
        setRmonth(getSelectOption(loadedMonths, pestData.month_m))
        setRday(pestData.day_m)
        setPrediction(pestData.prediction)
        setProductName(pestData.product)
        setProductCode(pestData.product_hs_code)
        setPorductType(getSelectOption(loadedTypes, pestData.type_product))
        setAgro(pestData.agro_protect)
        setBio(pestData.bio_protect)
        setChemic(pestData.chemistry_protect)
    }
  }, []);

  const getPest = async pestId => {
    setIsLoading(true);
    const pest = await fetchRequest.get(`final/${pestId}`).then(res => res.data);
    return pest;
  };

  const onDropPhoto = acceptedImages => {
    if (acceptedImages.length > 0) {
      setImages(acceptedImages);
      console.log(images)
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

  const loadedCountries = ctx.countries.map(c => {
    return {value: c.id, label: c.name_ru}
  });

  const loadedMonths = ctx.months.map(m => {
    return {value: m.id, label: m.month}
  });

  const loadedTypes = ctx.productTypes.map(t => {
    return {value: t.id, label: t.product}
  })

  //   const imageFiles = images.map(image => (
  //     <li key={image.name}>
  //       {image.name} - {image.size} bytes
  //     </li>
  //   ));

//   const fetchPost = (data) => {
//     request.post('final/', {
//       quarantine_type: data.quarantine_type,
//       name_latin: data.name_latin,
//       name_uzb: data.name_uzb,
//       type: data.type,
//       description: data.description,
//       country: data.country,
//       eggs: data.eggs,
//       month_eggs: data.month_eggs,
//       day_eggs: data.day_eggs,
//       larva: data.larva,
//       month_larva: data.month_larva,
//       day_larva: data.day_larva,
//       fungus: data.fungus,
//       month_fungus: data.month_fungus,
//       day_fungus: data.day_fungus,
//       mature: data.mature,
//       month_mature: data.month_mature,
//       day_mature: data.day_mature,
//       manipulation: data.manipulation,
//       month_m: data.month_m,
//       day_m: data.day_m,
//       prediction: data.prediction,
//       product: data.product,
//       product_hs_code: data.product_hs_code,
//       type_product: data.type_product,
//       agro_protect: data.agro_protect,
//       bio_protect: data.bio_protect,
//       chemistry_protect: data.chemistry_protect,
//     }).then(res => {console.log(res)})
//   }

  const fetchFiles = (photo, note, experiment) => {
    if(photo.length !== 0){
      const photoData = new FormData();
      for(let i = 0; i < photo.length; i++){
        photoData.append('photo', photo[i]);
      }
      requestWithFile.post('photo/', photoData).then(res=>{console.log(res)});
    }
    if(note.length !== 0){
      const noteData = new FormData();
      for(let i = 0; i < note.length; i++){
        noteData.append('note', note[i]);
      }
      requestWithFile.post('attachment2/', noteData).then(res=>{console.log(res)});
    }
    if(experiment.length !== 0){
      const experimentData = new FormData();
      for(let i = 0; i < experiment.length; i++){
        experimentData.append('experiment', experiment[i]);
      }
      requestWithFile.post('attachment3/', experimentData).then(res=>{console.log(res)});
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const countryValues = spreadCountry.map(c => c.value)

    // const data = {
    //   quarantine_type: underQuarantine,
    //   name_latin: nameLatin,
    //   name_uzb: nameUzb,
    //   type: dangerType,
    //   description: description,
    //   country: [...spreadCountry.map(c => c.value)],
    //   eggs: eggTemp,
    //   month_eggs: [...emonth.map(em => em.value)],
    //   day_eggs: eday,
    //   larva: ltemp,
    //   month_larva: [...lmonth.map(lm => lm.value)],
    //   day_larva: lday,
    //   fungus: ptemp,
    //   month_fungus: [...pmonth.map(pm => pm.value)],
    //   day_fungus: pday,
    //   mature: itemp,
    //   month_mature: [...imonth.map(im => im.value)],
    //   day_mature: iday,
    //   manipulation: rtemp,
    //   month_m: [...rmonth.map(rm => rm.value)],
    //   day_m: rday,
    //   prediction: prediction,
    //   product: productName,
    //   product_hs_code: productCode,
    //   type_product: [...productType.map(pt => pt.value)],
    //   agro_protect: agro,
    //   bio_protect: bio,
    //   chemistry_protect: chemic,
    // }


    const formData = new FormData();
    formData.append('quarantine_type', parseInt(underQuarantine));
    formData.append('name_latin', nameLatin);
    formData.append('name_uzb', nameUzb);
    formData.append('type', dangerType);
    formData.append('description', description);
    if(spreadCountry.length !== 0) {
      for(let i = 0; i < spreadCountry.length; i++){
        formData.append('country', spreadCountry[i].value)
      }
    }
    
    formData.append('eggs', eggTemp);
    if(emonth.length !== 0) {
      if(emonth.length !== 0) {
        for(let i = 0; i < emonth.length; i++){
          formData.append('month_eggs', emonth[i].value)
        }
      }
      // formData.append('month_eggs[]', emonth.map(em => parseInt(em.value)));
    }
    formData.append('day_eggs', eday);
    formData.append('larva', ltemp);
    if(lmonth.length !== 0) {
      if(lmonth.length !== 0) {
        for(let i = 0; i < lmonth.length; i++){
          formData.append('month_larva', lmonth[i].value)
        }
      }
      // formData.append('month_larva[]', lmonth.map(lm => parseInt(lm.value)));
    }
    formData.append('day_larva', lday);
    formData.append('fungus', ptemp);
    if(pmonth.length !== 0) {
      if(pmonth.length !== 0) {
        for(let i = 0; i < pmonth.length; i++){
          formData.append('month_fungus', pmonth[i].value)
        }
      }
      // formData.append('month_fungus[]', pmonth.map(pm => parseInt(pm.value)));
    }
    formData.append('day_fungus', pday);
    formData.append('mature', itemp);
    if(imonth.length !== 0) {
      if(imonth.length !== 0) {
        for(let i = 0; i < imonth.length; i++){
          formData.append('month_mature', imonth[i].value)
        }
      }
      // formData.append('month_mature[]', imonth.map(im => parseInt(im.value)));
    }
    formData.append('day_mature', iday);
    formData.append('manipulation', rtemp);
    if(rmonth.length !== 0) {
      if(rmonth.length !== 0) {
        for(let i = 0; i < rmonth.length; i++){
          formData.append('month_m', rmonth[i].value)
        }
      }
      // formData.append('month_m[]', rmonth.map(rm => parseInt(rm.value)));
    }
    formData.append('day_m', rday);
    formData.append('prediction', prediction);
    formData.append('product', productName);
    formData.append('product_hs_code', productCode);
    if(productType.length !== 0) {
      if(productType.length !== 0) {
        for(let i = 0; i < productType.length; i++){
          formData.append('type_product', productType[i].value)
        }
      }
      // formData.append('type_product[]', productType.map(pt => parseInt(pt.value)));
    }
    
    formData.append('agro_protect', agro);
    formData.append('bio_protect', bio);
    formData.append('chemistry_protect', chemic);

    // for(let i = 0; i < images.length; i++){
    //   formData.append('photo', images[i]);
    // }
    // for(let i = 0; i < notes.length; i++){
    //   formData.append('note', notes[i]);
    // }
    // for(let i = 0; i < experiments.length; i++){
    //   formData.append('experiment', experiments[i]);
    // }

    requestWithFile.put(`final/${pestId}`, formData).then(res => {console.log(res)})

    // fetchPost(data);
    fetchFiles(images, notes, experiments);
  }

  return (
    <Row>
      <Col md="6" xs="12" className="m-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="text-center d-block">Зарарли организм</Form.Label>
            <Form.Label>Карантин ёки нокарантин</Form.Label>
            <Form.Select className="form-control" required value={underQuarantine} onChange={e => {setUnderQuarantine(e.target.value)}}>
              <option value="" disabled>
                Танлаш...
              </option>
              <option value="1">Ҳа</option>
              <option value="2">Йўқ</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <label>Номи (лотин)</label>
            <Form.Control type="text" required value={nameLatin} onChange={e => {setNameLatin(e.target.value)}} />
          </Form.Group>
          <Form.Group>
            <label>Номи (ўзб)</label>
            <Form.Control type="text" required value={nameUzb} onChange={e => {setNameUzb(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Тури</Form.Label>
            <Form.Select className="form-control" required value={dangerType} onChange={e => {setDangerType(e.target.value)}}>
              <option value="" disabled>
                Танлаш...
              </option>
              <option value="Заракунанда">Заракунанда</option>
              <option value="Бегона ўт">Бегона ўт</option>
              <option value="Касалик">Касалик</option>
              <option value="Вирус">Вирус</option>
              <option value="Бактерия">Бактерия</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <label>Таснифи</label>
            <Form.Control type="text" value={description} onChange={e => {setDescription(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Кенг тарқалган давлатлар</Form.Label>
            <Select options={loadedCountries} isMulti value={spreadCountry} onChange={e => {setSpreadCountry(e)}} />
          </Form.Group>
          
          <hr></hr>
          <Form.Group>
            <Form.Label className="text-center d-block">Фенологияси</Form.Label>
            <Form.Label className="text-center d-block">Тухум</Form.Label>
            <label>C°</label>
            <Form.Control type="text" value={eggTemp} onChange={e => {setEggTemp(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-2">
            <label>Даври</label>
            <Select placeholder="Ойни танланг" options={loadedMonths} isMulti value={emonth} onChange={e => {setEmonth(e)}} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Кун" value={eday} onChange={e => {setEday(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label className="text-center d-block">Личинка</Form.Label>
            <label>C°</label>
            <Form.Control type="text" value={ltemp} onChange={e => {setLtemp(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-2">
            <label>Даври</label>
            <Select placeholder="Ойни танланг" options={loadedMonths} isMulti value={lmonth} onChange={e => {setLmonth(e)}} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Кун" value={lday} onChange={e => {setLday(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label className="text-center d-block">Ғумбак</Form.Label>
            <label>C°</label>
            <Form.Control type="text" value={ptemp} onChange={e => {setPtemp(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-2">
            <label>Даври</label>
            <Select placeholder="Ойни танланг" options={loadedMonths} isMulti value={pmonth} onChange={e => {setPmonth(e)}}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Кун" value={pday} onChange={e => {setPday(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label className="text-center d-block">Етук зот</Form.Label>
            <label>C°</label>
            <Form.Control type="text" value={itemp} onChange={e => {setItemp(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-2">
            <label>Даври</label>
            <Select placeholder="Ойни танланг" options={loadedMonths} isMulti value={imonth} onChange={e => {setImonth(e)}}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Кун" value={iday} onChange={e => {setIday(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label className="text-center d-block">Купайиши</Form.Label>
            <label>C°</label>
            <Form.Control type="text" value={rtemp} onChange={e => {setRtemp(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-2">
            <label>Даври</label>
            <Select placeholder="Ойни танланг" options={loadedMonths} isMulti value={rmonth} onChange={e => {setRmonth(e)}} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Кун" value={rday} onChange={e => {setRday(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <label>Башорат</label>
            <Form.Control type="text" value={prediction} onChange={e => {setPrediction(e.target.value)}} />
          </Form.Group>

          <hr></hr>
          <Form.Group>
            <Form.Label className="text-center d-block">Маҳсулот</Form.Label>
            <label>Номи</label>
            <Form.Control type="text" required value={productName} onChange={e => {setProductName(e.target.value)}}/>
          </Form.Group>
          <Form.Group>
            <label>ТН ВЭД код</label>
            <Form.Control type="text" value={productCode} onChange={e => {setProductCode(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Тури</Form.Label>
            <Select placeholder="Маҳсулот турини танланг" options={loadedTypes} isMulti value={productType} onChange={e => {setPorductType(e)}}/>
          </Form.Group>
          <hr></hr>
          <Form.Group>
            <Form.Label className="text-center d-block">Қарши кураш</Form.Label>
            <label>Aгротехник</label>
            <Form.Control type="text" value={agro} onChange={e => {setAgro(e.target.value)}}/>
          </Form.Group>
          <Form.Group>
            <label>Биологик</label>
            <Form.Control type="text" value={bio} onChange={e => {setBio(e.target.value)}} />
          </Form.Group>
          <Form.Group>
            <label>Кимёвий</label>
            <Form.Control type="text" value={chemic} onChange={e => {setChemic(e.target.value)}} />
          </Form.Group>
          <hr></hr>
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

export default EditPest;
