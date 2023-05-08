const express = require('express');


const { addNewLinkMappingController, getAllLinkMappingsControler } = require('./controllers/admin.controller');
const { resolveNewHitController } = require('./controllers/hit.controller');


const router = express.Router();


// router.get('/', (req, res) => {
//     res.send('Hello World!')
//     db.serialize(() => {
//         db.run(`
//             create table link
//             (
//                 id              integer primary key AUTOINCREMENT,
//                 key_link        text not null,
//                 destination_url text not null,
//                  hits           integer default 0
//             );  
//         `, (err) => {
//             if (err) {
//                 console.log(err.message);
//             }
//         }
//         )
//     })
// });

router.get('/', (req, res) => {
    getAllLinkMappingsControler(req, res)
});



router.get('/', (req, res) => {
    res.send('Hello World!')
});

router.get('/:key_url', (req, res) => {
    const key_url = req.params.key_url;

    switch (key_url) {
        case 'new':
            res.status(405).json({ error: 'Method not allowed' })
            break;
        default:
            resolveNewHitController(req, res)
    }
});

router.post('/:key_url', (req, res) => {
    const key_url = req.params.key_url;
    switch (req.params.key_url) {
        case 'new':
            console.log(key_url);
            addNewLinkMappingController(req, res)
            break;
        default:
            console.log(key_url);
    }
});

module.exports = router;
