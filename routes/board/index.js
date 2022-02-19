const express = require('express')
const router = express.Router()
const {alertmove } = require('../../util/alert')
const boarddata = require(`./boardata`)

router.get('/list',(req,res)=>{
    res.render('board/list',{
        data:boarddata
    })
})

router.get('/write',(req,res)=>{
    res.render('board/write')
})

router.post('/write',(req,res)=>{
    let writedata = req.body
    console.log(writedata)
    boarddata.push(writedata)
    res.send(alertmove('/board/list','글작성이 완료되었습니다.'))
})

router.get('/view',(req,res)=>{
    let index = req.query.index
    let viewdata = boarddata[index-1]
    res.render('board/view',{
        data:viewdata,
        index:index
    })
})

router.get('/update',(req,res)=>{
    let index = req.query.index
    let updatedata = boarddata[index-1]
    console.log(updatedata)
    res.render('board/update',{
        index:index,
        data:updatedata
    })
})

router.post('/update',(req,res)=>{
    let index = req.body.index
    let updatedata = {
        subject:req.body.subject,
        username:req.body.username,
        date:req.body.date
    }
    boarddata[index-1] = updatedata
    res.send(alertmove('/board/list','글수정이 완료되었습니다.'))
})

router.post('/delete',(req,res)=>{
    let index = req.body.index-1
    boarddata.splice(index,1) // 배열 삭제하는 method 
    res.send(alertmove('/board/list','글삭제가 완료되었습니다.'))
})

module.exports = router