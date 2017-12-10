import React from 'react';

class CategoryForm extends React.Component {
  constructor(){
      super();
      this.state = {
          newCategory:'',
          errors: null,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.fetchEditCategory = this.fetchEditCategory.bind(this);
  }
  handleInputChange(e) {
     this.setState({
          [e.target.name]: e.target.value,
     });
  }

  componentDidMount(){
    if (this.props.mode =='Edit'){
      this.fetchEditCategory();
    }
  }

  fetchEditCategory(){
    let newCategory='';
      fetch(`/api/categories/${this.props.match.params.categoryid}`)
      .then(resp => resp.json())
      .then((json) => {
        this.setState({newCategory:json.name})
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
       fetchURL=`/api/categories/${this.props.match.params.categoryid}`;
       fetchMethod='put';
     } else {
        fetchURL="/api/categories/";
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
        name: this.state.newCategory,
        user: this.props.user
      })
    })
    .then((res) => {
      if (res.ok) {
        this.setState({ errors: null });
        this.props.fetchCategories(); //TODO: fix this error!
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

    const { mode, user,fetchCategories} = this.props;
    let errorMessage = '';
    if (this.state.errors){
      if (this.state.errors.errors.name.kind === 'required' ) {
          errorMessage = "Field is required.";
      }
    }
    return <div className="categories-form">

      <h3>{ mode } Category</h3>
      {
        this.state.errors && <div className='error'>There were some errors saving your category!</div>
      }
      <form onSubmit={(event) => this.handleSubmit(event)}>
      <input type="text" name="newCategory" id="newCategory"
        placeholder="Enter the new category"
        value={this.state.newCategory} onChange={(event) => this.handleInputChange(event) }
        />
        {
          errorMessage && <div className='error'>{errorMessage}</div>
        }
        <button type="submit" id="btn-submit" name="btn-category">
          <i className="fa fa-save" aria-hidden="true"></i>&nbsp;
          {mode}
        </button>
      </form>
    </div>
  }
}

export default CategoryForm;
