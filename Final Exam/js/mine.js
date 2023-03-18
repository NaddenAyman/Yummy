
let searchByName = document.querySelector("#searchbyname")
let searchByLetter = document.querySelector("#searchbyletter")
let submitBtn = document.querySelector("#submitBtn")
let name_contact =  document.querySelector("#name-contact")
let email_contact =  document.querySelector("#email-contact")
let phone_contact =  document.querySelector("#phone-contact")
let age_contact =  document.querySelector("#age-contact")
let repassword_contact =  document.querySelector("#repassword-contact")
let password_contact =  document.querySelector("#password-contact")
name_contact.addEventListener("keyup", nameVaild)
email_contact.addEventListener("keyup", emailValid)
phone_contact.addEventListener("keyup",phoneValid )
age_contact.addEventListener("keyup", ageValid)
repassword_contact.addEventListener("keyup", repasswordValid)
password_contact.addEventListener("keyup",passwordValid )
name_contact.addEventListener('keyup', displayBtn);
email_contact.addEventListener('keyup', displayBtn);
phone_contact.addEventListener('keyup', displayBtn);
age_contact.addEventListener('keyup', displayBtn);
password_contact.addEventListener('keyup', displayBtn);
repassword_contact.addEventListener('keyup', displayBtn);
document.getElementById("nameAlert").classList.replace("d-block","d-none")
async function getMeals()
{
    $(".inner-loading-screen").fadeIn(300)
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
   let response = await api.json()
    console.log(response.meals)
    displayMeals(response.meals)
    $(".inner-loading-screen").fadeOut(300)
    clickCard()
    
}

getMeals()
function displayMeals(arr)
{
    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3 dot">
                        <div class="rounded-2 meal position-relative overflow-hidden" id="card" data-id="${arr[i].idMeal}">
                            <img class="img-fluid" src="${arr[i].strMealThumb}">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
                                <h3>${arr[i].strMeal}</h3>
                            </div>
                        </div>
                     

                    </div>
        `
        
    }
    document.querySelector("#main-meals").innerHTML = store
}
async function getIdDetails(id)
{
    $(".inner-loading-screen").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let response = await api.json()
    console.log(response.meals)
    $(".inner-loading-screen").fadeOut(300)
    displayIdDetails(response.meals[0])
    

}
function displayIdDetails(id)
{
//loop1
let ingredients = ""
for (let i = 0; i <= 20; i++) {
    if (id[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${id[`strMeasure${i}`]} ${id[`strIngredient${i}`]}</li>`
    }
}

//loop2 

let tags = id.strTags?.split(",")

if (!tags) 
{
    tags = []
}

let myTag = ""
for (let i = 0; i < tags.length; i++) {
    myTag += `
    <li class="alert alert-danger list-unstyled m-2 p-1">${tags[i]}</li>`
}

let idStore = `
<div class="col-md-4 text-white">
<img src="${id.strMealThumb}" class="img-fluid rounded-2">
<h2>${id.strMeal}</h2>
</div>
<div class="col-md-8 text-white">
    <h2><strong>Instructions</strong></h2>
    <p>${id.strInstructions}</p>
    <h2><strong>Area:${id.strArea}</strong></h2>
    <h2><strong>Category:${id.strCategory} </strong></h2>
    <h2><strong>Recipes</strong></h2>
    <ul class="list-unstyled d-flex  g-3 flex-wrap ">
        ${ingredients}
    </ul>
    <h2><strong>Tags:</strong></h2>

    <ul class="list-unstyled d-flex g-3 flex-wrap">
        
        
        ${myTag}
        
    </ul>
    <a class="btn btn-success text-white" target="_blank" href=${id.strSource}>Source</a>
    <a class="btn btn-danger text-white" target="_blank" href=${id.strYoutube}>Youtube</a>
</div>

`
document.querySelector("#id-Details").innerHTML = idStore
}

function clickCard()
{
    let cardID = Array.from(document.querySelectorAll("#card"))
for (let i = 0; i < cardID.length; i++) {
    cardID[i].addEventListener("click",function(){
      
       
        let id = cardID[i].dataset.id
        console.log(id)
        getIdDetails(id)
     
         document.getElementById("meals-home").classList.add("d-none")
             document.getElementById("id-meals").classList.remove("d-none")
    })
    
}
}

function closeSideNav()
{
    $("#side-nav").animate({width:"0px",margin:"-30"},500);
    $(".nav-footer").animate({width:"0px",margin:"-30"},500);
 
   
   
}


function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})





