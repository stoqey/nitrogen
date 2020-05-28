/* eslint-disable react/display-name */
import {
    AmplitudeProvider,
} from "@amplitude/react-amplitude";
import React from "react";

import { analyticsEnv, isClient } from "../../shared/config";

function withAmplitude(Component: any) {
    return () => {

        if (!isClient) {
            // Render component without SSR for amplitude
            return <Component />;
        };

        const { AMPLITUDE_KEY } = analyticsEnv;

        return (
            <AmplitudeProvider
                amplitudeInstance={(window as any).amplitude.getInstance()}
                apiKey={AMPLITUDE_KEY}
            >
                <Component />
            </AmplitudeProvider>
        );
    }
}

export default withAmplitude;