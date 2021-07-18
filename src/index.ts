import express from 'express'

const port = 3000
const app = express()

app.get('/',(req,res)=>{
       res.send('Hello Worlda')
})
app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
    
})
export default app
