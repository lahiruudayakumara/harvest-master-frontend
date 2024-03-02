const config = {
    verbose: true,
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
  
  export default config;
  