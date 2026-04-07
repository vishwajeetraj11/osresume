import { useAuth } from '@clerk/nextjs';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { apiRequest } from '../../shared/utils/apiClient';
import { useResumeStore } from '../../zustand/zustand';
import { EmptyFileSVG } from '../SVGs';
import Drawer from '../ui/Drawer';
import { getItemStyle, getListStyle, showSnack } from './reorderUtils';

/**
 * Generic reorder section component shared by all 5 section drawers.
 *
 * Required props:
 *   closeDrawer(anchor, open)  — closes the parent drawer
 *   anchor                     — passed through to edit forms and closeDrawer
 *   sectionName                — display label, e.g. "Experience"
 *   droppableId                — unique string for the drag-and-drop context
 *   storeSelector              — zustand selector: state => state.data.<section>
 *   addItemsAction             — zustand action: state => state.addXxx
 *   addSampleItemAction        — zustand action: state => state.addSampleXxx
 *   deleteSingleItemAction     — zustand action: state => state.deleteSingleXxx
 *   deleteApiPath              — function(id): string, e.g. id => `/api/experiences/${id}`
 *   resumeBodyKey              — key used in the PATCH body, e.g. "experience"
 *   sampleData                 — object passed to addSampleItemAction (without id, id is added here)
 *   CardComponent              — the card component for each item
 *   activeStatePropName        — prop name the card expects for the active-state map, e.g. "experienceActive"
 *   openEditPropName           — prop name the card expects for the open-edit callback, e.g. "openEditExpForm"
 *   EditFormComponent          — the edit form component
 *   editFormItemPropName       — prop name the edit form expects for the item, e.g. "experience"
 *   drawerContentStyle         — optional inline style for the inner drawer content div (used by Extras)
 */
