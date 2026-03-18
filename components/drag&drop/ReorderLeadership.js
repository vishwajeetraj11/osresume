import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useShallow } from 'zustand/react/shallow';
import { toastMessages } from '../../shared/contants';
import { useResumeStore } from '../../zustand/zustand';
import { EmptyFileSVG } from '../SVGs';
import LeadershipCard from '../cards/LeadershipCard';
import EditSingleLeadership from '../forms/EditSingleLeadership';
import Drawer from '../ui/Drawer';

const ReorderLeadership = ({ closeDrawer, anchor }) => {
  const { getToken } = useAuth();
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  const leadership = useResumeStore(useShallow(state => state.data.leadership));
  const addLeadershipData = useResumeStore(state => state.addLeadership);
  const addSampleLeadership = useResumeStore(state => state.addSampleLeadership);
  const deleteSingleLeadership = useResumeStore(state => state.deleteSingleLeadership);

  const showSnack = (message, variant) => {
    if (variant === 'success') toast.success(message);
    else if (variant === 'error') toast.error(message);
    else if (variant === 'default') toast.message(message);
    else if (variant === 'info') toast.info(message);
  };

  const [leadershipItems, setLeadershipItems] = useState(leadership);
  const leadershipStates = {};
  leadershipItems.forEach(entry => (leadershipStates[entry.id] = false));
  const [leadershipActive, setLeadershipActive] = useState({ ...leadershipStates });
  const [edit, setEdit] = useState(false);

  const leadershipDrawerStatesObj = {};
  leadershipItems.map(entry => (leadershipDrawerStatesObj[entry.id] = false));

  useEffect(() => {
    if (!(leadership.length === leadershipItems.length)) {
      setLeadershipItems(leadership);
    }
    if (edit) {
      setLeadershipItems(leadership);
      setEdit(false);
    }
  }, [leadership, leadershipItems, edit]);

  const [leadershipDrawerStates, setLeadershipDrawerStates] = React.useState({ ...leadershipDrawerStatesObj });
  const toggleLeadershipDrawerStates = (id, open) => () => {
    setLeadershipDrawerStates({ ...leadershipDrawerStates, [id]: open });
  };

  const onDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(leadershipItems);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    setLeadershipItems(items);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 20,
    margin: '0 0 10px 0',
    transition: 'height 0.2s',
    overflow: 'hidden',
    background: isDragging ? '#1abc9c95' : '#1abc9c',
    ...draggableStyle,
  });

  const disableActiveLeadership = () => {
    const fakeState = {};
    Object.keys(leadershipActive).forEach(id => {
      fakeState[id] = false;
    });
    setLeadershipActive(fakeState);
  };

  const onClickLeadership = ({ id }) => {
    if (leadershipActive[id]) {
      setLeadershipActive(p => ({ ...p, [id]: false }));
      return;
    }
    const fakeState = {};
    Object.keys(leadershipActive).forEach(leadershipId => {
      fakeState[leadershipId] = false;
    });
    setLeadershipActive({ ...fakeState, [id]: true });
  };

  const onDelete = async ({ id }) => {
    if (id.includes('-')) {
      deleteSingleLeadership(id);
      return;
    }
    try {
      showSnack(toastMessages.DELETE_RESOURCE_REQUEST('Leadership'), 'default');
      const token = await getToken();
      await axios({
        url: `/api/leadership/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      deleteSingleLeadership(id);
      showSnack(toastMessages.DELETE_RESOURCE_SUCCESS('Leadership'), 'success');
    } catch (error) {
      showSnack(toastMessages.DELETE_RESOURCE_ERROR('Leadership'), 'error');
    }
  };

  const save = async () => {
    let flag = false;
    leadershipItems.forEach(entry => {
      if (entry.id.includes('-')) flag = true;
    });
    if (flag) {
      showSnack(toastMessages.WARN_BEFORE_SAVE('Leadership'), 'info');
      return;
    }
    try {
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_REQUEST('Leadership'), 'default');
      const token = await getToken();
      const { data } = await axios({
        url: `/api/resumes/${resumeId}`,
        method: 'PATCH',
        data: {
          leadership: leadershipItems,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      addLeadershipData(data.resume.leadership);
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_SUCCESS('Leadership'), 'success');
      closeDrawer(anchor, false);
    } catch (error) {
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_ERROR('Leadership'), 'error');
    }
  };

  const onAdd = () => {
    addSampleLeadership({
      id: uuidv4(),
      organization: 'Sample Organization',
      role: 'Leadership Role',
      startedAt: 'Spring 2024',
      endedAt: 'Present',
      location: 'City, State',
      description: 'Led a cross-functional student initiative\nImproved participation and operations',
    });
    showSnack(toastMessages.SAMPLE_DATA('Leadership'), 'success');
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
          className="lg:px-4 lg:py-2 mr-4 inline-flex items-center rounded border border-primary px-4 py-2 text-sm text-primary hover:bg-primary/10"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4" />
          <span className="ml-2 capitalize">Add Leadership</span>
        </button>
        <button
          type="button"
          className="lg:px-4 lg:py-2 inline-flex items-center rounded bg-primary px-4 py-2 text-sm text-white hover:bg-[#12836d]"
          onClick={save}
        >
          <Save className="h-4 w-4" />
          <span className="ml-2 capitalize mr-6">Save Order</span>
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="leadership">
          {(provided, snapshot) => (
            <div
              className="pb-10 pt-8 rounded flex-1 flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
              onClick={() => {
                if (snapshot.isDraggingOver) disableActiveLeadership();
              }}
            >
              {leadershipItems.length === 0 ? (
                <div className="flex items-center justify-center flex-1">
                  <div className="bg-gray-50 rounded-full h-96 w-96 flex flex-col items-center justify-center">
                    <EmptyFileSVG />
                    <h5 className="text-default font-normal my-5">No Leadership Entries Yet!</h5>
                  </div>
                </div>
              ) : (
                leadershipItems.map((entry, index) => (
                  <Draggable key={entry.id} draggableId={entry.id} index={index}>
                    {(dragProvided, dragSnapshot) => (
                      <div
                        onClick={() => onClickLeadership({ id: entry.id })}
                        className="p-6 text-white text-lg bg-primary rounded"
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        ref={dragProvided.innerRef}
                        style={getItemStyle(dragSnapshot.isDragging, dragProvided.draggableProps.style)}
                      >
                        <LeadershipCard
                          {...entry}
                          onDelete={onDelete}
                          openEditLeadershipForm={toggleLeadershipDrawerStates(entry.id, true)}
                          leadershipActive={leadershipActive}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {leadershipItems.map(entry => (
        <Drawer anchor="left" open={leadershipDrawerStates[entry.id]} onClose={toggleLeadershipDrawerStates(entry.id, false)} key={entry.id}>
          <div className="pt-10 pl-10" role="presentation">
            <div className="flex align-center">
              <button
                type="button"
                className="px-4 py-2 inline-flex items-center rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                onClick={toggleLeadershipDrawerStates(entry.id, false)}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2 capitalize">Back</span>
              </button>
            </div>
            <EditSingleLeadership
              anchor={anchor}
              leadership={entry}
              setEdit={setEdit}
              closeDrawer={toggleLeadershipDrawerStates(entry.id, false)}
            />
          </div>
        </Drawer>
      ))}
    </>
  );
};

export default ReorderLeadership;
