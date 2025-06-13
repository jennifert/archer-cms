// types.jsx
import React, { useState, useEffect } from 'react';
import TypeForm from './type_form.jsx';

const Types = ({ user }) => {
    const [types, setTypes] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadTypes = async () => {
        try {
            const res = await fetch('/api/types');
            const data = await res.json();
            setTypes(data);
        } catch (err) {
            console.error('❌ Failed to load content types:', err);
        }
    };

    const handleEdit = (type) => {
        setSelected(type);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelected(null);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this content type?')) return;
        try {
            const res = await fetch(`/api/type/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.status === 400) {
                const err = await res.json();
                alert(err.error);
                return;
            }
            loadTypes();
        } catch (err) {
            console.error('❌ Delete failed:', err);
        }
    };

    const handleDone = () => {
        setSelected(null);
        setShowForm(false);
        loadTypes();
    };

    useEffect(() => {
        loadTypes();
    }, []);

    return (
        <div className="p-4">
            <h2>Content Types</h2>
            {!showForm && <button className="btn btn-sm btn-primary mb-3" onClick={handleAddNew}>Add New Type</button>}
            {showForm && (
                <TypeForm onDone={handleDone} existing={selected} />
            )}
            {!showForm && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map(type => (
                            <tr key={type.id}>
                                <td>{type.name}</td>
                                <td>
                                    <button onClick={() => handleEdit(type)} className="btn btn-sm btn-info me-2">Edit</button>
                                    <button onClick={() => handleDelete(type.id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {types.length === 0 && (
                            <tr><td colSpan="2">No content types found.</td></tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Types;
