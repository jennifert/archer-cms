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

        return <div className='create-user rounded-box w-xs'>
            

            <form onSubmit={this.handleSubmit} className='createUserForm'>
                <fieldset>
                    <legend>Create User</legend>
                    
                    {message}

                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name: "
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email: "
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password: "
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" id="btn-submit-create" name="createUserSubmit">
                        Create User
                    </button>
                </fieldset>
            </form>
        </div>
    }

}

export default CreateUser;
