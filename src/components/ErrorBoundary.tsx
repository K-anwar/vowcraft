import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4 text-center">
            <div>
              <p className="text-4xl mb-4">😢</p>
              <h2 className="text-2xl font-bold text-pink-600">Terjadi kesalahan</h2>
              <p className="mt-2 text-gray-600">Silakan refresh halaman atau coba lagi nanti.</p>
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-4 text-left text-sm text-gray-500">
                  <summary>Detail Error</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded">{this.state.error.message}</pre>
                </details>
              )}
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}