import { CSSProperties } from "react";

export const styles: {
  container: CSSProperties;
  heading: CSSProperties;
  buttonContainer: CSSProperties;
  primaryButton: (isLoading: boolean) => CSSProperties;
  secondaryButton: (isLoading: boolean) => CSSProperties;
  errorContainer: CSSProperties;
  responseContainer: CSSProperties;
  responseHeading: CSSProperties;
  statusContainer: CSSProperties;
  statusBadge: (isSuccess: boolean) => CSSProperties;
  label: CSSProperties;
  codeBlock: CSSProperties;
  bodyContainer: CSSProperties;
  unauthorizedContainer: CSSProperties;
  unauthorizedHeading: CSSProperties;
  unauthorizedMessage: CSSProperties;
  unauthorizedTip: CSSProperties;
} = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
  },
  buttonContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
  },
  primaryButton: (isLoading: boolean): CSSProperties => ({
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    fontWeight: "500",
    border: "none",
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.5 : 1,
  }),
  secondaryButton: (isLoading: boolean): CSSProperties => ({
    backgroundColor: "#6b7280",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    fontWeight: "500",
    border: "none",
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.5 : 1,
  }),
  errorContainer: {
    backgroundColor: "#fee2e2",
    border: "1px solid #ef4444",
    color: "#b91c1c",
    padding: "12px 16px",
    borderRadius: "4px",
    marginBottom: "16px",
  },
  responseContainer: {
    backgroundColor: "#f3f4f6",
    padding: "16px",
    borderRadius: "8px",
  },
  responseHeading: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  statusContainer: {
    marginBottom: "8px",
  },
  statusBadge: (isSuccess: boolean): CSSProperties => ({
    marginLeft: "8px",
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: isSuccess ? "#10b981" : "#ef4444",
    color: "white",
  }),
  label: {
    fontWeight: "bold",
    marginBottom: "4px",
  },
  codeBlock: {
    backgroundColor: "#e5e7eb",
    padding: "8px",
    borderRadius: "4px",
    overflowX: "auto",
  },
  bodyContainer: {
    maxHeight: "200px",
    overflow: "auto",
    marginTop: "16px",
  },
  unauthorizedContainer: {
    marginTop: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff8e1",
    border: "1px solid #ffd54f",
  },
  unauthorizedHeading: {
    color: "#ff8f00",
    margin: "0 0 10px 0",
    fontSize: 18,
  },
  unauthorizedMessage: {
    fontSize: 14,
    lineHeight: "1.4",
  },
  unauthorizedTip: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
};
