import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import useMediaQuery from '../shared/utils/useMediaQuery';
import { sidebarContent } from '../zustand/zustand/index';
import ReorderEducation from './drag&drop/ReorderEducation';
import ReorderExperience from './drag&drop/ReorderExperience';
import ReorderExtras from './drag&drop/ReorderExtras';
import ReorderLeadership from './drag&drop/ReorderLeadership';
import ReorderProjects from './drag&drop/ReorderProjects';
import PersonalDataForm from './forms/PersonalData';
import Drawer from './ui/Drawer';
import Tooltip from './ui/Tooltip';

const LeftSideBar = () => {
  const matches = useMediaQuery('(min-width:1024px)');
  const sections = sidebarContent(useShallow(state => state.data.LeftSidebar));

  const sectionTitles = sections.map(e => e.label);
  const sectionDrawerStates = {};
  sectionTitles.map(section => (sectionDrawerStates[section] = false));

  // Left Drawer States
  const [leftDrawerState, setLeftDrawerState] = React.useState({ ...sectionDrawerStates });

  const toggleLeftDrawer = (anchor, open) => () => {
    setLeftDrawerState({ ...leftDrawerState, [anchor]: open });
  };

  const leftList = anchor => (
    <div style={{ width: matches ? '50vw' : 'auto', minHeight: matches ? '0' : '100vh' }} className="h-full min-h-0" role="presentation">
      <div className={anchor === 'personal-data' ? 'h-full min-h-0' : 'pt-10 pr-6 pl-6 lg:pt-10 lg:pl-10 lg:pr-10 flex-1 flex flex-col'}>
        {anchor === 'personal-data' && <PersonalDataForm closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
        {anchor === 'work-experience' && <ReorderExperience closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
        {anchor === 'education' && <ReorderEducation closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
        {anchor === 'projects' && <ReorderProjects closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
        {anchor === 'leadership' && <ReorderLeadership closeDrawer={toggleLeftDrawer(anchor, false)} anchor={anchor} />}
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
          <Tooltip label={title} placement={matches ? 'right' : 'bottom'}>
            <button type="button" onClick={toggleLeftDrawer(label, true)} className="p-2 rounded hover:bg-white/10">
              <Icon className="h-6 w-6 text-white" />
            </button>
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
