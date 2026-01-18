declare global {
    interface Window {
        apiToken: string;
    }
}

export const url = "http://localhost:8080"; // point to spring boot backend
export const getApiToken = async () => "dummy-token"; // skip token check for now