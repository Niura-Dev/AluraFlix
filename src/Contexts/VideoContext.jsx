import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/videos');
            setVideos(response.data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const addVideo = async (video) => {
        try {
            const response = await axios.post('http://localhost:3001/videos', video);
            setVideos([...videos, response.data]);
            return response.data;
        } catch (error) {
            console.error("Error adding video:", error);
            throw error;
        }
    };

    const deleteVideo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/videos/${id}`);
            setVideos(videos.filter(video => video.id !== id));
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    const updateVideo = async (updatedVideo) => {
        try {
            const response = await axios.put(
                `http://localhost:3001/videos/${updatedVideo.id}`,
                updatedVideo
            );
            setVideos(videos.map(video => 
                video.id === updatedVideo.id ? response.data : video
            ));
        } catch (error) {
            console.error("Error updating video:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <VideoContext.Provider value={{ 
            videos, 
            addVideo, 
            deleteVideo, 
            updateVideo,
            fetchVideos
        }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideoContext must be used within a VideoProvider');
    }
    return context;
};