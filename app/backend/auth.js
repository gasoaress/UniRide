const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await admin.auth().getUserByEmail(email);
        
        await admin.auth().updateUser(user.uid, { password: password });

        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

module.exports = router;
