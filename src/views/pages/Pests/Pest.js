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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const pestData = await getPest(pestId);
    setPest(pestData);
    setIsLoading(false);
  }, []);

  const getPest = async pestId => {
    setIsLoading(true);
    const pest = await fetchRequest.get(`final/${pestId}`).then(res => res.data);
    return pest;
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
            <p>{pest.product_type}</p>
            <strong>Кенг тарқалган давлатлар</strong>
            <p>{pest.country}</p>
            <strong>Таснифи</strong>
            <p>{pest.description}</p>
            <strong>Фенологияси</strong>
            <p>{pest.eggs}C</p>
            <p>{pest.month_eggs}</p>
            <p>{pest.day_eggs}</p>
            <strong>Қарши кураш</strong>
            <p>{pest.agro_protect}</p>
            <p>{pest.bio_protect}</p>
            <p>{pest.chemistry_protect}</p>
            <strong>Илова</strong>
          </>
        ) : (
          <Loader type="spin" />
        )}
      </div>
    </Col>
  );
};

export default Pest;
