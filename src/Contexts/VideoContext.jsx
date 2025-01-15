import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const API_URL = 'https://67802e120476123f76a9e519.mockapi.io/videos';

    // Obtener videos desde la API
    const fetchVideos = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // Añadir un video a través de la API
    const addVideo = async (video) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(video),
            });
            const newVideo = await response.json();
            setVideos((prev) => [...prev, newVideo]);
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };

    // Actualizar un video a través de la API
    const updateVideo = async (updatedVideo) => {
        try {
            const response = await fetch(`${API_URL}/${updatedVideo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedVideo),
            });
            const newVideo = await response.json();
            setVideos((prev) => prev.map((video) => (video.id === newVideo.id ? newVideo : video)));
        } catch (error) {
            console.error('Error updating video:', error);
            alert('Hubo un error al actualizar el video. Inténtalo más tarde.');
        }
    };

    // Eliminar un video a través de la API
    const deleteVideo = async (videoId) => {
        try {
            await fetch(`${API_URL}/${videoId}`, { method: 'DELETE' });
            setVideos((prev) => prev.filter((video) => video.id !== videoId));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <VideoContext.Provider value={{ videos, addVideo, updateVideo, deleteVideo }}>
            {children}
        </VideoContext.Provider>
    );
};

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
