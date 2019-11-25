class TimeRangeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: this.props.selected };
    }

    componentDidMount() {
        observeStore(store, stateRangeId, (id) => {
            if (id === this.props.idstr) {
                this.setState({ selected: true });
            } else {
                this.setState({ selected: false });
            }
        });
    }

    render() {
        function handleTimeRangeClick(id) {
            store.dispatch(selectTimeRange(id));
            if (id === "custom") {
                store.dispatch(openCustomMenu());
            } else {
                store.dispatch(closeCustomMenu());
            }
        }

        return (
            <Row id={this.props.idstr} onClick={() => handleTimeRangeClick(this.props.idstr)} data-duration={this.props.duration} className={(this.state.selected ? 'selected' : '') + " time-range flex-nowrap align-items-center py-2"}>
                <Col className="pr-1">
                    <div className="radio-inline"></div>
                </Col>
                <Col className="flex-fill">
                    <div className="radio-label">{this.props.label}</div>
                </Col>
            </Row>
        );
    }
}