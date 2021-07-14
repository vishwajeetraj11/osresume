import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';

const initialState = [
  {
    id: '1',
    title: 'Personal Data',
    label: 'personal-data',
    Icon: PersonIcon,
  },
  {
    id: '3',
    title: 'Work Experience',
    label: 'work-experience',
    Icon: WorkIcon,
  },
  {
    id: '4',
    title: 'Education',
    label: 'education',
    Icon: SchoolIcon,
  },
  {
    id: '5',
    title: 'Extras',
    label: 'extras',
    Icon: AssignmentIcon,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const sectionReducer = (state = { data: initialState }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
