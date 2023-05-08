const db = require('../lib/sqlite.js')

const getAllLinkMappingsControler = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    try {
        db.serialize(() => {
            db.all('SELECT * FROM link', function (err, rows) {
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


    const key_link = req?.body?.key_link
    const destination_url = req?.body?.destination_url

    if (!key_link || key_link.length < 3 || key_link === undefined) {
        return res.status(400).json({ error: 'Key link is required' })
    }

    if (!destination_url || destination_url.length < 3 || destination_url === undefined) {
        return res.status(400).json({ error: 'Destination url is required' })
    }

    try {
        db.serialize(() => {
            db.run('INSERT INTO link(key_link, destination_url) VALUES(?, ?)', [key_link, destination_url], function (err, row) {
                if (err) {
                    console.log(err.message);
                }
            })
        })

        return res.status(200).json({ key_link: key_link, destination_url: destination_url })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

}



module.exports = {
    getAllLinkMappingsControler,
    addNewLinkMappingController,
}