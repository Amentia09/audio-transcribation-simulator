import { logger } from './logger';


export const setupGlobalErrorHandling = () => {
  
  window.addEventListener('error', (event) => {
    logger.error('Необработанная ошибка JavaScript', {
      component: 'GlobalErrorHandler',
      action: 'unhandled_error',
      errorType: 'JavaScript Error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack
    }, event.error);
  });

  
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Необработанное отклонение промиса', {
      component: 'GlobalErrorHandler',
      action: 'unhandled_promise_rejection',
      reason: event.reason,
      promise: event.promise
    }, event.reason instanceof Error ? event.reason : new Error(String(event.reason)));
  });

  
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      logger.error('Ошибка загрузки ресурса', {
        component: 'GlobalErrorHandler',
        action: 'resource_load_error',
        target: event.target?.constructor.name,
        src: (event.target as any)?.src,
        href: (event.target as any)?.href
      });
    }
  }, true);

  logger.info('Глобальная обработка ошибок настроена', {
    component: 'GlobalErrorHandler',
    action: 'setup_complete'
  });
};
