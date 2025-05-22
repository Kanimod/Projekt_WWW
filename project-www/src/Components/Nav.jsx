import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../logo.png';
import './../index.css';

export function Nav() {
    const navRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const navTopRef = useRef(0);

    useEffect(() => {
        const getNavTop = () => {
            if (!navRef.current) return 0;
            return navRef.current.getBoundingClientRect().top + window.pageYOffset;
        };

        const handleScroll = () => {
            if (window.scrollY >= navTopRef.current) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        const handleResize = () => {
            navTopRef.current = getNavTop();
        };

        navTopRef.current = getNavTop();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const showLogin = () => {
        document.getElementById('login-container').className = "shown"
    }

    return (
        <div className="header">
            <div className="head">
                <Link to="/"><img id="logo-img" src={logo} alt="logo" /></Link>
            </div>
            <div id="nav" ref={navRef} className={`nav ${isSticky ? 'sticky' : ''}`}>
                <div className="left">
                    <Link to="/" className="active"><button>Front Page</button></Link>
                    <Link to="/about"><button>About Us</button></Link>
                    <Link to="/survey"><button>Opinion</button></Link>
                </div>
                <div className="right">
                    <button onClick={showLogin} className="button-login">Zaloguj się :3!!!!</button>
                </div>
            </div>
        </div>
    );
}
