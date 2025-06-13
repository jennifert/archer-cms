// type_form.jsx
import React, { useState, useEffect } from 'react';

const TypeForm = ({ onDone, existing }) => {
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
            const res = await fetch(existing ? `/api/type/${existing.id}` : '/api/type', {
                method: existing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const err = await res.json();
                setError(err.error || 'Error saving content type.');
                return;
            }

            onDone();
        } catch (err) {
            console.error('❌ Save error:', err);
            setError('Error saving content type.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h4>{existing ? 'Edit' : 'Add New'} Content Type</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary me-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onDone}>Cancel</button>
        </form>
    );
};

export default TypeForm;
