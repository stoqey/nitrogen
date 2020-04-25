/* eslint-disable react/display-name */
import {
    AmplitudeProvider,
} from "@amplitude/react-amplitude";
import React from "react";

import { AMPLITUDE_KEY, isClient } from "../../shared/config";

function withAmplitude(Component: any) {
    return () => {

        if (!isClient) {
            // Render component without SSR for amplitude
            return <Component />;
        };

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