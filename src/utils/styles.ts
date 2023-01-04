import { createStyles } from '@svelteuidev/core';
export const useStylesDisabled = createStyles((theme) => ({
    root: {
        textAlign: 'center',
        '& input:disabled': {
            backgroundColor: 'white !important',
            color: 'black !important',
            border: '1px solid var(--svelteui-colors-gray400) !important',
            opacity: '1 !important',
            // width: "6rem",
            [`${theme.dark} &`]: {
                // using of SvelteUI utilities
                // bc === backgroundColor
                backgroundColor: theme.colors.dark800 + '!important',
                opacity: '1 !important',
                color: 'white !important',
                border: '0px solid var(--svelteui-colors-gray400) !important',
            },
        },
    },
}));

export const costFormatter = (value: string | undefined) => {
    if (value) return !Number.isNaN(parseFloat(value)) ? ('$ ' + value).replace(/B(?=(d{3})+(?!d))/g, ',') : '$ ';
    else return 'Not a Number';
};

export const wattageFormatter = (value: string | undefined) => {
    if (value) return !Number.isNaN(parseFloat(value)) ? `${value} watts` : 'bad';
    else return 'N/A';
};
