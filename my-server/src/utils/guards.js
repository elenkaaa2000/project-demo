export function isAuth() {
    return function (req, res, next) {
        if (req.user) {
            next()
        } else {
            res.redirect('/login')
        }
    }
}

export function isGuest(){
    return function (req,res,next){
        if(!req.user){
           next()
        }else{
            res.redirect('/')
        }
    }
}