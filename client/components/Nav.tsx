import React from 'react';
import { Box, Flex, Text } from 'rebass'

interface Props {
    loading: boolean;
}
export const Nav = (props: Props) => {
    console.log('loading is ', props.loading)
    return (
        <Flex
            px={2}
            color='white'
            bg='primary'
            alignItems='center'>
            <Box mx='auto' />
            <Text p={2} fontWeight='bold'>STOQEY NOTEBOOK</Text>
            <Box mx='auto' />
        </Flex>
    )
}