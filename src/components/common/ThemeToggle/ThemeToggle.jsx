import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.scss';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');

    const toggle = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
        </button>
    );
};

export default ThemeToggle;