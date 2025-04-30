import { get } from "aws-amplify/api";
import { useState } from "react";
import { styles } from "./styles";
import { ApiState, ApiResponse, AmplifyApiError } from "./types";

function App() {
  const [state, setState] = useState<ApiState>({
    loading: false,
    response: null,
    parsedBody: null,
    error: null,
  });

  const fetchWithToken = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const getOperation = get({
        apiName: "myRestApi",
        path: "/foo-resource",
        options: {
          headers: {
            Authorization: `Bearer ${"valid-token"}`,
          },
        },
      });

      const response = await getOperation.response;
      const parsedBody = await response.body.json();

      setState({
        loading: false,
        response: response as ApiResponse,
        parsedBody,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setState({
        loading: false,
        response: null,
        parsedBody: null,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  const fetchWithoutToken = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const getOperation = get({
        apiName: "myRestApi",
        path: "/foo-resource",
        // No authorization header
      });

      const response = await getOperation.response;

      // This line shouldn't be reachable in this demo
      console.log("response without token", response);
    } catch (error) {
      const err = error as AmplifyApiError;
      console.error("Error fetching data:", err);

      if (err._response) {
        try {
          const responseData: ApiResponse = {
            statusCode: err._response.statusCode,
            headers: err._response.headers,
            body: null,
          };

          responseData.body = JSON.parse(err._response.body);

          setState({
            loading: false,
            response: responseData,
            parsedBody: responseData.body,
            error: null,
          });
        } catch (parseError) {
          console.error("Failed to parse error body:", parseError);
          setState({
            loading: false,
            response: null,
            parsedBody: null,
            error: "Failed to parse response body",
          });
        }
      } else {
        setState({
          loading: false,
          response: null,
          parsedBody: null,
          error: err.message || "Unknown error occurred",
        });
      }
    }
  };

  const isSuccessStatus = state.response?.statusCode
    ? state.response.statusCode >= 200 && state.response.statusCode < 300
    : false;

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>
        Amplify REST API with Custom Authorizer Demo
      </h1>

      <div style={styles.buttonContainer}>
        <button
          onClick={fetchWithToken}
          disabled={state.loading}
          style={styles.primaryButton(state.loading)}
        >
          {state.loading ? "Loading..." : "Fetch with token"}
        </button>
        <button
          onClick={fetchWithoutToken}
          disabled={state.loading}
          style={styles.secondaryButton(state.loading)}
        >
          {state.loading ? "Loading..." : "Fetch without token"}
        </button>
      </div>

      {state.error && (
        <div style={styles.errorContainer}>
          <p>
            <strong>Error:</strong> {state.error}
          </p>
        </div>
      )}

      {state.response && state.response.statusCode === 403 && (
        <div style={styles.unauthorizedContainer}>
          <h2 style={styles.unauthorizedHeading}>Unauthorized Request</h2>
          <div style={styles.unauthorizedMessage}>
            <p>
              <span role="img" aria-label="Warning">
                ⚠️
              </span>{" "}
              {state.parsedBody?.message ||
                "You are not authorized to access this resource"}
            </p>
            <p style={styles.unauthorizedTip}>
              Please try again with a valid authorization token.
            </p>
          </div>
        </div>
      )}

      {state.response && (
        <div style={styles.responseContainer}>
          <h2 style={styles.responseHeading}>Response:</h2>
          <div style={styles.statusContainer}>
            <span style={{ fontWeight: "bold" }}>Status Code:</span>
            <span style={styles.statusBadge(isSuccessStatus)}>
              {state.response.statusCode}
            </span>
          </div>
          <div>
            <p style={styles.label}>Headers:</p>
            <pre style={styles.codeBlock}>
              {JSON.stringify(state.response.headers, null, 2)}
            </pre>
          </div>
          {state.parsedBody && (
            <div style={styles.bodyContainer}>
              <p style={styles.label}>Body:</p>
              <pre style={styles.codeBlock}>
                {JSON.stringify(state.parsedBody, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
