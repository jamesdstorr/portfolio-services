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
  Query: {
    verifyToken: async (_, args, context) => {
      try {
        const {token} = context;
        console.log(token);
        if (!token) {
          return {authenticated: false};
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ username: decoded.username });
        if (!user) {
          return {authenticated: false};
        }
        return {authenticated: true};
      } catch (error) {
        return {authenticated: false};;
      }
    }
  },
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
          secure: true, // use secure in production
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          path: "/",
        }); 
        return { token: token };
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
            secure: true, // use secure in production
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: "/",
          });  
          
          return { token: token };
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
