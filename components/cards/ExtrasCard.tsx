import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface ExtrasCardTypes {
  title: string;
  type: string;
  items: string[];
  onDelete: (data: { id: string }) => void;
  openEditExtForm: () => void;
  extraActive: Record<string, boolean>;
  id: string;
}

const ExtrasCard = ({ title, type, items, onDelete, openEditExtForm, extraActive, id }: ExtrasCardTypes) => (
  <>
    <div className="flex justify-between items-center">
      <p className="font-light text-lg">{title}</p>
      <p className="text-xs font-normal">{type}</p>
    </div>
    {/* <p className='text-xs font-light tracking-wide mt-1 mb-0.5'> */}
    {items.map((e, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <p className="capitalize text-gray-50 font-light text-t1-sm leading-6" key={index}>
        {e}
      </p>
    ))}
    {/* </p> */}
    <div className="mt-3 -mb-2" style={{ maxHeight: `${extraActive[id] ? '60px' : '0px'}`, transition: 'all 0.5s', overflow: 'hidden' }}>
      <Button onClick={() => openEditExtForm()} className="mr-4" variant="text">
        <div className="flex items-center justify-center">
          <EditIcon style={{ color: '#fff' }} />
          <p className="ml-2 text-white capitalize">Edit</p>
        </div>
      </Button>
      <Button onClick={() => onDelete({ id })} variant="text">
        <div className="flex items-center justify-center">
          <DeleteIcon style={{ color: '#fff' }} />
          <p className="ml-2 text-white capitalize">Delete</p>
        </div>
      </Button>
    </div>
  </>
);

export default ExtrasCard;
