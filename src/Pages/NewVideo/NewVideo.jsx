import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewVideo.css';
import categoryData from '../../Data/CategoryData';
import { validateForm } from '../../Utils/ValidateForm';
import OptionList from '../../Components/OptionList/OptionList';
import { useVideoContext } from '../../Contexts/VideoContext';
import FormButton from '../../Components/Button/FormButton';
import Notification from '../../Components/Notification/Notification';
import ConfirmationDialog from '../../Components/ConfirmationDialog/ConfirmationDialog';

function NewVideo() {
    const { addVideo } = useVideoContext();
    const initialFormData = {
        title: '',
        category: '',
        cover: '',
        link: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const descriptionRef = useRef(null);
    const navigateTo = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);


    useEffect(() => {
        const validateFormAndSetErrors = async () => {
            const formErrors = await validateForm(formData);
            setErrors(formErrors);
            setIsButtonDisabled(
                Object.keys(formErrors).length > 0 || !isFormFilled(formData)
            );
        };
        validateFormAndSetErrors();
    }, [formData]);

    const isFormFilled = (formData) => {
        return Object.values(formData).every((field) => field.trim() !== '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
        setTouchedFields((prevState) => ({ ...prevState, [name]: true }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formErrors = await validateForm(formData);

        if (!isFormFilled(formData)) {
            setNotificationMessage('Por favor, completa todos los campos.');
            setShowNotification(true);
            return;
        }

        if (Object.keys(formErrors).length > 0) {
            setNotificationMessage('Por favor, corrige los errores antes de guardar.');
            setShowNotification(true);
            return;
        }

        handleConfirmSave();
    };

    const handleConfirmSave = async () => {
        try {
            await addVideo(formData);
            setNotificationMessage('El video se ha guardado exitosamente.');
            setFormData(initialFormData); // Restablecer el formulario
        navigateTo('/'); // Navegar a la página principal
    } catch (error) {
        setNotificationMessage('Hubo un error al guardar el video.');
    } finally {
        setShowNotification(true);
    }
};

    const handleCancelSave = () => {
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        if (Object.values(formData).some((value) => value.trim() !== '')) {
            const confirmReset = window.confirm('¿Estás seguro de que deseas limpiar el formulario?');
            if (!confirmReset) return;
        }
        setFormData(initialFormData);
        setErrors({});
        setTouchedFields({});
        setShowNotification(false); // Cerrar la notificación si está abierta
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVideo({ ...newVideo, [name]: value });
    };

    const handleModalSave = async (updatedCard) => {
        const errors = await validateForm(updatedCard);
        if (Object.keys(errors).length > 0) {
            alert('Corrige los errores antes de guardar.');
            return;
        }
        updateVideo(updatedCard);
        setModalOpen(false);
    };

    return (
        <div className="new-video-page">
            <div className="container__new-video">
                <header className="new-video__header">
                    <h1 className="new-video__title">NUEVO VIDEO</h1>
                    <p className="new-video__description">
                        COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO
                    </p>
                </header>
                <form className="new-video__form" onSubmit={handleSave}>
                    <div className="form-section">
                        <div className="form-section__left">
                            <label
                                className={`new-video__form-label ${
                                    errors.title && touchedFields.title ? 'error-label' : ''
                                }`}
                            >
                                Título:
                                <input
                                    className={`new-video__form-input ${
                                        errors.title && touchedFields.title ? 'error' : ''
                                    }`}
                                    type="text"
                                    placeholder="Ingresar título del video"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    maxLength="200"
                                    required
                                />
                                {errors.title && touchedFields.title && (
                                    <span className="error-message">{errors.title}</span>
                                )}
                            </label>
                        </div>
                        <div className="form-section__right">
                            <OptionList
                                clase={`new-video__form-input new-video__form-option ${
                                    errors.category && touchedFields.category ? 'error-label' : ''
                                }`}
                                clase2="new-video__dropdown-option"
                                value={formData.category}
                                onChange={(e) => {
                                    handleChange({
                                        target: { name: 'category', value: e.target.value },
                                    });
                                }}
                                options={categoryData}
                            />
                            {errors.category && touchedFields.category && (
                                <span className="error-message">{errors.category}</span>
                            )}
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="form-section__left">
                            <label
                                className={`new-video__form-label ${
                                    errors.cover && touchedFields.cover ? 'error-label' : ''
                                }`}
                            >
                                Imagen:
                                <input
                                    className={`new-video__form-input ${
                                        errors.cover && touchedFields.cover ? 'error' : ''
                                    }`}
                                    type="url"
                                    placeholder="Ingresar enlace de la imagen"
                                    name="cover"
                                    value={formData.cover}
                                    onChange={handleChange}
                                    maxLength="200"
                                    required
                                />
                                {errors.cover && touchedFields.cover && (
                                    <span className="error-message">{errors.cover}</span>
                                )}
                            </label>
                        </div>
                        <div className="form-section__right">
                            <label
                                className={`new-video__form-label ${
                                    errors.link && touchedFields.link ? 'error-label' : ''
                                }`}
                            >
                                Video:
                                <input
                                    className={`new-video__form-input ${
                                        errors.link && touchedFields.link ? 'error' : ''
                                    }`}
                                    type="url"
                                    placeholder="Ingresar enlace del video"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    maxLength="200"
                                    required
                                />
                                {errors.link && touchedFields.link && (
                                    <span className="error-message">{errors.link}</span>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="form-section">
                        <div className="form-section__left">
                            <label
                                className={`new-video__form-label ${
                                    errors.description && touchedFields.description ? 'error-label' : ''
                                }`}
                            >
                                Descripción:
                                <textarea
                                    className={`new-video__form-input new-video__form-textarea ${
                                        errors.description && touchedFields.description ? 'error' : ''
                                    }`}
                                    name="description"
                                    placeholder="¿De qué se trata este vídeo?"
                                    value={formData.description}
                                    onChange={handleChange}
                                    ref={descriptionRef}
                                    rows="4"
                                    maxLength="300"
                                    required
                                />
                                {errors.description && touchedFields.description && (
                                    <span className="error-message">{errors.description}</span>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="new-video__form-buttons">
                        <FormButton
                            type="submit"
                            label="GUARDAR"
                            disabled={isButtonDisabled}
                            buttonType="form-button--save"
                        />
                        <FormButton
                            type="button"
                            label="LIMPIAR"
                            onClick={handleCancel}
                            buttonType="form-button--cancel"
                        />
                    </div>
                </form>
            </div>
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                />
            )}
            {showConfirmation && (
                <ConfirmationDialog
                    message="¿Estás seguro de que deseas guardar este nuevo video?"
                    onConfirm={handleConfirmSave}
                    onCancel={handleCancelSave}
                />
            )}
        </div>
    );
}

export default NewVideo;