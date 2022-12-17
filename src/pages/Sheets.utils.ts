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
};

export const columns = [
  {
    name: 'Channel #: ',
    prop: 'channel',
    autoSize: true,
    size: 127,
    sortable: true,
    pin: 'colPinStart',
  },
  {
    name: 'Input Device: ',
    prop: 'input_device',
    autoSize: true,
    size: 150,
    columnTemplate: headerGrab,
  },
  {
    name: 'Source Description: ',
    prop: 'input_description',
    autoSize: true,
    size: 200,
    resize: true,
    columnTemplate: headerGrab,
  },
  {
    name: 'Note: ',
    prop: 'note',
    autoSize: true,
    size: 300,
    columnTemplate: headerGrab,
  },
];
