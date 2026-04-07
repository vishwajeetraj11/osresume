import { useShallow } from 'zustand/react/shallow';
import ProjectCard from '../cards/ProjectCard';
import EditSingleProject from '../forms/EditSingleProject';
import ReorderSection from './ReorderSection';

const SAMPLE_PROJECT = {
  title: 'Sample Project',
  techStack: 'React, Node.js',
  startedAt: 'January 2024',
  endedAt: '',
  description: 'Built a sample project\nAdded bullet-friendly content',
};

const ReorderProjects = ({ closeDrawer, anchor }) => {
  const storeSelector = useShallow(state => state.data.projects);
  const addItemsAction = state => state.addProjects;
  const addSampleItemAction = state => state.addSampleProject;
  const deleteSingleItemAction = state => state.deleteSingleProject;

  return (
    <ReorderSection
      closeDrawer={closeDrawer}
      anchor={anchor}
      sectionName="Project"
      droppableId="projects"
      storeSelector={storeSelector}
      addItemsAction={addItemsAction}
      addSampleItemAction={addSampleItemAction}
      deleteSingleItemAction={deleteSingleItemAction}
      deleteApiPath={id => `/api/projects/${id}`}
      resumeBodyKey="projects"
      sampleData={SAMPLE_PROJECT}
      CardComponent={ProjectCard}
      activeStatePropName="projectActive"
      openEditPropName="openEditProjectForm"
      EditFormComponent={EditSingleProject}
      editFormItemPropName="project"
    />
  );
};

export default ReorderProjects;
