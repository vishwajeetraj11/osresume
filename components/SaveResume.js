import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';

const SaveResume = ({ closeDrawer }) => {
  const onSave = () => {
    console.log('save');
  };
  return (
    <div className="p-10">
      <Button className="px-4 py-2" onClick={() => closeDrawer()} color="default" variant="text">
        {' '}
        <ArrowBackIcon />
        <p className="ml-2">Back</p>
      </Button>
    </div>
  );
};

export default SaveResume;
