import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/simpleAction';

const Filter = ({ simpleAction }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        simpleAction(query);
    }, [query]);

    const sendFilter = (e) => {
        e.preventDefault();
        setQuery(e.target.value);

    }

    return (
        <div>
            <nav className="navbar navbar-light nav-search">
                <a className="navbar-brand">My TV Shows</a>
                <form className="form-inline">
                    <input value={query} onChange={(e) => { sendFilter(e) }} className="form-control mr-sm-2" type="search" placeholder="Type to filter..." aria-label="Search"/>
                </form>
            </nav>
        </div>
    )
}

Filter.propTypes = {

}

const mapDispatchToProps = dispatch => ({
    simpleAction: (query) => dispatch(simpleAction(query))
})


export default connect(null, mapDispatchToProps)(Filter);
