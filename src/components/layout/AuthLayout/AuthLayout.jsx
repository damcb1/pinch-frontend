import './AuthLayout.scss';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <aside className="auth-layout__brand">
                <span className="auth-layout__logo">Pinch</span>
                <div className="auth-layout__pitch">
                    <h2 className="auth-layout__tagline">
                        Tus recetas, no las de un algoritmo.
                    </h2>
                    <p className="auth-layout__subtitle">
                        Del caos al recetario. Búscalas cuando cocinas.
                    </p>
                </div>
            </aside>

            <main className="auth-layout__content">
                <span className="auth-layout__logo-mobile">Pinch</span>
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;