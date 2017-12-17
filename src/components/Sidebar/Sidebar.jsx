import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';

import imagine from 'assets/img/sidebar-3.jpg';
import logo from 'assets/img/reactlogo.png';
import loading from 'assets/img/loading.gif';

import { Grid, Row, Col, Table } from 'react-bootstrap';

import appRoutes from 'routes/app.jsx';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth,
            listAudio: [],
            isLoading: true,
        }
    }

    componentWillMount() {
        fetch("http://118.102.6.70:8000/api/audio-list/").then(
            (res) => {
                console.log(res);
                if (res.status == 200) {
                    res.json().then(
                        listAudio => {
                            console.log(listAudio)
                            this.setState({'listAudio': listAudio.audios, isLoading: false})
                        }
                    )
                }
            }
        )
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    updateDimensions(){
        this.setState({width:window.innerWidth});
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    render(){
        const sidebarBackground = {
            backgroundImage: 'url(' + imagine + ')'
        };
        return (
            <div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
                <div className="sidebar-background" style={sidebarBackground}></div>
                    <div className="logo">
                        <a href="https://mp3.zing.vn">
                            <p>RÙA</p>
                        </a>
                    </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        { this.state.width <= 991 ? (<HeaderLinks />):null }
                        {                           
                            this.state.listAudio.map(
                                (audio, key) => {
                                    return (
                                    <li className={this.activeRoute(audio.filename)} key={key}>
                                        <NavLink 
                                        to={{pathname: audio.filename,
                                            state: { server_path: audio.server_path}
                                        }} className="nav-link" activeClassName="active">
                                            <p>{audio.filename}</p>
                                        </NavLink>
                                    </li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
