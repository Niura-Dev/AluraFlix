import Header from "../Components/Header/Header.jsx";
import Home from "../Pages/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewVideo from "../Pages/NewVideo/NewVideo.jsx";
import { VideoProvider } from "../Contexts/VideoContext.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import './AppRoutes.css';

function AppRoutes() {
    return (
        <VideoProvider>
            <BrowserRouter>
                <div className="app-container">
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route index element={<Home />}></Route>
                            <Route path="/newVideo" element={<NewVideo />}></Route>
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </VideoProvider>
    );
}

export default AppRoutes;