#   Step 01: Fix a Schema for the project backend and make pictorial representation

##   Creating production grade project of youtube clone

[model link](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)

<!-- CORS = Cross origin resource sharing -->


## Quick notes

-   slash is not required at the end of mongodb connection string in .env
-   

## Overview of the statuscode
-   01. Information responses (100 - 199)
-   02. Successful responses  (200 - 299)
-   03. Redirection messages  (300 - 399)
-   04. Client error response (400 - 499)
-   05. Server error response (500 - 599)

#   Step 02: Add all packages and setup account for production grade code like mongodb aggregation pipeline, hashing password through bcrypt and jwt

## Aggregation Pipeline
The true power of mongodb are Aggregation pipelines, for this we are using page "Aggregation-pagination-v2" using command ```npm i mongoose-aggregate-paginate-v2```

-   (Aggregation pipeline link)[Link](https://www.npmjs.com/package/mongoose-aggregate-paginate-v2)

## Password Hashing
-   Bcrypt
    -   ```npm i bcrypt```

-   jsonwebtoken
    -   ```npm i jsonwebtoken```
    -   note: JWT is a "bearer token", used to decode, verify and generate JWT.

    -   For refresh tokens
        -   [link](https://jwt.io)

## Middleware
-   Pre middleware [link](https://mongoosejs.com/docs/middleware.html#pre)
    -   we are not encrypting directly the passwords so we are using "pre middleware"

#   Step 03: setup cloudinary, multer for image handling.
-   check documentation


##  Error 01: App is crashing due to error in asyncHandler
-   The error was that we are not returning hightorder function [File link](src\utils\asyncHandler.js)

```
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

```


# Step 04: Step to register user
###       steps to register user pseudocode
    1. get user details from frontend
    2. validation of input received
    3. check if user already exits: check both email and username
    4. check for images, check for avatar
    5. upload images to cloudinary if the available
            a. check whether user uploaded avatar
            b. if user uploaded, whether multer uploaded it to cloudinary
            c. if uploaded to cloudinary, do we have url of cloudinary or not
    6. create user object - create entry in db
    7. remove password and refresh token field from response
    8. check for user creation if yes continue, if not created handle the error
    9. if user created return response

