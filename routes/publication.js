const express = require('express');
const mysql = require ('mysql')


const router = express.Router()

// MySQL
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'forum'
})



//  Récupération de la liste de la publication
router.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from publication', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//  Récupération des publications par son ID 
router.get('/:id_publication', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(
            'SELECT * from publication WHERE id_publication = ?', [req.params.id_publication],
            (err, rows) => {
                connection.release() 

                if (!err) {
                    res.send(rows)
                } else {
                    console.log(err)
                }
            }
        )
    })
})

//  Suppression d'une publication par son ID 
router.delete('/:id_publication', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(
            'DELETE from publication WHERE id_publication = ?', [req.params.id_publication],
            (err, rows) => {
                connection.release() 

                if (!err) {
                    res.send(`La publication  qui a l'id : ${[req.params.id_publication]} a été  supprimé avec succès.`)
                } else {
                    console.log(err)
                }
            }
        )
    })
})

//  Ajout d'une nouvelle publication 
router.post('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT into publication SET ?', params, (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(`la publication  ${params.id_publication} a ete ajouté avec succès.`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})



module.exports = router