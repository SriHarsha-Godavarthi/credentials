import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import config from "../config.js";
import mysql from 'mysql2/promise';

const pool =mysql.createPool(
    {
        host     : config.DB_HOST,
        user     : config.DB_USER,
        password : config.DB_PASSWORD,
        database : config.DB_NAME
      
    }
)


export const auth={
    registerUser: async(req,res)=>{
        const { email, password } = req.body;
    
        try {
        // Check if user already exists
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length > 0) 
            return res.status(400).json({ error: 'User already exists' });
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const id=uuidv4(); 
        console.log("creted id",id);
        await pool.query('INSERT INTO users (id,email, password) VALUES (?, ?, ?)', [id,email, hashedPassword]);
    
        res.status(201).json({ message: 'User registered successfully' ,id,email});
    
       }catch(err){
        console.error(err);
        res.status(500).json({ error: 'error during registration' });
    
       }
    
    
    },
    login:  async(req,res)=>{
        const { email, password } = req.body;
        try{
        const users = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if(users.length==0) return res.status("401").json({error:"Invalid user"})
        const user=users[0][0]
        // Compare password
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) 
            return res.status(401).json({ error: 'Invalid Password' });
        console.log("fetched user",user);
    
            // Generate JWT token
        const token = jwt.sign(
                { id: user.id, email: user.email },
                config.JWT_SECRET_KEY,
                { expiresIn: '1h',algorithm:"HS256" }
        );
          
        res.json({ message: 'Login successful', token }); 
        }catch(err){
            console.error(err);
            return res.status(401).json({error:"Database connection error for login"})
        }     
    },
    authenticateToken: (req, res, next) => {
        // 1. Get the Authorization header
        const authHeader = req.headers['authorization'];
        // 2. Extract the token part (assuming "Bearer <token>")
        const token = authHeader && authHeader.split(' ')[1];
        // 3. Check if token is present
        if (!token) {
          return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
      
        // 4. Verify token
        jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
          if (err) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
          }
      
          // 5. Attach user info to request object
          req.user = user;
          // 6. Proceed to the next middleware or route handler
          next();
        });
    }
}