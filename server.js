const express = require('express')
const csv = require('csv-parser')
const app = express()
const Chart = require('chart.js')
const fs = require('fs')
const folder = './csv/'
const results = [];
const arrayYear = []
app.listen(3000)
app.use(express.static('public'))
app.locals.basedir = './public'
app.set('view engine', 'pug')




//===================================== lecture de tous les .csv
let arrayStats=[]
fs.readdir(folder, (err, files) => {
  
  
  files.forEach(file => {
    arrayYear.push(file)
    console.log(file + ' loaded');
    fs.createReadStream(folder.concat('',file))
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);

      const regexTickets = new RegExp("payant:([0-9]+);gratuit:([0-9]+)")
      if(arrayStats[data.year.toString()]==undefined){
        arrayStats[data.year.toString()]={}
        arrayStats[data.year.toString()].payant=0
        arrayStats[data.year.toString()].gratuit=0

      }
      arrayStats[data.year.toString()].payant=arrayStats[data.year.toString()].payant+parseInt(regexTickets.exec(data.stats)[1])
      arrayStats[data.year.toString()].gratuit=arrayStats[data.year.toString()].gratuit+parseInt(regexTickets.exec(data.stats)[2])
      
    })
    .on('end', () => {

    });

  });
})


//==================================== routes

app.get('/',(req,res)=>{                  // racine

  res.render('index',{arrayYear: arrayYear.toString(),arrayStats: JSON.stringify(arrayStats)})

}) 


app.get('/data',(req,res)=>{              // les données
    
  res.send(results)
  
}) 
