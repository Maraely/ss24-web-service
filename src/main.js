const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express()

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/index.html') //es6 `${__dirname} +'/public/index.html`)
})


    app.post('/create-avatar', (req, res) => {
        const filePath = __dirname + '/avatars.json';
        console.log(req.body);

        const avatar = {
            id: Date.now(),
            characterName: req.body.avatarName,
            childAge: parseInt(req.body.childAge),
            skinColor: req.body.skinColor,
            hairstyle: req.body.hairstyle,
            headShape: req.body.headShape,
            upperClothing: req.body.upperPart,
            lowerClothing: req.body.lowerPart,
            createdAt: new Date().toISOString()
        };

        let avatars = [];
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);
            avatars = JSON.parse(data);
        }


        avatars.push(avatar);

        try {
            fs.writeFileSync(filePath, JSON.stringify(avatars, null, 2));
            console.log('Avatar data written to avatars.json');
            res.redirect('/avatars');
        } catch (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Internal Server Error');
        }
    });

app.get('/avatars', (req, res) => {
    const filePath = __dirname + '/avatars.json';


    try {
        const data = fs.readFileSync(filePath);
        const avatars = JSON.parse(data);

        let htmlList = '<ul>';
        avatars.forEach(avatar => {
            htmlList += `<li><a href="/avatar/${avatar.id}">${avatar.characterName}</a></li>`;
        });
        htmlList += '</ul>';

        res.send(htmlList);
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/avatar/:id', (req, res) => {
    const avatarId = req.params.id;
    const filePath = path.join(__dirname, '/avatars.json');

    try {
        const data = fs.readFileSync(filePath);
        const avatars = JSON.parse(data);

        const avatar = avatars.find(a => a.id === parseInt(avatarId));

        if (!avatar) {
            res.status(404).send('Avatar not found');
            return;
        }

        let htmlTable = '<table>';
        for (const [key, value] of Object.entries(avatar)) {
            htmlTable += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        htmlTable += '</table>';

        res.send(htmlTable);
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log("Server running...")
});