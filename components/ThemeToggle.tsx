// components/ThemeToggle.tsx
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getEmoji = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'gray':
        return '☁️';
      case 'dark':
        return '🌙';
      default:
        return '☀️';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Cambiar a tema ${theme === 'light' ? 'gris' : theme === 'gray' ? 'oscuro' : 'claro'}`}
      style={{ fontSize: '1.5rem' }}
    >
      {getEmoji()}
    </button>
  );
}