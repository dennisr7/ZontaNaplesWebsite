import jwt from 'jsonwebtoken';

//this used for protected routes that require authentication
export const protect = (req, res, next) => {
    let token;
    
    //just checking if even has a token in the header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //since it exists, we can get the token from the bearer. since its in the form of "Bearer token" we split by space and get the second part
            token = req.headers.authorization.split(' ')[1];

            //need to verify the token is valid
            const decodedObject = jwt.verify(token, process.env.JWT_SECRET);

            //we add to deocoded object to request object
            req.admin = {
                id: decodedObject.id,
                email: decodedObject.email,
                role: decodedObject.role
            }

            console.log("Admin authenticated:", req.admin);
            next(); //can proceed to aother middleware or route handler

        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }
};

