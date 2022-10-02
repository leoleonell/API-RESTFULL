const express = require('express');
const mysql = require ('mysql')


const router = express.Router()

// connexion a la base de donnée "MySQL"
const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'forum'
})

//  La fonction permettant la recuperation d'un commentaire
router.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from commentaire', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//  la fonction qui permet de recuperer un commentaire par son ID 
router.get('/:id_commentaire', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(
            'SELECT * from commentaire WHERE id_commentaire = ?', [req.params.id_commentaire],
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

//  la fonction permettant de supprimer un commentaire
router.delete('/:id_commentaire', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(
            'DELETE from commentaire WHERE id_commentaire = ?', [req.params.id_commentaire],
            (err, rows) => {
                connection.release() 

                if (!err) {
                    res.send(`Le commentaire qui a l'id : ${[req.params.id_commentaire]} a été  supprimé avec succès.`)
                } else {
                    console.log(err)
                }
            }
        )
    })
})

//  Ajouter un commentaire
router.post('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT into commentaire SET ?', params, (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(`Le commentaire  ${params.id_commentaire} a ete ajouté avec succès.`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})



module.exports = router