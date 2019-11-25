class ChartMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false }
    }
    render() {
        return (
            <div id="chartMenu" className="position-absolute text-muted mt-4" style={{ right: margin.right, top: 0 }}>
                <Row className="flex-nowrap align-items-center">
                    <Col className=""><Button variant="link" onClick={() => store.dispatch(toggleChartMenu())} className="text-muted p-0"><i className="far fa-calendar"></i></Button></Col>
                    <Col className=""><i className="fas fa-ellipsis-v"></i></Col>
                    <Col className=""><i className="fas fa-expand"></i></Col>
                    <Col className="flex-fill small"><i className="fas fa-ellipsis-v"></i><i className="fas fa-ellipsis-v"></i></Col>
                </Row>
            </div>
        )
    }
}