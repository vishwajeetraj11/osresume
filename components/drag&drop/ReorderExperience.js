import { useShallow } from 'zustand/react/shallow';
import ExperienceCard from '../cards/ExperienceCard';
import EditSingleExperience from '../forms/EditSingleExperience';
import ReorderSection from './ReorderSection';

const SAMPLE_EXPERIENCE = {
  designation: 'Sample Designation',
  company: 'Company Description',
  description: 'Sample Description',
  startedAt: 'June 2012',
  endedAt: 'July 2013',
  years: '1',
  country: 'Sample Country',
};

const ReorderExperience = ({ closeDrawer, anchor }) => {
  const storeSelector = useShallow(state => state.data.experience);
  const addItemsAction = state => state.addExperience;
  const addSampleItemAction = state => state.addSampleExperience;
  const deleteSingleItemAction = state => state.deleteSingleExperience;

  return (
    <ReorderSection
      closeDrawer={closeDrawer}
      anchor={anchor}
      sectionName="Experience"
      droppableId="experiences"
      storeSelector={storeSelector}
      addItemsAction={addItemsAction}
      addSampleItemAction={addSampleItemAction}
      deleteSingleItemAction={deleteSingleItemAction}
      deleteApiPath={id => `/api/experiences/${id}`}
      resumeBodyKey="experience"
      sampleData={SAMPLE_EXPERIENCE}
      CardComponent={ExperienceCard}
      activeStatePropName="experienceActive"
      openEditPropName="openEditExpForm"
      EditFormComponent={EditSingleExperience}
      editFormItemPropName="experience"
    />
  );
};

export default ReorderExperience;
