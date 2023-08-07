const db = require('../lib/sqlite.js')


const resolveNewHitController = (req, res) => {
    const slug = req.params.key_url
    if (!slug || slug.length < 3 || slug === undefined) {
        return res.status(400).json({ error: 'Key link is required' })
    }
    try {
        db.serialize(() => {
            let destination
            db.get('SELECT * FROM link WHERE slug = ?', [slug], function (err, rows) {
                if (err) {
                    return res.status(500).json({ error: err.message })
                }
                db.run('UPDATE link SET hits = hits + 1 WHERE slug = ?', [slug], function (err, row) {
                    if (err) {
                        console.log(err.message);
                    }
                })
                destination = rows?.destination
                res.redirect(301, destination)
            })

        })

    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    resolveNewHitController
}