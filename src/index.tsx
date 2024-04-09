import ReactDOM from 'react-dom/client';
import App from './App';

const rootDOMElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootDOMElement);
root.render(<App />);