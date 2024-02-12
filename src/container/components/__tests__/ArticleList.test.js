/* eslint-disable */

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ArticleList from '../ArticleList';
import useNYTArticles from '../../../utils/customHooks/useNYTArticles';
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));
jest.mock('../../../utils/customHooks/useNYTArticles');

describe('ArticleList component', () => {
  test('renders loading state', () => {

    useNYTArticles.mockReturnValue({ articles: [], loading: true, error: null });

    render(
      <Router>
        <ArticleList />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
 
    useNYTArticles.mockReturnValue({ articles: [], loading: false, error: 'Error message' });

    render(
      <Router>
        <ArticleList />
      </Router>
    );

    expect(screen.getByText('API throwing error')).toBeInTheDocument();
  });

  test('renders articles', async () => {

    const mockArticles = [
      {
        id: 1,
        title: 'Test Article 1',
        abstract: 'This is a test abstract 1',
        media: [{ 'media-metadata': [{ url: 'image1.jpg' }] }],
      },
      {
        id: 2,
        title: 'Test Article 2',
        abstract: 'This is a test abstract 2',
        media: [{ 'media-metadata': [{ url: 'image2.jpg' }, { url: 'image2.jpg' }] }],
      },
    ];

    useNYTArticles.mockReturnValue({ articles: mockArticles, loading: false, error: null });

    render(
      <Router>
        <ArticleList />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
      expect(screen.getByText('This is a test abstract 1')).toBeInTheDocument();
      expect(screen.getByText('Test Article 2')).toBeInTheDocument();
      expect(screen.getByText('This is a test abstract 2')).toBeInTheDocument();
    });
  });
  test('navigates to correct URL when card is clicked', () => {
    const mockArticles = [
      { id: 1, title: 'Article 1', abstract: 'Abstract 1', media: [{ 'media-metadata': [{ url: 'image1.jpg' }] }] },
      { id: 2, title: 'Article 2', abstract: 'Abstract 2', media: [{ 'media-metadata': [{ url: 'image2.jpg' }] }] },
    ];

    useNYTArticles.mockReturnValue({ articles: mockArticles, loading: false, error: null });

    render(<ArticleList />);

    fireEvent.click(document.querySelector('.MuiCard-root'));

    expect(mockedNavigate).toHaveBeenCalledWith('/articleDetails/1');
  });
});


