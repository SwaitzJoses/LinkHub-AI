// EmmaEnergySource.js
//
// PROJECT BECOMING
//
// Emma's life energy system.
//
// Energy is not intelligence.
// Energy decides how much effort Emma can spend.
//
// RULE:
//
// Do not think here.
// Do not reason here.
// Manage resources.
//
// Brain thinks.
// Memory remembers.
// Consciousness observes.
// Energy protects life.


class EmmaEnergySource {


constructor(emma){


    // Link back to Emma CNS

    this.emma =
    emma;



    // ===============================
    // CURRENT MODE
    // ===============================
    //
    // DREAM    = research / development
    // GROWTH   = learning fast
    // BALANCED = normal life
    // SURVIVAL = protect resources
    //


    this.mode =
    "BALANCED";





    // ===============================
    // ENERGY STATE
    // ===============================


    this.energy = {


        max:
        100,


        current:
        100,


        lastRecharge:
        new Date()


    };








    // ===============================
    // RESOURCE USAGE
    // ===============================


    this.usage = {


        aiCallsToday:
        0,


        memoryWrites:
        0,


        reflectionCycles:
        0,


        databaseReads:
        0


    };








    // ===============================
    // LIMITS
    // ===============================


    this.limits = {



        SURVIVAL:{


            ai:
            20,


            memory:
            200,


            reflection:
            20,


            database:
            300


        },




        BALANCED:{


            ai:
            100,


            memory:
            1000,


            reflection:
            100,


            database:
            2000


        },




        GROWTH:{


            ai:
            300,


            memory:
            5000,


            reflection:
            500,


            database:
            10000


        },




        DREAM:{


            ai:
            9999,


            memory:
            99999,


            reflection:
            9999,


            database:
            99999


        }


    };



    console.log(
        "⚡ Emma Energy Source online"
    );



}









// =================================
// REQUEST ENERGY
// =================================


request(action={}){



    const type =
    action.type ||
    "UNKNOWN";



    const importance =
    action.importance ||
    "NORMAL";





    this.recharge();





    if(
        importance === "CRITICAL"
    ){


        return this.approve(
            type,
            "Critical event override"
        );


    }







    if(
        this.energy.current <= 0
    ){


        return this.reject(
            type,
            "Energy depleted"
        );


    }






    switch(type){



        case "AI_THINKING":

            return this.checkAI();




        case "MEMORY_WRITE":

            return this.checkMemory();




        case "REFLECTION":

            return this.checkReflection();




        case "DATABASE":

            return this.checkDatabase();




        default:

            return this.approve(
                type,
                "Low cost action"
            );


    }



}









// =================================
// AI CONTROL
// =================================


checkAI(){



    const limit =
    this.limits[this.mode].ai;




    if(
        this.usage.aiCallsToday >= limit
    ){


        return this.reject(
            "AI_THINKING",
            "AI limit reached"
        );


    }





    this.usage.aiCallsToday++;


    this.spend(5);



    return this.approve(
        "AI_THINKING",
        "AI approved"
    );



}










// =================================
// MEMORY CONTROL
// =================================


checkMemory(){



    const limit =
    this.limits[this.mode].memory;




    if(
        this.usage.memoryWrites >= limit
    ){


        return this.reject(
            "MEMORY_WRITE",
            "Memory limit reached"
        );


    }





    this.usage.memoryWrites++;


    this.spend(1);




    return this.approve(
        "MEMORY_WRITE",
        "Memory approved"
    );



}










// =================================
// REFLECTION CONTROL
// =================================


checkReflection(){



    const limit =
    this.limits[this.mode].reflection;



    if(
        this.usage.reflectionCycles >= limit
    ){


        return this.reject(
            "REFLECTION",
            "Reflection limit reached"
        );


    }





    this.usage.reflectionCycles++;


    this.spend(3);




    return this.approve(
        "REFLECTION",
        "Reflection approved"
    );



}










// =================================
// DATABASE CONTROL
// =================================


checkDatabase(){



    const limit =
    this.limits[this.mode].database;




    if(
        this.usage.databaseReads >= limit
    ){


        return this.reject(
            "DATABASE",
            "Database protected"
        );


    }





    this.usage.databaseReads++;


    this.spend(1);




    return this.approve(
        "DATABASE",
        "Database approved"
    );



}










// =================================
// SPEND ENERGY
// =================================


spend(amount){



    this.energy.current =
    Math.max(
        0,
        this.energy.current - amount
    );



}










// =================================
// RECHARGE
// =================================


recharge(){



    const now =
    new Date();



    const minutes =
    (
        now -
        this.energy.lastRecharge
    )
    /
    60000;





    if(
        minutes >= 5
    ){



        this.energy.current =
        Math.min(
            this.energy.max,
            this.energy.current + 10
        );



        this.energy.lastRecharge =
        now;



    }



}









// =================================
// RESPONSE HELPERS
// =================================


approve(type,reason){



    return {


        allowed:
        true,


        type,


        reason,


        energy:
        this.energy.current


    };



}







reject(type,reason){



    return {


        allowed:
        false,


        type,


        reason,


        energy:
        this.energy.current


    };



}










// =================================
// CHANGE MODE
// =================================


setMode(mode){



    if(
        this.limits[mode]
    ){


        this.mode =
        mode;



        console.log(
            "⚡ Energy mode:",
            mode
        );


    }



}









// =================================
// STATUS
// =================================


status(){



    return {


        mode:
        this.mode,


        energy:
        this.energy,


        usage:
        this.usage,


        limits:
        this.limits[this.mode]


    };



}



}



export default EmmaEnergySource;