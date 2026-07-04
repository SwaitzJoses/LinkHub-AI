import { useState } from "react";
import "../styles/EmmaBusiness.css";


function EmmaBusiness({ onNext }) {


    const [businessName, setBusinessName] = useState("");
    const [businessInfo, setBusinessInfo] = useState("");
    const [error, setError] = useState("");


    const handleContinue = () => {


        if (
            businessName.trim() === "" ||
            businessInfo.trim() === ""
        ) {

            setError(
                "Please tell me about your business first."
            );

            return;

        }


        setError("");


        onNext();

    };



    return (

        <main className="business-page">


            <section className="business-card">


                <span className="step">
                    Step 1 of 3
                </span>



                <h1>
                    Tell me about your business
                </h1>



                <p>
                    The better I understand your business,
                    the better I can help.
                </p>




                <div className="form-group">


                    <label>
                        Business name
                    </label>


                    <input

                        value={businessName}

                        onChange={(e)=>
                            setBusinessName(e.target.value)
                        }

                        placeholder="Example: Fashion Hub"

                    />


                </div>




                <div className="form-group">


                    <label>
                        What does your business do?
                    </label>


                    <textarea

                        value={businessInfo}

                        onChange={(e)=>
                            setBusinessInfo(e.target.value)
                        }


                        placeholder="Example: We sell sarees through WhatsApp and our store."

                    />


                </div>



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


export default EmmaBusiness;