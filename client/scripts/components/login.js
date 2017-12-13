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
    console.log(errorMessage);
    return <div className='login'>
      <h2>Login User</h2>

      {
        errorMessage && <div className='error'>{errorMessage}</div>
      }
      
      <form onSubmit={this.handleSubmit} className="authentication-form">

        <input
          type="email"
          name="email"
          placeholder="Enter your email: "
          value={this.state.email}
          onChange={this.handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password: "
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button type="submit" id="btn-submit" name="loginSubmit">
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
