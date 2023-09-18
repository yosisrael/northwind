import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import interceptors from './Utils/Interceptors';
import './index.css';

interceptors.create();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <HashRouter>
        <Layout />
    </HashRouter>
    // {/* </React.StrictMode> */}
);