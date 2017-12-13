import React from 'react';
import { Link } from 'react-router-dom';

const DashboardTable = ({_id, dateEdited, title, category, type, onDelete, user, author}) => {
  // console.log('user:',user);
  // console.log('author:',author);
  const deletePage = (e) => {
    e.preventDefault();
    fetch(`/api/page/${_id}`, { method: 'DELETE', credentials: 'include'})
    .then(res => onDelete());
  }

  return <tr key={_id}>
    <td>{(new Date(dateEdited)).toISOString().substring(0, 10)}</td>
    <td>
      { user._id === author._id ?
        <Link to={`/dashboard/edit/${_id}`}>{title}</Link>
      :
        <span>{title}</span>
      }
    </td>
    <td>{user.name}</td>
    <td>{category.name}</td>
    <td>{type.name}</td>
    <td>
      { user._id === author._id ?
        <a href='#' onClick={ deletePage }>
          <i className='fa fa-trash'></i>&nbsp; Delete</a>
      :
        <span> N/A</span>
      }
    </td>
  </tr>
}

export default DashboardTable;
