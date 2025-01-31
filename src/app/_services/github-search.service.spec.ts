import { expect } from '@jest/globals';
import { GithubSearchService } from './github-search.service';
import { mockResponse } from '../_mockData/mockResponse';

describe('GithubSearchService', () => {
  let service: GithubSearchService;

  beforeEach(() => {
    service = new GithubSearchService();
    // Mock the global fetch function to simulate the API response
    global.fetch = jest.fn();
  });

  it('should return repository search results when successful', async () => {
    // Simulate a successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    // Call the searchRepositories method
    const result = await service.searchRepositories('angular').toPromise();

    // Assert that the result matches the mock response
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=angular',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/vnd.github+json',
        }),
      })
    );
  });

  it('should suppress console.error logs when an error occurs', async () => {
    // Simulate a failed fetch response with a 500 status
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.reject(new Error('Internal Server Error')),
    });

    // Spy on console.error to ensure no errors are logged to the console during the test
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Call the searchRepositories method
    await service.searchRepositories('angular').toPromise();

    // Check that console.error was called with the expected error
    expect(consoleSpy).toHaveBeenCalledWith(
      'GitHub API Error:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
