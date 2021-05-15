import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import AssignmentIcon from '@material-ui/icons/Assignment';

const initialState = [
	{
		id: '1',
		title: 'Personal Data',
		label: 'personal-data',
		Icon: PersonIcon,
	},
	{
		id: '2',
		title: 'Upload Photo',
		label: 'upload-photo',
		Icon: AccountCircleIcon,
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

export const sectionReducer = (state = { data: initialState }, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
