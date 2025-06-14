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
            <h2></h2>

            {message}

            <form onSubmit={this.handleSubmit} className='loginUserForm'>
                <fieldset>
                    <legend>Login User</legend>

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

                    <button type="submit" id="btn-submit-login" name="loginSubmit">
                        Sign In
                    </button>
                </fieldset>
            </form>
            {
                this.state.errors && <div className='error'>{this.state.errors}</div>
            }
        </div>
    }

}

export default LoginForm;
