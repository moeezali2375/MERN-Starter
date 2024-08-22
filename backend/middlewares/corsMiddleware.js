const cors = require("cors");

const crossOrigin = (app) => {
  if (process.env.NODE_ENV === "dev") {
    //! Development environment
    app.use(
      cors({
        origin: process.env.CLIENT_DEV_URL,
      })
    );
  } else {
    //! Production environment
    app.use(
      cors({
        origin: process.env.CLIENT_PROD_URL,
      })
    );
  }
};
module.exports = { crossOrigin };
