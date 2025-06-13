import React from 'react';

class CreateUser extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            isvalid: false,
            issubmit: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        if (this.state.email && this.state.password) {
            fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            })
                .then(res => {
                    if (res.ok) {
                        this.setState({ issubmit: false, isvalid: true });
                        this.props.refresh();
                    } else {
                        this.setState({ issubmit: true, isvalid: false });
                        if (res.status === 409) {
                            this.setState({ issubmit: true, isvalid: false, errors: 'Email already exists.' });
                        } else {
                            this.setState({ issubmit: true, isvalid: false, errors: 'Signup failed. Please try again.' });
                        }
                    }
                })
                .catch(err => {
                    console.error('Sign-Up failed:', err);
                });


        } else {
            this.setState({ isvalid: false, issubmit: true });
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        let message = null;

        if (this.state.issubmit && !this.state.isvalid) {
            message = <div className="alert alert-danger" role="alert">
                {this.state.errors}
            </div>;
        }

        if (!this.state.issubmit && this.state.isvalid) {
            message = <div className="alert alert-success" role="alert">
                🎉 User created successfully! You are now logged in.
            </div>;
        }

        return <div className='create-user'>
            <h2>Create User</h2>

            {message}

            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name: "
                        className="form-control"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email: "
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password: "
                        className="form-control"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" id="btn-submit-create" name="createUserSubmit">
                    <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
                    Create User
                </button>
            </form>
        </div>
    }

}

export default CreateUser;
