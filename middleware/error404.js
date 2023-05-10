module.exports = (req, res) => {
    res.status(404);
    res.json({errcode: 404, errtext: 'Page not found'});
}