import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkChatMessages, aiRequest } from './utils'; // aiRequest is imported for completeness, though not directly spied on in these tests for checkChatMessages
import type { User } from './types';
import { API_URL } from '@/config';

// Mock the global fetch function
global.fetch = vi.fn();

const mockUser: User = {
  id: 'test-user-id', // Added id to satisfy User type if it's from Supabase
  access_token: 'test_token',
  email: 'test@example.com', // Added email
  // Add other properties as required by User type, or cast more broadly
  // For this test, access_token is the most critical from User.
  user_metadata: { user_name: 'TestUserMetadata' }
} as User; // Using 'as User' for simplicity if User type is complex

const mockUserName = 'TestUser';

describe('checkChatMessages', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockClear(); // Clear mock usage history before each test
  });

  it('should call aiRequest (via fetch) with empty userInput and return transformed messages on successful fetch', async () => {
    const mockApiResponse = {
      responses: [
        { personality: 'sender1', response: 'message1' },
        { personality: 'sender2', response: 'message2' },
      ],
    };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
      status: 200, // Added status for completeness
      headers: new Headers(), // Added headers for completeness
      redirected: false, // Added redirected for completeness
      statusText: "OK", // Added statusText for completeness
      type: "default", // Added type for completeness
      url: API_URL, // Added url for completeness
      clone: function() { return this; }, // Added clone for completeness
      body: null, // Added body for completeness
      bodyUsed: false, // Added bodyUsed for completeness
      arrayBuffer: async () => new ArrayBuffer(0), // Added arrayBuffer for completeness
      blob: async () => new Blob(), // Added blob for completeness
      formData: async () => new FormData(), // Added formData for completeness
      text: async () => JSON.stringify(mockApiResponse), // Added text for completeness
    } as Response);

    const messages = await checkChatMessages(mockUserName, mockUser);

    expect(fetch).toHaveBeenCalledWith(
      API_URL,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ userInput: '', userName: mockUserName }),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'authorization': `Bearer ${mockUser.access_token}`,
        }),
      })
    );
    expect(messages).toHaveLength(2);
    expect(messages[0].content).toBe('message1');
    expect(messages[0].sender).toBe('sender1');
    expect(messages[0].timestamp).toBeTypeOf('number'); // Check timestamp type
  });

  it('should return a system error message if fetch fails (simulating aiRequest catch block)', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
      headers: new Headers(),
      redirected: false,
      statusText: "Internal Server Error",
      type: "default",
      url: API_URL,
      clone: function() { return this; },
      body: null,
      bodyUsed: false,
      arrayBuffer: async () => new ArrayBuffer(0),
      blob: async () => new Blob(),
      formData: async () => new FormData(),
      text: async () => JSON.stringify({ error: 'Server error' }),
    } as Response);

    const messages = await checkChatMessages(mockUserName, mockUser);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(messages).toHaveLength(1);
    expect(messages[0].content).toBe('Sorry, I couldn\'t process your request at this time.');
    expect(messages[0].sender).toBe('System');
    expect(messages[0].timestamp).toBeTypeOf('number');
  });

  it('should return an empty array if API returns no messages', async () => {
    const mockApiResponse = { responses: [] };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
      status: 200,
      headers: new Headers(),
      redirected: false,
      statusText: "OK",
      type: "default",
      url: API_URL,
      clone: function() { return this; },
      body: null,
      bodyUsed: false,
      arrayBuffer: async () => new ArrayBuffer(0),
      blob: async () => new Blob(),
      formData: async () => new FormData(),
      text: async () => JSON.stringify(mockApiResponse),
    } as Response);

    const messages = await checkChatMessages(mockUserName, mockUser);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(messages).toEqual([]);
  });

  // Test for debug mode (optional, but good for coverage of aiRequest through checkChatMessages)
  it('should include debug flag in fetch body when isDebugMode returns true', async () => {
    // Mock isDebugMode if it's imported and used by aiRequest, or control via URL mock if feasible
    // For simplicity, this test assumes isDebugMode might affect the body.
    // Need to mock isDebugMode from './utils'
    const utils = await vi.importActual<typeof import('./utils')>('./utils');
    const isDebugModeSpy = vi.spyOn(utils, 'isDebugMode').mockReturnValue(true);

    const mockApiResponse = { responses: [] };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
      // ... other Response properties
    } as Response);

    await checkChatMessages(mockUserName, mockUser);

    expect(fetch).toHaveBeenCalledWith(
      API_URL,
      expect.objectContaining({
        body: JSON.stringify({ userInput: '', userName: mockUserName, debug: "true" }),
      })
    );
    isDebugModeSpy.mockRestore(); // Clean up spy
  });
});
