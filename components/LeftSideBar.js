import { Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import React from 'react';

import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';

import ReorderEducation from './drag&drop/ReorderEducation';
import ReorderExperience from './drag&drop/ReorderExperience';
import ReorderExtras from './drag&drop/ReorderExtras';
import PersonalDataForm from './forms/PersonalData';

const LeftSideBar = () => {
  const matches = useMediaQuery('(min-width:1024px)');
  const sections = [
    {
      id: '1',
      title: 'Personal Data',
      label: 'personal-data',
      Icon: PersonIcon,
    },
    {
      id: '3',
      title: 'Work Experience',
      label: 'work-experience',
      Icon: WorkIcon,
    },
    {
      id: '4',
      title: 'Education',
      label: 'education',
      Icon: SchoolIcon,
    },
    {
      id: '5',
      title: 'Extras',
      label: 'extras',
      Icon: AssignmentIcon,
    },
  ];

  const sectionTitles = sections.map(e => e.label);
  const sectionDrawerStates = {};
  sectionTitles.map(section => (sectionDrawerStates[section] = false));

  const useStyles = makeStyles({
    list: {
      // width: !matches ? '50vw' : '100vw',
      width: '50vw',
      minHeight: matches ? '0' : '100vh',
    },
    fullList: {
      width: 'auto',
    },
  });

  const classes = useStyles();

  // Left Drawer States
  const [leftDrawerState, setLeftDrawerState] = React.useState({ ...sectionDrawerStates });

  const toggleLeftDrawer = (anchor, open) => () => {
    setLeftDrawerState({ ...leftDrawerState, [anchor]: open });
  };

  const leftList = anchor => (
    <div className={`${matches ? clsx(classes.list) : clsx(classes.fullList)} h-full flex flex-col flex-1`} role="presentation">
      <div className="pt-10 pr-6 pl-6 lg:pt-10 lg:pl-10 lg:pr-10 flex-1 flex flex-col">
        {anchor === 'personal-data' && <PersonalDataForm closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
        {anchor === 'work-experience' && <ReorderExperience closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
        {anchor === 'education' && <ReorderEducation closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
        {anchor === 'extras' && <ReorderExtras closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
      </div>
      {/* <Divider /> */}
    </div>
  );

  return (
    <div className="bg-primary lg:pt-16 lg:px-4 flex lg:block fixed lg:static bottom-0 w-screen lg:w-auto justify-center left-sidebar order-3 lg:order-1">
      {/* add overflow-scroll ||^^ if section are needed to scroll */}
      {sections.map(({ title, Icon, id, label }) => (
        <div key={id} className="inline-block lg:block my-4 lg:my-8">
          <Tooltip title={title} placement={matches ? 'right' : 'bottom'} arrow>
            <Button onClick={toggleLeftDrawer(label, true)}>
              <Icon style={{ color: 'white' }} size="100px" />
            </Button>
          </Tooltip>
          <Drawer anchor="left" open={leftDrawerState[label]} onClose={toggleLeftDrawer(label, false)}>
            {leftList(label)}
          </Drawer>
        </div>
      ))}
    </div>
  );
};

export default LeftSideBar;
