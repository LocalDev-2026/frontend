import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { useTranslation } from 'react-i18next';
import { Image, Video, FileText, ArrowLeft } from 'lucide-react';

const SubmitContentRequest = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useTranslation();

    const [myListings, setMyListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState('');
    const [requestType, setRequestType] = useState('images'); // images, video, description
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!user || user.role !== 'host') {
            navigate('/login');
            return;
        }
        
        const fetchListings = async () => {
            try {
                const hostListings = await api('/listings/my-listings');
                const approvedListings = hostListings.filter(l => l.status === 'approved');
                setMyListings(approvedListings);
                if (approvedListings.length > 0) {
                    setSelectedListing(approvedListings[0].id);
                }
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        };

        fetchListings();
    }, [user, navigate]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
        
        const fileReaders = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then(results => {
            setImages(results);
        });
    };

    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 3); // Limit to 3 videos
        
        const fileReaders = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then(results => {
            setVideos(results);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedListing) {
            alert(t('content_request.error_select_listing'));
            return;
        }

        // Validate content exists based on type
        if (requestType === 'images' && images.length === 0) {
            alert(t('content_request.error_content'));
            return;
        }
        if ((requestType === 'video' || requestType === 'videos') && videos.length === 0) {
            alert(t('content_request.error_content'));
            return;
        }
        if (requestType === 'description' && !description) {
            alert(t('content_request.error_content'));
            return;
        }

        setSubmitting(true);

        try {
            const requestData = {
                listingId: selectedListing,
                type: requestType === 'video' ? 'videos' : requestType,
                images: requestType === 'images' ? images : null,
                videos: (requestType === 'video' || requestType === 'videos') ? videos : null,
                description: requestType === 'description' ? description : null,
            };

            await api('/requests', {
                method: 'POST',
                body: JSON.stringify(requestData)
            });

            alert(t('content_request.success'));
            navigate('/host');
        } catch (error) {
            console.error('Submit error:', error);
            alert('An error occurred while submitting.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!user || user.role !== 'host') return null;

    return (
        <div className="container" style={{ maxWidth: '800px', padding: 'var(--spacing-xl) var(--spacing-md)' }}>
            <Link to="/host" className="btn btn-outline" style={{ display: 'inline-flex', marginBottom: 'var(--spacing-lg)' }}>
                <ArrowLeft size={18} /> {t('content_request.back')}
            </Link>

            <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>{t('content_request.title')}</h1>

            <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--spacing-xl)' }}>
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                        {t('content_request.select_listing')}
                    </label>
                    {myListings.length === 0 ? (
                        <p style={{ color: 'var(--color-danger)' }}>No approved listings found. Add a listing first.</p>
                    ) : (
                        <select 
                            value={selectedListing} 
                            onChange={(e) => setSelectedListing(e.target.value)}
                            required
                        >
                            {myListings.map(listing => (
                                <option key={listing.id} value={listing.id}>{listing.title}</option>
                            ))}
                        </select>
                    )}
                </div>

                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                        {t('content_request.request_type')}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-md)' }}>
                        <button
                            type="button"
                            onClick={() => setRequestType('images')}
                            className={`btn ${requestType === 'images' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 'var(--spacing-md)' }}
                        >
                            <Image size={24} />
                            <span>{t('content_request.type_images')}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRequestType('video')}
                            className={`btn ${requestType === 'video' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 'var(--spacing-md)' }}
                        >
                            <Video size={24} />
                            <span>{t('content_request.type_video')}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRequestType('description')}
                            className={`btn ${requestType === 'description' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 'var(--spacing-md)' }}
                        >
                            <FileText size={24} />
                            <span>{t('content_request.type_description')}</span>
                        </button>
                    </div>
                </div>

                {/* Conditional Input Fields */}
                <div style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-xl)' }}>
                    {requestType === 'images' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                {t('content_request.images_label')}
                            </label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                multiple 
                                onChange={handleImageChange}
                                style={{ border: 'none', padding: '0', background: 'transparent' }}
                            />
                            {images.length > 0 && (
                                <div style={{ marginTop: 'var(--spacing-md)' }}>
                                    <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t('content_request.preview')}:</p>
                                    <div className="preview-grid">
                                        {images.map((img, i) => (
                                            <div key={i} className="preview-item">
                                                <img src={img} alt={`Preview ${i}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {(requestType === 'video' || requestType === 'videos') && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                {t('content_request.video_label')} (Max 3)
                            </label>
                            <input 
                                type="file" 
                                accept="video/*" 
                                multiple 
                                onChange={handleVideoChange}
                                style={{ border: 'none', padding: '0', background: 'transparent' }}
                            />
                            {videos.length > 0 && (
                                <div style={{ marginTop: 'var(--spacing-md)' }}>
                                    <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t('content_request.preview')}:</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                        {videos.map((vid, i) => (
                                            <video key={i} src={vid} controls style={{ width: '100%', maxHeight: '150px', backgroundColor: '#000', borderRadius: 'var(--radius-md)' }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {requestType === 'description' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                {t('content_request.description_label')}
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                placeholder={t('content_request.description_placeholder')}
                                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', resize: 'vertical' }}
                            />
                        </div>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={submitting || myListings.length === 0} 
                    style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
                >
                    {submitting ? '...' : t('content_request.submit')}
                </button>
            </form>
        </div>
    );
};

export default SubmitContentRequest;
