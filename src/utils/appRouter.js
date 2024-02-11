import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticleList from '../container/components/ArticleList';
import ArticleDetails from '../container/components/ArticleDetails';

function AppRouter() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<ArticleList />} />
          <Route excat path="/articleDetails/:id" element={<ArticleDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
