import React from 'react';

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
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

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => {
                if (res.ok) {
                    this.setState({ issubmit: false, isvalid: true });
                    this.props.refresh();
                } else {
                    this.setState({ issubmit: true, isvalid: false });
                }
            })
            .catch(err => {
                console.error('Login error:', err);
                this.setState({ issubmit: true, isvalid: false });
            });


    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render() {
        let message = null;

        if (this.state.issubmit && !this.state.isvalid) {
            message = <div className="alert alert-danger">Invalid email or password.</div>;
        }

        if (!this.state.issubmit && this.state.isvalid) {
            message = <div className="alert alert-success">🎉 Login successful! Redirecting...</div>;
        }

        return <div className='login'>
            <h2>Login User</h2>

            {message}

            <form onSubmit={this.handleSubmit}>

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

                <button type="submit" id="btn-submit-login" name="loginSubmit">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;
                    Sign In
                </button>
            </form>
            {
                this.state.errors && <div className='error'>{this.state.errors}</div>
            }
        </div>
    }

}

export default LoginForm;
