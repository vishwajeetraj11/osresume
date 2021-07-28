export const toastMessages = {
  SAMPLE_DATA: resource => `Sample data for ${resource} is added at the top, please edit accordingly.`,
  WARN_BEFORE_SAVE: resource => `You need to edit the sample data for ${resource} before saving the order.`,

  CREATE_RESOURCE_REQUEST: resource => `Creating ${resource}...`,
  CREATE_RESOURCE_SUCCESS: resource => `Successfully created ${resource}.`,
  CREATE_RESOURCE_ERROR: resource => `Error creating ${resource} data! Please try again later.`,

  DELETE_RESOURCE_REQUEST: resource => `Deleting ${resource}...`,
  DELETE_RESOURCE_SUCCESS: resource => `Successfully deleted ${resource}.`,
  DELETE_RESOURCE_ERROR: resource => `Unable to delete ${resource}, please try again later.`,

  UPDATE_RESOURCE_REQUEST: resource => `Updating ${resource}...`,
  UPDATE_RESOURCE_SUCCESS: resource => `Successfully updated ${resource}.`,
  UPDATE_RESOURCE_ERROR: resource => `Error updating ${resource}! Please try again later.`,

  SAVE_ORDER_RESOURCE_REQUEST: resource => `Saving Order of ${resource}...`,
  SAVE_ORDER_RESOURCE_SUCCESS: resource => `Successfully saved order of ${resource}.`,
  SAVE_ORDER_RESOURCE_ERROR: resource => `Unable to save order of ${resource}, please try again later.`,
};

export const features = [
  {
    id: '1',
    Icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-6 h-6"
        viewBox="0 0 24 24"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Sign Up',
    description:
      'Signing up to OS Resume is even more convenient than usual. Use one of the most common networks used by professionals (Github, Facebook or your Google account) or simply skip this step and enter your name and email address. We keep your data strictly confidential.',
    // description: 'Pick one of our free resume templates that fits your description. Beautiful layouts, pick your favorite.',
  },
  {
    id: '2',
    Icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-6 h-6"
        viewBox="0 0 24 24"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
      </svg>
    ),
    title: 'Fill the Template',
    description:
      'Choose one of the templates. Add your personal info and choose and edit the necessary sections. You will find the relevent forms in the Sidebars. Every Sidebar will open a drawer where you will have options to create/update/delete/rearrange information.',
  },
  {
    id: '3',
    Icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-6 h-6"
        viewBox="0 0 24 24"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Export your Resume',
    description:
      'Export your Resume to PDF. PDF will provide you with the best and most consistent visual formatting It is saved at every checkpoint (create/update/delete/rearrange information).',
  },
];

export const faqs = [
  {
    id: '1',
    question: 'Why choose a Resume Builder ?',
    ans: 'A Resume Builder helps you create a resume that’s professional, with an up-to-date design. You’ll make a good first impression on a future employer because your resume is attractive and readable.',
  },
  {
    id: '2',
    question: 'Is it free ?',
    ans: 'Yes, It is free. Many resume generators are free to use.',
  },
  {
    id: '3',
    question: 'I can’t finish my resume right now. Will you save what I’ve done?',
    ans: 'Yes, if you can’t finish your resume right now, we’ll save what you’ve done so can you finish later. If for any reason you need to close your browser tab or navigate away from the page, as long as you’ve clicked Submti after filling out a given section, OS Resume will have automatically saved your work so you can pick up where you left off.',
  },
];
