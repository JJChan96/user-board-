const express = require('express')
const router = express.Router()
const user = require('../models/user')
const { alertmove } = require('../util/alert')
const userRouter = require('./user')
const boardRotuer = require('./board')

router.get('/',(req,res)=>{
    console.log('여기가 메인페이지 : ',req.session)
    const {user} = req.session
    res.render('index',{
        user
    })
})

const Auth = (req,res,next)=>{
    let { user } = req.session // user level 등급
    if (user != undefined) {
        // 로그인한사람
        next()
    } else {
        // 로그인 안한사람
        res.send(alertmove('/','회원만 이용 가능 합니다!'))
    }
}


/* User */
router.use('/user',userRouter)
router.use('/board',Auth,boardRotuer)

/* Board */ 

/*
 여기서 무거운거 오지게해야지
 DOM?
*/


module.exports = router