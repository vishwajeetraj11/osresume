import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@material-ui/core';
import axios from 'axios';
// import { ErrorMessage } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import NoDocumentFound from '../components/NoDocumentFound';
import TemplateCard from '../components/cards/TemplateCard';
import { toastMessages } from '../shared/contants';

const Dashboard = () => {
  const { id: userId } = useUser();

  const { getToken } = useAuth();

  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [noResume, setNoResume] = useState(false);

  const [selectedResume, setSelectedResume] = useState('');

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

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const { data } = await axios({
          url: '/api/resumes?user=true',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumes(data.data);
        if (!data.data.length) {
          setNoResume(true);
        }
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response.data);
        }
        setLoading(false);
        setNoResume(true);
        setError('An error occurred. Please try again later!');
      } finally {
        // setLoading(false);
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
      const token = await getToken();
      showSnack(toastMessages.DELETE_RESOURCE_REQUEST('Resume'), 'default');
      await axios({
        url: `/api/resumes/${selectedResume._id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        <div key={loader} className="h-[462px] animate-pulse bg-[#e0e5ebd6] rounded-lg" />
      ));
    }
    if (error) {
      return <p className="text-rose-600 text-xs">{error}</p>;
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
                <Button
                  className="mr-6 text-white hover:bg-[#12836d]  bg-primary"
                  variant="contained"
                  onClick={onUpdate}
                >
                  Update
                </Button>
                <Button
                  style={{

                    border: '2px solid #e74c3c',
                    padding: '6px 16px',
                  }}
                  className="   text-red-700"
                  variant="contained"
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
