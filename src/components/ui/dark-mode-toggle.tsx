import { useEffect, useState } from 'react';

export default function DarkModeToggle({className}:{className: string}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check the initial theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  // Handle theme switching
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`bg-transparent flex space-x-2 ${className}`}>
        <button onClick={toggleDarkMode}>
            <span>{isDarkMode ? <i className="text-xl fi fi-tr-brightness"></i> : <i className="text-xl fi fi-ss-brightness"></i>}</span>
        </button>
    </div>
  );
}
