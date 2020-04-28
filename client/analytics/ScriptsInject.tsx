import React from 'react';
import Head from 'next/head';

import { analyticsEnv } from '../../shared/config';

export function ScriptsInject(props: any) {
    const env = props && props.env && props.env['AMPLITUDE_KEY'] ? props.env : analyticsEnv;

    console.log('logs', props && props.env);

    const { AMPLITUDE_KEY, SEGMENT_DEV, SEGMENT_PROD } = env;

    return (

        <Head>
            {/* Amplitude */}
            <script type="text/javascript" dangerouslySetInnerHTML={{
                __html: `
                (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
                ;r.type="text/javascript"
                ;r.integrity="sha384-3bSR/uIgD42pCWBeq1//B3mI/hPuWdk0L1EUnQIWfGyMOjs0VEoFLhHMqObtv2BA"
                ;r.crossOrigin="anonymous";r.async=true
                ;r.src="https://cdn.amplitude.com/libs/amplitude-5.10.0-min.gz.js"
                ;r.onload=function(){if(!e.amplitude.runQueuedFunctions){
                console.log("[Amplitude] Error: could not load SDK")}}
                ;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
                ;function s(e,t){e.prototype[t]=function(){
                this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
                var o=function(){this._q=[];return this}
                ;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
                ;for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[]
                ;return this}
                ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
                ;for(var p=0;p<l.length;p++){s(c,l[p])}n.Revenue=c
                ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId", "enableTracking", "setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"]
                ;function v(e){function t(t){e[t]=function(){
                e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
                for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
                e=(!e||e.length===0?"$default_instance":e).toLowerCase()
                ;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
                ;e.amplitude=n})(window,document);
          
                amplitude.getInstance().init("${AMPLITUDE_KEY}");
                window.amplitude = amplitude;

                setTimeout(() => {
                  amplitude.getInstance().logEvent('STOQIFY');
                }, 3000);
                
          `}} />

            {/* Add segment */}
            <script dangerouslySetInnerHTML={{
                __html: `
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
                
                var currentUrl = window && window.location && window.location.href;

                var proto = window && window.location && window.location.href.split("/")[0];

                var prodKey="${SEGMENT_PROD}";
                var devKey="${SEGMENT_DEV}";

                var isProd = proto === 'https';

                var segmentkey = isProd? prodKey : devKey;
                analytics.load(segmentkey);

                analytics.page();
                window.analytics = analytics;

                }}();         
            `
            }} />
        </Head>
    )
}