# Julia Rogers – INF653 Final Project

## Project Overview  
This project is a RESTful API built with Node.js, Express, and MongoDB. It serves U.S. state data from a provided static statesData.json file and allows users to perform CRUD operations on additional "fun facts" stored in a MongoDB Atlas collection.

The backend uses:
- Node.js
- Express
- MongoDB Atlas
- Mongoose for the schema/model
- dotenv for secure environment configuration

## API Structure  
All responses are in JSON format unless otherwise specified. The base URL is:  
https://juliarogers-inf653vd-finalproject.onrender.com

### Key Endpoints

#### GET Requests:
- /states/ – all 50 states  
- /states?contig=true – contiguous states only  
- /states?contig=false – non-contiguous (AK, HI)  
- /states/:state – details for a single state  
- /states/:state/funfact – random fun fact for a state  
- /states/:state/capital  
- /states/:state/nickname  
- /states/:state/population  
- /states/:state/admission

#### POST Request:
- /states/:state/funfact – Add one or more fun facts to a state

#### PATCH Request:
- /states/:state/funfact – Update a fun fact by index

#### DELETE Request:
- /states/:state/funfact – Delete a fun fact by index

## MongoDB Schema  
The States model includes:
- stateCode – required, unique (e.g., 'KS')  
- funfacts – array of strings

## Deployment  
The project is deployed using [Render](https://render.com), with environment variables set securely via the dashboard. It passed 56 out of 70 automated tests at time of submission.

## GitHub Repository  
[View the code on GitHub](https://github.com/JuliaRogers13/JuliaRogers_INF653VD_FinalProject)

## Live API  
🔗 [Visit the deployed API](https://juliarogers-inf653vd-finalproject.onrender.com)

## Author  
**Julia Rogers**
