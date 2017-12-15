import React from 'react';

class TypeForm extends React.Component {
  constructor(){
      super();
      this.state = {
          errors: null,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
     event.preventDefault();
     let fetchURL = '';
     let fetchMethod='';
     if (this.props.mode=="Edit"){
       fetchURL=`/api/type/${this.props.typeId}`;
       fetchMethod='put';
     } else {
        fetchURL="/api/type/";
        fetchMethod='post';
     }
    fetch (fetchURL, {
      method: fetchMethod,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: new Date(),
        name: this.props.typeName,
        user: this.props.user
      })
    })
    .then((res) => {
      if (res.ok) {
        this.setState({ errors: null });
        this.props.fetchTypes();
      } else {
        res.json().then(errors => this.setState({ errors }));
      }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation.');
      console.log(error.message);
    });
  }

  render() {

    const { mode, user,typeId,fetchTypes, typeName, handleInputChange} = this.props;
    let errorMessage = '';
    if (this.state.errors){
      if (this.state.errors.errors.name.kind === 'required' ) {
          errorMessage = "Field is required.";
      }
    }
    return <div className="type-form">

      <h3>{this.props.mode}</h3>
      {
        this.state.errors && <div className="alert alert-danger" role="alert">There were some errors saving your tag!</div>
      }
      <form onSubmit={(event) => this.handleSubmit(event)}>
      <input type="text" name="typeName" id="typeName"
        placeholder="Enter the new tag"
        value={typeName} onChange={this.props.onChange}
        />
        {
          errorMessage && <div className='error'>{errorMessage}</div>
        }
        <button type="submit" id="btn-submit" name="btn-tag">
          <i className="fa fa-save" aria-hidden="true"></i>&nbsp;
          {this.props.mode}
        </button>
      </form>
    </div>
  }
}

export default TypeForm;