const ReorderSection = ({
  closeDrawer,
  anchor,
  sectionName,
  droppableId,
  storeSelector,
  addItemsAction,
  addSampleItemAction,
  deleteSingleItemAction,
  deleteApiPath,
  resumeBodyKey,
  sampleData,
  CardComponent,
  activeStatePropName,
  openEditPropName,
  EditFormComponent,
  editFormItemPropName,
  drawerContentStyle,
}) => {
  const { getToken } = useAuth();
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));

  const sectionItems = useResumeStore(storeSelector);
  const addItems = useResumeStore(addItemsAction);
  const addSampleItem = useResumeStore(addSampleItemAction);
  const deleteSingleItem = useResumeStore(deleteSingleItemAction);

  const [items, setItems] = useState(sectionItems);
  const [edit, setEdit] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  // Build initial active states map from current items
  const buildActiveStates = list => {
    const map = {};
    list.forEach(entry => {
      map[entry.id] = false;
    });
    return map;
  };

  const [activeStates, setActiveStates] = useState(() => buildActiveStates(sectionItems));

  // Build initial drawer open states map
  const buildDrawerStates = list => {
    const map = {};
    list.forEach(entry => {
      map[entry.id] = false;
    });
    return map;
  };

  const [drawerStates, setDrawerStates] = React.useState(() => buildDrawerStates(sectionItems));

  useEffect(() => {
    if (sectionItems.length !== items.length) {
      setItems(sectionItems);
    }
    if (edit) {
      setItems(sectionItems);
      setEdit(false);
    }
  }, [sectionItems, items, edit]);

  const toggleDrawerState = (id, open) => () => {
    setDrawerStates(prev => ({ ...prev, [id]: open }));
  };

  const onDragEnd = result => {
    setIsReordering(false);
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setItems(reordered);
  };

  const disableAllActive = () => {
    const fakeState = {};
    Object.keys(activeStates).forEach(id => {
      fakeState[id] = false;
    });
    setActiveStates(fakeState);
  };

  const onClickItem = ({ id }) => {
    if (activeStates[id]) {
      setActiveStates(prev => ({ ...prev, [id]: false }));
      return;
    }
    const fakeState = {};
    Object.keys(activeStates).forEach(existingId => {
      fakeState[existingId] = false;
    });
    setActiveStates({ ...fakeState, [id]: true });
  };

  const onDelete = async ({ id }) => {
    if (id.includes('-')) {
      deleteSingleItem(id);
      return;
    }
    try {
      showSnack(toastMessages.DELETE_RESOURCE_REQUEST(sectionName), 'default');
      const token = await getToken();
      await apiRequest(deleteApiPath(id), {
        method: 'DELETE',
        token,
      });
      deleteSingleItem(id);
      showSnack(toastMessages.DELETE_RESOURCE_SUCCESS(sectionName), 'success');
    } catch (error) {
      showSnack(toastMessages.DELETE_RESOURCE_ERROR(sectionName), 'error');
    }
  };

  const save = async () => {
    const hasUnsaved = items.some(entry => entry.id.includes('-'));
    if (hasUnsaved) {
      showSnack(toastMessages.WARN_BEFORE_SAVE(sectionName), 'info');
      return;
    }
    try {
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_REQUEST(sectionName), 'default');
      const token = await getToken();
      const data = await apiRequest(`/api/resumes/${resumeId}`, {
        method: 'PATCH',
        token,
        body: { [resumeBodyKey]: items },
      });
      addItems(data.resume[resumeBodyKey]);
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_SUCCESS(sectionName), 'success');
      closeDrawer(anchor, false);
    } catch (error) {
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_ERROR(sectionName), 'error');
    }
  };

  const onAdd = () => {
    addSampleItem({ id: uuidv4(), ...sampleData });
    showSnack(toastMessages.SAMPLE_DATA(sectionName), 'success');
  };

  const renderDraggableItem = (entry, dragProvided, dragSnapshot) => {
    const draggableItem = (
      <div
        onClick={() => {
          if (!isReordering) {
            onClickItem({ id: entry.id });
          }
        }}
        className="p-6 text-white text-lg bg-primary rounded"
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
        ref={dragProvided.innerRef}
        style={getItemStyle(dragSnapshot.isDragging, dragProvided.draggableProps.style)}
      >
        <CardComponent
          {...entry}
          onDelete={onDelete}
          {...{ [activeStatePropName]: activeStates }}
          {...{ [openEditPropName]: toggleDrawerState(entry.id, true) }}
        />
      </div>
    );

    if (dragSnapshot.isDragging && typeof document !== 'undefined') {
      return createPortal(draggableItem, document.body);
    }

    return draggableItem;
  };

  return (
    <>
      <div className="flex items-center justify-start flex-wrap lg:flex-nowrap">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <button
            type="button"
            className="lg:px-4 lg:py-2 mr-4 inline-flex items-center text-sm text-gray-700 hover:text-gray-900"
            onClick={() => closeDrawer(anchor, false)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="ml-2 capitalize">Back</span>
          </button>
        </div>
        <button
          type="button"
          className="lg:px-4 lg:py-2 mr-4 inline-flex items-center rounded border border-primary text-primary px-4 py-2 text-sm hover:bg-primary/10"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4" />
          <span className="ml-2 capitalize">Add {sectionName}</span>
        </button>
        <button
          type="button"
          className="lg:px-4 lg:py-2 inline-flex items-center rounded bg-primary px-4 py-2 text-sm text-white hover:bg-[#12836d]"
          onClick={save}
        >
          <Save className="h-4 w-4" />
          <span className="ml-2 capitalize">Save Order</span>
        </button>
      </div>

      <DragDropContext onDragStart={() => setIsReordering(true)} onDragEnd={onDragEnd}>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            // eslint-disable-next-line
            <div
              style={getListStyle(snapshot.isDraggingOver)}
              className="pb-10 pt-8 rounded flex-1 flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
              onClick={() => {
                if (snapshot.isDraggingOver) {
                  disableAllActive();
                }
              }}
            >
              {items.length === 0 ? (
                <div className="flex items-center justify-center flex-1">
                  <div className="flex flex-col items-center text-center">
                    <EmptyFileSVG style={{ opacity: 0.75 }} />
                    <h5 className="text-primary font-semibold text-lg mt-6 mb-2">No {sectionName} Yet!</h5>
                    <p className="text-sm text-[#73808D]">Click &ldquo;Add {sectionName}&rdquo; above to get started.</p>
                  </div>
                </div>
              ) : (
                items.map((entry, index) => (
                  <Draggable key={entry.id} draggableId={entry.id} index={index}>
                    {(dragProvided, dragSnapshot) => renderDraggableItem(entry, dragProvided, dragSnapshot)}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {items.map(entry => (
        <Drawer anchor="left" open={drawerStates[entry.id]} onClose={toggleDrawerState(entry.id, false)} key={entry.id}>
          <div className="pt-10 pl-10 pr-10" role="presentation" style={drawerContentStyle}>
            <div className="flex align-center">
              <button
                type="button"
                className="px-4 py-2 inline-flex items-center rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                onClick={toggleDrawerState(entry.id, false)}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2 capitalize">Back</span>
              </button>
            </div>
            <EditFormComponent
              anchor={anchor}
              setEdit={setEdit}
              closeDrawer={toggleDrawerState(entry.id, false)}
              {...{ [editFormItemPropName]: entry }}
            />
          </div>
        </Drawer>
      ))}
    </>
  );
};

export default ReorderSection;
