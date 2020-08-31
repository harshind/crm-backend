const Lead = require("../models/leadsModel");

const leadData = [
    {
        id:1,
        contactId:5,
        status: "New",
        name: "Ashiq",
        closeDate: Date.now(),
        amount: 5000
    },
    {   id:2,
        contactId:1,
        status: "Qualified",
        name: "Ashwariya",
        closeDate: Date.now(),
        amount: 5000
    },
    {   id:3,
        contactId:2,
        status: "Contacted",
        name: "Amen",
        closeDate: Date.now(),
        amount: 5000
    },
    {   id:4,
        contactId:3,
        status: "Lost",
        name: "Kunal",
        closeDate: Date.now(),
        amount: 5000
    },
    {   id:5,
        contactId:4,
        status: "Confirmed",
        name: "Muskan",
        closeDate: Date.now(),
        amount: 5000
    }
]


const leadSeed = async () => {
    //This line will erase pre-existing data
    await Lead.sync({ force: true });
  
    leadData.forEach(async (data) => {
      try {
        const result = await Lead.create(data);
        console.log(result.get());
      } catch (e) {
        console.error(e);
      }
    });
  };
  
  leadSeed();