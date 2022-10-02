const express = require('express');
const mysql = require('mysql');


const router = express.Router();

// MySQL
const pool = mysql.createPool({
    connectionLimit:100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'forum'
})


//  Affichage de la liste des utilisateurs
router.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from utilisateur', (err, rows) => {
            connection.release()

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//  Afficher un  utilisateur par son identifiant
router.get('/:id_utilisateur', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId_utilisateur}`)

        connection.query(
            'SELECT * from utilisateur WHERE id_utilisateur = ?', [req.params.id_utilisateur],
            (err, rows) => {
                connection.release() //return the connection to pool

                if (!err) {
                    res.send(rows)
                } else {
                    console.log(err)
                }
            }
        )
    })
})

//  Suppression d'un utilisateur par son identifiant
router.delete('/:id_utilisateur', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId_utilisateur}`)

        connection.query(
            'DELETE from utilisateur WHERE id_utilisateur = ?', [req.params.id_utilisateur],
            (err, rows) => {
                connection.release() 

                if (!err) {
                    res.send(`L'utilisateur qui a l'id : ${[req.params.id_utilisateur]} a été supprimé avec succès.`)
                } else {
                    console.log(err)
                }
            }
        )
    })
})

//  Ajout d'un nouvel utilisateur
router.post('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body

        connection.query('INSERT into utilisateur SET ?', params, (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(`L'utilisateur ${params.nom} a été ajouté à la liste des utilisateur avec succès.`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

//  Modification d'un utilisateur
router.put('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id_utilisateur, nom, prenom,filiere, email, password } = req.body

        connection.query(
            'UPDATE utilisateur SET nom = ?, prenom= ?, filiere=? ,email = ?, password = ?, WHERE id = ?', [nom, prenom,filiere, email, password, id_utilisateur],
            (err, rows) => {
                connection.release() 

                if (!err) {
                    res.send(`L'utilisateur dont le  nom est: ${nom} a été modifié avec succès.`)
                } else {
                    console.log(err)
                }
            }
        )
        console.log(req.body)
    })
})


module.exports = router;