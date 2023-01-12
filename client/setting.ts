
const isProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: isProd ? '' : '',
  apiBasePath: isProd ? '' : 'http://localhost:8080',
};

export default setting;
