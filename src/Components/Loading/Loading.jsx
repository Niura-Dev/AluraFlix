import { BlobLoader } from 'react-loaders-kit';
import './Loading.css';

const Loading = () => {


    const loaderProps = {
        loading: true,
        size: 40,
        duration: 1.3,
    };

    return (
        <div className="loading-container">
            <BlobLoader {...loaderProps} />
            <h2>Cargando...</h2>
        </div>
    );
};

export default Loading;