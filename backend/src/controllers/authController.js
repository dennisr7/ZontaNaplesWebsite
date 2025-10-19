import jwt from 'jsonwebtoken';
import { comparePass } from '../utils/hashPassword.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //if they miss email or password
        if(!email || !password) {
            return res.status(400).json({ error: 'email and password are required' }); //400 means bad request
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassHash = process.env.ADMIN_PASSWORD_HASH;

        if(!adminEmail || !adminPassHash) {
            console.error("Admin email or pass hash missing in env");
            return res.status(500).json({ error: 'server config error' }); //code of 500 means server error
        }

        if(email.toLowerCase() !== adminEmail.toLowerCase()) {
            return res.status(401).json({ 
                success: false,
                error: 'Invalid email'
             }); //401 means unauthorized
        }

        if(!(await comparePass(password, adminPassHash))) {
            return res.status(401).json({
                success: false,
                error: 'Invalid password'
            });
        }

        const token = jwt.sign(
            {
                id: 'admin_1',
                email: adminEmail,
                role: 'admin'
            }, 

            process.env.JWT_SECRET,

            { 
                expiresIn: process.env.JWT_EXPIRE 
            }
        )

        console.log(`logged in successfully: ${email}`);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token, 
                admin: {
                    email: adminEmail,
                    role: 'admin'
                },
                expiresIn: process.env.JWT_EXPIRE
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        next(error); //pass to global error handler
    }
};

export const logout = (req, res) => {
    //for JWT, logout is handled on client side by deleting the token
    res.json({
        success: true,
        message: 'Logout successful'
    });
};

export const testAuthEndpoint = (req, res) => {
    res.json({
        success: true,
        message: 'auth api working',
        endpoints: {
            login: '/api/auth/login',
            logout: '/api/auth/logout',
        }
    });
};