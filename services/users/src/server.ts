import express from "express";

const app = express();

app.get("/me", (req, res) => {
  const userId = req.headers["x-user-id"];
  const role = req.headers["x-user-role"];

  res.json({
    message: "User data",
    userId,
    role,
  });
});

app.listen(3002, () => {
  console.log("Users service on 3002");
});
