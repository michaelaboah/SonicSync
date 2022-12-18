//@ts-expect-error
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

export const input_columns = [
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

export const output_columns = [
    {
        name: 'Channel #: ',
        prop: 'channel',
        autoSize: true,
        size: 127,
        sortable: true,
        pin: 'colPinStart',
    },
    {
        name: 'Output Name: ',
        prop: 'output_name',
        autoSize: true,
        size: 150,
        columnTemplate: headerGrab,
    },
    {
        name: 'Output Device: ',
        prop: 'output_device',
        autoSize: true,
        size: 150,
        columnTemplate: headerGrab,
    },
    {
        name: 'Output Destination: ',
        prop: 'destination',
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

export const transformArray = (arr: any[], elementCount: number): any[] => {
    if (elementCount > arr.length) {
        // Push the difference onto the array
        const difference = elementCount - arr.length;
        for (let i = 0; i < difference; i++) {
            arr.push({});
        }
    } else if (elementCount < arr.length) {
        // Remove elements from the end of the array until it has the desired length
        while (arr.length > elementCount) {
            arr.pop();
        }
    }
    return arr;
};
