
let searchResults = document.getElementById('searchedMeals')
let eachIngredient = document.getElementById("eachIngredient")
let ingredients = document.querySelector('#ingredients')
let modalImgName = document.getElementById('ingImgIngName')

function recommendedMeal(){
    const changingRecommendedMeal = document.getElementById('recommendedMeal');
    axios
    .get('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => {
        console.log(res)
        // const recommendedMealId =
        let recommendedMealImage = document.createElement('img')
        let recommendedMealName = document.createElement('h4')

        recommendedMealImage.setAttribute('class','recommendedMealImage')
        recommendedMealImage.setAttribute('src',res.data.meals[0].strMealThumb)
        recommendedMealName.textContent = res.data.meals[0].strMeal
        
        changingRecommendedMeal.append(recommendedMealImage)
        changingRecommendedMeal.append(recommendedMealName)
        // console.log(recommendedMealName)
        // console.log(res.data.meals[0])
        // console.log(res.data.meals[0].idMeal);






        changingRecommendedMeal.addEventListener('click',() => {

            // body.style.opacity = 0.5;
            // console.log(res.data.meals[0].strMealThumb)
            let modal = document.getElementById('modal');
            let exitCross = document.getElementById('exitCross');
            

            exitCross.addEventListener('click',() => {
                modal.style.display = 'none'
             })

            exitCross.style.display = 'none'
            exitCross.style.display = 'flex'
            ingredients.style.display = 'none'
            ingredients.style.display = 'flex'
            modal.style.display = 'none';
            modal.style.display = 'flex';
            
            let modalImg = document.getElementById('modalImg')
            // let modalWithoutMealPicture = document.createElement('div')
            // let modalIngredientsImage = document.createElement('img')
            // let modalIngredients = document.createElement('li')

            // console.log(modal)

            // modal.innerHTML = ""

            // modalImg.setAttribute('src',res.data.meals[0].strMealThumb)
            // modalImg.setAttribute('class','modalImg')

            // modal.append(modalImg)

            modalImg.innerHTML = ""

            // console.log(res.data.meals[0].strMealThumb)
            modalImg.innerHTML = `
            <img src="${res.data.meals[0].strMealThumb}" class="RecommendedMealImg" ">`



            let eachIngredientsArray = []
            let recommendedMealDetails = res.data.meals[0]

            for(let i=1;i<=20;i++){
                let eachIngredient = recommendedMealDetails[`strIngredient${i}`]

                if(eachIngredient!="" && eachIngredient!=null){
                    eachIngredientsArray.push(eachIngredient)               
                }         
            }

            eachIngredient.innerHTML = "";

            eachIngredientsArray.forEach((ingredient) => {
                eachIngredient.innerHTML+=
                `
                <ul>
                    <li>${ingredient}</li>
                </ul>
                `

                // console.log(eachIngredient)
            })
        })       
    })
}
recommendedMeal()




let button = document.getElementById('submitButton')
button.addEventListener('click',function(){
    let searchedText = document.getElementById('textInput').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchedText}`)
    .then(response =>response.json())
    .then(data => {
        // console.log(data)

        
        let searchResultsFound = document.getElementById('searchedMealsFound')
        let searchResultsNotFound = document.getElementById('searchedMealsNotFound')
        

        searchResults.innerHTML = ""

        // console.log(data)
        if(data.meals == null){
            console.log("Choose another Key ingredient")
            searchResultsNotFound.style.display = 'block'
            searchResultsFound.style.display = "none"

            // searchResults.style.display = 'none'
            // searchedMealsImage.removeAttribute('src',meal.strMealThumb)
            // searchedMealNames.style.display = 'none'
        }
        else{
            console.log(data.meals)
            searchResultsNotFound.style.display = "none"
            searchResultsFound.style.display = "block"
            

            data.meals.forEach(meal => {
                searchResults.style.display = 'flex'
                searchResults.innerHTML+=`
                <div id="searchedMealsItems" class="${meal.idMeal}">
                    <div class="eachSearchedMeal">
                        <img class="searchedMealImage" src="${meal.strMealThumb}">
                        <h4>${meal.strMeal}</h4>
                    </div>
                <div>
                `;


                
                let eachMealStore = document.querySelectorAll('#searchedMealsItems');




                eachMealStore.forEach((meal) => {
                    meal.addEventListener('click', () => {
                        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.className}`)
                        .then(response => response.json())
                        .then((res) => {


                            let modal = document.getElementById('modal');
                            let exitCross = document.getElementById('exitCross');
                            
                
                            exitCross.addEventListener('click',() => {
                                modal.style.display = 'none'
                             })
                
                            exitCross.style.display = 'none'
                            exitCross.style.display = 'flex'
                            ingredients.style.display = 'none'
                            ingredients.style.display = 'flex'
                
                
                            modal.style.display = 'none';
                            modal.style.display = 'flex';
                            
                            let modalImg = document.getElementById('modalImg')
                            // let modalWithoutMealPicture = document.createElement('div')
                            // let modalIngredientsImage = document.createElement('img')
                            // let modalIngredients = document.createElement('li')
                
                            // console.log(modal)
                
                            // modal.innerHTML = ""
                
                            // modalImg.setAttribute('src',res.data.meals[0].strMealThumb)
                            // modalImg.setAttribute('class','modalImg')
                
                            // modal.append(modalImg)
                
                            modalImg.innerHTML = ""      
                            console.log(res.meals[0])

                            modalImg.innerHTML = `
                            <img src="${res.meals[0].strMealThumb}" class="RecommendedMealImg" ">`
                
                
                            
                
                
                            let eachIngredientsArray = []
                            let recommendedMealDetails = res.meals[0]
                
                            for(let i=1;i<=20;i++){
                                let eachIngredient = recommendedMealDetails[`strIngredient${i}`]
                
                                if(eachIngredient!="" && eachIngredient!=null){
                                    eachIngredientsArray.push(eachIngredient)
                                    
                                }
                                
                            }
                            eachIngredient.innerHTML = "";
                
                            eachIngredientsArray.forEach((ingredient) => {
                                eachIngredient.innerHTML+=
                                // <div class="flex">  
                                `
                                    <div>
                                        <img class="ingredientImages" src="https://www.themealdb.com/images/ingredients/${ingredient}.png" >
                                    </div>
                                    <div>
                                        <ul>
                                            <li>${ingredient}</li>
                                        </ul>
                                    </div>
                                
                                `// </div>
                
                                // console.log(eachIngredient)
                            })
                        })
                    })
                })
            });  
        }
    })
})



