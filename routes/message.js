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



//  Récupération de la liste des messages 
router.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from message', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//  Récupération d'un messages par son ID 
router.get('/:id_message', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(
            'SELECT * from message WHERE id_message = ?', [req.params.id_message],
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

//  Suppression d'un message par son ID 
router.delete('/:id_message', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(
            'DELETE from message WHERE id_message = ?', [req.params.id_message],
            (err, rows) => {
                connection.release() 

                if (!err) {
                    res.send(`Le message  qui a l'id : ${[req.params.id_message]} a été  supprimé avec succès.`)
                } else {
                    console.log(err)
                }
            }
        )
    })
})

//  Ajout d'un nouveau message 
router.post('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT into message SET ?', params, (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(`le message ${params.id_message} a ete ajouté avec succès.`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})


module.exports = router