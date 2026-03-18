import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { useResumeStore } from '../../zustand/zustand';

const EditSingleProject = ({ closeDrawer, anchor, project: projectProp, setEdit }) => {
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  const projectsCollection = useResumeStore(useShallow(state => state.data.projects));
  const addProjectsData = useResumeStore(state => state.addProjects);
  const { getToken } = useAuth();

  const project = projectProp || {
    title: '',
    techStack: '',
    startedAt: '',
    endedAt: '',
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
    title: Yup.string().required('Project title is required.'),
    startedAt: Yup.string().required('Please enter a start date.'),
    description: Yup.string().required('Please enter a description.'),
    techStack: Yup.string().nullable(),
    endedAt: Yup.string().nullable(),
  });

  return (
    <Formik
      initialValues={{
        ...project,
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          showSnack(project._id ? toastMessages.UPDATE_RESOURCE_REQUEST('Project') : toastMessages.CREATE_RESOURCE_REQUEST('Project'), 'default');
          try {
            const token = await getToken();
            const { data } = await axios({
              url: `${project._id ? `/api/projects/${project._id}` : '/api/projects'}`,
              method: `${project._id ? 'PUT' : 'POST'}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              data: {
                title: values.title,
                techStack: values.techStack || '',
                startedAt: values.startedAt,
                endedAt: values.endedAt || '',
                description: values.description,
                resumeId,
              },
            });

            const projectExists = projectsCollection.find(entry => entry._id === data.project._id);
            if (projectExists) {
              addProjectsData(projectsCollection.map(entry => (entry._id === data.project._id ? data.project : entry)));
            } else {
              addProjectsData(projectsCollection.map(entry => (entry.id === project.id ? data.project : entry)));
            }

            showSnack(project._id ? toastMessages.UPDATE_RESOURCE_SUCCESS('Project') : toastMessages.CREATE_RESOURCE_SUCCESS('Project'), 'success');
            resetForm({
              title: '',
              techStack: '',
              startedAt: '',
              endedAt: '',
              description: '',
            });
            setEdit(true);
          } catch (error) {
            showSnack(project._id ? toastMessages.UPDATE_RESOURCE_ERROR('Project') : toastMessages.CREATE_RESOURCE_ERROR('Project'), 'error');
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
              <h3 className="text-t1-lg font-medium mt-6">Project Block</h3>
            </div>

            <div className="mt-6 pr-10">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title
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

            <div className="mt-8 pr-10">
              <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">
                Tech Stack
              </label>
              <input
                id="techStack"
                name="techStack"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.techStack}
                placeholder="Python, Google Cloud, Selenium"
              />
              {errors.techStack && <p className="mt-1 text-xs text-rose-600">{errors.techStack}</p>}
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
                  placeholder="January 2021"
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
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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

export default EditSingleProject;
