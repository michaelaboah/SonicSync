export const headerGrab = (createElement, column) => {
  return createElement(
    'div',
    {
      style: {
        cursor: 'grab',
      },
    },
    column.name
  );
}