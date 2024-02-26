import express from "express"
import {engine} from "express-handlebars"
import morgan from "morgan"
import {join,dirname,resolve} from "path"
import { fileURLToPath } from "url"
import path from "path";
import personRoutes from './routes/personasRouter.js'





//inicializaciones
const app= express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//setting
app.set('port', process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))

app.engine('handlebars',engine({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: 'handlebars'
}));


app.set('view engine','handlebars')


//middleweres
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routes
    app.get('/', (req,res)=>{
        res.render('home')   
    })

    app.use(personRoutes)
  
// public file
app.use(express.static(join(__dirname,'public')))
//run server
app.listen(app.get('port'),()=>{
     console.log('Server listering on port ' ,app.get('port'))
})