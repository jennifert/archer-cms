// categories.jsx
import React, { useState, useEffect } from 'react';
import CategoryForm from './categories_form.jsx';

const Categories = ({ user }) => {
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error('❌ Failed to load categories:', err);
        }
    };

    const handleAddNew = () => {
        setSelected(null);
        setShowForm(true);
    };

    const handleEdit = (category) => {
        setSelected(category);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.status === 400) {
                const err = await res.json();
                alert(err.error);
                return;
            }
            loadCategories();
        } catch (err) {
            console.error('❌ Delete failed:', err);
        }
    };

    const handleDone = () => {
        setSelected(null);
        setShowForm(false);
        loadCategories();
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="p-4">
            <h2>Categories</h2>
            {!showForm && <button onClick={handleAddNew}>Add New Category</button>}
            {showForm && (
                <CategoryForm onDone={handleDone} existing={selected} />
            )}
            {!showForm && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td>{cat.name}</td>
                                <td>
                                    <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(cat)}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr><td colSpan="2">No categories found.</td></tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Categories;
