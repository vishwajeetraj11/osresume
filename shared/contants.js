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
