import Emma from "./Emma";
import EmmaMemory from "./EmmaMemory";


// Emma experiences repeated customer behavior

Emma.experience(
  "ANY_CONNECTOR",
  {
    action:"CUSTOMER_INTEREST",
    item:"Product A"
  }
);


Emma.experience(
  "ANY_CONNECTOR",
  {
    action:"CUSTOMER_INTEREST",
    item:"Product A"
  }
);


Emma.experience(
  "ANY_CONNECTOR",
  {
    action:"CUSTOMER_INTEREST",
    item:"Product A"
  }
);


Emma.experience(
  "ANY_CONNECTOR",
  {
    action:"CUSTOMER_INTEREST",
    item:"Product A"
  }
);


Emma.experience(
  "ANY_CONNECTOR",
  {
    action:"CUSTOMER_INTEREST",
    item:"Product A"
  }
);





// Check evolved memory

EmmaMemory.showMemories();

setTimeout(()=>{

  Emma.think();

},3000);