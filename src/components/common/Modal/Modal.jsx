import { useEffect } from 'react';
import Button from '../Button/Button';
import './Modal.scss';

const Modal = ({ title, children, confirmLabel = 'Confirmar', onConfirm, onCancel, isProcessing }) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onCancel();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onCancel]);

    return (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal__backdrop" onClick={onCancel} />

            <div className="modal__box">
                <button
                    type="button"
                    className="modal__close"
                    onClick={onCancel}
                    aria-label="Cerrar"
                    disabled={isProcessing}
                >
                    ×
                </button>
                <h2 className="modal__title" id="modal-title">{title}</h2>
                <div className="modal__body">{children}</div>
                <div className="modal__actions">
                    <Button variant="secondary" onClick={onCancel} disabled={isProcessing}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onConfirm} disabled={isProcessing}>
                        {isProcessing ? 'Borrando…' : confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;