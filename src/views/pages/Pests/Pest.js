import React, { useState, useEffect, useContext } from 'react';
import { Col, Table } from 'react-bootstrap';
import { fetchRequest } from '../../../helpers/createRequest';
import { Loader } from '../../../vibe';
import AuthContext from '../../../store/auth-context';
// import './results.css';

const Pest = ({ match }) => {
  const pestId = match.params.pestId;

  const ctx = useContext(AuthContext);

  const [pest, setPest] = useState({});
  const [pestProduct, setPestProduct] = useState({});
  const [pestPheno, setPestPheno] = useState({});
  const [pestProtect, setPestProtect] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const pestData = await getPestResearch(pestId);
    const pestProduct = await getPestProduct(pestId);
    const pestPheno = await getPestPheno(pestId);
    const pestProtect = await getPestProtect(pestId);
    setPest(pestData);
    setPestProduct(pestProduct);
    setPestPheno(pestPheno);
    setPestProtect(pestProtect);
    setIsLoading(false);
  }, []);

  const getPestResearch = async pestId => {
    setIsLoading(true);
    const pest = await fetchRequest.get(`research/${pestId}`).then(res => res.data);
    return pest;
  };

  const getPestProduct = async pestId => {
    const pestProduct = await fetchRequest.get(`product/${pestId}`).then(res => res.data);
    return pestProduct;
  };

  const getPestPheno = async pestId => {
    const pestPheno = await fetchRequest.get(`phenology/${pestId}`).then(res => res.data);
    return pestPheno;
  };

  const getPestProtect = async pestId => {
    const pestProtect = await fetchRequest.get(`protection/${pestId}`).then(res => res.data);
    return pestProtect;
  };

  return (
    <Col md="12" className="">
      <div className="">
        {!isLoading ? (
          <>
            {/* <h4>Вилоят: {pest.name_calculation_region}</h4>
            <h4>Туман: {findDistrict(pest.calculation_district)}</h4>
            <h4>Контур рақами: {pest.outline_number}</h4>
            <h4>Майдон (га): {pest.area}</h4>
            <h4>Экин тури: {pest.name_crop_type}</h4> */}
            <strong>Номи (ўзб)</strong>
            <p>{pest.name_uzb}</p>
            <strong>Номи (лотин)</strong>
            <p>{pest.name_latin}</p>
            <strong>Тури</strong>
            <p>{pest.type_product}</p>
            <strong>Зарарланиши мумкин бўлган маҳсулотлар</strong>
            <p>{pestProduct.product_type}</p>
            <strong>Кенг тарқалган давлатлар</strong>
            <p>{pest.country}</p>
            <strong>Таснифи</strong>
            <p>{pest.description}</p>
            <strong>Фенологияси</strong>
            <p>{pestPheno.eggs}C</p>
            <p>{pestPheno.month_eggs}</p>
            <p>{pestPheno.day_eggs}</p>
            <strong>Қарши кураш</strong>
            <p>{pestProtect.agro_protect}</p>
            <p>{pestProtect.bio_protect}</p>
            <p>{pestProtect.chemistry_protect}</p>
            <strong>Илова</strong>
            {pest.photos && pest.photos.map(i => <a href={i.photo}>{i.id}</a>)}
          </>
        ) : (
          <Loader type="spin" />
        )}
      </div>
    </Col>
  );
};

export default Pest;
