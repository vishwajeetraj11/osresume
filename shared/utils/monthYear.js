const getValidDate = value => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatMonthYear = value => {
  const date = getValidDate(value);
  if (!date) return '';
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

export const toMonthInputValue = value => {
  const date = getValidDate(value);
  if (!date) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${date.getFullYear()}-${month}`;
};

export const fromMonthInputValue = value => {
  if (!value) return '';
  const [year, month] = value.split('-').map(Number);
  if (!year || !month) return '';
  return formatMonthYear(new Date(year, month - 1, 1));
};
