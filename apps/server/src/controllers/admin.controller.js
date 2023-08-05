const db = require('../lib/sqlite.js')

const getAllLinkMappingsControler = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    try {
        db.serialize(() => {

            db.all('SELECT * FROM link ORDER BY created_at DESC', function (err, rows) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.status(200).json({ links: rows })
            })
        })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


const addNewLinkMappingController = (req, res) => {


    const slug = req?.body?.slug
    const destination = req?.body?.destination
    const created_at = req?.body?.created_at

    if (!slug || slug.length < 3 || slug === undefined) {
        return res.status(400).json({ error: 'Key link is required' })
    }

    if (!destination || destination.length < 3 || destination === undefined) {
        return res.status(400).json({ error: 'Destination url is required' })
    }

    if (!created_at || created_at === undefined) {
        return res.status(400).json({ error: 'Created at is required' })
    }

    try {
        db.serialize(() => {
            db.run('INSERT INTO link(slug, destination, created_at) VALUES(?, ?, ?)', [slug, destination, created_at], function (err, row) {
                if (err) {
                    console.log(err.message);
                }
            })
        })

        return res.status(200).json({ slug: slug, destination: destination })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: err.message })
    }

}



module.exports = {
    getAllLinkMappingsControler,
    addNewLinkMappingController,
}