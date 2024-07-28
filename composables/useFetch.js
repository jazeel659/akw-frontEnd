

export const fetchWithAuth = async (url, options = {}) => {
  const accessToken  = useCookie("access_token")
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken.value}`,
  };

  try {
    const response = await $fetch(url, {
      ...options,
      headers,
    });

    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        await refreshAccessToken();
        const retryResponse = await $fetch(url, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${useCookie('access_token').value}`,
          },
        });
        return retryResponse;
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};





const refreshAccessToken = async () => {
  
    const refreshToken = useCookie('refresh_token').value
  
    try {
      const response = await $fetch('http://localhost:7000/api/v1/user/refreshToken', {
        method: 'POST',
        body: { refreshToken },
      });
  
      const { token } = response;
      console.log(token);
      useCookie('access_token').value=token
  
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };
  