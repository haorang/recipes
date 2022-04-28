import React, { useState, useEffect } from 'react';
import loadIcon from './ratload.gif'

const { Configuration, OpenAIApi } = require("openai");
function Generator(){
    const ingredientPrompt='Ingredients:\n'+
    'flour, salt, baking soda, butter, sugar, egg, milk, vanilla extract\n'+
    '\n'+
    'Name: Sugar Cookies\n'+
    '\n'+
    'Recipe:\n'+
    '1. Whisk flour, salt, and baking soda together in a bowl. In a separate bowl, cream the butter, white sugar, and brown sugar together until mixture is light and fluffy, 3 to 4 minutes. Add the egg, milk, and vanilla extract. Whisk liquids together in small areas around the bowl, then all together to avoid separation.\n'+
    '\n'+
    '2. Pour dry ingredients into the wet ingredients; stir until flour is thoroughly mixed in. Stir in the chocolate chips.\n'+
    '\n'+
    '3. Transfer dough to a resealable plastic bag. Refrigerate until dough is firm, at least 2 hours.\n'+
    '\n'+
    '4. Preheat oven to 375 degrees F (190 degrees C). Line baking sheet with parchment paper.\n'+
    '\n'+
    '5. Scoop out rounded tablespoons of dough and place on prepared baking sheet, leaving 4 inches of space between cookies (about 8 per sheet). Bake in preheated oven until cookies are golden brown, about 12 minutes. Slide parchment and cookies onto a cooling rack for a few minutes. Remove parchment and finish cooling the cookies on the rack.\n'+
    '\n'+
    'Ingredients:\n'+
    'butter, shrimp, olive oil, pepper, salt, shallots, linguine, red pepper flakes, garlic, shallots\n'+
    '\n'+
    'Name: Shrimp Scampi\n'+
    '\n'+
    'Recipe:\n'+
    '1. Bring a large pot of salted water to a boil; cook linguine in boiling water until nearly tender, 6 to 8 minutes. Drain.\n'+
    '\n'+
    '2. Melt 2 tablespoons butter with 2 tablespoons olive oil in a large skillet over medium heat. Cook and stir shallots, garlic, and red pepper flakes in the hot butter and oil until shallots are translucent, 3 to 4 minutes. Season shrimp with kosher salt and black pepper; add to the skillet and cook until pink, stirring occasionally, 2 to 3 minutes. Remove shrimp from skillet and keep warm.\n'+
    '\n'+
    '3. Pour white wine and lemon juice into skillet and bring to a boil while scraping the browned bits of food off of the bottom of the skillet with a wooden spoon. Melt 2 tablespoons butter in skillet, stir 2 tablespoons olive oil into butter mixture, and bring to a simmer. Toss linguine, shrimp, and parsley in the butter mixture until coated; season with salt and black pepper. Drizzle with 1 teaspoon olive oil to serve.\n'+
    '\n'+
    'Ingredients:\n'+
    'cooked chicken, spaghetti, cream of mushroom soup, cheddar cheese, green pepper, onion, pimentos, chicken broth, cayenne pepper, salt, pepper\n'+
    '\n'+
    'Name: Chicken Spaghetti\n'+
    '\n'+
    'Recipe:\n'+
    '1. Cook 1 cut up fryer and pick out the meat to make two cups. \n'+
    '2. Cook spaghetti in same chicken broth until al dente. Do not overcook. When spaghetti is cooked, combine with remaining ingredients except additional 1 cup sharp cheddar.\n'+
    '3. Place mixture in casserole pan and top with remaining sharp cheddar. Cover and freeze up to six months, cover and refrigerate up to two days, or bake immediately: 350 degrees for 45 minutes until bubbly. (If the cheese on top starts to get too cooked, cover with foil).\n'+
    '\n'+
    'Ingredients:\n';

    const namePrompt = 'Name: Sugar Cookies\n'+
    '\n'+
    'Ingredients:\n'+
    'flour, salt, baking soda, butter, sugar, egg, milk, vanilla extract\n'+
    '\n'+
    'Recipe:\n'+
    '1. Whisk flour, salt, and baking soda together in a bowl. In a separate bowl, cream the butter, white sugar, and brown sugar together until mixture is light and fluffy, 3 to 4 minutes. Add the egg, milk, and vanilla extract. Whisk liquids together in small areas around the bowl, then all together to avoid separation.\n'+
    '\n'+
    '2. Pour dry ingredients into the wet ingredients; stir until flour is thoroughly mixed in. Stir in the chocolate chips.\n'+
    '\n'+
    '3. Transfer dough to a resealable plastic bag. Refrigerate until dough is firm, at least 2 hours.\n'+
    '\n'+
    '4. Preheat oven to 375 degrees F (190 degrees C). Line baking sheet with parchment paper.\n'+
    '\n'+
    '5. Scoop out rounded tablespoons of dough and place on prepared baking sheet, leaving 4 inches of space between cookies (about 8 per sheet). Bake in preheated oven until cookies are golden brown, about 12 minutes. Slide parchment and cookies onto a cooling rack for a few minutes. Remove parchment and finish cooling the cookies on the rack.\n'+
    '\n'+
    'Name: Shrimp Scampi\n'+
    '\n'+
    'Ingredients:\n'+
    'butter, shrimp, olive oil, pepper, salt, shallots, linguine, red pepper flakes, garlic, shallots\n'+
    '\n'+
    'Recipe:\n'+
    '1. Bring a large pot of salted water to a boil; cook linguine in boiling water until nearly tender, 6 to 8 minutes. Drain.\n'+
    '\n'+
    '2. Melt 2 tablespoons butter with 2 tablespoons olive oil in a large skillet over medium heat. Cook and stir shallots, garlic, and red pepper flakes in the hot butter and oil until shallots are translucent, 3 to 4 minutes. Season shrimp with kosher salt and black pepper; add to the skillet and cook until pink, stirring occasionally, 2 to 3 minutes. Remove shrimp from skillet and keep warm.\n'+
    '\n'+
    '3. Pour white wine and lemon juice into skillet and bring to a boil while scraping the browned bits of food off of the bottom of the skillet with a wooden spoon. Melt 2 tablespoons butter in skillet, stir 2 tablespoons olive oil into butter mixture, and bring to a simmer. Toss linguine, shrimp, and parsley in the butter mixture until coated; season with salt and black pepper. Drizzle with 1 teaspoon olive oil to serve.\n'+
    '\n'+
    'Name: Chicken Spaghetti\n'+
    '\n'+
    'Ingredients:\n'+
    '  cooked chicken, spaghetti, cream of mushroom soup, cheddar cheese, green pepper, onion, pimentos, chicken broth, cayenne pepper, salt, pepper\n'+
    '\n'+
    'Recipe:\n'+
    '1. Cook 1 cut up fryer and pick out the meat to make two cups. \n'+
    '2. Cook spaghetti in same chicken broth until al dente. Do not overcook. When spaghetti is cooked, combine with remaining ingredients except additional 1 cup sharp cheddar.\n'+
    '3. Place mixture in casserole pan and top with remaining sharp cheddar. Cover and freeze up to six months, cover and refrigerate up to two days, or bake immediately: 350 degrees for 45 minutes until bubbly. (If the cheese on top starts to get too cooked, cover with foil).\n'+
    '\n'+
    'Name:';



    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [ingredients, setIngredients] = useState("")
    const [apikey, setApikey] = useState("")
    const [nameMode, setNameMode] = useState(false)
    const [recipeText, setRecipeText] = useState("Enter ingredients (or dish name in name mode) above and click generate!");

    const onIngredientsChange = e => {
        setIngredients(e.target.value)
    }

    const onApikeyChange = e => {
        setApikey(e.target.value)
    }

    const onModeChange = e => {
        setNameMode(!nameMode)
    }

    const fetchRecipe = async () => {
        setLoading(true);
        setError(null);
    
        try {
            // const tokens = ingredients.split(" ")
            // const commaSep = tokens.join(", ") + ","
            const prompt = nameMode? namePrompt + ingredients : (ingredientPrompt + ingredients).trim() + ","
            const configuration = new Configuration({
                apiKey: apikey,
                });
            const openai = new OpenAIApi(configuration);
            const resp = await openai.createCompletion("text-davinci-002", {
                prompt: prompt,
                max_tokens: 300,
                });
            console.log(resp)
            console.log(resp.data.choices[0].text)
            const newRecipeText = nameMode? "Name: " + ingredients + resp.data.choices[0].text : "Ingredients:\n"+ ingredients + "," + resp.data.choices[0].text
            setRecipeText(newRecipeText);
            setLoading(false);
        } catch (e) {
            setRecipeText("")
            setError(e.message);
            setLoading(false);
        }
      };
    
    return (
      <div className=" transition bg-beige rounded-sm object-center content-center relative w-6/12
       border-solid border-2 border-transparent rounded flex justify-center items-center flex-col text-left" >
           <div className="pl-2 mx-5 text-aqua mb-4 ">Generate recipes below by entering ingredients (or a dish name in name mode) seperated by a commas in the textbox below. Fill in your OpenAI API key and click generate! If you don't have a key click <a className="text-rat" target="_blank" href="https://beta.openai.com/account/api-keys">here</a> to sign up. </div>
           <div className="flex flex-row self-start mx-5">
            <div className="p-2 mr-2 text-aqua">{nameMode? "Name of dish:" : "Ingredients to use"}</div>
            <input
            className="p-1 border-solid border-2 border-aqua rounded"
            size="27"
            name="ingredients"
            onChange={onIngredientsChange}
            value={ingredients} 
            placeholder={nameMode? "Peking-style Alligator" : "carrots, potatoes"}
            />
             <button className = " mx-2 bg-aqua hover:bg-hover text-beige font-bold px-4 border-b-4 border-darker hover:border-aqua rounded" onClick={onModeChange}>
                {nameMode? "Ingredient Mode": "Name Mode"}
            </button>
           </div>

           <div className="flex flex-row mx-5 my-1 self-start">
            <div className="p-2 mr-2 text-aqua">OpenAI API Key:</div>
            <input
            className="p-1 border-solid border-2 border-aqua rounded w-auto"
            size="30"
            type="password"
            name="ingredients"
            onChange={onApikeyChange}
            value={apikey}           
            placeholder={"Paste your API key here..."} 
            />
           </div>
            {loading? <button className = "m-2 bg-aqua text-beige font-bold py-2 px-4 rounded opacity-50 border-b-4 border-transparent cursor-not-allowed">
                Generat🐁
            </button>:
            <button className = "m-2 bg-aqua hover:bg-hover text-beige font-bold py-2 px-4 border-b-4 border-darker hover:border-aqua rounded" onClick={fetchRecipe}>
                Generat🐁
            </button>}
            <div className="break-words whitespace-pre-wrap min-h-[20rem] h-auto rounded transition bg-purple text-left font-poppins text-beige w-11/12 flex-grow flex justify-center ">
            {
                loading? <img src={loadIcon} className="w-48 h-40"/> :
                <div className="p-2 w-full" >
                {recipeText} {error? error : null}
                </div>
            }
            </div>
  
      </div>
    );
      
    }
    
    export default Generator;