const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API Documentation',
    version: '1.0.0',
    description: 'API documentation for E-commerce application',
  },
  servers: [
    {
      url: 'https://triveous-pkof.onrender.com/', // Change this URL as needed
      description: 'Local development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./controllers/*.js'], // Replace with the actual path to your route files
};




const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec, swaggerUi };
