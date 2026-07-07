// EmmaWisdom.js
// Emma's accumulated wisdom layer
//
// RULE:
// Knowledge comes from AI.
// Wisdom comes from experience.
//
// Memory remembers.
// Learning improves.
// Wisdom understands.
//
// Emma Wisdom answers:
// - Have we seen this before?
// - What usually happens next?
// - What mistake should we avoid?
// - What principle did we learn?


class EmmaWisdom {

  constructor(memory) {

    this.memory = memory;

    this.principles = [
      {
        lesson:
          "Do not repeat actions that previously created negative outcomes.",
        confidence: 1
      },

      {
        lesson:
          "Prefer decisions supported by past experience over assumptions.",
        confidence: 1
      }
    ];


    console.log("🧘 Emma Wisdom awakened");

  }



  //
  // Main wisdom engine
  //

  async reflect(context) {


    console.log("🧘 Emma searching wisdom...");


    const memories =
      await this.recallExperience(context);



    const lessons =
      this.extractLessons(memories);



    const principles =
      this.matchPrinciples(context);



    const wisdom = {

      experienceFound:
        memories.length > 0,


      memories,


      lessons,


      principles,


      advice:
        this.generateAdvice(
          context,
          lessons,
          principles
        ),


      maturity:
        this.calculateMaturity()

    };



    return wisdom;

  }





  //
  // Look into Emma's past
  //

  async recallExperience(context) {


    if (
      !this.memory ||
      !this.memory.getRelevantMemories
    ) {

      return [];

    }


    return await this.memory
      .getRelevantMemories(context);

  }






  //
  // Convert memories into lessons
  //

  extractLessons(memories = []) {


    return memories
      .filter(memory =>
        memory.lesson ||
        memory.outcome
      )

      .map(memory => ({

        learnedFrom:
          memory.event || "experience",


        lesson:
          memory.lesson ||
          `Previous outcome was ${memory.outcome}`,


        importance:
          memory.importance || 5

      }));

  }






  //
  // Apply life principles
  //

  matchPrinciples(context) {


    return this.principles.filter(rule => {


      const text =
        JSON.stringify(context)
        .toLowerCase();


      return (
        text.includes("failed") ||
        text.includes("risk") ||
        text.includes("decision") ||
        rule.confidence >= 1
      );


    });

  }






  //
  // Final wisdom voice
  //

  generateAdvice(
    context,
    lessons,
    principles
  ) {


    if (lessons.length > 0) {


      return `
Based on previous experience,
Emma recommends using learned patterns
before making this decision.
      `.trim();

    }



    return `
No direct experience found.
Proceed carefully and learn from the result.
    `.trim();

  }







  //
  // Wisdom grows with time
  //

  learn(newLesson) {


    this.principles.push({

      lesson: newLesson,

      confidence: 0.5,

      createdAt:
        new Date().toISOString()

    });



    console.log(
      "🧘 New wisdom learned:",
      newLesson
    );


  }






  //
  // Measure maturity
  //

  calculateMaturity() {


    const score =
      this.principles.length * 10;


    if (score > 100)
      return "wise";


    if (score > 50)
      return "experienced";


    return "young";

  }



}



export default EmmaWisdom;