async function getName()
{
    $(".inner-loading-screen").fadeIn(300)
    let api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByName.value}`);
    let response = await api.json()
    document.getElementById("meals-search").classList.remove("d-none")
    console.log(response.meals)

displaySearchByName(response.meals)
$(".inner-loading-screen").fadeOut(300)

    
    searchCard()
    
}


function searchCard()
{
    let cardID = Array.from(document.querySelectorAll("#card"))
for (let i = 0; i < cardID.length; i++) {
    cardID[i].addEventListener("click",function(){
      
       
        let id = cardID[i].dataset.id
        console.log(id)
        getIdDetails(id)
     
         document.getElementById("meals-search").classList.add("d-none")
             document.getElementById("id-meals").classList.remove("d-none")
    })
    
}
}






async function getByLetter()
{
    $(".inner-loading-screen").fadeIn(300)
    let api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByLetter.value}`);
    let response = await api.json()
    console.log(response.meals)
    document.getElementById("meals-search").classList.remove("d-none")

     displaySearchByName(response.meals)
     $(".inner-loading-screen").fadeOut(300)


    clickSearchCard()
    
}

function displaySearchByName(arr)
{

    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3 dot">
                        <div class="rounded-2 meal position-relative overflow-hidden" id="card" data-id="${arr[i].idMeal}">
                            <img class="img-fluid" src="${arr[i].strMealThumb}">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
                                <h3>${arr[i].strMeal}</h3>
                            </div>
                        </div>
                     

                    </div>
        `
        
    }
    $("#category").addClass("d-none")
     $("#meals-search").removeClass("d-none")
     $("#search").addClass("d-none")
     $("#area-meals").addClass("d-none")
     $("#ingerdient").addClass("d-none")
    document.querySelector("#search-meals").innerHTML = store
}
function clickSearchCard()
{
    let cardID = Array.from(document.querySelectorAll("#card"))
for (let i = 0; i < cardID.length; i++) {
    cardID[i].addEventListener("click",function(){
      
       
        let id = cardID[i].dataset.id
        console.log(id)
        getIdDetails(id)
     
         document.getElementById("meals-search").classList.add("d-none")
             document.getElementById("id-meals").classList.remove("d-none")
    })
    
}
}

async function getCategory()
{
    $(".inner-loading-screen").fadeIn(300)
    let api=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await api.json()
    console.log(response.categories)
    displayCategory(response.categories)
    $(".inner-loading-screen").fadeOut(300)
    
}

function displayCategory(arr)
{
    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3 dot">
        <div class="rounded-2 meal position-relative overflow-hidden " id="catCard" onclick="getCatMeals('${arr[i].strCategory}')">
                            <img class="img-fluid" src="${arr[i].strCategoryThumb}">
                            <div class="meal-layer position-absolute text-center text-black  " name="${arr[i].strCategory}">
                                <h3 >${arr[i].strCategory}</h3>
                                <p>${arr[i].strCategoryDescription}</p>
                            </div>
                        </div>
                     

                    </div>
        `
        
    }
    document.querySelector("#category-meals").innerHTML = store
    $("#id-meals").addClass("d-none")
    
   
}

 async function getCatMeals(CategoryName)
{
    $(".inner-loading-screen").fadeIn(300)
    
    let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategoryName}`);
    let response= await api.json();
    console.log(response.meals)
    document.getElementById("meals-search").classList.remove("d-none")
    displaySearchByName(response.meals)
    $(".inner-loading-screen").fadeOut(300)
    clickSearchCard()
}


async function getCountry()
{
    $(".inner-loading-screen").fadeIn(300)
    let api= await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let response= await api.json();
    console.log(response.meals)
  
    displayCountry(response.meals)
    $(".inner-loading-screen").fadeOut(300)
}

function displayCountry(arr)
{
    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3">
        <div onclick="getArea('${arr[i].strArea}')"class="text-center d-flex text-white flex-column rounded-2 meal  " id="catCard">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
            </div>
        </div>
        `
        
    }
    $("#area").removeClass("d-none")
    document.querySelector("#area-meals").innerHTML = store
    $("#id-meals").addClass("d-none")
    

}

