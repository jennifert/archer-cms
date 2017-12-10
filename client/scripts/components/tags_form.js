import React from 'react';

class TagForm extends React.Component {
  constructor(){
      super();
      this.state = {
          newTag:'',
          errors: null,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.fetchEditTag = this.fetchEditTag.bind(this);
  }

  handleInputChange(e) {
     this.setState({
          [e.target.name]: e.target.value,
     });
  }

  componentDidMount(){
    if (this.props.mode =='Edit'){
      this.fetchEditTag();
    }
  }

  fetchEditTag(){
    let newTag='';
      fetch(`/api/tags/${this.props.match.params.tagid}`)
      .then(resp => resp.json())
      .then((json) => {
        this.setState({newTag:json.name})
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  handleSubmit(event) {
     event.preventDefault();
     let fetchURL = '';
     let fetchMethod='';
     if (this.props.mode=="Edit"){
       fetchURL=`/api/tags/${this.props.match.params.tagid}`;
       fetchMethod='put';
     } else {
        fetchURL="/api/tags/";
        fetchMethod='post';
     }
    fetch (fetchURL, {
      method: fetchMethod,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: new Date(),
        name: this.state.newTag,
        user: this.props.user
      })
    })
    .then((res) => {
      if (res.ok) {
        this.setState({ errors: null });
        this.props.fetchTags(); //TODO: fix this error!
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

    const { mode, user,fetchTags} = this.props;
    let errorMessage = '';
    if (this.state.errors){
      if (this.state.errors.errors.name.kind === 'required' ) {
          errorMessage = "Field is required.";
      }
    }
    return <div className="tags-form">

      <h3>{ mode } Tag</h3>
      {
        this.state.errors && <div className='error'>There were some errors saving your tag!</div>
      }
      <form onSubmit={(event) => this.handleSubmit(event)}>
      <input type="text" name="newTag" id="newTag"
        placeholder="Enter the new tag"
        value={this.state.newTag} onChange={(event) => this.handleInputChange(event) }
        />
        {
          errorMessage && <div className='error'>{errorMessage}</div>
        }
        <button type="submit" id="btn-submit" name="btn-tag">
          <i className="fa fa-save" aria-hidden="true"></i>&nbsp;
          {mode}
        </button>
      </form>
    </div>
  }
}

export default TagForm;
