import './LandingFooter.scss';

const LandingFooter = () => {
    return (
        <footer className="landing-footer">
            <div>
                <p className="landing-footer__logo">Pinch</p>
                <p className="landing-footer__tagline">Recetas guardadas, fáciles de encontrar.</p>
            </div>
            <span className="landing-footer__copyright">© 2026 Pinch</span>
        </footer>
    );
};

export default LandingFooter;