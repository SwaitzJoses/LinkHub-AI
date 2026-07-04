import { useState } from "react";
import "../styles/EmmaGoals.css";


function EmmaGoals({onNext}){


    const [goal, setGoal] = useState("");
    const [error, setError] = useState("");


    const handleContinue = () => {


        if(goal.trim() === ""){


            setError(
                "Please tell me what you want to improve."
            );


            return;

        }



        setError("");


        onNext();


        // next screen later

    };



    return(

        <main className="goals-page">


            <section className="goals-card">


                <span className="step">
                    Step 2 of 3
                </span>



                <h1>
                    What should we improve first?
                </h1>



                <p>
                    Tell me your biggest business challenge right now.
                </p>




                <textarea

                    value={goal}

                    onChange={(e)=>
                        setGoal(e.target.value)
                    }


                    placeholder=
                    "Example: Customers ask prices on WhatsApp but don't buy. I want to improve sales."

                />




                {error && (

                    <div className="error-box">

                        {error}

                    </div>

                )}




                <button

                    className="continue-btn"

                    onClick={handleContinue}

                >

                    Continue

                </button>




            </section>


        </main>

    );

}


export default EmmaGoals;