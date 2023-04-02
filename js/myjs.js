//jquery when click then ... 
//Event 
//Search and All here have the same AJAX because 
//the expected task hinted the API calls word.

$("#search").click(() => {
  getData(`https://restcountries.com/v3.1/name/${$("#country").val()}`);
});
//#country from the .html file where the search for id is "country"
$("#all").click(() => {
  getData("https://restcountries.com/v3.1/all"); //All is basically: 
});

//senior works. Call getData that receives to it the api url and
//on the basis of this performs actions.
const getData = (apiURL) => {
  $.ajax({ //begin calling the API with AJAX
    url: apiURL,
    success: (response) => createData(response), //receiving the response
    //We don`t transmit it to a global variable. We just chain
    //it (together) onwards.
  });
};

//Example of how a junior would work below. 
//How a senior would work above.
const getAll = () => {
  $.ajax({
    url: "https://restcountries.com/v3.1/all",
    success: (response) => createData(response),
  });
};

// 1. We create a constant. And when we call it, we will 
//transmit data to it. And according to this data it will
//build us the constant CreateStat, one below this one. 

//We create all 4 consts below. These are simply chapter heads,
//which we create first as a chasis/skeleton/template inside 
//which we build.

//Once createData is in place, the AJAX phase is sol-
// -ved.
const createData = (data) => {
  //display in the console:
  //console.log(data); //7 total countries resulted for united (for example)
  //console.log("total countries:", data.length); //250 total countries in this project`s case.
  createStat(data);
  createCountries(data);
  createContinent(data); //(data) means we transmit data to it 
};

const createStat = (data) => {
  let totalPopulation = 0;
  //data map, for every item (item represents in this
  //case population from the api file) there is.
  // item.population in the equation represents the population 
  //item from the API file.

  data.map((item) => (totalPopulation += item.population));
  //#stat from within the index.html file, meaning id="stat".
  //stat, the statistics, the numbers.
  $("#stat").html(`
        Total countries: ${data.length}<br/>
        Total population: ${totalPopulation}<br/> 
        Average population: ${Math.floor(totalPopulation / data.length)}<br/>
    `);
};
const createCountries = (data) => {
  let myTable = `
        <table class="center">
            <tr>
                <td>Country</td>
                <td>Population</td>
            </tr>
    `;
//data.map, receiving the data/information. No array.
//item.name.common , the name big item, and common within it
//common here is the country`s name.
//item.population , same explanation.
  data.map((item) => {
    myTable += `
            <tr>
                <td>${item.name.common}</td>
                <td>${item.population}</td>
            </tr>
        `;
  });


  myTable += "</table>";

  $("#countries").html(myTable);
};
//Just a note. To a Literal Object, we can add fields to it
//Anytime..
const createContinent = (data) => {
  const myContinent = {}; //certain object in an array [].
  let regionList = [];

  data.map((item) => { //on each item we execute something.
    //changed in video from let to const. How? Its fields we
    //added can be changed, but the variable cannot. 
    if (myContinent[item.region]) {
      myContinent[item.region] += 1;
    } else {
      myContinent[item.region] = 1;
      regionList.push(item.region);
    }
  });
  console.log(regionList);
  //we did the adding, the aggregationS

  let myTable = `
    <table class="center">
        <tr>
            <td>Region</td>
            <td>total countries</td>
        </tr>
  `;

  regionList.map((item) => {
    myTable += `
        <tr>
            <td>${item}</td>
            <td>${myContinent[item]}</td>
        </tr>
    `;
  });

  myTable += "</table>";

  $("#region").html(myTable);
};
