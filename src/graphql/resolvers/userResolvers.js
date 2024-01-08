const User = require("../../data/models/user");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const token = jwt.sign(
    { username: user.username, id: user.id },
    process.env.SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

const userResolvers = {
  Query: {},
  Mutation: {
    createUser: async (_, { input }, { res }) => {
      try {
        const newUser = {
          username: input.username,
          firstName: input.firstName,
          lastName: input.lastName,
          password: input.password,
        };

        const user = await User.createUser(newUser);
        token = createToken(user);
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // use secure in production
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        return { message: "Authenticated" };
      } catch (error) {
        throw new Error("Error creating user: " + error.message);
      }
    },
    login: async (_, { username, password }, { res }) => {
      try {
        console.log(username);
        const user = await User.findOne({ username: username });
        console.log(user);
        if (user && User.verifyPassword(password, user.password)) {
          token = createToken(user);
          res.cookie("token", token, {
            httpOnly: true,
            secure: "secure", // use secure in production
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          }); 
          console.log(token);
          return { message: "Authenticated" };
        } else {
          throw new Error("Wrong password");
        }
      } catch (error) {
        throw new Error("Error fetching users: " + error.message);
      }
    },
  },
};

module.exports = userResolvers;
