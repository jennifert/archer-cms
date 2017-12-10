import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CategoryForm from './categories_form';

class Categories extends React.Component {
  constructor(){
      super();
      this.state = {
        categories:[],
      };
      this.fetchCategories = this.fetchCategories.bind(this);
      this.deleteCategory = this.deleteCategory.bind(this);
  }

  deleteCategory(id) {
      fetch(`/api/categories/${id}`, {
          method: 'DELETE',
          credentials: 'include'
      })
      .then(() => this.fetchCategories());
  };

  fetchCategories(){
    let categories=[];
      fetch('/api/categories/', {
        method: 'GET',
        credentials: 'include'
    })
      .then(resp => resp.json())
      .then(json => this.setState({ categories:json }));
  }

  componentWillMount(){
   this.fetchCategories();
  }

  render() {
    const { mode, categories} = this.state;
    return <main className='categories'>
           <h1>Categories</h1>

           <div className="content">

             <Link to="/categories/add">
               <i className="fa fa-plus" aria-hidden="true"></i>&nbsp;
               Add new category
             </Link>

             <table id="category-table">
               <thead>
                 <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>User</th>
                    <th>Actions</th>
                 </tr>
               </thead>
                 <tbody>
                     {this.state.categories.map((rows)=>{
                      return(
                        <tr key={rows._id}>
                          <td>{(new Date(rows.date)).toISOString().substring(0, 10)}</td>
                          <td><Link to={`/categories/edit/${rows._id}`}>{rows.name}</Link></td>
                          <td>{rows.user.name}</td>
                          <td>
                            <button className="category-delete" onClick={() => this.deleteCategory(rows._id)}>
                              <i className='fa fa-trash'></i>&nbsp;
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                  })}
                 </tbody>
             </table>
               <Route exact path="/categories/add" render={(props)=><CategoryForm {...props} mode='Add' fetchCategories={this.fetchCategories} user={this.props.user} />} />
               <Route path="/categories/edit/:categoryid" render={(props) => <CategoryForm {...props} mode='Edit' fetchCategories={this.fetchCategories} user={this.props.user}/>} />
           </div>
         </main>
  }

}

export default Categories;
