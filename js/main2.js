const form = document.querySelector('#testDataForm');
console.log(form)
form.addEventListener('submit', (event) =>{
    event.preventDefault()
    let query_season = document.querySelector('#season');
    let query_year = document.querySelector('#year');
    console.log(query_season.value)
    console.log(query_year.value)
    let year = query_year.value
    let season = query_season.value
    load_data(season, year)
})



const getData = async(season, year) => {
    let response = await axios.get(`https://ergast.com/api/f1/${year}/${season}/driverStandings.json`)
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

const DOM_Elements = {
    racer_list: '.racer-list'
}

const create_list = (id, name, lastName, carNumber, Nationality, abr, DOB, Spons) => {
    // const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}"> ${name} ${lastName} ${carNumber}</a>`
    const html = `<a href="#" class ="list-group-item list-group-item-action list-group-item-light" id="${id}">
    <table class="table">
    <thead>
        <tr>
        <th scope="col">Car Number #</th>
        <th scope="col">Name</th>
        <th scope="col">Last</th>
        <th scope="col">Nationality</th>
        <th scope="col">Abreviation</th>
        <th scope="col">Date of Birth</th>
        <th scope="col">Sponsor</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <th scope="row">${carNumber}</th>
        <td>${name}</td>
        <td>${lastName}</td>
        <td>${Nationality}</td>
        <td>${abr}</td>
        <td>${DOB}</td>
        <td>${Spons}</td>
        </tr>
    </tbody>
    </table>
    </a>`
    document.querySelector(DOM_Elements.racer_list).insertAdjacentHTML('beforeend', html)
}

const load_data = async(season, year) => {
    clear_data()
    const racers = await getData(season, year);
    console.log(racers[0].Driver.givenName)
    racers.forEach(element => create_list(element.Driver.position, element.Driver.givenName, 
        element.Driver.familyName, 
        element.Driver.permanentNumber, element.Driver.nationality,
        element.Driver.code, element.Driver.dateOfBirth, element.Constructors[0].name))
}

const clear_data = async() => {
    document.querySelector(DOM_Elements.racer_list).innerHTML = '';
}
