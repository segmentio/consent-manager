var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import ReactDOM from 'react-dom';
import inEU from '@segment/in-eu';
import { ConsentManager, openConsentManager, doNotTrack } from '.';
export var version = process.env.VERSION;
export { openConsentManager, doNotTrack, inEU };
var dataset = document.currentScript && document.currentScript.dataset;
var props = {};
if (window.consentManagerConfig) {
    // Allow using global variable
    if (typeof window.consentManagerConfig === 'function') {
        props = window.consentManagerConfig({
            React: React,
            version: version,
            openConsentManager: openConsentManager,
            doNotTrack: doNotTrack,
            inEU: inEU
        });
    }
    else {
        props = window.consentManagerConfig;
    }
}
else if (dataset) {
    // Allow using data attributes on the script tag
    props.container = dataset.container;
    props.writeKey = dataset.writekey;
    props.otherWriteKeys = dataset.otherwritekeys;
    props.implyConsentOnInteraction = dataset.implyconsentoninteraction;
    props.cookieDomain = dataset.cookiedomain;
    props.bannerContent = dataset.bannercontent;
    props.bannerTextColor = dataset.bannertextcolor;
    props.bannerBackgroundColor = dataset.bannerbackgroundcolor;
    props.preferencesDialogTitle = dataset.preferencesdialogtitle;
    props.preferencesDialogContent = dataset.preferencesdialogcontent;
    props.cancelDialogTitle = dataset.canceldialogtitle;
    props.cancelDialogContent = dataset.canceldialogcontent;
}
if (!props.container) {
    throw new Error('ConsentManager: container is required');
}
if (!props.writeKey) {
    throw new Error('ConsentManager: writeKey is required');
}
if (!props.bannerContent) {
    throw new Error('ConsentManager: bannerContent is required');
}
if (!props.preferencesDialogContent) {
    throw new Error('ConsentManager: preferencesDialogContent is required');
}
if (!props.cancelDialogContent) {
    throw new Error('ConsentManager: cancelDialogContent is required');
}
if (typeof props.otherWriteKeys === 'string') {
    props.otherWriteKeys = props.otherWriteKeys.split(',');
}
if (typeof props.implyConsentOnInteraction === 'string') {
    props.implyConsentOnInteraction = props.implyConsentOnInteraction === 'true';
}
var container = document.querySelector(props.container);
if (!container) {
    throw new Error('ConsentManager: container not found');
}
ReactDOM.render(React.createElement(ConsentManager, __assign({}, props)), container);
//# sourceMappingURL=standalone.js.map