import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[iDESIGN ErrorBoundary]", error, info.componentStack);
    this.props.onError?.(error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 2rem", background: "#faf8f4", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(200,165,74,0.12)", border: "1.5px solid #c8a54a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: "1.5rem" }}>⚠</div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a54a", marginBottom: "0.75rem" }}>— Something went wrong</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: "#1a1814", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>This section failed to load</h2>
          <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "#6a6460", maxWidth: "420px", lineHeight: "1.7", marginBottom: "2rem" }}>
            We are sorry for the inconvenience. Please try reloading the page, or reach us on{" "}
            <a href="https://wa.me/233502310663" target="_blank" rel="noreferrer" style={{ color: "#c8a54a", textDecoration: "none" }}>WhatsApp</a>{" "}if the issue persists.
          </p>
          {this.state.error && (
            <details style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#aaa", background: "#f0ede8", border: "1px solid #e0dbd2", borderRadius: "4px", padding: "0.75rem 1rem", maxWidth: "520px", marginBottom: "1.5rem", textAlign: "left", cursor: "pointer" }}>
              <summary style={{ marginBottom: "0.5rem", color: "#888" }}>Technical details</summary>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{this.state.error.message}</pre>
            </details>
          )}
          <button onClick={this.handleReset} style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.85rem 2rem", background: "#c8a54a", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
