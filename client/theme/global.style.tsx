/* eslint-disable @typescript-eslint/no-unused-vars */
import { Global } from '@emotion/core'
import React from 'react'

export const GlobalStyle = (props: any) =>
    <Global
        styles={theme => ({
            body: {
                fontFamily: 'Roboto, sans-serif',
            }
        })}
    />