import { toast } from 'sonner';

export const showSnack = (message, variant) => {
  if (variant === 'success') {
    toast.success(message);
  } else if (variant === 'error') {
    toast.error(message);
  } else if (variant === 'default') {
    toast.message(message);
  } else if (variant === 'info') {
    toast.info(message);
  }
};

const grid = 10;

export const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  overflow: 'hidden',
  background: isDragging ? '#0d9e8499' : '#0d9e84',
  ...draggableStyle,
});

export const getListStyle = () => ({
  // background: isDraggingOver ? '#ffffff' : '#16a085',
});
