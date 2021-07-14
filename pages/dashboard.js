import { useUser } from '@clerk/clerk-react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import TemplateCard from '../components/cards/TemplateCard';

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id: userId, fullName } = useUser();
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [loadingClone, setLoadingCreate] = useState(false);

  const [selectedResume, setSelectedResume] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios({
          url: `/api/resumes?user=${userId}`,
          method: 'GET',
        });
        setResumes(data.data);
      } catch (error) {
        setError('An error occureed. Please try again later!');
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const onClone = () => {};
  const onUpdate = () => {};
  const onDelete = () => {};

  const onSelect = id => {
    setSelectedResume(id);
  };

  const render = () => {
    if (loading) {
      return <div>Loader</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    if (!resumes.length) return <div>No Templates found.</div>;
    return (
      <div className="pt-10 px-10 lg:px-0 templates-grid-container">
        {resumes.map(resume => (
          <TemplateCard template={resume} type="RESUME" selected={resume._id === selectedResume._id} onSelect={onSelect} key={resume._id} />
        ))}
      </div>
    );
  };

  return (
    <div className="py-12 lg:max-w-screen-xl mx-auto">
      <h1 className="text-3xl lg:text-5xl font-extralight text-center pb-10">Your Resumes</h1>
      {selectedResume && (
        <div className="bg-gray-50 rounded px-8 py-6 transition-all flex flex-col lg:flex-row items-center justify-between">
          <h2 className="text-regular text-lg font-medium text-default">Selected Resume : {selectedResume.title}</h2>
          <div className="mt-6 lg:mt-0">
            <Button className="mr-6" variant="outlined" color="primary" onClick={onClone}>
              Clone
            </Button>
            <Button className="mr-6" variant="contained" color="primary" onClick={onUpdate}>
              Update
            </Button>
            <Button variant="contained" color="primary" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
      {render()}
    </div>
  );
};

export default Dashboard;
