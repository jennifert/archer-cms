import React from 'react';

const DashboardTable = ({
    id,
    title,
    dateCreated,
    content,
    User,
    author,
    Category,
    CategoryId,
    ContentType,
    ContentTypeId,
    onDelete,
    onEdit
}) => {
    const isOwner = author && User && author.id === User.id;

    const handleEditClick = () => {
        const fullPost = {
            id,
            title,
            dateCreated,
            content,
            User,
            Category,
            CategoryId: Category?.id || CategoryId || '',
            ContentType,
            ContentTypeId: ContentType?.id || ContentTypeId || ''
        };

        if (onEdit) {
            onEdit(fullPost);
        }
    };

    const deletePage = (e) => {
        e.preventDefault();
        fetch(`/api/page/${id}`, { method: 'DELETE', credentials: 'include' })
            .then(res => {
                if (res.ok) {
                    onDelete(id); // Pass the id back up
                } else {
                    console.error('❌ Delete failed');
                }
            })
            .catch(err => {
                console.error('🔥 Delete error:', err.message);
            });
    };


    return (
        <tr>
            <td>{title}</td>
            <td>{Category?.name || '—'}</td>
            <td>{ContentType?.name || '—'}</td>
            <td>{User?.name || '—'}</td>
            <td>{new Date(dateCreated).toLocaleDateString()}</td>
            <td>
                {isOwner && (
                    <>
                        <button onClick={handleEditClick} className="btn btn-sm btn-warning me-2">Edit</button>
                        <button onClick={deletePage} className="btn btn-sm btn-danger">
                            Delete
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default DashboardTable;
