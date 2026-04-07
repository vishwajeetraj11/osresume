import { useShallow } from 'zustand/react/shallow';
import LeadershipCard from '../cards/LeadershipCard';
import EditSingleLeadership from '../forms/EditSingleLeadership';
import ReorderSection from './ReorderSection';

const SAMPLE_LEADERSHIP = {
  organization: 'Sample Organization',
  role: 'Leadership Role',
  startedAt: 'Spring 2024',
  endedAt: 'Present',
  location: 'City, State',
  description: 'Led a cross-functional student initiative\nImproved participation and operations',
};

const ReorderLeadership = ({ closeDrawer, anchor }) => {
  const storeSelector = useShallow(state => state.data.leadership);
  const addItemsAction = state => state.addLeadership;
  const addSampleItemAction = state => state.addSampleLeadership;
  const deleteSingleItemAction = state => state.deleteSingleLeadership;

  return (
    <ReorderSection
      closeDrawer={closeDrawer}
      anchor={anchor}
      sectionName="Leadership"
      droppableId="leadership"
      storeSelector={storeSelector}
      addItemsAction={addItemsAction}
      addSampleItemAction={addSampleItemAction}
      deleteSingleItemAction={deleteSingleItemAction}
      deleteApiPath={id => `/api/leadership/${id}`}
      resumeBodyKey="leadership"
      sampleData={SAMPLE_LEADERSHIP}
      CardComponent={LeadershipCard}
      activeStatePropName="leadershipActive"
      openEditPropName="openEditLeadershipForm"
      EditFormComponent={EditSingleLeadership}
      editFormItemPropName="leadership"
    />
  );
};

export default ReorderLeadership;
