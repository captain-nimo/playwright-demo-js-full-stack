import { test, expect } from '@playwright/test';
import ApiClient from './clients/ApiClient.js';
import Logger from '../../utils/logger.js';

const logger = Logger.getInstance();

test.describe('@api API Automation Examples', () => {
  let apiClient;

  test.beforeEach(async () => {
    apiClient = new ApiClient('https://jsonplaceholder.typicode.com');
  });

  test('@smoke should get single post', async () => {
    logger.info('Starting test: should get single post');

    const response = await apiClient.get('/posts/1');

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('body');

    logger.info('✓ Successfully retrieved single post');
  });

  test('@smoke should get posts list', async () => {
    logger.info('Starting test: should get posts list');

    const response = await apiClient.get('/posts', { _limit: 5 });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(5);

    logger.info(`✓ Retrieved ${response.data.length} posts`);
  });

  test('@smoke should get with query params', async () => {
    logger.info('Starting test: should get with query params');

    const response = await apiClient.get('/posts', { userId: 1, _limit: 3 });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.every(post => post.userId === 1)).toBe(true);

    logger.info('✓ Retrieved posts for userId=1');
  });

  test('@smoke should create resource', async () => {
    logger.info('Starting test: should create resource');

    const payload = {
      title: 'Test Post',
      body: 'This is a test post',
      userId: 1,
    };

    const response = await apiClient.post('/posts', payload);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.title).toBe('Test Post');

    logger.info(`✓ Successfully created resource with ID: ${response.data.id}`);
  });

  test('@smoke should update resource', async () => {
    logger.info('Starting test: should update resource');

    const payload = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1,
    };

    const response = await apiClient.put('/posts/1', payload);

    expect(response.status).toBe(200);
    expect(response.data.title).toBe('Updated Title');

    logger.info('✓ Successfully updated resource');
  });

  test('should delete resource', async () => {
    logger.info('Starting test: should delete resource');

    const response = await apiClient.delete('/posts/1');

    expect(response.status).toBe(200);

    logger.info('✓ Successfully deleted resource');
  });

  test('should get user information', async () => {
    logger.info('Starting test: should get user information');

    const response = await apiClient.get('/users/1');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('email');
    expect(response.data).toHaveProperty('phone');

    logger.info(`✓ Retrieved user: ${response.data.name}`);
  });

  test('should get all comments for a post', async () => {
    logger.info('Starting test: should get all comments for a post');

    const response = await apiClient.get('/posts/1/comments');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty('postId', 1);

    logger.info(`✓ Retrieved ${response.data.length} comments for post 1`);
  });

  test('should handle 404 error', async () => {
    logger.info('Starting test: should handle 404 error');

    try {
      await apiClient.get('/posts/9999');
      throw new Error('Expected a 404 error');
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(404);
        logger.info('✓ Successfully handled 404 error');
      } else {
        throw error;
      }
    }
  });

  test('should validate response structure', async () => {
    logger.info('Starting test: should validate response structure');

    const response = await apiClient.get('/posts/1');

    const post = response.data;
    expect(post).toMatchObject({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });

    logger.info('✓ Response structure is valid');
  });

  test('should handle partial update with PATCH', async () => {
    logger.info('Starting test: should handle partial update with PATCH');

    const payload = { title: 'Patched Title' };
    const response = await apiClient.patch('/posts/1', payload);

    expect(response.status).toBe(200);
    expect(response.data.title).toBe('Patched Title');

    logger.info('✓ Successfully performed partial update');
  });

  test('should set custom headers', async () => {
    logger.info('Starting test: should set custom headers');

    const client = new ApiClient('https://jsonplaceholder.typicode.com', null, {
      'X-Custom-Header': 'test-value',
    });

    const response = await client.get('/posts/1');

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);

    logger.info('✓ Successfully set custom headers');
  });
});

