export const url = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; // point to spring boot backend
export const getApiToken = async () => "dummy-token"; // skip token check for now
