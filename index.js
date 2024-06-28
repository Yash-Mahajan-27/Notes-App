const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err, files)=>{
        res.render("index",{files:files});
    })
    
})

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, "UTF-8", function(err,filedata){
        res.render("show",{filename: req.params.filename, filedata: filedata});
    })
    
})

app.get('/edit/:filename',(req,res)=>{
    res.render('edit',{filename: req.params.filename})
})

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new.split(' ').map(word => word.charAt(0).toUpperCase()+ word.slice(1)).join('')}.txt`,(err)=>{
        res.redirect("/");
    })
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').map(word => word.charAt(0).toUpperCase()+ word.slice(1)).join('')}.txt`,req.body.details,(err)=>{
        res.redirect("/");
    })
})


app.get('/delete/:filename',(req,res)=>{
    res.render('delete',{filename: req.params.filename})
})



app.post('/delete/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'files', req.params.filename); // Ensure the correct file path

    fs.unlink(filePath, (err) => {
        res.redirect('/');
    });
}); 



app.listen(3000); 


