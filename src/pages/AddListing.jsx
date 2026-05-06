import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import api from '../utils/api';

const AddListing = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        title: '',
        category: 'guesthouse',
        price: '',
        location: '',
        description: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [submitting, setSubmitting] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                images: [imagePreview || 'https://images.unsplash.com/photo-1560130958-fded4f277eb3?w=800&q=80'],
                availableRooms: 1, // Default for now
                maxGuests: 2, // Default for now
            };

            await api('/listings', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            alert(t('add_listing.success_message'));
            navigate('/host');
        } catch (error) {
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>{t('add_listing.title')}</h1>
            <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--spacing-xl)' }}>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('add_listing.listing_title')}</label>
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
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('add_listing.category')}</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        >
                            <option value="guesthouse">{t('categories.guesthouses')}</option>
                            <option value="room">{t('categories.rooms')}</option>
                            <option value="tour">{t('categories.tours')}</option>
                            <option value="product">{t('categories.products')}</option>
                            <option value="resort">{t('categories.resorts')}</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('add_listing.price_usd')}</label>
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
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('add_listing.location')}</label>
                    <input
                        type="text"
                        name="location"
                        placeholder={t('add_listing.location_placeholder')}
                        required
                        value={formData.location}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                    />
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('add_listing.description')}</label>
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
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('add_listing.upload_picture')}</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    {imagePreview && (
                        <div style={{ marginTop: '10px' }}>
                            <p style={{ fontSize: '14px', marginBottom: '5px' }}>{t('add_listing.preview')}</p>
                            <img
                                src={imagePreview}
                                alt={t('add_listing.preview')}
                                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                            />
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', padding: '14px' }}>
                    {submitting ? t('common.loading') : t('add_listing.submit')}
                </button>
            </form>
        </div>
    );
};

export default AddListing;
