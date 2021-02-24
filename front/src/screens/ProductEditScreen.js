import { listProductDetails, updateProduct } from '../actions/productActions';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormContainer } from '../component/FormContainer';
import Loader from '../component/Spinner';
import Message from '../component/Message';
import { Button, Form, FormFile } from 'react-bootstrap';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstans';
import axios from 'axios';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState('');

  const dispatch = useDispatch();

  const productDetail = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        // }
      }
    }
  }, [dispatch, history, productId, product, successUpdate /**/]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        description,
        countInStock,
        image,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers:{'Content-Type':'multipart/form-data'}
      }

      const { data } = await axios.post(`/api/upload`, formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error);
      setUploading(false)

    }
  };
  return (
    <div>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Вернуться
      </Link>
      <FormContainer>
        <h1>Редактировать данные товара</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Наименование товара</Form.Label>
              <Form.Control
                type='name'
                placeholder='Введите товар'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Цена товара</Form.Label>
              <Form.Control
                type='number'
                placeholder='Введите цену товара'
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Фото товара</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите url картинки товара'
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <FormFile
              id='image-file'
              label='Choose file'
              custom
              onChange={uploadFileHandler}
                ></FormFile>
                {uploading && <Loader/>}

            <Form.Group controlId='brand'>
              <Form.Label>Торговая марка товара</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите производителя товара'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Категория товара</Form.Label>
              <Form.Control
                type='text'
                placeholder='Електроника, Аксессуары'
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Количество товара на складе</Form.Label>
              <Form.Control
                type='number'
                placeholder='Количество на складе'
                value={countInStock}
                onChange={e => setCountInStock(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type='text'
                placeholder='Носок мужской служит для создания неповторимого аромата'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Обновить данные
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
