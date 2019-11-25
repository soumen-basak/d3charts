'use strict';

const createStore = Redux.createStore;
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const Button = ReactBootstrap.Button;
const Container = ReactBootstrap.Container;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;

const monStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Define Chart margins
const margin = { top: 80, right: 50, bottom: 30, left: 100 };

// [START] - Redux Stuff
// define redux action types
const SELECT_TIME_RANGE = 'SELECT_TIME_RANGE';
const OPEN_CHART_MENU = 'OPEN_CHART_MENU';
const CLOSE_CHART_MENU = 'CLOSE_CHART_MENU';
const TOGGLE_CHART_MENU = 'TOGGLE_CHART_MENU';