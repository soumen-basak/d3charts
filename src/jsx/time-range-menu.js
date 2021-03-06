class TimeRangeMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            customMenuOpen: false
        };
    }

    componentDidMount() {
        observeStore(store, stateChartMenuOpen, (chartMenuOpen) => {
            this.setState({ 
                opened: chartMenuOpen
            });
        });
        observeStore(store, stateCustomMenuOpen, (customMenuOpen) => {
            this.setState({ 
                customMenuOpen: customMenuOpen
            });
        });
    }

    render() {
        return (
            // <div className="px-4 py-2 bg-white shadow-lg rounded position-absolute transparent invisible">
            <div id="calPopup" className={"px-4 py-2 bg-white shadow-lg rounded position-absolute " + (this.state.opened ? "" : "transparent invisible")}>
                <Row className="flex-nowrap">
                    <Col className="flex-fill">
                        <TimeRangeSelect idstr="1day" className="" duration="1" label="1 Day" selected={false} />
                        <TimeRangeSelect idstr="2day" className="" duration="2" label="2 Day" selected={false} />
                        <TimeRangeSelect idstr="5day" className="" duration="5" label="5 Day" selected={false} />
                        <TimeRangeSelect idstr="all" className="" duration="all" label="All" selected={true} />
                        <TimeRangeSelect idstr="custom" className="" duration="custom" label="Custom" selected={false} />
                    </Col>
                    <Col id="customDetailsDiv" className={"flex-fill " + (this.state.customMenuOpen ? "" : "disappear")}>
                        <Row className="flex-nowrap align-items-center pb2">
                            <Col className="flex-fill cal-heading">Custom Range</Col>
                            <Col className="">
                                <Button id="customClose" onClick={() => store.dispatch(closeCustomMenu())} variant="link" className="text-dark">
                                    <i className="fas fa-times fa-lg"></i>
                                </Button>
                            </Col>
                        </Row>
                        <CustomDatePicker label="From" idstr="fromDate" />
                        <CustomDatePicker label="To" idstr="toDate" />
                    </Col>
                </Row>
            </div>
        )
    }
}