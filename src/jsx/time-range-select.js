class TimeRangeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: this.props.selected };
    }

    componentDidMount() {
        store.subscribe(() => {
            let storeState = store.getState();
            if (storeState.selectedRange.id === this.props.idstr) {
                this.setState({ selected: true });
            } else {
                this.setState({ selected: false });
            }
        });
    }

    render() {
        return (
            <Row id={this.props.idstr} onClick={() => store.dispatch(selectTimeRange(this.props.idstr))} data-duration={this.props.duration} className={(this.state.selected ? 'selected' : '') + " time-range flex-nowrap align-items-center py-2"}>
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