export function initAuth(axiosInstance) {
  const token = localStorage.getItem('jwt_token');
  if (token && axiosInstance) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}