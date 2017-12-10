import React from 'react';

class LoginForm extends React.Component {
  constructor() {
      super();
      this.state = {
          email: '',
          password: '',
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
          if (res.status !== 401) {
              return res.json();
          } else {
              return console.log('Unauthorized');
          }
      })
      .then((json) => {
          this.props.refresh();
      });

  }
  handleChange(e) {
      this.setState({
          [e.target.name]: e.target.value,
      });
  }
  render() {
    return <div className='login'>
      <h2>Login User</h2>
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
    </div>
  }

}

export default LoginForm;
