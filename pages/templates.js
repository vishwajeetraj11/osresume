import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TemplateCard from '../components/cards/TemplateCard';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState('');

  const onSelect = id => {
    setSelectedTemplate(id);
  };

  const onCancel = () => {
    setSelectedTemplate('');
  };

  const onCreate = async () => {
    try {
      setLoadingCreate(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCreate(false);
    }
  };

  useEffect(() => {
    // Make a template
    // (async () => {
    //   try {
    //     const { data } = await axios({
    //       url: '/api/resume',
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       data: {
    //         userId: 'user_dfn',
    //         title: 'My resume',
    //       },
    //     });
    //     console.log(data);
    //   } catch (e) {
    //     console.log(e.response.data);
    //   }
    // })();

    (async () => {
      try {
        setLoading(true);
        const { data: res } = await axios({
          url: '/api/resumes?template=true',
          method: 'GET',
        });
        setTemplates(res.data);
      } catch (e) {
        setError('An error occureed. Please try again later!');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const render = () => {
    if (loading) {
      return <div>Loader</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    if (!templates.length) return <div>No Templates found.</div>;
    return (
      <div
        className="pt-10 px-10 lg:px-0"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr)',
          gridGap: '1rem',
        }}
      >
        {templates.map(template => (
          <TemplateCard template={template} selected={template._id === selectedTemplate._id} onSelect={onSelect} key={template._id} />
        ))}
      </div>
    );
  };

  return (
    <div className="py-12 lg:max-w-screen-xl mx-auto">
      <h1 className="text-3xl lg:text-5xl font-extralight text-center pb-10">Browse All Templates</h1>
      {selectedTemplate && (
        <div className="bg-gray-50 rounded px-8 py-6 transition-all flex flex-col lg:flex-row items-center justify-between">
          <h2 className="text-regular text-lg font-medium text-default">Selected Template : {selectedTemplate.title}</h2>
          <div className="mt-6 lg:mt-0">
            <Button className="mr-10" variant="outlined" color="primary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onCLick={onCreate}>
              Create
            </Button>
          </div>
        </div>
      )}
      {render()}
    </div>
  );
};

export default Templates;
