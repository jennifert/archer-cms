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
                    <h2>Client API Calls</h2>
                    <p>
                        This is a list of API calls to create your front-end of the site
                        with. Please note that for all except login and signup, you will
                        need to be signed in.
                    </p>
                    <table id="api-calls-table">
                        <thead>
                            <tr>
                                <td>Method</td>
                                <td>Path</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.endpoints.map(({ path, method, description }) => (
                                <tr key={`${method}-${path}`}>
                                    <td>{method}</td>
                                    <td>{path}</td>
                                    <td>{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Endpoints;