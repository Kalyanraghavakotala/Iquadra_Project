const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const monk =require('monk');
const {ObjectId}=require('mongodb')
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }));
app.use(bodyParser.json({limit:'50mb'  }));
const db=monk('mongodb+srv://Iquadra:iquadra2023@cluster0.drvfiyk.mongodb.net/PROJECT');
db.then(()=>{
    console.log('db connected ......');
})
app.use(cors());
app.get('/',(req,res)=>{
    res.send('hii');
})
app.get('/getdata', (req, res) => {
    const data = db.get('logins');
    data.find({ password: { $exists: true }, c_password: { $exists: true } }).then((result) => { res.send(result) });
});
app.post('/getcontacts',(req,res)=>{
    const data=db.get('logins');
    data.find({email:req.body.email,contact:"yes"}).then((resu)=>res.send(resu))
});
app.post('/deletecontact',(req,res)=>{
    const id=req.body.id;
    const data=db.get('logins');
    data.remove({_id:ObjectId(id)}).then((Resu)=>console.log(Resu))
});
app.post('/changedetails',(req,res)=>{
    const body=req.body;
    const email=req.body.email;
    const data=db.get('logins');
    data.update({email:email},{$set:body}).then((resu)=>console.log(resu));
});
app.post('/contacts',(req,res)=>{
    const body=req.body;
    const data=db.get('logins');
    data.insert(body).then((resul)=>console.log(resul));
})
app.post('/signup',(req,res)=>{
    const data=db.get('logins');
    const body=req.body;
    data.insert(body).then((resul)=>{console.log(resul)})
})
app.post('/getremainders',(req,res)=>{
const data=db.get('logins');
const body=req.body;
data.find({email:body.email,contact:'yes',remainders:{$exists:true}}).then((resu)=>res.send(resu))
})
app.post('/addremainders', (req, res) => {
    const data = db.get('logins');
    const body = req.body;

    data.find({ _id:ObjectId(req.body.id) }).then((resul) => {
        console.log(resul)
        if (resul.length > 0) {
            let  updatedRemainders="";
            if(resul[0].remainders)
            updatedRemainders = resul[0].remainders + '\n' + body.remainders;
            else
            updatedRemainders = resul[0].remainders + body.remainders;
            data.update({ _id: ObjectId(body.id) }, { $set: { remainders: updatedRemainders } })
                .then((resu) => {
                    console.log(updatedRemainders);
                    console.log('Document updated successfully');
                    res.send('Remainders added successfully');
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                    res.status(500).send('Internal Server Error');
                });
        } else {
            res.status(404).send('Document not found');
        }
    });
});
app.post('/addtodo',(req,res)=>{
    const data=db.get('logins');
    const date=new Date(req.body.duedate);
    data.insert({email:req.body.email,todo:"yes",event:req.body.event,duedate:date}).then((resu)=>console.log(resu));
    
})
app.post('/gettodo',(req,res)=>{
    const data=db.get('logins');
    const email=req.body.email;
    const currentDate=new Date();
    data.find({email:email,todo:req.body.todo,duedate: { $gte: currentDate }}).then((resul)=>{res.send(resul)});
})
app.post('/deleteevent',(req,res)=>{
    const data=db.get('logins');
    data.remove({_id:ObjectId(req.body.id)}).then((resu)=>console.log(resu));
})
app.post('/sendpassword',(req,res)=>{
    const data=db.get('logins');
    data.find(req.body).then((resu)=>{
        if(resu.length>0)
        {
            const pass=resu[0].password;
            res.send({password:pass});
        }
        else{
            res.send({Error:"Not Found"});
        }
    })
})
app.listen(8002,()=>{
    console.log('server is running......');
})
