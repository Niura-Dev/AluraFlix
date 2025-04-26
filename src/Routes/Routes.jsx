import Header from "../Components/Header/Header.jsx";
import Home from "../Pages/Home/Home.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import NewVideo from "../Pages/NewVideo/NewVideo.jsx";
import { VideoProvider } from "../Contexts/VideoContext.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import './AppRoutes.css';

function AppRoutes() {
    return (
        <VideoProvider>
            <HashRouter>
                <div className="app-container">
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="/newVideo" element={<NewVideo />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </HashRouter>
        </VideoProvider>
    );
}

export default AppRoutes;