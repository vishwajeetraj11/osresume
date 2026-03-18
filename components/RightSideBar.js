import { useUser } from '@clerk/nextjs';
import clsx from 'clsx';
import { Printer, Save, Type } from 'lucide-react';
import React from 'react';
import useMediaQuery from '../shared/utils/useMediaQuery';
import GoogleFontsList from './fonts/GoogleFontsList';
import UpdateTitle from './forms/UpdateTitle';
import Drawer from './ui/Drawer';
import Tooltip from './ui/Tooltip';

const sections = [
  {
    id: '1',
    title: 'Font Face',
    label: 'font-face',
    Icon: Type,
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
    Icon: Save,
  },
];

const RightSideBar = ({ handlePrint }) => {
  const matches = useMediaQuery('(min-width:1024px)');
  const { user } = useUser();
  const sectionTitles = sections.map(e => e.label);
  const sectionDrawerStates = {};
  sectionTitles.map(section => (sectionDrawerStates[section] = false));

  // Right Drawer States
  const [rightDrawerState, setRightDrawerState] = React.useState({
    ...sectionDrawerStates,
  });

  const toggleRightDrawer = (anchor, open) => () => {
    setRightDrawerState({ ...rightDrawerState, [anchor]: open });
  };

  const rightList = anchor => (
    <div className={matches ? clsx('w-full') : clsx('w-full')} role="presentation">
      {anchor === 'font-face' && <GoogleFontsList closeDrawer={toggleRightDrawer(anchor, false)} anchor={anchor} />}
      {anchor === 'update-title' && <UpdateTitle closeDrawer={toggleRightDrawer(anchor, false)} anchor={anchor} />}
    </div>
  );

  return (
    <div className="bg-primary lg:pt-16 px-4 w-full lg:w-auto flex lg:block justify-center left-sidebar order-1 lg:order-3">
      {sections.map(({ title, Icon, id, label }) => (
        <div key={id} className="inline-block lg:block my-4 lg:my-8">
          <Tooltip label={title} placement={matches ? 'right' : 'bottom'}>
            <button type="button" onClick={toggleRightDrawer(label, true)} className="p-2 rounded hover:bg-white/10">
              <Icon className="h-6 w-6 text-white" />
            </button>
          </Tooltip>
          <Drawer anchor="right" open={rightDrawerState[label]} onClose={toggleRightDrawer(label, false)}>
            {rightList(label)}
          </Drawer>
        </div>
      ))}
      <Tooltip label="Print Resume" placement={matches ? 'right' : 'bottom'}>
        <button
          type="button"
          className="p-2 rounded hover:bg-white/10"
          onClick={e => {
          handlePrint();
          sendGTMEvent({
            event: 'print_button',
            value: {
              user: {
                fullName: user.fullName,
                email: user.primaryEmailAddress[0],
                id: user.id,
              },
            },
          });
          }}
        >
          <Printer className="h-6 w-6 text-white" />
        </button>
      </Tooltip>
    </div>
  );
};

export default RightSideBar;
