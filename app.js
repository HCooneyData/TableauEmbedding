console.log("Hello from B2S!!!");

//create the viz variable
let viz;

//grab the vizcontainer element
const vizContainer = document.getElementById("vizContainer");
//the url of the tableau dashboard
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const url2 =
  "https://public.tableau.com/views/Freeschoolmealsandeducationalattainment/Dashboard";
//the options of our dashboard (width, height etc.)
const options = {
  device: "desktop",
  hideToolbar: "true",
};

//export to pdf
const pdfButton = document.getElementById("pdfButton");
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

//export to image
const imageButton = document.getElementById("imageButton");
imageButton.addEventListener("click", function () {
  viz.showExportImageDialog();
});

//grab the show and hide buttons
const showButton = document.getElementById("showButton");
const hideButton = document.getElementById("hideButton");
//hide the show button by default
//when someone clicks on hide button > remove and show show button
hideButton.addEventListener("click", function () {
  //1.hide the Tableau viz
  viz.hide();
  //2. hide the show button and show the show button
  showButton.style.display = "inLine";
  hideButton.style.display = "none";
});

showButton.addEventListener("click", function () {
  //1.hide the Tableau viz
  viz.show();
  //2. hide the show button and show the show button
  showButton.style.display = "none";
  hideButton.style.display = "inLine";
});

//listen for a click on the switch viz button
const switchViz = document.getElementById("switchViz");
switchViz.addEventListener("click", function () {
  //remove the old viz and replace with new
  if (viz.getUrl() === url) {
    initViz(url2);
  } else {
    initViz(url);
  }
});

//looping through filter values
document.querySelectorAll(".filter").forEach((filterButton) => {
  console.log(filterButton);
  filterButton.addEventListener("click", (e) => singleFilter(e.target.value));
});

//function to filter dash to selected region
function singleFilter(value) {
  const sheetToFilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");
  console.log(sheetToFilter);

  sheetToFilter.applyFilterAsync(
    "Region",
    value,
    tableau.FilterUpdateType.REPLACE
  );
}

//test button
//const centralButton = document.getElementById("centralButton");
//centralButton.addEventListener("click", singleFilter);

//create a function which intialises the dashboard
function initViz(vizUrl) {
  if (viz) {
    viz.dispose();
  }
  viz = new tableau.Viz(vizContainer, vizUrl, options);
  showButton.style.display = "none";
}

initViz(url);
