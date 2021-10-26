const express = require('express')

const getVideos = require ('./services/notion')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))


app.get('/videos', async (req, res) => {
    const videos = await getVideos()
    res.json(videos)
})

app.listen(PORT, console.log(`server started on port ${PORT}`))

// ;(async() => {
//     const nVideos = await getVideos()
//     console.log(nVideos)

// })()