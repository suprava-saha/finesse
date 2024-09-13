import React, { Component } from 'react';
import "./TimeTable.css"

class TimeTable extends Component {
    render() {
        return (
            <div className='time-table'>
                <div className="time-table-container">
                    <div className="time-table-box table-border">
                        <h2>FINESSE Restaurant Portside</h2>
                        <p>Shantinagar</p>
                        <p>Dhaka, Bangladesh</p>
                        <p>Opposite to Eastern Plus</p>
                        <p>+880 18697 43080</p>
                        <p>suprava.saha.dibya@g.bracu.ac.bd</p>
                    </div>
                    <div className="time-table-box table-border">
                        <h2>LUNCH</h2>
                        <p className='time-table-date'>Friday – Sunday</p>
                        <p>Booking starts from 12:00 PM, Kitchen closes at 2:30 PM.</p>
                        <p>Dine In starts from 12:30 pm on Saturday & Sunday</p>
                        <p className='time-table-close'>FINESSE is closed on every Monday and all public holidays.</p>
                    </div>
                    <div className="time-table-box">
                        <h2>DINNER</h2>
                        <p className='time-table-date'>Tuesday - Thursday</p>
                        <p>Booking starts from 5:30 PM, Kitchen closes at 9:30 PM</p>
                        <p className='time-table-date'>Friday & Saturday</p>
                        <p>Booking starts from 5:30 PM, Kitchen closes at 10:00 PM</p>
                        <p>Dine In starts from 5:30 pm and 8:00 pm</p>
                        <p className='time-table-date'>Sunday</p>
                        <p>Booking starts from 5:30 PM, Kitchen closes at 9:30 PM</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeTable;