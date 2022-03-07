import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import 'react-dropzone/examples/theme.css';
import request from '../../../helpers/createRequest';
import { method } from 'lodash';

const fetchPost = () => {
  request.post('final/', {
    quarantine_type: '',
    name_latin: '',
    name_uzb: '',
    type: '',
    description: '',
    country: [],
    eggs: '',
    month_eggs: [],
    day_eggs: '',
    larva: '',
    month_larva: [],
    day_larva: '',
    fungus: '',
    month_fungus: [],
    day_fungus: '',
    mature: '',
    month_mature: [],
    day_mature: '',
    manipulation: '',
    month_m: [],
    day_m: '',
    prediction: '',
    product: '',
    product_hs_code: '',
    type_product: '',
    agro_protect: '',
    bio_protect: '',
    chemistry_protect: '',
    photo: [],
    notes: [],
    epxperiences: []
  })
}

const InstitutionForm = () => {
  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [experiments, setExperiments] = useState([]);

  const [underQuarantine, setUnderQuarantine] = useState('');
  const [nameLatin, setNameLatin] = useState('');
  const [nameUzb, setNameUzb] = useState('');
  const [dangerType, setDangerType] = useState('');
  const [description, setDescription] = useState('');
  const [spreadCountry, setSpreadCountry] = useState('');

  const [eggTemp, setEggTemp] = useState('');
  const [emonth, setEmonth] = useState('');
  const [eday, setEday] = useState('');

  const [ltemp, setLtemp] = useState(''); //larva (lichinka)
  const [lmonth, setLmonth] = useState('');
  const [lday, setLday] = useState('');

  const [ptemp, setPtemp] = useState(''); //pupa (g'umbak)
  const [pmonth, setPmonth] = useState('');
  const [pday, setPday] = useState('');

  const [itemp, setItemp] = useState(''); //imago (yetuk)
  const [imonth, setImonth] = useState('');
  const [iday, setIday] = useState('');

  const [rtemp, setRtemp] = useState(''); //reproduction (ko'payish)
  const [rmonth, setRmonth] = useState('');
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

  const options = [
    { value: 'meva', label: 'Meva' },
    { value: 'sabzavot', label: 'Sabzavot' },
    { value: 'Dukkakli', label: 'Dukkakli' },
  ];

  //   const imageFiles = images.map(image => (
  //     <li key={image.name}>
  //       {image.name} - {image.size} bytes
  //     </li>
  //   ));

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      quarantine_type: underQuarantine,
      name_latin: nameLatin,
      name_uzb: nameUzb,
      type: dangerType,
      description: description,
      country: spreadCountry,
      eggs: eggTemp,
      month_eggs: emonth,
      day_eggs: eday,
      larva: ltemp,
      month_larva: lmonth,
      day_larva: lday,
      fungus: ptemp,
      month_fungus: pmonth,
      day_fungus: pday,
      mature: itemp,
      month_mature: imonth,
      day_mature: iday,
      manipulation: rtemp,
      month_m: rmonth,
      day_m: rday,
      prediction: prediction,
      product: productName,
      product_hs_code: productCode,
      type_product: productType,
      agro_protect: agro,
      bio_protect: bio,
      chemistry_protect: chemic,
      photo: images,
      notes: notes,
      epxperiences: experiments
    }
  }

  return (
    <Row>
      <Col md="6" xs="12" className="m-auto">
        <Form>
          <Form.Group>
            <Form.Label className="text-center d-block">Зарарли организм</Form.Label>
            <Form.Label>Карантин ёки нокарантин</Form.Label>
            <Form.Select className="form-control" required value={underQuarantine} onChange={e => {setUnderQuarantine(e.target.value)}}>
              <option value="" disabled>
                Танлаш...
              </option>
              <option value="yes">Ҳа</option>
              <option value="no">Йўқ</option>
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
              <option value="yes">Заракунанда</option>
              <option value="no">Бегона ўт</option>
              <option value="no">Касалик</option>
              <option value="no">Вирус</option>
              <option value="no">Бактерия</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <label>Таснифи</label>
            <Form.Control type="text" value={description} onChange={e => {setDescription(e.target.value)}} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Кенг тарқалган давлатлар</Form.Label>
            <Select options={options} isMulti value={spreadCountry} onChange={e => {setSpreadCountry(e.target.value)}} />
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
            <Select placeholder="Ойни танланг" options={options} isMulti value={emonth} onChange={e => {setEmonth(e.target.value)}} />
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
            <Select placeholder="Ойни танланг" options={options} isMulti value={lmonth} onChange={e => {setLmonth(e.target.value)}} />
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
            <Select placeholder="Ойни танланг" options={options} isMulti value={pmonth} onChange={e => {setPmonth(e.target.value)}}/>
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
            <Select placeholder="Ойни танланг" options={options} isMulti value={imonth} onChange={e => {setImonth(e.target.value)}}/>
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
            <Select placeholder="Ойни танланг" options={options} isMulti value={rmonth} onChange={e => {setRmonth(e.target.value)}} />
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
            <Select placeholder="Маҳсулот турини танланг" options={options} isMulti value={productType} onChange={e => {setPorductType(e.target.value)}}/>
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

export default InstitutionForm;
