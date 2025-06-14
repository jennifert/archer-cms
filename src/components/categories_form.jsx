// categories_form.jsx
import React, { useState, useEffect } from 'react';

const CategoryForm = ({ onDone, existing }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (existing) {
            setName(existing.name);
        } else {
            setName('');
        }
    }, [existing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const payload = { name };

        try {
            const res = await fetch(existing ? `/api/categories/${existing.id}` : '/api/categories', {
                method: existing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const err = await res.json();
                setError(err.error || 'Error saving category.');
                return;
            }

            onDone();
        } catch (err) {
            console.error('❌ Save error:', err);
            setError('Error saving category.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="category-form">
            <fieldset>
                <legend>{existing ? 'Edit' : 'Add New'} Category</legend>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onDone}>Cancel</button>
            </fieldset>
        </form>
    );
};

export default CategoryForm;
