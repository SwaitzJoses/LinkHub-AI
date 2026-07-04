import { useState } from "react";


import EmmaWelcome from "./components/EmmaWelcome";
import EmmaBusiness from "./components/EmmaBusiness";
import EmmaGoals from "./components/EmmaGoals";
import EmmaSummary from "./components/EmmaSummary";


function EmmaOnboarding(){


    const [step,setStep] = useState(1);


    const [emmaMemory,setEmmaMemory] = useState({

        businessName:"",
        businessInfo:"",
        goal:""

    });



    const updateMemory = (data)=>{


        setEmmaMemory(prev => ({

            ...prev,

            ...data

        }));


    };




    if(step === 1){

        return (

            <EmmaWelcome
                onNext={() => setStep(2)}
            />

        );

    }





    if(step === 2){

        return (

            <EmmaBusiness

                onNext={(data)=>{

                    updateMemory(data);

                    setStep(3);

                }}

            />

        );

    }





    if(step === 3){

        return (

            <EmmaGoals

                onNext={(data)=>{

                    updateMemory(data);

                    setStep(4);

                }}

            />

        );

    }




    if(step === 4){

        return (

            <EmmaSummary

                memory={emmaMemory}

            />

        );

    }


}


export default EmmaOnboarding;