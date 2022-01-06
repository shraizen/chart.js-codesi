/* global fetch */
var regexYear= new RegExp(".{5}([0-9]{4}).{4}");


async function fetchData () {
  const response = await fetch('/data')

  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`)
  }
  return await response.json()
}
(async () => {
    const ctx = document.getElementById('myChart').getContext('2d')
    var arrayYear = document.getElementById('arrayYear').innerHTML.split(',')
    let compteur = 0
    arrayYear.forEach(element => {
        arrayYear[compteur] = regexYear.exec(element)[1]
        console.log(element)
        compteur++
    });

    
    const data = await fetchData().catch(error => {
      console.log(error.message)

    })
    
    var json = JSON.parse(document.getElementById('arrayStats').innerHTML)
    var json_minify_payant = []
    var json_minify_gratuit = []

    var newCompteur = 0
  for(let i=0;i<json.length;i++){
    let element = json[i]
        if(element!=null){
            json_minify_payant[newCompteur]=element.payant
            json_minify_gratuit[newCompteur]=element.gratuit

            newCompteur++
        }
    };
    
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels:arrayYear, // les années
          datasets: [{                                                    //mes données , tickets vendus
              label: 'number of entries (paid)',
              data: json_minify_payant,
              backgroundColor: 
                  'rgba(0, 0, 0, 0.2)',
        
              borderColor: 
                  'rgba(0, 0, 0, 1)',
                  
              borderWidth: 1
          },
          {                                                    //mes données , tickets vendus
            label: 'number of entries (free)',
            data: json_minify_gratuit,
            backgroundColor: 
                'rgba(255, 0, 0, 0.2)',

            borderColor: 
                'rgba(255, 0, 0, 1)',
                
            borderWidth: 1
        }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  })
  })()