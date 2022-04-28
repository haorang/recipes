import React, { useState, useEffect } from 'react';
import loadIcon from './ratload.gif'

const { Configuration, OpenAIApi } = require("openai");
function Generator(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [ingredients, setIngredients] = useState("")
    const [apikey, setApikey] = useState("")
    const [recipeText, setRecipeText] = useState("Enter ingredients above (2-3 works best) and click generate!");

    const onIngredientsChange = e => {
        setIngredients(e.target.value)
    }

    const onApikeyChange = e => {
        setApikey(e.target.value)
    }

    const fetchRecipe = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const tokens = ingredients.split(" ")
            const commaSep = tokens.join(", ")
            const prompt = ("Ingredients:\n " + commaSep).trim()
            const configuration = new Configuration({
                apiKey: apikey,
                });
            const openai = new OpenAIApi(configuration);
            const resp = await openai.createCompletion("text-davinci-002", {
                prompt: prompt,
                max_tokens: 1000,
                });
            console.log(resp)
            console.log(resp.data.choices[0].text)
            setRecipeText(prompt + resp.data.choices[0].text);
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
           <div className="pl-2 mx-5 text-aqua ">Generate recipes below by entering ingredients seperated by a single space in the textbox below. Fill in your OpenAI API key and click generate! If you don't have a key click <a className="text-rat" target="_blank" href="https://beta.openai.com/account/api-keys">here</a> to sign up. </div>
           <div className="flex flex-row self-start mx-5">
            <div className="p-2 mr-2 text-aqua">Ingredients to use:</div>
            <input
            className="p-1 border-solid border-2 border-aqua rounded"
            size="27"
            name="ingredients"
            onChange={onIngredientsChange}
            value={ingredients} 
            placeholder={"carrots potatoes"}
            />
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