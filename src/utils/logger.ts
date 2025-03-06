import Toast from 'react-native-toast-message';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  showToast?: boolean;
  toastDuration?: number;
}

class Logger {
  private isDevelopment = __DEV__;

  private log(level: LogLevel, message: string, error?: Error, options: LogOptions = {}) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

    if (this.isDevelopment) {
      switch (level) {
        case 'debug':
          console.log(logMessage);
          break;
        case 'info':
          console.info(logMessage);
          break;
        case 'warn':
          console.warn(logMessage);
          break;
        case 'error':
          console.error(logMessage, error);
          break;
      }
    }

    // Show toast for info, warnings and errors if requested
    if (options.showToast && (level === 'info' || level === 'warn' || level === 'error')) {
      Toast.show({
        type: level === 'error' ? 'error' : 'success',
        text1: message,
        position: 'bottom',
        visibilityTime: options.toastDuration || 3000,
      });
    }

    // Here you could add remote logging service integration
    // if (!this.isDevelopment) {
    //   sendToRemoteLoggingService(level, message, error);
    // }
  }

  debug(message: string): void {
    this.log('debug', message);
  }

  info(message: string, options?: LogOptions): void {
    this.log('info', message, undefined, options);
  }

  warn(message: string, options?: LogOptions): void {
    this.log('warn', message, undefined, options);
  }

  error(message: string, error?: Error, options?: LogOptions): void {
    this.log('error', message, error, options);
  }
}

export const logger = new Logger(); 