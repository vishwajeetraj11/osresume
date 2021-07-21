import { Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import React from 'react';
import GoogleFontsList from './fonts/GoogleFontsList';
import UpdateTitle from './forms/UpdateTitle';

const sections = [
  {
    id: '1',
    title: 'Font Face',
    label: 'font-face',
    Icon: FormatColorTextIcon,
  },
  // {
  //   id: '2',
  //   title: 'Font Color',
  //   label: 'font-color',
  //   Icon: FormatColorFillIcon,
  // },
  {
    id: '3',
    title: 'Update Title',
    label: 'update-title',
    Icon: SaveIcon,
  },
];

const RightSideBar = ({ handlePrint }) => {
  const matches = useMediaQuery('(min-width:1024px)');
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
      width: '100vw',
    },
  });

  const classes = useStyles();

  // Right Drawer States
  const [rightDrawerState, setRightDrawerState] = React.useState({
    ...sectionDrawerStates,
  });

  const toggleRightDrawer = (anchor, open) => () => {
    setRightDrawerState({ ...rightDrawerState, [anchor]: open });
  };

  const rightList = anchor => (
    <div className={matches ? clsx(classes.list) : clsx(classes.fullList)} role="presentation">
      {anchor === 'font-face' && <GoogleFontsList closeDrawer={toggleRightDrawer(anchor, false)} anchor={anchor} />}
      {anchor === 'update-title' && <UpdateTitle closeDrawer={toggleRightDrawer(anchor, false)} anchor={anchor} />}
    </div>
  );

  return (
    <div className="bg-primary lg:pt-16 px-4 w-full lg:w-auto flex lg:block justify-center left-sidebar order-1 lg:order-3">
      {sections.map(({ title, Icon, id, label }) => (
        <div key={id} className="inline-block lg:block my-4 lg:my-8">
          <Tooltip title={title} placement={matches ? 'right' : 'bottom'} arrow>
            <Button onClick={toggleRightDrawer(label, true)}>
              <Icon style={{ color: 'white' }} size="100px" />
            </Button>
          </Tooltip>
          <Drawer anchor="right" open={rightDrawerState[label]} onClose={toggleRightDrawer(label, false)}>
            {rightList(label)}
          </Drawer>
        </div>
      ))}
      <Tooltip title="Print Resume" placement={matches ? 'right' : 'bottom'} arrow>
        <Button onClick={handlePrint}>
          <PrintIcon style={{ color: 'white' }} size="100px" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default RightSideBar;
