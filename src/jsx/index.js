let domContainer = document.querySelector('#d3charts');
ReactDOM.render(
    <Provider store={store}>
        <Page />
    </Provider>,
    domContainer
);