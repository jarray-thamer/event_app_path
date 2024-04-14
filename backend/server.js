import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
// <----------- Connection to DB ----------->
import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
});
db.connect(function (err) {
  if (err) throw err;
  console.log("db Connected!");
});

// <----------- Cors ----------->
import cors from "cors";
app.use(cors({ origin: "*", credentials: true }));

// <-----------Body parser ----------->
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));

// <------------ Check exist ---------->
app.get("/check/:clerk_id", async (req, res) => {
  try {
    const { clerk_id } = req.params;
    console.log("check clerk:Id -> ", clerk_id);
    const existQuery = "SELECT * FROM user_db WHERE `clerk_id` = ?";
    db.query(existQuery, [clerk_id], async (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (result.length > 0) {
        return res
          .status(201)
          .json({ message: "User already exists !", data: result[0] });
      }
      if (result.length === 0) {
        return res.status(201).json({ message: "User does not exist" });
      }
    });
  } catch (error) {
    console.log("GET: /check/:clerk_id");
    console.error("Database query error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// <----------- Register EndPoint ----------->
// <----------- / v2 ----------->
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, clerk_id } = req.body;
    const emailExistsQuery = "SELECT * FROM user_db WHERE `clerk_id` = ?";
    // Check email existence using callback style:

    db.query(emailExistsQuery, [clerk_id], async (queryError, queryRes) => {
      if (queryError) {
        console.error("Database query error:", queryError);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (queryRes.length > 0) {
        return res.status(409).json({ message: "User already exists !" });
      }
      // insert new user
      //   init values
      const role = "user";
      const path = "";
      const current_stand = 0;
      const admin_state = 0;
      const on_boarding = 0;
      const current_topic = "";
      const behanceLink = "";
      //   -> sql insert query
      const insertQuery =
        "INSERT INTO user_db (`clerk_id`, `full_Name`, `email`, `role`, `behanceLink`, `on_boarding`, `path`, `current_stand`,`current_topic`, `admin_state`) VALUES (?)";
      const values = [
        clerk_id,
        fullName,
        email,
        role,
        behanceLink,
        on_boarding,
        path,
        current_stand,
        current_topic,
        admin_state,
      ];
      db.query(insertQuery, [values], (e, result) => {
        if (e) {
          console.error("Database query error:", e);
          return res
            .status(500)
            .json({ error: "Internal server error insert" });
        }
        if (result) {
          const id = result.insertId;

          const fullData = {
            id,
            fullName,
            email,
            clerk_id,
            role,
            behanceLink,
            on_boarding,
            path,
            current_stand,
            current_topic,
            admin_state,
          };
          return res.status(201).json({
            data: fullData,
            message: "Registration successful",
          });
        }
      });
    });
  } catch (error) {
    console.log("POST: /register");
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error catch" });
  }
});

// <----------- Login EndPoint ----------->
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const checkEmailExistence = "SELECT * FROM user_db WHERE `email` =?";
    db.query(checkEmailExistence, [email], async (e, data) => {
      // data : [id:"",full_name:"", ...]
      if (data.length > 0) {
        bcrypt.compare(password, data[0].password, async (error, response) => {
          if (response) {
            return res
              .status(201)
              .json({ data: data[0], msg: "Login successfully" });
          } else {
            return res.status(401).json({ error: "Wrong Password !" });
          }
        });
      } else {
        return res.status(401).json({ error: "User does not exist !" });
      }
    });
  } catch (error) {
    console.log("POST: /login");
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// <----------- OnBoarding Update EndPoint ----------->
app.put("/on-boarding", async (req, res) => {
  try {
    const { id } = req.body;
    const updateQuery = "UPDATE user_db SET on_boarding =1 WHERE clerk_id =?";
    db.query(updateQuery, [id], (e, result) => {
      if (e) {
        console.error("Database query error:", e);
        return res.status(500).json({ error: "Internal server error update" });
      }
      if (result) {
        return res.status(201).json({
          message: "OnBoarding updated successfully",
        });
      }
    });
  } catch (error) {
    console.log("PUT: on-boarding");
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error catch" });
  }
});

// <----------- Put path to user by id EndPoint ----------->

app.put("/survey", async (req, res) => {
  try {
    const { id, choice, behanceLink } = req.body;
    const updateQuery =
      "UPDATE user_db SET behanceLink= ?, path =?, current_topic =? WHERE clerk_id =?";
    db.query(updateQuery, [behanceLink, choice, choice, id], (e, result) => {
      if (e) {
        console.error("Database query error:", e);
        return res.status(500).json({ error: "Internal server error update" });
      }
      if (result) {
        return res.status(201).json({
          message: "Path updated successfully",
        });
      }
    });
  } catch (e) {
    console.log("PUT: /survey");
    console.error("Putting Path error:", e);
    res.status(500).json({ error: "Internal server error catch" });
  }
});

// <----------- GetUserByID EndPoint ----------->
app.get("/get-user-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getUserByIDQuery = "SELECT * FROM user_db WHERE clerk_id =?";
    db.query(getUserByIDQuery, [id], (e, data) => {
      if (e) {
        console.error("Database query error:", e);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (data.length > 0) {
        return res.status(201).json({ data: data[0] });
      }
    });
  } catch (e) {
    console.log("GET: /get-user-by-id/:id");
    console.error("Getting user error:", e);
    res.status(500).json({ error: "Internal server error catch" });
  }
});

