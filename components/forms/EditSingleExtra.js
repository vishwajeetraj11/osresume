import { useAuth } from '@clerk/nextjs';
import { Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { useResumeStore } from '../../zustand/zustand';

const EditSingleExtra = ({ closeDrawer, anchor, extra, setEdit }) => {
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  const extrasCollection = useResumeStore(useShallow(state => state.data.extras));
  const addExtrasdata = useResumeStore(state => state.addExtras);

  const { getToken } = useAuth();

  const showSnack = (message, variant) => {
    if (variant === 'success') {
      toast.success(message);
    } else if (variant === 'error') {
      toast.error(message);
    } else if (variant === 'default') {
      toast.message(message);
    } else if (variant === 'info') {
      toast.info(message);
    }
  };

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

  return (
    <Formik
      initialValues={{
        ...extra,
        inputChip: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          try {
            const token = await getToken();

            showSnack(
              extra._id ? toastMessages.UPDATE_RESOURCE_REQUEST('Extras') : toastMessages.CREATE_RESOURCE_REQUEST('Extras'),
              'default',
            );
            const { data } = await axios({
              url: `${extra._id ? `/api/extras/${extra._id}` : '/api/extras'}`,
              method: `${extra._id ? 'PUT' : 'POST'}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
              addExtrasdata(extras);
            } else {
              const results = extrasCollection.map(ext => (ext.id === extra.id ? data.extras : ext));
              addExtrasdata(results);
            }

            resetForm({
              title: '',
              type: '',
              items: [],
              inputChip: '',
            });

            showSnack(
              extra._id ? toastMessages.UPDATE_RESOURCE_SUCCESS('Extras') : toastMessages.CREATE_RESOURCE_SUCCESS('Extras'),
              'success',
            );
            setEdit(true);
          } catch (error) {
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

            <FormControl variant="outlined" sx={{ minWidth: 120, marginTop: 10 }} fullWidth>
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
              {['NEW_LINE', 'COMMA'].includes(values.type) && (
                <Box sx={{ mt: values.type === 'NEW_LINE' ? 2 : 1, mr: 2 }}>
                  <TextField
                    label="Add Item"
                    value={values.inputChip || ''}
                    onChange={e => setFieldValue('inputChip', e.target.value)}
                    onKeyDown={e => {
                      if ((e.key === 'Enter' || (values.type === 'COMMA' && e.key === ',')) && values.inputChip) {
                        e.preventDefault();
                        if (!values.items.includes(values.inputChip.trim())) {
                          setFieldValue('items', [...values.items, values.inputChip.trim()]);
                        }
                        setFieldValue('inputChip', '');
                      }
                    }}
                    fullWidth
                    className={values.type === 'NEW_LINE' ? 'mt-6 mr-10' : 'mt-4 mr-10'}
                    variant="outlined"
                    placeholder="Enter items and hit ENTER"
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {values.items.map((chip, idx) => (
                      <Chip
                        key={idx}
                        label={chip}
                        onDelete={() => {
                          setFieldValue('items', values.items.filter((_, i) => i !== idx));
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </FormControl>
          </div>
          <Divider className="mt-8 -ml-10" />
          <Button
            className="mt-6  text-white hover:bg-[#12836d]  bg-primary"
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default EditSingleExtra;
