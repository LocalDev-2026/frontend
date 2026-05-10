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
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            alert('You can only upload up to 5 images.');
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + videos.length > 3) {
            alert('You can only upload up to 3 videos.');
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideos(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const removeVideo = (index) => {
        setVideos(videos.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);

        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1560130958-fded4f277eb3?w=800&q=80'],
                videos: videos,
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

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('add_listing.upload_pictures')}</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        disabled={images.length >= 5}
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    {images.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
                            {images.map((img, idx) => (
                                <div key={idx} style={{ position: 'relative' }}>
                                    <img src={img} alt={`Preview ${idx}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                                    <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' }}>×</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>{t('add_listing.upload_videos')}</label>
                    <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoChange}
                        disabled={videos.length >= 3}
                        style={{ width: '100%', marginBottom: '10px' }}
                    />
                    {videos.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px' }}>
                            {videos.map((vid, idx) => (
                                <div key={idx} style={{ position: 'relative' }}>
                                    <video src={vid} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} controls />
                                    <button type="button" onClick={() => removeVideo(idx)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', zIndex: 10 }}>×</button>
                                </div>
                            ))}
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
