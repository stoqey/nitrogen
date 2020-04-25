import React from 'react';
import { Box, Heading } from 'rebass';
import { EnterSymbol } from './EnterSymbol';

export const InputForm = () => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridGap: 4,
                gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))',
            }}>

            <Box p={3}>
            </Box>
            <Box p={3} color='background' bg='white'></Box>
        </Box>
    )
}

export default InputForm;