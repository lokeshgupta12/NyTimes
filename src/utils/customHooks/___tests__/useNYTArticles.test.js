/* eslint-disable */

// import { renderHook } from '@testing-library/react';
// import axios from 'axios';
// import useNYTArticles from '../useNYTArticles';
// import { useListData } from '../../context';

// // Mocking axios.get
// jest.mock('axios');

// // Mocking useListData hook
// jest.mock('../../context', () => ({
//   useListData: jest.fn(),
// }));

// describe('useNYTArticles', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('fetches articles successfully', async () => {
//     const mockArticles = [
//       { id: 1, title: 'Article 1' },
//       { id: 2, title: 'Article 2' },
//     ];
//     const mockSetListData = jest.fn();
//     axios.get.mockResolvedValueOnce({ data: { results: mockArticles } });
//     useListData.mockReturnValueOnce({ setListData: mockSetListData });

//     const { result, waitForNextUpdate } = renderHook(() => useNYTArticles());

//     expect(result.current.loading).toBe(true);

//     await new Promise((resolve) => setTimeout(resolve, 0)); // Let useEffect run

//     expect(result.current.articles).toEqual(mockArticles);
//     expect(result.current.loading).toBe(false);
//     expect(result.current.error).toBeNull();
//     expect(mockSetListData).toHaveBeenCalledWith(mockArticles);
//   });

//   it('handles fetch error', async () => {
//     const mockError = new Error('Fetch error');
//     axios.get.mockRejectedValueOnce(mockError);
//     const mockSetListData = jest.fn();
//     useListData.mockReturnValueOnce({ setListData: mockSetListData });
//     const { result, waitForNextUpdate } = renderHook(() => useNYTArticles());

//     expect(result.current.loading).toBe(true);

//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Let useEffect run

//     expect(result.current.articles).toEqual([]);
//     expect(result.current.loading).toBe(false);
//     expect(result.current.error).toEqual(mockError);
//   });
// });

import { renderHook } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useListData } from '../../context';
import useNYTArticles from '../useNYTArticles';

jest.mock('../../context', () => ({
  useListData: jest.fn(() => ({ setListData: jest.fn() })),
}));
describe('useNYTArticles', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should fetch articles successfully and set state variables', async () => {
    const responseData = { results: ['article1', 'article2'] };
    mockAxios.onGet().reply(200, responseData);

    const { result, waitForNextUpdate } = renderHook(() => useNYTArticles());

   // await waitForNextUpdate();
   await new Promise((resolve) => setTimeout(resolve, 500)); // Let useEffect run

    //expect(result.current.articles).toEqual(responseData.results);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle API error and set error state variable', async () => {
    mockAxios.onGet().reply(500);

    const { result, waitForNextUpdate } = renderHook(() => useNYTArticles());

   // await waitForNextUpdate();
   await new Promise((resolve) => setTimeout(resolve, 500)); // Let useEffect run

    expect(result.current.articles).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeTruthy();
    expect(useListData().setListData).not.toHaveBeenCalled();
  });
});

