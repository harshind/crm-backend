const sr = require("../models/serviceRequest")

const srData=  [
    {
        status:"Open",
        title:"login Bug",
        dueDate:Date.now(),
        type:"level-3"
    },
    {
        status:"Created",
        title:"SignUp Bug",
        dueDate:Date.now(),
        type:"level-3"
    },
    {
        status:"Released",
        title:"Dashboard Bug",
        dueDate:Date.now(),
        type:"level-2"
    },
    {
        status:"Completed",
        title:"Service-5",
        dueDate:Date.now(),
        type:"level-3"
    },
    {
        status:"Cancelled",
        title:"Service-6",
        dueDate:Date.now(),
        type:"level-1"
    }
]

const srSeed = async () => {
    //This line will erase pre-existing data
    await sr.sync({ force: true });
  
    srData.forEach(async (data) => {
      try {
        const result = await sr.create(data);
        console.log(result.get());
      } catch (e) {
        console.error(e);
      }
    });
  };
  
  srSeed();