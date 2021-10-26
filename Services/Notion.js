const dotenv = require ('dotenv').config()
const { Client } = require('@notionhq/client')

//init client

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})


const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getVideos() {
    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST',
    }
    const { results } = await notion.request(payload)

    const videos = results.map((page) => {

        return {
            id: page.id,
            title: page.properties.Name.title[0].text.content,
            Done: page.properties["Done?"].checkbox,
            Value: page.properties.Value.rich_text[0].text.content,
            Date: page.properties.Date.date.start,
            Number: page.properties.Number.number,
            Position: page.properties.position.select.name,
            Type: page.properties.Type.rich_text[0].text.content,
        }

    })
    return videos
}
