import React, { useState, useEffect, useCallback } from 'react';
import { v4 } from 'uuid';
import moment from 'moment';

import api from '../../services/api';

import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

import { DialogStyled, DialogContentStyled } from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const defaultProduct = {
  name: '',
  manufacturingDate: moment().format('YYYY-MM-DD'),
  perishable: 'false',
  expirationDate: '',
  price: 0
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix='$'
    />
  );
}

const FormDialog = ({ open, onClose, onConfirm, idSelected }) => {
  const [product, setProduct] = useState(defaultProduct);
  const [errors, setErros] = useState([]);

  useEffect(() => {
    if (idSelected) {
      api.get(`/products/${idSelected}`).then(res => {
        const newProduct = {
          ...res.data,
          perishable: res.data.perishable === false ? 'false' : 'true'
        };

        setProduct(newProduct);
      });
    } else {
      setProduct(defaultProduct);
    }
  }, [idSelected]);

  const handleChangeInput = useCallback(event => {
    const { name, value } = event.target;

    setErros([]);

    setProduct(state => ({ ...state, [name]: value }));
  }, []);

  const validValues = useCallback(() => {
    let invalidDate = '',
      invalidName = '';

    if (
      !moment(product.manufacturingDate).isBefore(product.expirationDate) &&
      product.expirationDate
    ) {
      invalidDate =
        'A data de fabricação deve ser menor que a data de validade';
    }

    if (product.name === '') {
      invalidName = 'Preencha o campo nome';
    }

    if (invalidDate || invalidName) {
      setErros(state => [...state, invalidDate, invalidName]);

      return false;
    }

    return true;
  }, [product.manufacturingDate, product.expirationDate, product.name]);

  const clearStatesAndClose = useCallback(() => {
    onClose();
    setProduct(defaultProduct);
    setErros([]);
  }, [onClose]);

  const saveOrUpdateProduct = useCallback(() => {
    const perishable = product.perishable === 'false' ? false : true;

    const newProduct = {
      ...product,
      id: v4(),
      perishable,
      price: Number(product.price)
    };

    if (!idSelected && validValues()) {
      onConfirm(newProduct);
      clearStatesAndClose();
    } else if (idSelected && validValues()) {
      onConfirm({
        ...product,
        expirationDate: !perishable ? '' : product.expirationDate,
        price: Number(product.price)
      });
      clearStatesAndClose();
    }
  }, [product, onConfirm, validValues, clearStatesAndClose, idSelected]);

  return (
    <DialogStyled
      open={open}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id='form-dialog-title'>Cadastrar um produto</DialogTitle>
      {!!errors.length && (
        <Alert severity='error'>
          <ul>
            {errors.map(error => (
              <div key={v4()}>{error && <li>{error}</li>}</div>
            ))}
          </ul>
        </Alert>
      )}
      <DialogContentStyled>
        <div>
          <TextField
            id='name'
            name='name'
            margin='dense'
            value={product.name}
            label='Nome do produto'
            type='text'
            onChange={handleChangeInput}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            fullWidth
            name='manufacturingDate'
            id='manufacturingDate'
            onChange={handleChangeInput}
            label='Data de fabricação'
            type='date'
            value={product.manufacturingDate}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Produto perecível</FormLabel>
            <RadioGroup
              row
              aria-label='position'
              name='perishable'
              defaultValue='top'
              onChange={handleChangeInput}
              value={product.perishable}
            >
              <FormControlLabel
                value={'false'}
                control={<Radio color='primary' />}
                label='Não'
                labelPlacement='end'
              />
              <FormControlLabel
                value={'true'}
                control={<Radio color='primary' />}
                label='Sim'
                labelPlacement='end'
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            style={{ width: '206px' }}
            id='expirationDate'
            name='expirationDate'
            value={product.expirationDate}
            onChange={handleChangeInput}
            label='Data de validade'
            disabled={product.perishable === 'false'}
            type='date'
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>

        <TextField
          label='Preço do produto'
          value={product.price}
          fullWidth
          onChange={handleChangeInput}
          name='price'
          id='formatted-numberformat-input'
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
        />

        <div>
          <Button variant='contained' onClick={clearStatesAndClose}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={saveOrUpdateProduct}
            disabled={!!errors.length}
          >
            Cadastrar
          </Button>
        </div>
      </DialogContentStyled>
    </DialogStyled>
  );
};

export default FormDialog;
