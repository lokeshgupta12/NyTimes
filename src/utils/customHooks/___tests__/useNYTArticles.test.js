/* eslint-disable */

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

    const { result } = renderHook(() => useNYTArticles());

   await new Promise((resolve) => setTimeout(resolve, 500));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle API error and set error state variable', async () => {
    mockAxios.onGet().reply(500);

    const { result } = renderHook(() => useNYTArticles());

   await new Promise((resolve) => setTimeout(resolve, 500));

    expect(result.current.articles).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeTruthy();
    expect(useListData().setListData).not.toHaveBeenCalled();
  });
});

