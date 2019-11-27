
// MOVE THIS TO orders.js after products are loaded from DB

router.get("/", tokenControl, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let decodedToken = jwt.decode(req.headers.authorization.split(" ")[1]);
  let currentUserID = decodedToken.id;

  try {
    getPreviousOrders();
  } catch (err) {
    return console.log("ERROR @ cart backend @ getPreviousOrders() " + err);
  }

  async function getPreviousOrders(){
    let response = await db.query(
      `
      
      `
    );

    res.status(200).send(response);
  }

});
