import express from 'express';
import cors from 'cors';
import memberRoutes from './src/routes/members.js';
import eventRoutes from './src/routes/events.js';
import scholarshipRoutes from './src/routes/scholarship.js';
import authRoutes from './src/routes/auth.js';


const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: false
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if(process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Zonta Club of Naples API",
        version: "1.0.0",
        endpoints: {
            health: "/health",
            api: "/api"
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString() 
    });
});

// API Routes
app.use('/api/members', memberRoutes);

app.use('/api/events', eventRoutes);

app.use('/api/scholarship', scholarshipRoutes);

app.use('/api/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.path 
    });
});

// Global error handler/middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    
    res.status(statusCode).json({ 
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // what does this do
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Email configured: ${process.env.EMAIL_USER}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
