import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <mete name='description' content={description}></mete>
      <mete name='keyword' content={keywords}></mete>
    </Helmet>
  );
};
Meta.defaultProps = {
  title: 'Добро пожаловать в магазин',
  keywords: 'elctronics, buy electronics',
  description: 'Мы продаем лучшие продукты'
};

export default Meta;
