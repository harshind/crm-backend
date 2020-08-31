const User = require("../models/userModel");

const userData = [
    {
      id:1,
      firstName: "Arun",
      lastName: "Kumar",
      username: "test123@gmail.com",
      password: "12345678",
      type:"Admin"
    },
    {
      id:2,
      firstName: "Ram",
      lastName: "Kumar",
      username: "test213@gmail.com",
      password: "12345678",
      type:"Employee"
    },
    {
      id:3,
      firstName: "Ravi",
      lastName: "Kumar",
      username: "test231@gmail.com",
      password: "12345678",
      type:"Employee"
    },
    {
      id:4,
      firstName: "Magesh",
      lastName: "Kumar",
      username: "test321@gmail.com",
      password: "12345678",
      type:"Manager"
    },
    {
      id:5,
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
  
    userData.forEach(async (user) => {
      try {
        const result = await User.create(user);
        console.log(result.get());
      } catch (e) {
        console.error(e);
      }
    });
  };
  
  userSeed();
  