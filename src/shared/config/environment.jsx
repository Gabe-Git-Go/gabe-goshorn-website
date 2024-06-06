//Change local to your local for your server
export const getEnvironment = () => {

    const environment = {
        env: window.location.href.includes('local')? 'local':'prod',
        API_BASE_URL: ''
    }
    switch (environment.env) {
        case 'prod':
          environment.API_BASE_URL = 'https://www.gabegoshorn.com'
          break;
        default:
          environment.API_BASE_URL = 'http://localhost:8080'
    }

    return environment;
}

