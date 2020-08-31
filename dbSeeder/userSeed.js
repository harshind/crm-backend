const Contact = require("../models/userModel");

const userData = [
    {
      firstName: "Arun",
      lastName: "Kumar",
      username: "test123@gmail.com",
      password: "12345678",
      type:"Admin"
    },
    {
      firstName: "Ram",
      lastName: "Kumar",
      username: "test213@gmail.com",
      password: "12345678",
      type:"Employee"
    },
    {
      firstName: "Ravi",
      lastName: "Kumar",
      username: "test231@gmail.com",
      password: "12345678",
      type:"Employee"
    },
    {
      firstName: "Magesh",
      lastName: "Kumar",
      username: "test321@gmail.com",
      password: "12345678",
      type:"Manager"
    },
    {
      firstName: "Suresh",
      lastName: "Kumar",
      username: "test132@gmail.com",
      password: "12345678",
      type:"Employee-p"
    }
  ];
  
  const userSeed = async () => {
    //This line will erase pre-existing data
    await User.sync({ force: true });
  
    contactData.forEach(async (user) => {
      try {
        const result = await User.create(user);
        console.log(result.get());
      } catch (e) {
        console.error(e);
      }
    });
  };
  
  userSeed();
  