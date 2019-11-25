var domContainer = document.querySelector('#d3charts');
ReactDOM.render(React.createElement(
    Provider,
    { store: store },
    React.createElement(Page, null)
), domContainer);