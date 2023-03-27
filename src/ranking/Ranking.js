import React, { Component } from 'react'
import axios from 'axios'
import './ranking.css'
import { Link } from 'react-router-dom'
import { properties } from '../components/properties.js'
import { format } from 'date-fns'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Ranking extends Component {

    constructor() {
        super()
        this.state = {
            records : null,
            filteredRecords : null,
            field : '',
            order : '',
            start : '',
            end : ''
        };

    }

    componentDidMount() {
        this.LoadRecords()
    }

    LoadRecords() {
        const url = properties.server;

        axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            
            this.setState({
                records : resp.data,
                filteredRecords : resp.data
            });
            
        });
    }

    handleChange = (event) => {
        this.setState({ [event.source]: event.value }, () => this.filterList());
        console.log(this.state);
    }

    setDate = (date, pos) => {
        this.setState({ [pos]: date }, () => this.filterList());
        console.log(this.state);
    }


    GetSortOrder(prop, order) {    
        return function(a, b) {
            if(order === 'ASC'){
                if (a[prop] > b[prop]) {    
                    return 1;    
                } else if (a[prop] < b[prop]) {    
                    return -1;    
                }    
            } else {
                if (a[prop] < b[prop]) {    
                    return 1;    
                } else if (a[prop] > b[prop]) {    
                    return -1;    
                }   
            } 
            
            return 0;    
        }    
    }

    filterList(){
        let filtered = this.state.records;
        if(this.state.start !== ''){
            if(this.state.end !== ''){
                let ed = new Date(this.state.end).getTime()
                let sd = new Date(this.state.start).getTime()

                alert(ed + " " + sd)

                filtered = this.state.records.slice().filter(entry => {var time = new Date(entry.dateCreation).getTime();
                                       return (sd < time && time < ed);
                                      });
            } else {
                let sd = new Date(this.state.start).getTime()
                alert(sd)
                filtered = this.state.records.slice().filter(entry => {var time = new Date(entry.dateCreation).getTime();
                                       return (sd < time);
                                      });
            }
        } else if (this.state.end !== ''){
            let ed = new Date(this.state.end).getTime()
            alert(ed)
            filtered = this.state.records.slice().filter(entry => {var time = new Date(entry.dateCreation).getTime();
                                       return (time < ed);
                                      });
        }

        if(this.state.field !== ''){
            if(this.state.order === 'DESC'){
                filtered = this.state.records.slice().sort(this.GetSortOrder(this.state.field, this.state.order))
            } else {
                filtered = this.state.records.slice().sort(this.GetSortOrder(this.state.field, 'ASC'))
            }
        }

        this.setState({
            filteredRecords: filtered
        })

    }
    
    showDate(dateString) {
        if (dateString === null || dateString === undefined) {
            return;
        }
        var date = new Date(dateString);
        return format(date, "dd/MM/yyyy HH:mm  (z)");
    }

    render() {

        const fields = [
            {value:"", label:"", source:"field"},
            {value:"millis", label:"Milliseconds", source:"field"},
            {value:"dateCreation", label:"Register Date", source:"field"}
        ]

        const order = [
            {value:"", label:"", source:"order"},
            {value:"ASC", label:"Ascendant", source:"order"},
            {value:"DESC", label:"Descendant", source:"order"}
        ]

        
        return (
            <>
                <div id="panelMain">
                    <div id="panelContent">
                        <div className="text1_container">
                            <div className="title1">Fast Clicker Ranking</div>
                            <div className="text1">See your personal clicking records!</div>
                        </div>
                        <Link className='backButton' to='/'>Back to Home</Link>
                        <div className="tableContainer">
                            <div className='filterRow'>
                                <div className="input-field col s3">
                                    <div className="filterLabel">Field</div>
                                    <Select id='field' name='field' autoFocus={true} options={fields} onChange={this.handleChange} />
                                </div>
                                <div className="input-field col s3">
                                    <div className="filterLabel">Order</div>
                                    <Select id='type' name='type'autoFocus={true} options={order} onChange={this.handleChange}/>
                                </div>
                                <div className="input-field col s3">
                                    <div className="filterLabel">Start Date</div>
                                    <DatePicker selected={this.state.start} onChange={(date) => this.setDate(date, 'start')} />
                                </div>
                                <div className="input-field col s3">
                                    <div className="filterLabel">End Date</div>
                                    <DatePicker selected={this.state.end} onChange={(date) => this.setDate(date, 'end')} />
                                </div>
                                
                            </div>
                            <div className='row'>
                                <div className='tableWrapper'>
                                    <table className='marginPanel tableRecords'>
                                        <thead>
                                            <tr className='backgroundRecords'>
                                                <th>Register Date</th>
                                                <th>Milliseconds</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(this.state.filteredRecords !== null)?
                                                this.state.filteredRecords.map((ev, index) => {
                                                    return <tr key={ev.dateCreation}>
                                                        <td>{this.showDate(ev.dateCreation)}</td>
                                                        <td>{ev.millis}</td>
                                                    </tr>
                                                }):<></>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Ranking;