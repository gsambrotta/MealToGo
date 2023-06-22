const { locations } = require("./geocodeMock")
const url = require("url")

module.exports.geocodeRequest = (req, res) => {
    const { city } = url.parse(req.url, true).query
    if(city) {
        const mockLocation = locations[city.toLocaleLowerCase()];

        res.json(mockLocation)
    } else {
        res.json("A city query is missing")
    }
}