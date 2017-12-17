import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/StatsCard/StatsCard.jsx';
import {Tasks} from 'components/Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from 'variables/Variables.jsx';
import Audio from 'react-audioplayer';

import loading from 'assets/img/loading.gif';

import { Pie, Bar } from 'react-chartjs-2';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            labels: [],
            isLoading: true,
        }
    }

    componentWillReceiveProps (nextProps) {
        console.log("here")
        if (!!this.props.history.location.state && this.props.history.location.state.server_path) {
            console.log("here1")
            this.setState( {isLoading: true });
                
                fetch(`http://118.102.6.70:8000/api/get-genre/?file_dir=${nextProps.history.location.state.server_path}`)
            .then(
                (res=>{
                    if(res.status==200) {
                        res.json().then(
                            genres => {
                                let labels = Object.keys(genres)
                                let data = []
                                labels.map((label)=>{
                                    data.push( genres[label] )
                                })
                                console.log(data, labels)
                                this.setState({
                                    labels,
                                    data,
                                    isLoading: false,
                                })
                            }
                        )
                    }
                })
            )
        }
    }
    componentWillMount () {
        fetch(`http://118.102.6.70:8000/api/get-genre/?file_dir=/ZaloHackathon/project/static/audio/cut_mp3_cv${this.props.location.pathname}`)
            .then(
                (res=>{
                    if(res.status==200) {
                        res.json().then(
                            genres => {
                                let labels = Object.keys(genres)
                                let data = labels.map((label)=>{
                                    return genres[label]
                                })
                                this.setState({
                                    labels,
                                    data,
                                    isLoading: false,
                                })
                            }
                        )
                    }
                })
            )
    }

    render() {
        console.log(this.state)
        return (
            <div className="content">
                <Grid fluid>
                    { <Row>
                        <Col md={12}>
                            <Card
                                id="chartHours"
                                title="Player"
                                content={<Audio
                                    width={"100%"}
                                    height={52}
                                    playlist={[{
                                        src:
                                        `http://118.102.6.70:8000/static/audio/cut_mp3_cv${this.props.location.pathname}`
                                    }]}
                                    style={
                                        {}
                                    }
                                  />}
                            />
                        </Col>
                    </Row>}
                    <Row>
                        <Col md={8} style={{float: 'none', margin: '0 auto'}}>
                            <Card
                                id="chartHours"
                                title="Genres"
                                content={ this.state.isLoading ? <img src={loading} /> :
                                    <div className="ct-chart">
                                        <Pie data={{
                                                datasets: [{
                                                    data: this.state.data,
                                                    backgroundColor: [
                                                        '#ff6384',
                                                        '#4B3F72',
                                                        '#36a2eb',
                                                        '#cc65fe',
                                                        '#EAD8AC',
                                                        '#0CF574',
                                                        '#0DFBFF',
                                                        '#A70CE8',
                                                        '#FF0000',
                                                        '#E86F0C',
                                                        // pattern.draw('triangle', '#ffce56'),
                                                    ]
                                                }],
                                            
                                                // These labels appear in the legend and in the tooltips when hovering different arcs
                                                labels: this.state.labels
                                            }}
                                        />
                                    </div>
                                    }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
