const siteUrl = "https://www.mcc-mnc.com/";
const axios = require("axios");
const cheerio = require("cheerio");

const fs = require('fs')
/**const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};**/
const ScrapedData = []
const getData = html => {
    let $ = cheerio.load(html)
    $('#mncmccTable tbody > tr ').each((i, elem) =>{
        // const tableHtml  = elem.html()
        const tds = $(elem).find("td")

        const mcc = $(tds[0]).text()
        const mnc = $(tds[1]).text()
        const iso = $(tds[2]).text()
        const country  = $(tds[3]).text()
        const countryCode = $(tds[4]).text()
        const network = $(tds[5]).text()

        ScrapedData.push({mcc, mnc, iso , country, countryCode, network})

    })

    const scrappedData = JSON.stringify(ScrapedData)
    fs.writeFile("mno.json", scrappedData, function () {
        console.log("write successfully ")
    })
}

axios.get(siteUrl).then((response) => {
    getData(response.data)
}).catch(error =>  {
    console.log(error)
})

