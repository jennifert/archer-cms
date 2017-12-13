import React from 'react';

class CreateUser extends React.Component {
  constructor() {
      super();
      this.state = {
          name: '',
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
      if (this.state.email && this.state.password){
        fetch('/api/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then((res) => {
          console.log(res);
            if (res.ok) {
              this.setState({ isvalid: true,issubmit:false });
              this.props.refresh();
            } else {
              this.setState({ isvalid: false,issubmit:true });
            }
        });
      } else {
        this.setState({ isvalid: false,issubmit:true });
      }
  }
  handleChange(e) {
      this.setState({
          [e.target.name]: e.target.value
      });
  }
  render() {
    let errorMessage;
    if (this.state.issubmit=== true && this.state.isvalid===false){
        errorMessage="Sorry, an error occured. All fields are required."
    }
    console.log(errorMessage);
    return <div className='create-user'>
          <h2>Create User</h2>

          {
            errorMessage && <div className='error'>{errorMessage}</div>
          }

          <form onSubmit={this.handleSubmit} className="authentication-form">

            <input
              type="text"
              name="name"
              placeholder="Enter your name: "
              value={this.state.name}
              onChange={this.handleChange}
            />

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

            <button type="submit" id="btn-submit" name="createUserSubmit">
              <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
              Create User
            </button>
        </form>
    </div>
  }

}

export default CreateUser;
