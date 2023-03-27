import React, { Component } from 'react'
import axios from 'axios'
import { properties } from '../components/properties.js'
import './home.css'
import { Link } from 'react-router-dom'

class Home extends Component {
   
    constructor() {
        super()
        this.state = {
            marked : false
        };
        this.previousClickTime = 0;
    }

    handleClick = () => {
        const currentTime = new Date().getTime();

        if (this.previousClickTime !== 0) {
            const timeDifference = currentTime - this.previousClickTime;

            let body = {
                dateCreation: new Date(),
                millis: timeDifference
            }

            let urlUpdate = properties.server;

            axios.post(urlUpdate, JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((resp) => {
                this.setState({
                    marked : true,
                    millis : timeDifference
                })
            }).catch(function (error) {
            });

            
        }
        this.previousClickTime = currentTime;
    }

    resetTimer = () => {
        this.previousClickTime = 0
        this.setState({
            marked : false
        })
    }

    render() {
        
        return (
            <>
                <div id="panelMain">
                    <div id="panelContent">
                        <div className="text1_container">
                            <div className="title1">Fast Clicker</div>
                            <div className="text1">{(!this.state.marked)? "Double click the button below as fast as you can!" : "Time in milliseconds: " + this.state.millis + " ms!"}</div>
                        </div>
                        <Link className="buttonTimer buttonRanking" to="/ranking">Ranking</Link>
                        <div>
                        {(!this.state.marked)?
                            <div id="timerButton" className="buttonTimer" onClick={this.handleClick}>Click!</div>
                        :
                            <div id="timerButton" className="buttonTimer" onClick={this.resetTimer}>Try again</div>
                        }
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Home;