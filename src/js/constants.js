'use strict';

var createStore = Redux.createStore;
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;

var Button = ReactBootstrap.Button;
var Container = ReactBootstrap.Container;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var monStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Define Chart margins
var margin = { top: 80, right: 50, bottom: 30, left: 100 };

// [START] - Redux Stuff
// define redux action types
var SELECT_TIME_RANGE = 'SELECT_TIME_RANGE';
var OPEN_CHART_MENU = 'OPEN_CHART_MENU';
var CLOSE_CHART_MENU = 'CLOSE_CHART_MENU';
var TOGGLE_CHART_MENU = 'TOGGLE_CHART_MENU';
var OPEN_CUSTOM_MENU = 'OPEN_CUSTOM_MENU';
var CLOSE_CUSTOM_MENU = 'CLOSE_CUSTOM_MENU';