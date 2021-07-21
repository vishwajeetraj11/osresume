import { Button, Divider, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import axios from 'axios';
import { Formik } from 'formik';
import ChipInput from 'material-ui-chip-input';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ADD_EXTRAS_DATA } from '../../redux/actionTypes/resumeActionTypes';
import { toastMessages } from '../../shared/contants';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EditSingleExtra = ({ closeDrawer, anchor, extra, setEdit }) => {
  const { resumeId } = useSelector(state => state.resume.metadata);
  const extrasCollection = useSelector(state => state.resume.data.extras);

  const { enqueueSnackbar } = useSnackbar();

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  // Dispatch
  const dispatch = useDispatch();

  // Validation Schema for PersonalData form
  const ValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title of the Extra is must.'),
    type: Yup.string().oneOf(['NEW_LINE', 'COMMA']),
  });

  /*
                {
                    title: '',
                    type: '',
                    items: [],
                },

    */

  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        ...extra,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          // dispatch(editSingleExtraData(values));
          try {
            showSnack(
              extra._id ? toastMessages.UPDATE_RESOURCE_REQUEST('Extras') : toastMessages.CREATE_RESOURCE_REQUEST('Extras'),
              'default',
            );
            const { data } = await axios({
              url: `${extra._id ? `/api/extras/${extra._id}` : '/api/extras'}`,
              method: `${extra._id ? 'PUT' : 'POST'}`,
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                title: values.title,
                type: values.type,
                items: values.items,
                resumeId,
              },
            });

            const extraExists = extrasCollection.find(ext => ext._id === data.extras._id);

            if (extraExists) {
              const extras = extrasCollection.map(ext => (ext._id === data.extras._id ? data.extras : ext));
              dispatch({
                type: ADD_EXTRAS_DATA,
                payload: extras,
              });
            } else {
              const results = extrasCollection.map(ext => (ext.id === extra.id ? data.extras : ext));
              dispatch({
                type: ADD_EXTRAS_DATA,
                payload: results,
              });
            }

            resetForm({
              title: '',
              type: '',
              items: [],
            });

            showSnack(
              extra._id ? toastMessages.UPDATE_RESOURCE_SUCCESS('Extras') : toastMessages.CREATE_RESOURCE_SUCCESS('Extras'),
              'success',
            );
            setEdit(true);
          } catch (error) {
            // console.log(error);
            showSnack(extra._id ? toastMessages.UPDATE_RESOURCE_ERROR('Extras') : toastMessages.CREATE_RESOURCE_ERROR('Extras'), 'error');
          } finally {
            setSubmitting(false);
            closeDrawer(anchor, false);
          }
        }, 400);
      }}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
        <form className="pb-10" onSubmit={handleSubmit}>
          <div className="">
            <div className="flex align-center justify-between">
              <h3 className="text-t1-lg font-medium mt-6">Extra Block</h3>
            </div>
            <TextField
              id="title"
              className="mt-6"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Title"
              value={values.title}
              error={!!errors.title}
              helperText={errors.title}
            />

            <FormControl variant="outlined" className={`${classes.formControl} mr-10 mt-10`} fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">Type of Extra Item</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={values.type}
                onChange={e => {
                  setFieldValue('type', e.target.value);
                }}
                label="Type of Extra Item"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="NEW_LINE">Every Item in new Line</MenuItem>
                <MenuItem value="COMMA">Every Item in the same line</MenuItem>
              </Select>
              {values.type === 'NEW_LINE' && (
                <>
                  <ChipInput
                    label="Items"
                    fullWidth
                    className="mt-6 mr-10"
                    placeholder="Enter items and hit ENTER"
                    allowDuplicates={false}
                    alwaysShowPlaceholder={!!values.items.length}
                    value={values.items}
                    onAdd={chip => {
                      setFieldValue('items', values.items.concat(chip));
                    }}
                    onDelete={(chip, indexChip) => {
                      const items = values.items.filter((_, i) => i !== indexChip);
                      setFieldValue('items', items);
                    }}
                  />
                  {/* <Button className='mt-4' onClick={() => console.log()} variant='contained' color='primary'>Add</Button> */}
                </>
              )}
              {values.type === 'COMMA' && (
                <>
                  <ChipInput
                    label="Items"
                    fullWidth
                    className="mt-4 mr-10"
                    placeholder="Enter items and hit ENTER"
                    allowDuplicates={false}
                    alwaysShowPlaceholder={!!values.items.length}
                    value={values.items}
                    onAdd={chip => {
                      setFieldValue('.items', values.items.push(chip));
                    }}
                    onDelete={(chip, indexChip) => {
                      const items = values.items.filter((_, i) => i !== indexChip);
                      setFieldValue('items', items);
                    }}
                  />
                  {/* <Button className='mt-4' onClick={() => console.log()} variant='contained' color='primary'>Add</Button> */}
                </>
              )}
            </FormControl>
          </div>
          <Divider className="mt-8 -ml-10" />
          <Button className="mt-6" variant="contained" color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default EditSingleExtra;
