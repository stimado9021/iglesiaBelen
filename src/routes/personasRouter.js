import express from "express"
const router = express.Router();
//import {pool} from "../database.js"
import {Pool} from 'postgres-pool'

const pool = new Pool({
    connectionString:process.env.DATABASE_URI,
    //ssl:true
})

router.get('/blog',(req,res)=>{
    res.render('blog')
})

router.get('/addPerson', async (req, res) => {
    try {
        const [status] = await pool.query('SELECT * FROM  statusrole')
        console.log(status)
         res.render('personas/addPerson',{status})
    } catch (error) {
        
    }
   
})

router.post('/addPerson',async(req,res)=>{
try {
    const {nombres,apellidos,cedula,correo,phone}=req.body;
    const newPerson={
        nombres,apellidos,cedula,correo,phone    
    }
    await pool.query("INSERT INTO usuarios SET ?",[newPerson])  
    res.redirect('/listarPersona'); 
} catch (error) {
    res.status(500).json({message: error.message});
}    
})
//04126681744 ipazulca
router.get('/listarPersona', async (req, res) => {
   
    try {
       
        const [result] = await pool.query('SELECT * FROM usuarios')
        console.log(result)
        res.render('personas/listarPersonas', {personas: result})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router