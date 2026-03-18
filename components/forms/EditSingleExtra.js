import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Formik } from 'formik';
import { X } from 'lucide-react';
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
            <div className="mt-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Enter Title
              </label>
              <input
                id="title"
                name="title"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
              />
              {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
            </div>

            <div className="mt-10">
              <label htmlFor="extra-type" className="block text-sm font-medium text-gray-700">
                Type of Extra Item
              </label>
              <select
                id="extra-type"
                name="type"
                value={values.type}
                onChange={e => {
                  setFieldValue('type', e.target.value);
                }}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">None</option>
                <option value="NEW_LINE">Every Item in new Line</option>
                <option value="COMMA">Every Item in the same line</option>
              </select>
              {errors.type && <p className="mt-1 text-xs text-rose-600">{errors.type}</p>}
            </div>

            {['NEW_LINE', 'COMMA'].includes(values.type) && (
              <div className={values.type === 'NEW_LINE' ? 'mt-6 mr-10' : 'mt-4 mr-10'}>
                <label htmlFor="extra-item" className="block text-sm font-medium text-gray-700">
                  Add Item
                </label>
                <input
                  id="extra-item"
                  name="inputChip"
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
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter items and hit ENTER"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {values.items.map((chip, idx) => (
                    <span key={idx} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                      {chip}
                      <button
                        type="button"
                        className="ml-1 inline-flex items-center text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          setFieldValue('items', values.items.filter((_, i) => i !== idx));
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 -ml-10 h-px bg-gray-200" />
          <button
            className="mt-6 inline-flex items-center rounded bg-primary px-4 py-2 text-sm text-white hover:bg-[#12836d] disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default EditSingleExtra;
