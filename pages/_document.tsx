import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { AMPLITUDE_KEY, SEGMENT_DEV,SEGMENT_PROD } from 'shared/config';
import { ServerStyleSheet } from 'styled-components';

export class CustomDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <meta name="theme-color" content="#FC5D64" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />

          <link rel="shortcut icon" href={("assets/favicon.ico")} type="image/x-icon" />
          <link rel="icon" href={("assets/favicon.ico")} type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="57x57" href={("assets/apple-icon-57x57.png")} />
          <link rel="apple-touch-icon" sizes="60x60" href={("assets/apple-icon-60x60.png")} />
          <link rel="apple-touch-icon" sizes="72x72" href={("assets/apple-icon-72x72.png")} />
          <link rel="apple-touch-icon" sizes="76x76" href={("assets/apple-icon-76x76.png")} />
          <link rel="apple-touch-icon" sizes="114x114" href={("assets/apple-icon-114x114.png")} />
          <link rel="apple-touch-icon" sizes="120x120" href={("assets/apple-icon-120x120.png")} />
          <link rel="apple-touch-icon" sizes="144x144" href={("assets/apple-icon-144x144.png")} />
          <link rel="apple-touch-icon" sizes="152x152" href={("assets/apple-icon-152x152.png")} />
          <link rel="apple-touch-icon" sizes="180x180" href={("assets/apple-icon-180x180.png")} />
          <link rel="icon" type="image/png" sizes="192x192" href={("assets/android-icon-192x192.png")} />
          <link rel="icon" type="image/png" sizes="32x32" href={("assets/favicon-32x32.png")} />
          <link rel="icon" type="image/png" sizes="96x96" href={("assets/favicon-96x96.png")} />
          <link rel="icon" type="image/png" sizes="16x16" href={("assets/favicon-16x16.png")} />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

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

                var prodKey="${SEGMENT_PROD}";
                var devKey="${SEGMENT_DEV}";

                var isProd = currentUrl.includes('stoqey');
                var segmentkey = isProd? prodKey : devKey;
                analytics.load(segmentkey);

                analytics.page();
                window.analytics = analytics;

                }}();         
            `
          }} />

        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Should Remove It From Here . (Dynamic Import) */}
        </body>
      </html>
    );
  }
}


CustomDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collectStyles(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

export default CustomDocument;
