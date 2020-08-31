const Contact = require("../models/contacts");

const contactData = [
    {
      firstName: "Arun",
      lastName: "Kumar",
      email: "test123@gmail.com",
      phone: 8210779362
    },
    {
      firstName: "Ram",
      lastName: "Kumar",
      email: "test213@gmail.com",
      phone: 9578576952
    },
    {
      firstName: "Ravi",
      lastName: "Kumar",
      email: "test231@gmail.com",
      phone: 9578576949
    },
    {
      firstName: "Magesh",
      lastName: "Kumar",
      email: "test321@gmail.com",
      phone: 9578576950
    },
    {
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
  