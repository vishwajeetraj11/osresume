import { useShallow } from 'zustand/react/shallow';
import EducationCard from '../cards/EducationCard';
import EditSingleEducation from '../forms/EditSingleEducation';
import ReorderSection from './ReorderSection';

const SAMPLE_EDUCATION = {
  institution: 'Sample Institution',
  major: 'Sample Major',
  startedAt: 'June 2012',
  endedAt: 'July 2013',
  years: '1',
  country: 'Sample Country',
};

const ReorderEducation = ({ closeDrawer, anchor }) => {
  const storeSelector = useShallow(state => state.data.education);
  const addItemsAction = state => state.addEducation;
  const addSampleItemAction = state => state.addSampleEducation;
  const deleteSingleItemAction = state => state.deleteSingleEducation;

  return (
    <ReorderSection
      closeDrawer={closeDrawer}
      anchor={anchor}
      sectionName="Education"
      droppableId="education"
      storeSelector={storeSelector}
      addItemsAction={addItemsAction}
      addSampleItemAction={addSampleItemAction}
      deleteSingleItemAction={deleteSingleItemAction}
      deleteApiPath={id => `/api/educations/${id}`}
      resumeBodyKey="education"
      sampleData={SAMPLE_EDUCATION}
      CardComponent={EducationCard}
      activeStatePropName="educationActive"
      openEditPropName="openEditEduForm"
      EditFormComponent={EditSingleEducation}
      editFormItemPropName="education"
    />
  );
};

export default ReorderEducation;
