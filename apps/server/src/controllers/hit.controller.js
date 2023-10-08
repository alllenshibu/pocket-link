const db = require("../lib/sqlite.js");

const resolveNewHitController = (req, res) => {
  const slug = req.params.key_url;
  if (!slug || slug.length < 3 || slug === undefined) {
    return res.status(400).json({ error: "Key link is required" });
  }
  try {
    let destination;
    db.run(
      "UPDATE link SET hits = hits + 1 WHERE slug = ?",
      [slug],
      (err, rows) => {
        if (err) {
          console.log(err.message);
          return res.status(500).json({ error: "Something went wrong" });
        }
      }
    );
    db.get("SELECT * FROM link WHERE slug = ?", [slug], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log({ rows });
      destination = rows?.destination;

      return res.redirect(301, destination);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  resolveNewHitController,
};
