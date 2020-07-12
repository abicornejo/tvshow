import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
const Details = ({ city }) => {
    return (
        <div>
            <h3>Details {city?.name}</h3>
            <label htmlFor=""><b>Temperature: </b></label>
            <span>{city?.main?.temp}</span><br/>
            <label htmlFor=""><b>Pressure: </b></label>
            <span>{city?.main?.pressure}</span><br/>
            <label htmlFor=""><b>Humidity: </b></label>
            <span>{city?.main?.humidity}</span><br/>
            <label htmlFor=""><b>Max temperature: </b></label>
            <span>{city?.main?.temp_max}</span><br/>
            <label htmlFor=""><b>Min temperature: </b></label>
            <span>{city?.main?.temp_min}</span>
        </div>
    );
}

Details.propTypes = {
}

const mapDetailsToProps = state => ({
    //search: state.simpleReducer.search
});

export default connect(null, mapDetailsToProps)(Details);
