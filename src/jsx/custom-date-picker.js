class CustomDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drawn: false };
    }

    render() {
        return (
            <div>
                <Row className="flex-nowrap align-items-center pt-2">
                    <Col className="font-weight-bold date-select-label">
                        {this.props.label}
                    </Col>
                </Row>
                <Row className="flex-nowrap align-items-center pt-1 pb-2">
                    <Col className="">
                        <input id={this.props.idstr} className="date-select" type="date" />
                    </Col>
                </Row>
            </div>
        );
    }
}