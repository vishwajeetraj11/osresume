import { useAuth } from '@clerk/nextjs';
import { Formik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { apiRequest } from '../../shared/utils/apiClient';
import { useResumeStore } from '../../zustand/zustand';

const EditSingleLeadership = ({ closeDrawer, anchor, leadership: leadershipProp, setEdit }) => {
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  const leadershipCollection = useResumeStore(useShallow(state => state.data.leadership));
  const addLeadershipData = useResumeStore(state => state.addLeadership);
  const { getToken } = useAuth();

  const leadership = leadershipProp || {
    organization: '',
    role: '',
    startedAt: '',
    endedAt: '',
    location: '',
    description: '',
  };

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

  const ValidationSchema = Yup.object().shape({
    organization: Yup.string().required('Organization is required.'),
    role: Yup.string().required('Role is required.'),
    startedAt: Yup.string().required('Please enter a start date.'),
    endedAt: Yup.string().nullable(),
    location: Yup.string().nullable(),
    description: Yup.string().required('Please enter a description.'),
  });

  return (
    <Formik
      initialValues={{
        ...leadership,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          showSnack(
            leadership._id ? toastMessages.UPDATE_RESOURCE_REQUEST('Leadership') : toastMessages.CREATE_RESOURCE_REQUEST('Leadership'),
            'default',
          );
          try {
            const token = await getToken();
	            const data = await apiRequest(`${leadership._id ? `/api/leadership/${leadership._id}` : '/api/leadership'}`, {
	              method: `${leadership._id ? 'PUT' : 'POST'}`,
	              token,
	              body: {
	                organization: values.organization,
	                role: values.role,
	                startedAt: values.startedAt,
                endedAt: values.endedAt || '',
                location: values.location || '',
	                description: values.description,
	                resumeId,
	              },
	            });

            const leadershipExists = leadershipCollection.find(entry => entry._id === data.leadership._id);
            if (leadershipExists) {
              addLeadershipData(leadershipCollection.map(entry => (entry._id === data.leadership._id ? data.leadership : entry)));
            } else {
              addLeadershipData(leadershipCollection.map(entry => (entry.id === leadership.id ? data.leadership : entry)));
            }

            showSnack(
              leadership._id ? toastMessages.UPDATE_RESOURCE_SUCCESS('Leadership') : toastMessages.CREATE_RESOURCE_SUCCESS('Leadership'),
              'success',
            );
            resetForm({
              organization: '',
              role: '',
              startedAt: '',
              endedAt: '',
              location: '',
              description: '',
            });
            setEdit(true);
          } catch (error) {
            showSnack(leadership._id ? toastMessages.UPDATE_RESOURCE_ERROR('Leadership') : toastMessages.CREATE_RESOURCE_ERROR('Leadership'), 'error');
          } finally {
            setSubmitting(false);
            closeDrawer(anchor, false);
          }
        }, 200);
      }}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form className="pb-10" onSubmit={handleSubmit}>
          <div>
            <div className="flex align-center justify-between">
              <h3 className="text-t1-lg font-medium mt-6">Leadership Block</h3>
            </div>

            <div className="mt-6 pr-10">
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                id="organization"
                name="organization"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.organization}
              />
              {errors.organization && <p className="mt-1 text-xs text-rose-600">{errors.organization}</p>}
            </div>

            <div className="mt-8 pr-10 grid gap-4 lg:grid-cols-2">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  id="role"
                  name="role"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                />
                {errors.role && <p className="mt-1 text-xs text-rose-600">{errors.role}</p>}
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                />
                {errors.location && <p className="mt-1 text-xs text-rose-600">{errors.location}</p>}
              </div>
            </div>

            <div className="mt-8 pr-10 grid gap-4 lg:grid-cols-2">
              <div>
                <label htmlFor="startedAt" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  id="startedAt"
                  name="startedAt"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.startedAt}
                  placeholder="Spring 2020"
                />
                {errors.startedAt && <p className="mt-1 text-xs text-rose-600">{errors.startedAt}</p>}
              </div>
              <div>
                <label htmlFor="endedAt" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  id="endedAt"
                  name="endedAt"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endedAt}
                  placeholder="Present"
                />
                {errors.endedAt && <p className="mt-1 text-xs text-rose-600">{errors.endedAt}</p>}
              </div>
            </div>

            <div className="mt-8 pr-10">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                placeholder="One bullet per line"
              />
              {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
            </div>
          </div>
          <div className="mt-8 -ml-10 h-px bg-gray-200" />
          <button
            className="mt-6 inline-flex items-center rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-[#12836d] disabled:opacity-60"
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

export default EditSingleLeadership;
