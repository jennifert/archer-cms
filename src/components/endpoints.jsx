import React from 'react';

class Endpoints extends React.Component {
    constructor() {
        super();
        this.state = {
            endpoints: [],
        };
    }

    componentDidMount() {
        fetch('/api/settings/endpoints', {
            method: 'GET',
            credentials: 'include',
        })
            .then((resp) => resp.json())
            .then((json) => this.setState({ endpoints: json }))
            .catch((err) => console.error('Failed to load endpoints:', err));
    }

    render() {
        return (
            <div className='end-points'>
                <div className="api-calls">
                    <h3>Client API Calls</h3>
                    <p>
                        This is a list of API calls to create your front-end of the site
                        with. Please note that for all except login and signup, you will
                        need to be signed in.
                    </p>
                    <ul id="api-calls-table">
                        {this.state.endpoints.map((rows, index) => (
                            <li key={index}>
                                <span className="route-name">{rows.route}</span>:&nbsp;
                                <span className="route-purpose">{rows.purpose}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Endpoints;