import { useState, useEffect } from "react";
import Banner from "../../Components/Banner/Banner";
import Category from "../../Components/Category/Category";
import Modal from "../../Components/Modal/Modal";
import categoryData from "../../Data/CategoryData";
import { useVideoContext } from "../../Contexts/VideoContext";
import Loading from "../../Components/Loading/Loading"; 
import { useNavigate } from 'react-router-dom';

function Home() {
    const { videos, deleteVideo, updateVideo } = useVideoContext();
    const [categories, setCategories] = useState([]);
    const [bannerCard, setBannerCard] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [categoryLookup, setCategoryLookup] = useState({});
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        setCategories(categoryData);
    }, []);

    useEffect(() => {
        if (videos.length > 0) {
            setBannerCard(videos[0]);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [videos]);

    useEffect(() => {
        const lookup = {};
        categories.forEach(category => {
            lookup[category.name] = category;
        });
        setCategoryLookup(lookup);
    }, [categories]);

    const handleCardClick = (card) => {
        setBannerCard(card);
        const bannerElement = document.getElementById('banner');
        if (bannerElement) {
            bannerElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCardDelete = (cardId) => {
        deleteVideo(cardId);
        if (bannerCard && bannerCard.id === cardId && videos.length > 0) {
            setBannerCard(videos[0]);
        } else if (videos.length === 0) {
            setBannerCard(null);
        }
    };

    const handleCardEdit = (card) => {
        setCurrentCard(card);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalSave = async (updatedCard) => {
        await updateVideo(updatedCard);
        setModalOpen(false);
    };

    return (
        isLoading ?
            <Loading /> :
            <div className="home-container">
                {bannerCard && <Banner card={bannerCard} categoryLookup={categoryLookup} />}
                {categories.map(category => (
                    <Category
                        key={category.id}
                        datos={category}
                        cards={videos.filter(card => card.category === category.name)}
                        onCardClick={handleCardClick}
                        onCardDelete={handleCardDelete}
                        onCardEdit={handleCardEdit}
                    />
                ))}
                <Modal
                    card={currentCard}
                    isOpen={modalOpen}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            </div>
    );
}              

export default Home;