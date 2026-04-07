import { useShallow } from 'zustand/react/shallow';
import useMediaQuery from '../../shared/utils/useMediaQuery';
import ExtrasCard from '../cards/ExtrasCard';
import EditSingleExtra from '../forms/EditSingleExtra';
import ReorderSection from './ReorderSection';

const SAMPLE_EXTRA = {
  title: 'Sample Title',
  type: 'COMMA',
  items: ['Sample Item 1', 'Sample Item 2'],
};

const ReorderExtras = ({ closeDrawer, anchor }) => {
  const matches = useMediaQuery('(min-width:1024px)');
  const storeSelector = useShallow(state => state.data.extras);
  const addItemsAction = state => state.addExtras;
  const addSampleItemAction = state => state.addSampleExtra;
  const deleteSingleItemAction = state => state.deleteSingleExtra;

  const drawerContentStyle = {
    width: matches ? '50vw' : '100vw',
    minHeight: matches ? '0' : '100vh',
  };

  return (
    <ReorderSection
      closeDrawer={closeDrawer}
      anchor={anchor}
      sectionName="Extra"
      droppableId="extras"
      storeSelector={storeSelector}
      addItemsAction={addItemsAction}
      addSampleItemAction={addSampleItemAction}
      deleteSingleItemAction={deleteSingleItemAction}
      deleteApiPath={id => `/api/extras/${id}`}
      resumeBodyKey="extras"
      sampleData={SAMPLE_EXTRA}
      CardComponent={ExtrasCard}
      activeStatePropName="extraActive"
      openEditPropName="openEditExtForm"
      EditFormComponent={EditSingleExtra}
      editFormItemPropName="extra"
      drawerContentStyle={drawerContentStyle}
    />
  );
};

export default ReorderExtras;
