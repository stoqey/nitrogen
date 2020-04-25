import React from 'react'
import { Global } from '@emotion/core'

export const GlobalStyle = (props: any) =>
    <Global
        styles={theme => ({
            body: {
                fontFamily: 'Roboto, sans-serif',
            }
        })}
    />