async function getArea(location)
{
    $(".inner-loading-screen").fadeIn(300)
    let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${location}`);
    let response= await api.json();
    console.log(response.meals)
    document.getElementById("meals-search").classList.remove("d-none")
    $(".inner-loading-screen").fadeOut(300)
    displaySearchByName(response.meals)
    
  
    clickSearchCard()
    
}

 async function getIngred()
{
    $(".inner-loading-screen").fadeIn(300)
    let api= await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let response =await api.json();
    console.log(response.meals);
    $(".inner-loading-screen").fadeOut(300)
    displayIng(response.meals.slice(0, 20))

}
function displayIng(arr)
{
    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3">
        <div onclick="getMainIngred('${arr[i].strIngredient}')" class="text-center d-flex text-white flex-column rounded-2 meal position-relative overflow-hidden " id="catCard">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>

            </div>
        </div>
        `
        
    }
  
    document.querySelector("#ingerdient-meals").innerHTML = store
    $("#id-meals").addClass("d-none")
}
async function getMainIngred(mainIng)
{
    $(".inner-loading-screen").fadeIn(300)
    let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIng}`);
    let response =await api.json();
    console.log(response.meals);
    document.getElementById("meals-search").classList.remove("d-none")
    $(".inner-loading-screen").fadeOut(300)
    displaySearchByName(response.meals)
    clickSearchCard()
    

}


















function nameVaild(){
  

    let checkName = name_contact.value;
    let patternName = /^[A-Za-z]+$/

    if(patternName.test(checkName))
    {
        
        document.getElementById("nameAlert").classList.replace("d-block","d-none")
       
       //return patternName.test(checkName)
        
    }
    else
    {
        document.getElementById("nameAlert").classList.replace("d-none","d-block")
        // return patternName.test(checkName)
    
    }

}



function emailValid()
{
    let checkEmail = email_contact.value;
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


    if(patternEmail.test(checkEmail))
    {
        
        document.getElementById("emailAlert").classList.replace("d-block","d-none")
        
        // return patternEmail.test(checkEmail)
        
        
    }
    else
    {
        document.getElementById("emailAlert").classList.replace("d-none","d-block")
        // return patternEmail.test(checkEmail)
        
    
    }
}






function phoneValid(){
    let checkPhone = phone_contact.value;
    let patternPhone = /^01[0125][0-9]{8}$/


    if(patternPhone.test(checkPhone))
    {
        
        document.getElementById("phoneAlert").classList.replace("d-block","d-none")
        
    }
    else
    {
        document.getElementById("phoneAlert").classList.replace("d-none","d-block")
    
    }

}



function ageValid()
{
    let checkAge = age_contact.value;
    let patternAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/


    if(checkAge.test(patternAge))
    {
        
        document.getElementById("ageAlert").classList.replace("d-block","d-none")
        
    }
    else
    {
        document.getElementById("ageAlert").classList.replace("d-none","d-block")
    
    }
}




function passwordValid()
{

    let checkPassword = password_contact.value;
    let patternPassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/


    if(patternPassword.test(checkPassword))
    {
        
        document.getElementById("passwordAlert").classList.replace("d-block","d-none")
        
        
    }
    else
    {
        document.getElementById("passwordAlert").classList.replace("d-none","d-block")
    
    }
}



function repasswordValid()
{
    if(password_contact.value == repassword_contact.value)
    {
        
        document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
        
        
    }
    else
    {
        document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
    
    }
}



function displaySearch()
{
    $("#meals-home").addClass("d-none")
    $("#search").removeClass("d-none")
    $("#category").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingerdient").addClass("d-none")
    $("#contact-us").addClass("d-none")
    $("#id-meals").addClass("d-none")
  
   
}
function displayCategoryNavBar()
{
    
    $("#meals-home").addClass("d-none")
    $("#category").removeClass("d-none")
    $("#search").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingerdient").addClass("d-none")
    $("#contact-us").addClass("d-none")
    $("#id-meals").addClass("d-none")
    getCategory()
   
}
function displayArea()
{
    
    $("#meals-home").addClass("d-none")
    $("#area").removeClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#ingerdient").addClass("d-none")
    $("#contact-us").addClass("d-none")
    $("#id-meals").addClass("d-none")
    getCountry()
}


function displayIngredients()
{
    $("#meals-home").addClass("d-none")
    $("#ingerdient").removeClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#area").addClass("d-none")
    $("#contact-us").addClass("d-none")
    $("#id-meals").addClass("d-none")
    getIngred()
}

function displayContactUs()
{
    $("#meals-home").addClass("d-none")
    $("#contact-us").removeClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingerdient").addClass("d-none")
    $("#id-meals").addClass("d-none")
 
}

function displayBtn(){

    let checkName = name_contact.value;
    let patternName = /^[A-Za-z]+$/
    let checkEmail = email_contact.value;
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let checkPhone = phone_contact.value;
    let patternPhone = /^01[0125][0-9]{8}$/
    let checkAge = age_contact.value;
    let patternAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/
    let checkPassword = password_contact.value;
    let patternPassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/

    if(patternName.test(checkName) && patternEmail.test(checkEmail) && patternAge.test(checkAge) && patternPhone.test(checkPhone) && patternPassword.test(checkPassword) && password_contact.value == repassword_contact.value)
    {
        submitBtn.removeAttribute('disabled');  
        
    }

}