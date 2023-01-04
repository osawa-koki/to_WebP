
const idProd = process.env.NODE_ENV === 'production';

const setting = {
  isProd,
  basePath: isProd ? '' : '',
};
  
export default setting;
