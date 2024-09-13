// Import swaggerJSDoc to initialize the swagger specification from JSDoc comments
import  swaggerJSDoc from 'swagger-jsdoc';
// const APPLICATION_HOST = process.env.APPLICATION_HOST;
// const APPLICATION_PORT = process.env.APPLICATION_PORT;

// Define swagger definition using OpenAPI 3.0
const swaggerDefinition = {
    "openapi": "3.0.3",
    "info": {
        "title": "Restaurant Management API",
        "description": "API documentation for managing raw materials, stock tracking, and notifications for a restaurant management system.",
        "termsOfService": "http://example.com/terms/",
        "contact": {
            "email": "support@example.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "1.0.0"
    },
    "externalDocs": {
        "description": "Find out more about this API",
        "url": "http://example.com/docs"
    },
    "servers": [
        {
            "url": "http://localhost:4000",
            "description": "Development server"
        }
    ]
};

// Options for the swagger docs
const options = {
    swaggerDefinition, // Swagger definition defined above
    apis: ['./src/routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc with options
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
