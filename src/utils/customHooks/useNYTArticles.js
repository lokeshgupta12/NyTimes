import { useState, useEffect } from 'react';
import axios from 'axios';
import { useListData } from '../context';
import constant from '../../constants/index';

const useNYTArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setListData } = useListData();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${constant.API_URL}${process.env.REACT_APP_SECRET_KEY}`);
        setArticles(response.data.results);
        setListData(response.data.results);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
};

export default useNYTArticles;
