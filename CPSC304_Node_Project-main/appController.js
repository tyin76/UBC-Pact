const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({ data: tableContent });
});

router.get('/usersTable', async (req, res) => {
    const tableContent = await appService.fetchUsersTableFromDb();
    res.json({ data: tableContent });
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-demotable", async (req, res) => {
    const { id, name } = req.body;
    const insertResult = await appService.insertDemotable(id, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/submit-survey", async (req, res) => {
    const { email, name, gender, age, postalCode, nickname, sexuality, dreamVacation, favHobby, favSport, favMusicGenre, extravertedness, intuitive, feeling, judging, turbulence } = req.body;
    const insertResult = await appService.insertUser(email, name, gender, age, postalCode, nickname, sexuality, dreamVacation, favHobby, favSport, favMusicGenre, extravertedness, intuitive, feeling, judging, turbulence);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/updateUser", async (req, res) => {
    const { email, fieldToChange, value } = req.body;

    const updateResult = await appService.updateProfile(email, fieldToChange, value);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.delete("/deleteUser", async (req, res) => {
    const { email } = req.body;

    const deleteResult = await appService.deleteUser(email);
    if (deleteResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({
            success: true,
            count: tableCount
        });
    } else {
        res.status(500).json({
            success: false,
            count: tableCount
        });
    }
});

router.post('/selectUser', async (req, res) => {

    console.log(req.body);
    const { query } = req.body;

    const tableContent = await appService.selectUser(query);

    if (tableContent) {
        res.json({ data: tableContent });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/projectUser', async (req, res) => {

    const { arrayOfFields } = req.body;

    const tableContent = await appService.projectUserData(arrayOfFields);

    if (tableContent) {
        res.json({ data: tableContent });
    } else {
        res.status(500).json({ success: false });
    }
});


router.post('/insertTestData', async (req, res) => {
    const insertResult = await appService.insertTestData();
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
})

router.post('/count-users-by-postal', async (req, res) => {
    const { postalCode } = req.body;
    const result = await appService.countUsersByPostalCode(postalCode);
    if (result !== null) {
        res.json({
            success: true,
            count: result
        });
    } else {
        res.status(500).json({
            success: false
        });
    }
});

router.get('/counthomosexuals', async (req, res) => {
    try {
        console.log('it ran');
        const numberHomosexuals = await appService.countHomosexualUsers();

        if (numberHomosexuals === null || numberHomosexuals === undefined) {
            return res.status(404).json({
                success: false,
                error: "No count could be retrieved"
            });
        }

        console.log("Successful homosexuals count:", numberHomosexuals);
        res.json({
            success: true,
            count: numberHomosexuals
        });
    } catch (error) {
        console.error("Comprehensive error counting homosexuals:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal server error"
        });
    }
});

router.get('/countheterosexuals', async (req, res) => {
    try {
        console.log('it ran');
        const number = await appService.countHeterosexualUsers();

        if (number === null || number === undefined) {
            return res.status(404).json({
                success: false,
                error: "No count could be retrieved"
            });
        }

        console.log("Successful homosexuals count:", number);
        res.json({
            success: true,
            count: number
        });
    } catch (error) {
        console.error("Comprehensive error counting homosexuals:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal server error"
        });
    }
});



router.post('/count-users-by-postal', async (req, res) => {
    const { postalCode } = req.body;
    const result = await appService.countUsersByPostalCode(postalCode);
    if (result !== null) {
        res.json({
            success: true,
            count: result
        });
    } else {
        res.status(500).json({
            success: false
        });
    }
});

router.get('/counthomosexuals', async (req, res) => {
    try {
        console.log('it ran');
        const numberHomosexuals = await appService.countHomosexualUsers();

        if (numberHomosexuals === null || numberHomosexuals === undefined) {
            return res.status(404).json({
                success: false,
                error: "No count could be retrieved"
            });
        }

        console.log("Successful homosexuals count:", numberHomosexuals);
        res.json({
            success: true,
            count: numberHomosexuals
        });
    } catch (error) {
        console.error("Comprehensive error counting homosexuals:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal server error"
        });
    }
});

router.get('/countheterosexuals', async (req, res) => {
    try {
        console.log('it ran');
        const number = await appService.countHeterosexualUsers();

        if (number === null || number === undefined) {
            return res.status(404).json({
                success: false,
                error: "No count could be retrieved"
            });
        }

        console.log("Successful homosexuals count:", number);
        res.json({
            success: true,
            count: number
        });
    } catch (error) {
        console.error("Comprehensive error counting homosexuals:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal server error"
        });
    }
});



router.get('/counthomosexuals', async (req, res) => {
    try {
        console.log('It ran');
        const numberHomosexuals = await appService.countHomosexualUsers();

        if (numberHomosexuals === null || numberHomosexuals === undefined) {
            return res.status(404).json({
                success: false,
                error: "No count could be retrieved"
            });
        }

        console.log("Successful homosexuals count:", numberHomosexuals);
        res.json({
            success: true,
            count: numberHomosexuals
        });
    } catch (error) {
        console.error("Comprehensive error counting homosexuals:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal server error"
        });
    }
});

// Route to count users by postal code
router.post('/count-users-by-postal', async (req, res) => {
    const { postalCode } = req.body;
    const result = await appService.countUsersByPostalCode(postalCode);
    if (result !== null) {
        res.json({
            success: true,
            count: result
        });
    } else {
        res.status(500).json({
            success: false
        });
    }
});

// Route to count heterosexual users
router.get('/countheterosexuals', async (req, res) => {
    try {
        console.log('It ran');
        const number = await appService.countHeterosexualUsers();

        if (number === null || number === undefined) {
            return res.status(404).json({
                success: false,
                error: "No count could be retrieved"
            });
        }

        console.log("Successful heterosexuals count:", number);
        res.json({
            success: true,
            count: number
        });
    } catch (error) {
        console.error("Comprehensive error counting heterosexuals:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal server error"
        });
    }
});

module.exports = router;