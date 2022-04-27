import React, { useState, useEffect } from 'react';
import loadIcon from './ratload.gif'
const { Configuration, OpenAIApi } = require("openai");


function Generator(){
    const [showStatic, setShowStatic] = useState(false);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
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
            const configuration = new Configuration({
                apiKey: apikey,
                });
            const openai = new OpenAIApi(configuration);
            const resp = await openai.createCompletion("text-davinci-002", {
                prompt: ingredients,
                max_tokens: 200,
                });
            console.log("Hey")
            console.log(resp)
            console.log(resp.data.choices[0].text)
            setRecipeText(resp.data.choices[0].text);
            setLoading(false);
        } catch (e) {
            console.log("error")
            setError(e);
            setLoading(false);
        }
      };
    
    return (
      <div className=" bg-beige rounded-sm object-center content-center relative w-6/12 h-full
       border-solid border-2 border-transparent rounded flex justify-center items-center flex-col" >
           <div>Generate recipes below by entering ingredients seperated by a single space in the textbox below. Fill in your OpenAI API key and click generate!</div>
           <div className="flex flex-row self-start mx-5">
            <div className="m-2 text-aqua">Ingredients to use:</div>
            <input
            className="border-solid border-2 border-aqua rounded"
            size="47"
            name="ingredients"
            onChange={onIngredientsChange}
            value={ingredients} 
            placeholder={"carrots potatoes"}
            />
           </div>
           <div className="flex flex-row mx-5 my-1 self-start">
            <div className="m-2 text-aqua">OpenAI API Key:</div>
            <input
            className="border-solid border-2 border-aqua rounded w-auto"
            size="50"
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
            <div className="rounded transition bg-purple text-left font-poppins text-beige w-11/12 flex-grow flex justify-center ">
            {
                loading? <img src={loadIcon} className="w-48 h-40"/> : 
                <div className="h-40 border-solid p-2 border-2 border-black" >
                {recipeText}
                </div>
            }
            </div>
  
      </div>
    );
      
    }
    
    export default Generator;