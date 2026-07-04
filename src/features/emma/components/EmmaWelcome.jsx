import "../styles/EmmaWelcome.css";
import { ArrowRight } from "lucide-react";


function EmmaWelcome({ onNext }) {


    return (

        <main className="emma-page">


            <section className="emma-panel">


                <div className="brand">
                    LinkHub
                </div>


                <div className="emma-avatar"></div>


                <h1>
                    Hi, I'm Emma
                </h1>


                <h2>
                    Your Business Growth Manager
                </h2>


                <p>
                    Before I start working, I'd love to learn a little
                    about your business.
                </p>


                <button
                    className="emma-action"
                    onClick={onNext}
                >

                    Let's Get Started

                    <ArrowRight size={18}/>

                </button>


            </section>


        </main>

    );

}


export default EmmaWelcome;