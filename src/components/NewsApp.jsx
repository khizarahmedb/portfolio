import UseContext from '../Context';
import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import "../css/NewsApp.css";
import { MdGpsFixed } from "react-icons/md";
import newsTile from "../assets/newstile.png";

const STATIC_NEWS = [
    {
        url: "https://github.com/khizarahmedb",
        urlToImage: newsTile,
        originalNews: "Portfolio update: automation-first reporting systems and production engineering workflows."
    },
    {
        url: "https://www.linkedin.com/in/khizar-ahmed-0a62841b5/",
        urlToImage: newsTile,
        originalNews: "Now open to software engineering, automation, and analytics-focused product roles."
    },
    {
        url: "https://khizarahmed.com",
        urlToImage: newsTile,
        originalNews: "Project case studies now include deeper repo-backed details inside each project window."
    },
];

function NewsApp() {
    const newsContainerRef = useRef();
    const [error, setError] = useState('');
    const [allNews, setAllNews] = useState([]);

    const { 
        tileScreen,
        city, setCity,
        Cel, setCel,
        weather, setWeather,
        newsPopup, setNewsPopup,
        setProjectUrl,
        setBackTrackIe,
        handleShow }
         = useContext(UseContext);

    const hasSeen = new Set();
    const filteredNews = allNews
        .filter(item => {
            if (hasSeen.has(item.url)) return false;
            hasSeen.add(item.url);
            return true;
        })
        .reverse()
        .slice(0, 20);

    const time = new Date()
    const hours = time.getHours();
    const isNight = hours > 17 || hours < 6;


    const weatherIcons = {
        0: isNight ? '🌙' : '☀️',
        1: isNight ? '🌙' : '🌤️',
        2: isNight ? '🌙' : '⛅',
        3: '☁️',
        45: '🌫️',
        61: '🌧️',
        71: '❄️',
        95: '⛈️',
    };

    useEffect(() => { // call fetchNews when user open news
        fetchNews();
    }, []);

    async function fetchNews() {
        try {
            setAllNews(STATIC_NEWS);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                newsContainerRef.current &&
                !newsContainerRef.current.contains(event.target) &&
                !event.target.closest('.time')
            ) {
                setNewsPopup(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [newsContainerRef]);

    function openNews(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    useEffect(() => {
        if(newsPopup){
            getUserLocation();   
        }
    }, [newsPopup]);

    useEffect(() => { // update weather and location since tile screen is active
        getUserLocation();   
    }, [tileScreen]);

    function getUserLocation() {
        setError('');
        setCity('Karachi');
        setWeather({ temp: '82', code: 1 });
    }

    function fetchWeatherAndCity(lat, lon) {
        if(!lat || !lon) return;
        setCity('Karachi');
        setWeather({ temp: '82', code: 1 });
    }


    return (
        <>
            <AnimatePresence>
                {newsPopup && (
                    <motion.div
                        className="news_container"
                        ref={newsContainerRef}
                        initial={{ opacity: 0, x: '-500px' }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                        exit={{ opacity: 0, x: '-500px' }}
                    >
                        {weather && (
                            <div className="weather_container">
                                <span className='location'
                                    onClick={() => {
                                        getUserLocation()
                                    }}
                                >
                                    <MdGpsFixed />
                                </span>
                                <h1>{city}</h1>
                                <h1>{weatherIcons[weather.code] || ''}
                                    <span className="temp"
                                        onClick={() => setCel(!Cel)}
                                    >
                                        {Cel? weather.temp : ((weather.temp - 32) * 5 / 9).toFixed(0)}
                                        {Cel? '°F':'°C'}
                                    </span>
                                </h1>
                            </div>
                        )}
                        {error && <p className="error">{error}</p>}

                        <h1>Latest News</h1>
                        {allNews.length > 0 ? (
                            filteredNews.map((item, index) => (
                                <div className="news" key={index} onClick={() => openNews(item.url)}>
                                    <img src={item.urlToImage} alt="" />
                                    <h5>{item.originalNews}</h5>
                                </div>
                            ))
                        ) : (
                            <p>News are loading...</p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default NewsApp;
