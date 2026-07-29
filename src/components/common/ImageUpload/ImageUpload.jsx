import { useState } from 'react';
import { uploadImage } from '../../../services/uploadService';
import './ImageUpload.scss';

const ImageUpload = ({ value, onChange, label = 'Foto' }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError('');
        setIsUploading(true);
        try {
            const { url } = await uploadImage(file);
            onChange(url);
        } catch (err) {
            setError(err.response?.data?.message || 'No se pudo subir la imagen.');
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    return (
        <div className="image-upload">
            <span className="image-upload__label">{label}</span>

            {value && (
                <div className="image-upload__preview">
                    <img src={value} alt="Vista previa de la receta" className="image-upload__img" />
                    <button type="button" className="image-upload__remove" onClick={() => onChange(null)}>
                        Quitar
                    </button>
                </div>
            )}

            <label className="image-upload__btn">
                {isUploading ? 'Subiendo…' : value ? 'Cambiar foto' : 'Subir foto'}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={isUploading}
                    className="image-upload__input"
                />
            </label>

            {error && <p className="image-upload__error" role="alert">{error}</p>}
        </div>
    );
};

export default ImageUpload;