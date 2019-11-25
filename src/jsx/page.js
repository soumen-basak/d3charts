class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
    }

    componentDidMount() {
        let chartMenu = document.getElementById('chartMenu');
        let chartElem = document.getElementById('chartWrapper');
        let rectMenu = chartMenu.getBoundingClientRect();
        var rectChart = chartElem.getBoundingClientRect();
        let calPopup = document.getElementById('calPopup');
        calPopup.style.top = parseInt(rectMenu.top - rectChart.top + rectMenu.height + 10) + "px";
        calPopup.style.right = parseInt(rectChart.right - rectMenu.right + rectMenu.width - 20) + "px";

        window.addEventListener('click', function (e) {
            var popupElem = document.getElementById('calPopup');
            if (!e.target.classList.contains('fa-calendar')) {
                if (!popupElem.contains(e.target)) {
                    store.dispatch(closeChartMenu());
                }
            }
        });
    }

    render() {
        return (
            <Container className="py-4 my-3">
                <Row>
                    <Col id="chartWrapper" className="bg-white py-4 px-0">
                        <Chart />
                        <TimeRangeMenu />
                        <ChartMenu />
                    </Col>
                </Row>
            </Container>
        )
    }
}