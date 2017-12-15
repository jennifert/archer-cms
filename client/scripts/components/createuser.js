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
          // console.log(res);
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
    // console.log(errorMessage);
    return <div className='create-user'>
          <h2>Create User</h2>

          {
            errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>
          }

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
            <button type="submit" id="btn-submit" name="createUserSubmit">
              <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
              Create User
            </button>
        </form>
    </div>
  }

}

export default CreateUser;
