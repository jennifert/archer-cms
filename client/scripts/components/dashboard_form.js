import React from 'react';
// import ReactDOM from 'react-dom';
import { Editor } from '@tinymce/tinymce-react';

class DashboardForm extends React.Component {
  constructor(){
      super();
      this.state = {
        title: '',
        typeChoose: [],
        currentType: '',
        currentCategory: '',
        tags: [],
        newTags:{},
        checked: false,
        category: [],
        errors: null,
        editorState:'',
        thepages: '',
        editId:'',
      };

      this.handleEditorChange = this.handleEditorChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);

      this.fetchThePages = this.fetchThePages.bind(this);
      this.fetchCategories = this.fetchCategories.bind(this);
      this.fetchTags = this.fetchTags.bind(this);
      this.fetchType = this.fetchType.bind(this);

      this.saveFormData = this.saveFormData.bind(this);
  }

  fetchThePages(){
    let thepages='';
      fetch(`/api/page/${this.props.match.params.dashboardid}`, {
        method: 'GET',
        credentials: 'include'
      })
      .then(resp => resp.json())
      .then((json) => {
          const defaultTags = json.tags;
          let newTags = {};
          for (let i = 0; i < defaultTags.length; i++) {
            newTags[defaultTags[i]] = true;
          }
        this.setState({
          thepages:json,
          newTags: newTags,
          title: json.title,
          currentType: json.type._id,
          currentCategory: json.category._id,
          editorState: json.content.toString(),
          editId:json._id,
        });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  handleEditorChange(e) {
    const editorState = e.target.getContent();
    this.setState({editorState:editorState});
  };

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (target.type === 'checkbox'){
      const tags = Object.assign({}, this.state.newTags);
      if (tags[name]){
        tags[name] = !tags[name];
      } else {
        tags[name] = true;
      }
      this.setState({
        newTags: tags,
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.saveFormData();
  }

  saveFormData(){
    let fetchURL = '';
    let fetchMethod='';
    if (this.props.mode=="Edit"){
      fetchURL=`/api/page/${this.props.match.params.dashboardid}`;
      fetchMethod='put';
    } else {
       fetchURL="/api/page";
       fetchMethod='post';
    }
    const editorState = this.state.editorState;
    const newTags = this.state.newTags;
    const tagKeys = Object.keys(newTags);
    const actuallySelectedKeys = tagKeys.map((key) => {
    	return newTags[key] ? key : null;
    });

    const filteredValues = actuallySelectedKeys.filter((key) => {
    	return key !== null;
    });
    const jsonBody = JSON.stringify({
      title: this.state.title,
      user: this.props.user,
      type: this.state.currentType,
      category: this.state.currentCategory,
      tags: filteredValues,
      content: editorState,
      dateCreated: new Date(),
      dateEdited: new Date()
    });

    fetch (fetchURL, {
      method: fetchMethod,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonBody
    })
    .then((res) => {
      if (res.ok) {
        this.setState({ errors: null });
        this.props.fetchDashboard();
        this.props.history.push('/dashboard/');
      } else {
        res.json().then(errors => this.setState({ errors }));
      }
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation.');
      console.log(error.message);
    });
  }

  fetchType(){
      fetch('/api/type', {
        method: 'GET',
        credentials: 'include'
    })
      .then(resp => resp.json())
      .then(json => this.setState({typeChoose:json}));
  }

  fetchCategories(){
      let categories=[];
      fetch('/api/categories', {
        method: 'GET',
        credentials: 'include'
    })
      .then(resp => resp.json())
      .then(json => this.setState({category:json}));
  }

  fetchTags(){
      let tags=[];
      fetch('/api/tags', {
        method: 'GET',
        credentials: 'include'
    })
      .then(resp => resp.json())
      .then(json => this.setState({tags:json}));
  }

  componentDidMount(){
    this.fetchCategories();
    this.fetchTags();
    this.fetchType();
    if (this.props.mode === 'Edit'){
      this.fetchThePages();
    }
  }
  componentWillReceiveProps(nextProps){
    if (this.props.match.params.dashboardid !== nextProps.match.params.dashboardid) {
      this.fetchThePages();
    }
  }

  render() {
    const { mode, user,fetchDashboard} = this.props;
    let errors, errorTitle, errorCategory, errorTags, errorType, errorContent;
    if (this.state.errors){
      errors = this.state.errors.errors;
      if (errors.title.kind==="required"){
        errorTitle="Title is required";
      } else {
        errorTitle="";
      }
      if (errors.category.kind==="ObjectID"){
        errorCategory="Category is required";
      } else {
        errorCategory="";
      }
      if (errors.tags.kind==="required"){
        errorTags="Tags are required";
      } else {
        errorTags="";
      }
      if (errors.type.kind==="ObjectID"){
        errorType="Content type is required";
      } else {
        errorType="";
      }
      if (errors.content.kind==="required"){
        errorContent="Content is required,";
      } else {
        errorContent="";
      }
    }
    //
    // console.log("errorTitle", errorTitle);
    // console.log("errorCategory", errorCategory);
    // console.log("errorTags", errorTags);
    // console.log("errorType", errorType);
    // console.log("errorType", errorType);
    // console.log("errorContent", errorContent);
    // console.log("errors", errors);

    return <div className="dashboard-form">

      <h3>{ mode } Content</h3>
      {
        this.state.errors && <div className="alert alert-danger" role="alert">There were some errors saving your content!</div>
      }
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="row-one">
          {
            errorTitle && <div className='error'>{errorTitle}</div>
          }
          <input type="text" name="title" id="title" placeholder="Enter your post or page title"
            value={this.state.title}
            onChange={(event) => this.handleInputChange(event) }  />

            {
              errorType && <div className='error'>{errorType}</div>
            }
            <select name="currentType" value={this.state.currentType} onChange={(event) => this.handleInputChange(event) }>
              <option>-- select --</option>
              {this.state.typeChoose.map((option)=>{
                 return(
                   <option key={option._id} value={option._id}>{option.name}</option>
                 );
               })}
            </select>

        </div>
        <div className="row-two">
          {
            errorCategory && <div className='error'>{errorCategory}</div>
          }
        <select name="currentCategory" value={this.state.currentCategory} onChange={(event) => this.handleInputChange(event) }>
          <option value="">-- select --</option>
          {this.state.category.map((option)=>{
             return(
               <option key={option._id} value={option._id}>{option.name}</option>
             );
           })}
        </select>

        {
          errorTags && <div className='error'>{errorTags}</div>
        }
          {this.state.tags.map((tag)=>{
               return(
                 <label key={tag._id}>
                   {tag.name}
                    <input
                      name={tag._id}
                      type="checkbox"
                      checked={this.state.newTags[tag._id]}
                      onChange={(event) => this.handleInputChange(event) }
                     />
                  </label>
               );
             })
           }


        </div>
        <div className="row-three">
          {
            errorContent && <div className='error'>{errorContent}</div>
          }
            <Editor
              key={this.state.editId}
              initialValue={this.state.editorState}
              init={{
                plugins: 'link lists code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
              }}
              onChange={this.handleEditorChange}
            />
        </div>
        <div className="row-four">
          <button type="submit" id="btn-submit" name="Submit">
            <i className="fa fa-save" aria-hidden="true"></i>&nbsp;
            {mode}
          </button>
        </div>
      </form>
    </div>
  }
}

export default DashboardForm;
