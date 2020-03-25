import React from 'react';
import ReactGA from 'react-ga';
import { Router } from 'react-router-dom'; //th


/**
 * Event - Add custom tracking event.
 * @param {string} category 
 * @param {string} action 
 * @param {string} label 
 */

export const initGA = (trackingID) => {           
  ReactGA.initialize(trackingID); 
}
 
export const Event = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label:label
    });
  };

export const PageView = (url) => {  
  window.gtag('config', 'UA-158814088-1', {
    page_location:url
  })
}
