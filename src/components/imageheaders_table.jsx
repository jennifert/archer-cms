import React from 'react';

const ImageHeadersTable = ({ id, filename, dateSaved, User, onDelete, whoami }) => {
    const deleteImage = (e) => {
        e.preventDefault();
        fetch(`/api/images/header/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then(() => onDelete());
    };

    return (
        <tr>
            <td>{(new Date(dateSaved)).toISOString().substring(0, 10)}</td>
            <td>
                {filename ? (
                    <a href={`/images/${filename}`} target="_blank" rel="noopener noreferrer">
                        {filename}
                    </a>
                ) : (
                    <span>No file</span>
                )}
            </td>
            <td>{User?.name || 'Unknown'}</td>
            <td>
                {whoami?.id === User?.id && (
                    <button className="btn btn-danger btn-sm" onClick={deleteImage}>
                        Delete
                    </button>
                )}
            </td>
        </tr>
    );
};

export default ImageHeadersTable;
