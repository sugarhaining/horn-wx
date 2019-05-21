const router=require('../router/route')

const answer=require('../json/answer.json')
router.get('/repositories/:pageIndex',async ctx=>{
    console.log(ctx.params)
    ctx.body={'errcode':'ok','msg':answer}
})