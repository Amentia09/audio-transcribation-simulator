import { logger } from './logger';


const originalFetch = window.fetch;


export const setupHttpLogging = () => {
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const method = init?.method || 'GET';
    
    
    const isMinioRequest = url.includes('localhost:9000') || 
                          url.includes('minio') || 
                          url.includes('presigned') ||
                          url.includes('s3.amazonaws.com');

    if (isMinioRequest) {
      logger.info('HTTP запрос к MinIO', {
        component: 'HTTP',
        action: 'minio_request_start',
        url,
        method,
        headers: init?.headers
      });
    }

    try {
      const response = await originalFetch(input, init);
      
      if (isMinioRequest) {
        if (response.ok) {
          logger.info('HTTP запрос к MinIO успешен', {
            component: 'HTTP',
            action: 'minio_request_success',
            url,
            method,
            status: response.status,
            statusText: response.statusText
          });
        } else {
          logger.httpError(url, method, response.status, new Error(response.statusText));
        }
      }
      
      return response;
    } catch (error) {
      if (isMinioRequest) {
        logger.httpError(url, method, 0, error as Error);
      }
      throw error;
    }
  };
};


export const disableHttpLogging = () => {
  window.fetch = originalFetch;
};
