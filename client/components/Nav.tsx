import React from 'react';
import { Flex, Text, Box, Link } from 'rebass'

interface Props {
    loading: boolean;
}
export const Nav = ({ loading }: Props) => {
    // console.log('loading is ', loading)
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