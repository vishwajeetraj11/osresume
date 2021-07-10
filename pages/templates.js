import axios from 'axios';
import React, { useEffect } from 'react';

const Templates = () => {
  useEffect(() => {
    // Make a template
    (async () => {
      try {
        const { data } = await axios({
          url: '/api/resume',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            userId: 'user_dfn',
            title: 'My resume',
          },
        });
        console.log(data);
      } catch (e) {
        console.log(e.response.data);
      }
    })();
  }, []);
  return <div />;
};

export default Templates;
