import { useAuth } from '@clerk/nextjs';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Divider, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import axios from 'axios';
import { Formik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { useResumeStore } from '../../zustand/zustand';
import { EducationType } from '../cards/EducationCard';

interface EditSingleEducationtype {
  closeDrawer: (id: string, value: boolean) => void;
  anchor: string;
  education: any;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>; ///ask Vishwajeeth
}

interface Resetform2 {
  (params: { institution: string; major: string; startedAt: string; endedAt: string; country: string }): void;
}

const EditSingleEducation = ({ closeDrawer, anchor, education, setEdit }: EditSingleEducationtype) => {
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  const educationCollection = useResumeStore(useShallow(state => state.data.education));
  console.log(educationCollection);
  const { getToken } = useAuth();
  const addEducation = useResumeStore(state => state.addEducation);

  const showSnack = (message: string, variant: string) => {
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
    institution: Yup.string().required('Institution is required.'),
    major: Yup.string().required('Please enter the major.'),
    startedAt: Yup.date().required('Please enter start date.'),
    endedAt: Yup.date().required('Please enter end date.'),
    country: Yup.string().required('Please enter country name.'),
  });

  /*
                   {
                        institution: '',
                        major: '',
                        start: '',
                        end: '',
                        years: '',
                    },

    */

  return (
    <Formik
      initialValues={{
        ...education,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }: { setSubmitting: (data: boolean) => void; resetForm: Resetform2 }) => {
        setTimeout(async () => {
          showSnack(
            education._id ? toastMessages.UPDATE_RESOURCE_REQUEST('Education') : toastMessages.CREATE_RESOURCE_REQUEST('Education'),
            'default',
          );
          try {
            const token = await getToken();

            const { data } = await axios({
              url: `${education._id ? `/api/educations/${education._id}` : '/api/educations'}`,
              method: `${education._id ? 'PUT' : 'POST'}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              data: {
                institution: values.institution,
                major: values.major,
                startedAt: values.startedAt,
                endedAt: values.endedAt,
                country: values.country,
                resumeId,
              },
            });

            const educationExists = educationCollection.find((edu: EducationType) => edu.id === data.education._id);

            if (educationExists) {
              const education = educationCollection.map((edu: EducationType) => (edu.id === data.education._id ? data.education : edu));
              addEducation(education);
            } else {
              const results = educationCollection.map((edu: EducationType) => (edu.id === education.id ? data.education : edu));
              addEducation(results);
            }
            showSnack(
              education._id ? toastMessages.UPDATE_RESOURCE_SUCCESS('Education') : toastMessages.CREATE_RESOURCE_SUCCESS('Education'),
              'success',
            );
            resetForm({
              institution: '',
              major: '',
              startedAt: '',
              endedAt: '',
              country: '',
            });
            setEdit(true);
          } catch (error) {
            showSnack(
              education._id ? toastMessages.UPDATE_RESOURCE_ERROR('Education') : toastMessages.CREATE_RESOURCE_ERROR('Education'),
              'error',
            );
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
              <h3 className="text-t1-lg font-medium mt-6">Education Block</h3>
            </div>
            <TextField
              id="institution"
              className="mt-6 pr-10"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Institution"
              value={values.institution}
              error={!!errors.institution}
              helperText={errors.institution}
            />

            <TextField
              id="major"
              className="mt-10 pr-10"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Major"
              value={values.major}
              error={!!errors.major}
              helperText={errors.major}
            />

            <TextField
              id="country"
              className="mt-10 pr-10"
              rows={1}
              variant="outlined"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              label="Enter Country"
              value={values.country}
              error={!!errors.country}
              helperText={errors.country}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="flex justify-between pr-10 mt-6 flex-wrap">
                <KeyboardDatePicker
                  className="w-full lg:w-auto"
                  InputProps={{ readOnly: true }}
                  margin="normal"
                  id="startedAt"
                  label="Enter Start Date"
                  views={['year', 'month']}
                  // format='/MM/yyyy'
                  onChange={(date: MaterialUiPickersDate) => {
                    const month = date?.toLocaleString('default', { month: 'long' });
                    const year = date?.getFullYear();
                    setFieldValue('startedAt', `${month} ${year}`);
                  }}
                  value={values.startedAt}
                  error={!!errors.startedAt}
                  helperText={errors.startedAt}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  className="w-full lg:w-auto"
                  margin="normal"
                  id="endedAt"
                  InputProps={{ readOnly: true }}
                  label="Enter End Date"
                  views={['year', 'month']}
                  // format='MM/yyyy'
                  /// askvishwajeet
                  onChange={date => {
                    const month = date?.toLocaleString('default', { month: 'long' });
                    const year = date?.getFullYear();
                    setFieldValue('endedAt', `${month} ${year}`);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  value={values.endedAt}
                  error={!!errors.endedAt}
                  helperText={errors.endedAt}
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>
          <Divider className="mt-8 -ml-10" />
          <Button
            className="mt-6     text-white hover:bg-[#12836d]  bg-primary"
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

export default EditSingleEducation;
