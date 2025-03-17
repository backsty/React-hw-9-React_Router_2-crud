import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode умышленно удален для предотвращения двойных запросов
  <App />,
);
