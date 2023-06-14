module.exports = (req, res) => {
    res.render('error', {
        title: 'Ошибка',
        titleDetail: ' | 404',
        errCode: '404',
        errDesc: 'Страница, которую Вы ищете, не существует.'
    })
}