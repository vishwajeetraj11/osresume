/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const DraggableCard = memo(({ onClickItem, children, id, moveCard, findCard }) => {
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'card',
      item: { id, originalIndex },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'card',
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard],
  );

  const grid = 10;
  const getItemStyle = isDragging => ({
    padding: grid * 2,
    marginBottom: `${grid}px`,
    background: '#1abc9c',
    opacity: isDragging ? 0 : 1,
    cursor: 'move',
  });
  return (
    <div
      onClick={() => onClickItem({ id })}
      className="text-white text-lg bg-primary rounded"
      ref={node => drag(drop(node))}
      style={{ ...getItemStyle(isDragging) }}
    >
      {children}
    </div>
  );
});
