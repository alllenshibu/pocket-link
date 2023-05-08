const db = require('../lib/sqlite.js')


const resolveNewHitController = (req, res) => {
    const key_link = req.params.key_url
    if (!key_link || key_link.length < 3 || key_link === undefined) {
        return res.status(400).json({ error: 'Key link is required' })
    }
    try {
        db.serialize(() => {
            console.log(key_link)
            let destination
            db.get('SELECT * FROM link WHERE key_link = ?', [key_link], function (err, rows) {
                if (err) {
                    return res.status(500).json({ error: err.message })
                }
                destination = rows?.destination_url
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