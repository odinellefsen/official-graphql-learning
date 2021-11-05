const plsRigga = document.getElementById('PLSRIGGA')
const  hasurainput = document.getElementById('hasurainputfield')
const knapman = document.getElementById('knapmanden')

queryFetch = (query) => {
    return fetch("https://liked-crawdad-63.hasura.app/v1/graphql", {
    method: 'POST',
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
        query: query
  })
 }).then(res => res.json())
}

const addBtn = document.getElementById('button1')
const deleteBtn = document.getElementById('button2')
const fixBtn = document.getElementById('button3')
const NAVN = document.getElementById('PLSRIGGA')

addBtn.addEventListener('click', () => {
    queryFetch (`
        mutation {
            insert_tolrn_page(objects: {name: "${hasurainput.value}"}) {
            returning {
                id
            }
        }
    }
    `).then(data => {
        showAllNames()
    })
})

/*
deleteBtn.addEventListener('click', () => {
    queryFetch (`
        mutation {
            delete_tolrn_page(where: {name: {_eq: "Olavur"}}) {
                returning {
                    id
                }
            }
        }
    `).then(data => {
        console.log(data)
        showAllNames()
    })
})
*/

fixBtn.addEventListener('click', () => {
    queryFetch (`
        mutation {
            delete_tolrn_page(where: {name: {_eq: "olavur"}}) {
                returning {
                    id
                }
            }
            insert_tolrn_page(objects: {name: "Olavur"}) {
            returning {
                id
            }
        }
    }
    `).then(data => {
        console.log(data)
        showAllNames()
    })
})

const showAllNames = () => queryFetch(`
    query MyQuery {
        tolrn_page {
            name
            id
        }
    }
`).then(data => {
   plsRigga.innerHTML = ''
   data.data.tolrn_page.forEach(tolrn_page => {
        const option = document.createElement('option')
        option.innerHTML = tolrn_page.name + ' ' + tolrn_page.id + ` <button class='btn2' id='button ${tolrn_page.id}'>Delete</button>`
        plsRigga.append(option)

    })
})

showAllNames()

document.write('<h2>Hell</h2>')




































/*
 queryFetch(`
     query MyQuery {
         tolrn_page {
             name
         }
     }
 `).then(data => {
     data.data.tolrn_page.forEach(tolrn_page => {
         ADD.addEventListener('click', () => {
             const option = document.createElement('option')
             const navnname = option.innerText = tolrn_page.name
             NAVN.append(option)
            
             if(navnname.charAt(0).toLowerCase) {
                 FIX.addEventListener('click', () => {
                     const correctedName = 'navnname.toUpperCase'
                     NAVN.append(correctedName);
                 })
             }
         })
     })
 })

 const upperlower = (word) => {
     if(word.charAt(0) === word.charAt(0).toUpperCase()) {
         return 'UpperCase';
     }
     if (word.charAt(0) === word.charAt(0).toLowerCase()) {
         return 'LowerCase';
     }
 }
 */