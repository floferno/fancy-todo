const { User } = require('../models/')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

/**
 * REGISTER
 * 1. http req dgn menggunakan params atau body email dan password
 * 2. hash password pake hooks
 * 3. jalankan create user -> data user tersimpan di db
 * 
 * LOGIN
 * 1. cek user apakah ada di database atau nggak berdasarkan email
 * 2. kalo ada, cek passwordnya (pakai bcryptjs)
 * 3. kalo gak ada, lempar error
 * 4. kalo password sama, user berhasil login dan mengembalikan access token
 * 5. kalo password salah, lempar error
 */



class UserController {
  static register(req, res, next) {
    const { email, password, full_name} = req.body
    User.create({ email, password, full_name })
    .then(user => {
      res.status(201).json({
        msg: "Registration successful",
        id: user.id,
        full_name: user.full_name,
        email: user.email
        })
      })
      .catch(err => {
        next(err)
      })
    }
      
  // static async login(req, res) {
  //   try {
  //     const {email, password} = req.body
  //     const user = await User.findOne({
  //       where: {
  //        email
  //       }
  //     })
  //     if(!user) throw { msg: "Invalid email or password"}
  //     const comparedPassword = comparePass(password, user.password)
  //     if(!comparedPassword) throw { msg: "Invalid email or password" }

  //     const access_token = generateToken({
  //       id: user.id,
  //       email: user.email
  //     })
  //     res.status(200).json({ access_token })
  //   } catch (err) {
  //     const error = err.msg || 'Internal server error'
  //     res.status(500).json({ error })
  //   }
  // }

    static login(req,res, next) {
      const { email, password } = req.body
      User.findOne({
        where: {
          email
        }
      })
      .then(user => {
        if(!user) throw { msg: "Invalid email or password"}
        const comparedPassword = comparePass(password, user.password)
        if(!comparedPassword) throw { msg: "Invalid email or password" }
        const access_token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ access_token })
      })
      .catch(err => {
        next(err)
      })
    }


}


module.exports = UserController