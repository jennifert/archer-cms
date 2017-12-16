import React from 'react';

class LoginForm extends React.Component {
  constructor() {
      super();
      this.state = {
          email: '',
          password: '',
          isvalid: false,
          issubmit: false,
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
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(user),
      })
      .then((res) => {
          if (res.ok) {
            this.setState({ isvalid: true,issubmit:false });
            this.props.refresh();
          } else {
            this.setState({ isvalid: false,issubmit:true });
          }
      });

  }
  handleChange(e) {
      this.setState({
          [e.target.name]: e.target.value,
      });
  }
  render() {
    let errorMessage;
    if (this.state.issubmit=== true && this.state.isvalid===false){
        errorMessage="Sorry, an error occured. Please check your fields are filled correctly and try again."
    }
    // console.log(errorMessage);
    return <div className='login'>
      <h2>Login User</h2>

      {
        errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>
      }

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
