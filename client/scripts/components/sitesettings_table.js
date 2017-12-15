import React from 'react';
import { Link } from 'react-router-dom';

const SettingsHeaderTable = ({_id, dateSaved, headerUrl, user, onDelete, whoami}) => {
  // console.log('user:',user);
  // console.log('author:',author);
  const deleteImage = (e) => {
    e.preventDefault();
    fetch(`/api/page/${_id}`, { method: 'DELETE', credentials: 'include'})
    .then(res => onDelete());
  }

  return <tr key={_id}>
    <td>{(new Date(dateSaved)).toISOString().substring(0, 10)}</td>
    <td><a href={`${headerUrl}`} target="_blank">{headerUrl}</a></td>
    <td>{user.name}</td>
    <td>
      { user._id === whoami._id ?
        <a href='#' onClick={ deleteImage }>
          <i className='fa fa-trash'></i>&nbsp; Delete</a>
      :
        <span> N/A</span>
      }
    </td>
  </tr>
}

export default SettingsHeaderTable;
