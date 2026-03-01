import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listings } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const AddListing = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        category: 'guesthouse',
        price: '',
        location: '',
        description: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) return;

        // Simulate adding data (in a real app this would be an API call)
        const newListing = {
            id: `l${Date.now()}`,
            hostId: user.id,
            ...formData,
            price: Number(formData.price),
            images: [imagePreview || 'https://images.unsplash.com/photo-1560130958-fded4f277eb3?w=800&q=80'], // Use uploaded image or fallback
            rating: 0,
            reviews: 0,
            status: 'pending', // IMPORTANT: Pending by default
            amenities: []
        };

        listings.push(newListing); // Mutating mock data directly for prototype
        alert('Listing submitted successfully! It is now pending admin approval.');
        navigate('/host');
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>Add New Listing</h1>
            <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--spacing-xl)' }}>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Listing Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        >
                            <option value="guesthouse">Guesthouse</option>
                            <option value="room">Room</option>
                            <option value="tour">Tour</option>
                            <option value="product">Product</option>
                            <option value="resort">Resort</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="e.g. Naryn City"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    />
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    />
                </div>

                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Upload Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    {imagePreview && (
                        <div style={{ marginTop: '10px' }}>
                            <p style={{ fontSize: '14px', marginBottom: '5px' }}>Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                            />
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                    Submit Listing
                </button>
            </form>
        </div>
    );
};

export default AddListing;
