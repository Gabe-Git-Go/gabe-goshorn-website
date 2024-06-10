//Change local to your local for your server
export const getEnvironment = () => {

    const environment = {
        env: window.location.href.includes('local')? 'local':'prod',
        API_BASE_URL: ''
    }
    switch (environment.env) {
        case 'prod':
          environment.API_BASE_URL = process.env.REACT_APP_API_BASE_URL
          break;
        default:
          environment.API_BASE_URL = 'http://localhost:8080'
    }

    return environment;
}

