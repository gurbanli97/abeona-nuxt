export default function ({ $axios,store, error: nuxtError }) {
    $axios.onRequest(config => {
      config.headers['Content-Type'] = 'application/json';
<<<<<<< HEAD
    });
  
    // $axios.onError(error => {
    //   nuxtError({
    //     statusCode: (error.response && error.response.status) || 500,
    //     message: error.message || 'Server error',
    //   });
    // });
  }
=======
      config.headers['Authorization'] = 'Token'
    });
  
    $axios.onError(error => {
      nuxtError({
        statusCode: (error.response && error.response.status) || 500,
        message: error.message || 'Server error',
      });
    });
  }
>>>>>>> 83a2e651eda14df9bfe789c029c2be5aaab82966
