const Contact = require("../models/contacts");

const contactData = [
    {
      id:5,
      firstName: "Arun",
      lastName: "Kumar",
      email: "test123@gmail.com",
    },
    {
      id:1,
      firstName: "Ram",
      lastName: "Kumar",
      email: "test213@gmail.com",
    },
    {
      id:2,
      firstName: "Ravi",
      lastName: "Kumar",
      email: "test231@gmail.com",
    },
    { 
      id:3,
      firstName: "Magesh",
      lastName: "Kumar",
      email: "test321@gmail.com",
      phone: 9578576950
    },
    {
      id:4,
      firstName: "Suresh",
      lastName: "Kumar",
      email: "test132@gmail.com",
      phone: 9578576951
    }
  ];
  
  const contactSeed = async () => {
    //This line will erase pre-existing data
    await Contact.sync({ force: true });
    
    contactData.forEach(async (contact) => {
      try {
        const result = await Contact.create(contact);
        console.log(result.get());
      } catch (e) {
        console.error(e);
      }
    });
  };
  
  contactSeed();
  