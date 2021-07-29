const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const User = require("../Models/User")
const sendEmail = require("../Email/Nodemailer")


router.get("/users", async (req, res) => {
    try {
        // if user exist
        let user = await User.find().sort({ name: -1 })
        return res
            .status(200)
            .json({ users: user })

    } catch (err) {
        return res.status(500).send("Server Error")
    }
})



// router.post("/social", async (req, res) => {
//     // try signup by finding user with req.email
//     console.log(req.body)
//     await User.findOne({ email: req.body.email }, (err, user) => {
//         console.log('user', user)
//         if (err || !user) {
//             // const { email, isAdmin, isVerified, imageUrl } = user
//             // create a new user and login
//             user = new User(req.body)
//             user.isVerified = true
//             user.imageUrl = req.body.imageUrl
//             req.profile = user
//             req.email = user
//             user.save()
//             // generate a token with user id and secret
//             const token = jwt.sign(
//                 { _id: user._id || user.id },
//                 process.env.JWT_SECRET
//             )
//             res.cookie("t", token, { expire: new Date() + 9999 })

//             return res.json({ token, id: user.id, email: user.email, isAdmin: user.isAdmin || false, isVerified: user.isVerified || false, imageUrl: user.imageUrl })
//         } else {
//             // update existing user with new social info and login
//             req.profile = user
//             // email = email
//             user.isVerified = true
//             user.imageUrl = req.body.imageUrl
//             // user = user.extend(user, req.body)
//             user.updated = Date.now()
//             user.save()
//             // generate a token with user id and secret
//             const token = jwt.sign(
//                 { _id: user._id || req.body.userID, iss: "NODEAPI" },
//                 process.env.JWT_SECRET
//             )
//             res.cookie("t", token, { expire: new Date() + 9999 })
//             // return response with user and token to frontend client
//             const { email, imageUrl } = user
//             return res.json({ token, email, id: user.id || req.body.userID, isAdmin: user.isAdmin, isVerified: user.isVerified, imageUrl })
//         }
//     })
// })


router.post("/sociallogin", async (req, res) => {
    const { email, name, imageUrl, admin } = req.body
    console.log(email, req.body.email)
    
    try {
        const user = await User.findOne({ email })
        if (!user) {
            let newUser = new User({
                name: name,
                email: email,
                imageUrl: imageUrl,
                isVerified: true,
                admin: admin || false
            })

            await newUser.save()
            console.log(newUser, email, name)
            const token = jwt.sign(
                {
                    id: newUser._id,
                    name: name,
                    email: imageUrl,
                },
               "asdjflkssdjflkaks"
            )
            console.log('outside', 'user not Exist')
            return res.json({ token, email, id: newUser._id, isAdmin: user.isAdmin, isVerified: user.isVerified, imageUrl })
        } else {

            console.log(user, user.email)
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    imageUrl: user.imageUrl,
                },
                // process.env.JWT_SECRET
                "jdhnfalkjjdhffok"
            )
            console.log('inside', 'user Exist', user)
            return res.json({ token, email, id: user._id, isAdmin: user.isAdmin, isVerified: user.isVerified, imageUrl })
        }
    } catch (err) {

    }

})











module.exports = router