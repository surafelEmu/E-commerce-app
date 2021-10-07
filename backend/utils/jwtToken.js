const sendToken = (user , statusCode , res) => {
    const token = user.getJwtToken() ;

    const options = {
        expires: new Date( 
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 *100 
            ) ,
            httpOnly: true // save the token only on http b/c it can not be accessed like storing it on js
            }

            res.status(statusCode).cookie('token' , token , options).json({
                success: true ,
                token,
                user
            })
}

module.exports = sendToken ;