// <----------- GetAllUsers EndPoint ----------->
app.get("/get-all-users", async (req, res) => {
  try {
    const getAllUsersQuery = "SELECT * FROM user_db WHERE role='user'";
    db.query(getAllUsersQuery, (e, data) => {
      if (e) {
        console.error("Database query error:", e);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (data.length > 0) {
        return res.status(201).json({ data: data });
      }
    });
  } catch (e) {
    console.log("GET: /get-all-users");
    console.error("Getting user error:", e);
    res.status(500).json({ error: "Internal server error catch" });
  }
});

// <----------- GetAllAdmins EndPoint ----------->
app.get("/get-all-admins", async (req, res) => {
  try {
    const getAllUsersQuery = "SELECT * FROM user_db WHERE role='admin'";
    db.query(getAllUsersQuery, (e, data) => {
      if (e) {
        console.error("Database query error:", e);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (data.length > 0) {
        return res.status(201).json({ data: data });
      }
    });
  } catch (e) {
    console.log("GET: /get-all-admins");
    console.error("Getting user error:", e);
    res.status(500).json({ error: "Internal server error catch" });
  }
});

// <----------- Delete user EndPoint ----------->
app.delete("/delete", (req, res) => {
  try {
    // Assuming you want to delete the user by ID from the 'id' column
    const sql = "DELETE FROM user_db WHERE id=?";
    db.query(sql, [req.body.id], (error, result) => {
      if (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
      }
    });
  } catch (error) {
    console.log("DELETE: /delete");
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// <----------- Next stand EndPoint ----------->
app.put("/next-stand", (req, res) => {
  const clientPath = ["Client", "Portfolio", "Payment", "PMZ", "Done"];
  const portfolioPath = ["Portfolio", "Client", "Payment", "PMZ", "Done"];
  const pmzPath = ["Payment", "Client", "Portfolio", "PMZ", "Done"];
  const paymentPath = ["Payment", "Portfolio", "Client", "PMZ", "Done"];
  const { id, path, current_stand } = req.body;
  let nextStand = "";
  if (path === "client") {
    nextStand = clientPath[current_stand + 1];
  } else if (path === "portfolio") {
    nextStand = portfolioPath[current_stand + 1];
  } else if (path === "pmz") {
    nextStand = pmzPath[current_stand + 1];
  } else if (path === "payment") {
    nextStand = paymentPath[current_stand + 1];
  }
  const sql =
    "UPDATE user_db SET current_stand = current_stand + 1, current_topic = ? WHERE id = ? AND current_stand < 4";
  db.query(sql, [nextStand, id], (error, result) => {
    if (error) {
      console.error("Error updating user stand:", error.message);
      res.status(500).json({ error: "Internal server error" }); // Send an error response
    } else {
      res.json({ message: "User stand updated successfully" }); // Send a success response
    }
  });
});
// <----------- Prev stand EndPoint ----------->
app.put("/prev-stand", (req, res) => {
  const clientPath = ["Client", "Portfolio", "Payment", "PMZ", "Done"];
  const portfolioPath = ["Portfolio", "Client", "Payment", "PMZ", "Done"];
  const pmzPath = ["Payment", "Client", "Portfolio", "PMZ", "Done"];
  const paymentPath = ["Payment", "Portfolio", "Client", "PMZ", "Done"];
  const { id, path, current_stand } = req.body;
  let nextStand = "";
  if (path === "client") {
    nextStand = clientPath[current_stand - 1];
  } else if (path === "portfolio") {
    nextStand = portfolioPath[current_stand - 1];
  } else if (path === "pmz") {
    nextStand = pmzPath[current_stand - 1];
  } else if (path === "payment") {
    nextStand = paymentPath[current_stand - 1];
  }
  const sql =
    "UPDATE user_db SET current_stand = current_stand - 1, current_topic = ? WHERE id = ? AND current_stand > 0 ";
  db.query(sql, [nextStand, id], (error, result) => {
    if (error) {
      console.log("PUT: /prev-stand");
      console.error("Error updating user stand:", error.message);
      res.status(500).json({ error: "Internal server error" }); // Send an error response
    } else {
      res.json({ message: "User stand updated successfully" }); // Send a success response
    }
  });
});

// <----------- Reset path EndPoint ----------->
app.put("/reset-path", async (req, res) => {
  const { id } = req.body;
  const sql =
    "UPDATE user_db SET current_stand = 0 , path = '', current_topic = '' WHERE id = ? ";
  db.query(sql, [id], (error, result) => {
    if (error) {
      console.log("PUT: /reset-path");
      console.error("Error updating user stand:", error.message);
      res.status(500).json({ error: "Internal server error" }); // Send an error response
    } else {
      res.json({ message: "User stand updated successfully" }); // Send a success response
    }
  });
});

// <----------- Update user to admin EndPoint ----------->
app.put("/update-user-to-admin", (req, res) => {
  const sql = "UPDATE user_db SET role='admin' WHERE id=?";
  db.query(sql, [req.body.id], (error, result) => {
    if (error) {
      console.log("PUT: /update-user-to-admin");
      console.error("Error updating user role:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "User role updated successfully" });
    }
  });
});

// <----------- Update user to manager ------->
app.put("/update-user-to-manager", (req, res) => {
  const sql = "UPDATE user_db SET role='manager' WHERE id=?";
  db.query(sql, [req.body.id], (error, result) => {
    if (error) {
      console.log("PUT: /update-user-to-manager");
      console.error("Error updating user role:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "User role updated successfully" });
    }
  });
});
// <----------- Set admin state red EndPoint ----------->
app.put("/set-admin-state-red", (req, res) => {
  const sql = "UPDATE user_db SET admin_state= 0 WHERE id=?";
  db.query(sql, [req.body.id], (error, result) => {
    if (error) {
      console.log("PUT: /set-admin-state-red");
      console.error("Error updating user role:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "User role updated successfully" });
    }
  });
});

// <----------- Set admin state green EndPoint ----------->
app.put("/set-admin-state-green", (req, res) => {
  const sql = "UPDATE user_db SET admin_state= 1 WHERE id=?";
  db.query(sql, [req.body.id], (error, result) => {
    if (error) {
      console.log("PUT: /set-admin-state-green");
      console.error("Error updating user role:", error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "User role updated successfully" });
    }
  });
});

// <---------- server Start ------------------>
const PORT = 5555;
app.listen(PORT, () => {
  console.log("Server connected on PORT: ", PORT);
});
