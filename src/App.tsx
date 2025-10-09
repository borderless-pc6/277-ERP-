import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

  // Simples sistema de navegação entre páginas
  // No futuro, substituir por React Router
  const handleNavigation = (page: 'login' | 'register') => {
    setCurrentPage(page);
  };

  // Clonando os componentes e passando função de navegação via props seria ideal,
  // mas por ora vamos interceptar os cliques nos links
  const renderPage = () => {
    if (currentPage === 'register') {
      return <Register />;
    }
    return <Login />;
  };

  // Adicionar event listener para interceptar cliques nos links
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const text = target.textContent;
      if (text === 'Criar conta') {
        e.preventDefault();
        handleNavigation('register');
      } else if (text === 'Fazer login') {
        e.preventDefault();
        handleNavigation('login');
      }
    }
  };

  return <div onClick={handleClick}>{renderPage()}</div>;
}

export default App;
