import { Drawer, makeStyles, useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addExtrasData, addSampleExtraData, deleteSingleExtraData } from '../../redux/actions/resumeActions';
import { toastMessages } from '../../shared/contants';
import ExtrasCard from '../cards/ExtrasCard';
import EditSingleExtra from '../forms/EditSingleExtra';
import { EmptyFileSVG } from '../SVGs';

const ReorderExtras = ({ closeDrawer, anchor }) => {
  const { resumeId } = useSelector(state => state.resume.metadata);
  // media Query
  const matches = useMediaQuery('(min-width:1024px)');
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  // Fetch Global State
  const extras = useSelector(state => state.resume.data.extras);

  // Local Extras State for drag and drop
  const [ext, setExt] = useState(extras);
  const extrasStates = {};
  ext.forEach(ext => {
    extrasStates[ext.id] = false;
  });
  //
  const [extraActive, setExtraActive] = useState({ ...extrasStates });

  // This to keep track of localState if one of the extras have been updated to update state in useEffect
  const [edit, setEdit] = useState(false);

  const extDrawerStatesObj = {};
  ext.map(ext => (extDrawerStatesObj[ext.id] = false));

  useEffect(() => {
    if (!(extras.length === ext.length)) {
      setExt(extras);
    }
    if (edit) {
      setExt(extras);
      setEdit(false);
    }
  }, [extras, ext, edit]);

  const useStyles = makeStyles({
    list: {
      width: matches ? '50vw' : '100vw',
      // width: '50vw',
      minHeight: matches ? '0' : '100vh',
    },
    fullList: {
      width: 'auto',
    },
  });
  const classes = useStyles();

  // Nested Drawer States
  const [extDrawerStates, setExtDrawerStates] = React.useState({ ...extDrawerStatesObj });
  const toggleExtDrawerStates = (id, open) => () => {
    setExtDrawerStates({ ...extDrawerStates, [id]: open });
  };
  const onDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(ext);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);
    setExt(items);
  };

  const grid = 10;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    transition: 'height 0.2s',
    overflow: 'hidden',

    // change background colour if dragging
    background: isDragging ? '#1abc9c95' : '#1abc9c',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = () => ({
    // background: isDraggingOver ? '#ffffff' : '#16a085',
  });

  const disableActiveExt = () => {
    const clone = Object.create(extraActive);

    const ids = Object.keys(clone);

    // create an object that will be passed as in state
    // which we will use to disable the rest state (false)
    // this will ensure at one time only one is active
    const fakeState = {};

    // assign each state false
    ids.forEach(id => {
      fakeState[id] = false;
    });

    // setActive only the one that gets clicked
    setExtraActive(fakeState);
  };

  const onClickExt = ({ id }) => {
    // CLone the activeExtra State
    const clone = Object.create(extraActive);

    // check if the clicked extra is already active then disable it and return
    if (clone[id]) {
      setExtraActive(p => ({
        ...p,
        [id]: false,
      }));
      return;
    }

    // Get All Ids from state in an Array
    const ids = Object.keys(clone);

    // create an object that will be passed as in state
    // which we will use to disable the rest state (false)
    // this will ensure at one time only one is active
    const fakeState = {};

    // assign each state false
    ids.forEach(id => {
      fakeState[id] = false;
    });

    // setActive only the one that gets clicked
    setExtraActive(p => ({
      ...ids,
      [id]: true,
    }));
  };

  const onDelete = async ({ id }) => {
    if (id.includes('-')) {
      dispatch(deleteSingleExtraData(id));
      return;
    }
    try {
      showSnack(toastMessages.DELETE_RESOURCE_REQUEST('Extras'), 'default');
      await axios({
        url: `/api/extras/${id}`,
        method: 'DELETE',
      });
      dispatch(deleteSingleExtraData(id));
      showSnack(toastMessages.DELETE_RESOURCE_SUCCESS('Extras'), 'success');
    } catch (error) {
      showSnack(toastMessages.DELETE_RESOURCE_ERROR('Extras'), 'error');
    }
  };

  const save = async () => {
    let flag = false;
    ext.forEach(e => {
      if (e.id.includes('-')) {
        flag = true;
      }
    });
    if (flag) {
      showSnack(toastMessages.WARN_BEFORE_SAVE('Extras'), 'info');
      return;
    }
    try {
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_REQUEST('Extras'), 'default');
      const { data } = await axios({
        url: `/api/resumes/${resumeId}`,
        method: 'PATCH',
        data: {
          extras: ext,
        },
      });
      dispatch(addExtrasData(data.resume.extras));
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_SUCCESS('Extras'), 'success');
      closeDrawer(anchor, false);
    } catch (error) {
      // console.log(error);
      showSnack(toastMessages.SAVE_ORDER_RESOURCE_ERROR('Extras'), 'error');
    }
  };

  const onAdd = () => {
    dispatch(
      addSampleExtraData({
        id: uuidv4(),
        title: 'Sample Title',
        type: 'COMMA',
        items: ['Sample Item 1', 'Sample Item 2'],
      }),
    );
    showSnack(toastMessages.SAMPLE_DATA('Extras'), 'success');
  };

  return (
    <>
      <div className="flex items-center justify-start flex-wrap lg:flex-nowrap">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <Button className="lg:px-4 lg:py-2 mr-4" onClick={() => closeDrawer(anchor, false)} color="default" variant="text">
            {' '}
            <ArrowBackIcon />
            <p className="ml-2 capitalize">Back</p>
          </Button>
        </div>
        <Button className="lg:px-4 lg:py-2 mr-4" onClick={onAdd} color="primary" variant="outlined">
          <AddIcon />
          <p className="ml-2 capitalize">Add Extra</p>
        </Button>
        <Button className="lg:px-4 lg:py-2" onClick={save} color="primary" variant="contained">
          <SaveIcon />
          <p className="ml-2 capitalize">Save Order</p>
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="extras">
          {(provided, snapshot) => (
            // eslint-disable-next-line
            <div
              style={getListStyle(snapshot.isDraggingOver)}
              className="pb-10 pt-8 rounded flex-1 flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
              onClick={() => {
                if (snapshot.isDraggingOver) {
                  disableActiveExt();
                }
              }}
            >
              {ext.length === 0 ? (
                <div className="flex items-center justify-center flex-1">
                  <div className="bg-gray-50 rounded-full h-96 w-96 flex flex-col items-center justify-center">
                    <EmptyFileSVG />
                    <h5 className="text-default font-normal my-5">No Extras Yet!</h5>
                  </div>
                </div>
              ) : (
                ext.map((e, index) => (
                  <Draggable key={e.id} draggableId={e.id} index={index}>
                    {(provided, snapshot) => (
                      // eslint-disable-next-line
                      <div
                        onClick={() => onClickExt({ id: e.id })}
                        className="p-6 text-white text-lg bg-primary rounded"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{ ...getItemStyle(snapshot.isDragging, provided.draggableProps.style) }}
                      >
                        <ExtrasCard
                          {...e}
                          onDelete={onDelete}
                          openEditExtForm={toggleExtDrawerStates(e.id, true)}
                          extraActive={extraActive}
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

      {ext.map(ext => (
        <div key={ext.id}>
          <Drawer anchor="left" open={extDrawerStates[ext.id]} onClose={toggleExtDrawerStates(ext.id, false)}>
            <div className={clsx(classes.list)} role="presentation">
              <div className="pt-10 pl-10 pr-10">
                <div className="flex align-center">
                  <Button className="px-4 py-2" onClick={toggleExtDrawerStates(ext.id, false)} color="default" variant="outlined">
                    <ArrowBackIcon />
                    <p className="ml-2 capitalize">Back</p>
                  </Button>
                </div>
                <EditSingleExtra anchor={anchor} extra={ext} setEdit={setEdit} closeDrawer={toggleExtDrawerStates(ext.id, false)} />
              </div>
              {/* <Divider /> */}
            </div>
          </Drawer>
        </div>
      ))}
    </>
  );
};

export default ReorderExtras;
