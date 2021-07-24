import { useUser } from '@clerk/clerk-react';
import { Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import { ErrorMessage } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import TemplateCard from '../components/cards/TemplateCard';
import NoDocumentFound from '../components/NoDocumentFound';
import { toastMessages } from '../shared/contants';

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id: userId } = useUser();

  // const { data: userInfo } = useClerkSWR('/api/loggedIn');

  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [noResume, setNoResume] = useState(false);

  const [selectedResume, setSelectedResume] = useState('');

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios({
          url: '/api/resumes?user=true',
          method: 'GET',
        });
        setResumes(data.data);
        if (!data.data.length) {
          setNoResume(true);
        }
      } catch (error) {
        setNoResume(true);
        setError('An error occurred. Please try again later!');
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (resumes.length === 0) {
      setNoResume(true);
      setSelectedResume('');
    } else {
      setNoResume(false);
    }
  }, [resumes]);

  const onUpdate = () => {
    router.push(`/editor/${selectedResume._id}`);
  };
  const onDelete = async () => {
    try {
      showSnack(toastMessages.DELETE_RESOURCE_REQUEST('Resume'), 'default');
      await axios({
        url: `/api/resumes/${selectedResume._id}`,
        method: 'DELETE',
      });
      setResumes(resumes => resumes.filter(resume => resume._id !== selectedResume._id));
      showSnack(toastMessages.DELETE_RESOURCE_SUCCESS('Resume'), 'success');
    } catch (error) {
      // console.log('Error ', error);
      // console.log('Error Response: ', error.response);
      showSnack(toastMessages.DELETE_RESOURCE_ERROR('Resume'), 'error');
    }
  };

  const onSelect = id => {
    setSelectedResume(id);
  };

  const render = () => {
    if (loading) {
      return Array.from(Array(4).keys()).map(loader => (
        <Skeleton key={loader} className="rounded" variant="rect" width="100%" height={462} />
      ));
    }
    if (error) {
      return <ErrorMessage error={error} />;
    }
    if (!resumes.length) {
      return <NoDocumentFound text="No Resumes Found." />;
    }
    return resumes.map(resume => (
      <TemplateCard template={resume} type="RESUME" selected={resume._id === selectedResume._id} onSelect={onSelect} key={resume._id} />
    ));
  };

  return (
    <div className="py-12 lg:max-w-screen-xl mx-auto">
      <Head>
        <title>Dashboard | OS Resume</title>
      </Head>
      <h1 className="text-3xl lg:text-5xl font-extralight text-center pb-10">Your Resumes</h1>
      {!noResume && (
        <div className="bg-gray-50 rounded px-8 py-6 transition-all flex flex-col lg:flex-row items-center justify-between">
          <h2 className="text-regular text-lg font-medium text-default">
            {`${selectedResume ? `Selected Resume : ${selectedResume.title}` : 'Select a Resume'}`}
          </h2>
          <h2 className="text-regular text-lg font-medium text-default">
            {`${selectedResume && `Template : ${selectedResume.templateName}`}`}
          </h2>
          <div className="mt-6 lg:mt-0">
            {selectedResume && (
              <>
                <Button className="mr-6" variant="contained" color="primary" onClick={onUpdate}>
                  Update
                </Button>
                <Button
                  style={{
                    border: '2px solid #e74c3c',
                    color: '#e74c3c',
                    padding: '6px 16px',
                  }}
                  variant="text"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      <div className="pt-10 px-10 xl:px-0 templates-grid-container">{render()}</div>
    </div>
  );
};

export default Dashboard;
