// EmmaCard.jsx
// Emma's visible presence
//
// RULE:
// EmmaCard does not think.
// EmmaCard does not decide.
// EmmaCard only shows Emma's presence.
//
// Brain = intelligence
// Presence = awareness
// Card = body


import { useEffect, useState } from "react";
import Emma from "../../emma/Emma";

import "./EmmaCard.css";


export default function EmmaCard() {


  const [presence, setPresence] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [thinking, setThinking] = useState(false);



  useEffect(() => {

    loadEmmaPresence();


    const interval = setInterval(() => {
      loadEmmaPresence();
    }, 5000);


    return () => clearInterval(interval);


  }, []);





  async function loadEmmaPresence(){

    try{

      setThinking(true);


      const currentPresence =
        await Emma.getPresence();


      const currentTimeline =
        await Emma.getTimeline();



      setPresence(currentPresence);

      setTimeline(
        currentTimeline?.slice(0,3) || []
      );


    }
    catch(error){

      console.error(
        "Emma presence unavailable",
        error
      );

    }
    finally{

      setThinking(false);

    }

  }







  if(!presence){

    return (

      <div className="emma-card">

        <div className="emma-avatar">
          E
        </div>

        <p>
          Emma is waking up...
        </p>

      </div>

    );

  }







  return (

    <div className="emma-card">


      {/* Emma identity */}

      <div className="emma-header">


        <div className={
          `emma-avatar ${
            thinking ? "thinking" : ""
          }`
        }>

          E

        </div>



        <div>

          <h3>
            Emma
          </h3>


          <span className="emma-status">

            {
              presence.mode ||
              "Watching"
            }

          </span>


        </div>


      </div>





      {/* Presence message */}

      <div className="emma-message">


        {
          presence.message ||
          "I'm here. Watching and learning."
        }


      </div>






      {/* Awareness */}

      <div className="emma-awareness">


        <small>
          Current awareness
        </small>


        <strong>

          {
            presence.awareness ||
            "Observing your world"
          }

        </strong>


      </div>







      {/* Timeline preview */}


      <div className="emma-timeline">


        {
          timeline.map((item,index)=>(


            <div
              className="timeline-item"
              key={index}
            >

              {item.summary}

            </div>


          ))
        }



      </div>




    </div>

  );

}