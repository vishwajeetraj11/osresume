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
import ProjectCard from '../cards/ProjectCard';
import EditSingleProject from '../forms/EditSingleProject';
import Drawer from '../ui/Drawer';

const ReorderProjects = ({ closeDrawer, anchor }) => {
  const { getToken } = useAuth();
  const { resumeId } = useResumeStore(useShallow(state => state.data.resumeMeta));
  const projects = useResumeStore(useShallow(state => state.data.projects));
  const addProjectsData = useResumeStore(state => state.addProjects);
  const addSampleProject = useResumeStore(state => state.addSampleProject);
  const deleteSingleProject = useResumeStore(state => state.deleteSingleProject);

  const showSnack = (message, variant) => {
    if (variant === 'success') toast.success(message);
    else if (variant === 'error') toast.error(message);
    else if (variant === 'default') toast.message(message);
    else if (variant === 'info') toast.info(message);
  };

  const [projectItems, setProjectItems] = useState(projects);
  const projectStates = {};
  projectItems.forEach(entry => (projectStates[entry.id] = false));
  const [projectActive, setProjectActive] = useState({ ...projectStates });
  const [edit, setEdit] = useState(false);

  const projectDrawerStatesObj = {};
  projectItems.map(entry => (projectDrawerStatesObj[entry.id] = false));

  useEffect(() => {
    if (!(projects.length === projectItems.length)) {
      setProjectItems(projects);
    }
    if (edit) {
      setProjectItems(projects);
      setEdit(false);
    }
  }, [projects, projectItems, edit]);

  const [projectDrawerStates, setProjectDrawerStates] = React.useState({ ...projectDrawerStatesObj });
  const toggleProjectDrawerStates = (id, open) => () => {
    setProjectDrawerStates({ ...projectDrawerStates, [id]: open });
  };

  const onDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(projectItems);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    setProjectItems(items);
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

  const disableActiveProject = () => {
    const fakeState = {};
    Object.keys(projectActive).forEach(id => {
      fakeState[id] = false;
    });
    setProjectActive(fakeState);
  };

  const onClickProject = ({ id }) => {
    if (projectActive[id]) {
      setProjectActive(p => ({ ...p, [id]: false }));
      return;
    }
    const fakeState = {};
    Object.keys(projectActive).forEach(projectId => {
      fakeState[projectId] = false;
    });
    setProjectActive({ ...fakeState, [id]: true });
  };

  const onDelete = async ({ id }) => {
    if (id.includes('-')) {
      deleteSingleProject(id);
      return;
    }
    try {
      showSnack(toastMessages.DELETE_RESOURCE_REQUEST('Project'), 'default');
      const token = await getToken();
      await axios({
        url: `/api/projects/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      deleteSingleProject(id);
      showSnack(toastMessages.DELETE_RESOURCE_SUCCESS('Project'), 'success');
    } catch (error) {
      showSnack(toastMessages.DELETE_RESOURCE_ERROR('Project'), 'error');
    }
  };

  const save = async () => {
    let flag = false;
    projectItems.forEach(entry => {
      if (entry.id.includes('-')) flag = true;
    });
    if (flag) {
      showSnack(toastMessages.WARN_BEFORE_SAVE('Project'), 'info');
      return;
    }
    try {
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_REQUEST('Project'), 'default');
      const token = await getToken();
      const { data } = await axios({
        url: `/api/resumes/${resumeId}`,
        method: 'PATCH',
        data: {
          projects: projectItems,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      addProjectsData(data.resume.projects);
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_SUCCESS('Project'), 'success');
      closeDrawer(anchor, false);
    } catch (error) {
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_ERROR('Project'), 'error');
    }
  };

  const onAdd = () => {
    addSampleProject({
      id: uuidv4(),
      title: 'Sample Project',
      techStack: 'React, Node.js',
      startedAt: 'January 2024',
      endedAt: '',
      description: 'Built a sample project\nAdded bullet-friendly content',
    });
    showSnack(toastMessages.SAMPLE_DATA('Project'), 'success');
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
          <span className="ml-2 capitalize">Add Project</span>
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
        <Droppable droppableId="projects">
          {(provided, snapshot) => (
            <div
              className="pb-10 pt-8 rounded flex-1 flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
              onClick={() => {
                if (snapshot.isDraggingOver) disableActiveProject();
              }}
            >
              {projectItems.length === 0 ? (
                <div className="flex items-center justify-center flex-1">
                  <div className="bg-gray-50 rounded-full h-96 w-96 flex flex-col items-center justify-center">
                    <EmptyFileSVG />
                    <h5 className="text-default font-normal my-5">No Projects Yet!</h5>
                  </div>
                </div>
              ) : (
                projectItems.map((entry, index) => (
                  <Draggable key={entry.id} draggableId={entry.id} index={index}>
                    {(dragProvided, dragSnapshot) => (
                      <div
                        onClick={() => onClickProject({ id: entry.id })}
                        className="p-6 text-white text-lg bg-primary rounded"
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        ref={dragProvided.innerRef}
                        style={getItemStyle(dragSnapshot.isDragging, dragProvided.draggableProps.style)}
                      >
                        <ProjectCard
                          {...entry}
                          onDelete={onDelete}
                          openEditProjectForm={toggleProjectDrawerStates(entry.id, true)}
                          projectActive={projectActive}
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

      {projectItems.map(entry => (
        <Drawer anchor="left" open={projectDrawerStates[entry.id]} onClose={toggleProjectDrawerStates(entry.id, false)} key={entry.id}>
          <div className="pt-10 pl-10" role="presentation">
            <div className="flex align-center">
              <button
                type="button"
                className="px-4 py-2 inline-flex items-center rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                onClick={toggleProjectDrawerStates(entry.id, false)}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2 capitalize">Back</span>
              </button>
            </div>
            <EditSingleProject anchor={anchor} project={entry} setEdit={setEdit} closeDrawer={toggleProjectDrawerStates(entry.id, false)} />
          </div>
        </Drawer>
      ))}
    </>
  );
};

export default ReorderProjects;
