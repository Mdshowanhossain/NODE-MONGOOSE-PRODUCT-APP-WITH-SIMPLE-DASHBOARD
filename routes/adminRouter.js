const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { showAdminRouterData, editAdminRouterData, updateAdminRouterData, deleteAdminRouterData } = require('../middleware/admin');

router.get('/', auth, (req, res) => {
    res.render('admin')
})
router.get('edit/', (req, res) => {
    res.render('edit')
})

router.get('/managedata', showAdminRouterData);
router.get('/edit/:id', editAdminRouterData);
router.post('/edits/:id', updateAdminRouterData)
router.post('/delete/:id', deleteAdminRouterData);

module.exports = router;