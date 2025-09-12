export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

export interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: string;
  [key: string]: any;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error) {
    const formattedMessage = this.formatMessage(level, message, context);
    
    
    if (this.isDevelopment) {
      switch (level) {
        case LogLevel.ERROR:
          console.error(formattedMessage, error || '');
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage);
          break;
        case LogLevel.DEBUG:
          console.debug(formattedMessage);
          break;
        default:
          console.log(formattedMessage);
      }
    } else {
      
      if (level === LogLevel.ERROR || level === LogLevel.WARN) {
        console.error(formattedMessage, error || '');
      }
    }
  }

  info(message: string, context?: LogContext) {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, context?: LogContext, error?: Error) {
    this.log(LogLevel.ERROR, message, context, error);
  }

  debug(message: string, context?: LogContext) {
    this.log(LogLevel.DEBUG, message, context);
  }

  
  uploadStart(filename: string, fileSize: number, mimeType: string) {
    this.info('Начало загрузки файла', {
      component: 'UploadForm',
      action: 'upload_start',
      filename,
      fileSize,
      mimeType
    });
  }

  uploadProgress(filename: string, progress: number) {
    this.debug('Прогресс загрузки', {
      component: 'UploadForm',
      action: 'upload_progress',
      filename,
      progress: `${progress}%`
    });
  }

  uploadSuccess(filename: string, jobId: string, uploadUrl: string) {
    this.info('Файл успешно загружен', {
      component: 'UploadForm',
      action: 'upload_success',
      filename,
      jobId,
      uploadUrl
    });
  }

  uploadError(filename: string, error: Error, context?: LogContext) {
    this.error('Ошибка при загрузке файла', {
      component: 'UploadForm',
      action: 'upload_error',
      filename,
      ...context
    }, error);
  }

  apolloError(operation: string, error: Error, variables?: any) {
    this.error('Ошибка Apollo Client', {
      component: 'ApolloClient',
      action: operation,
      variables
    }, error);
  }

  httpError(url: string, method: string, status: number, error: Error) {
    this.error('HTTP ошибка', {
      component: 'HTTP',
      action: 'http_request',
      url,
      method,
      status
    }, error);
  }
}

export const logger = new Logger();
