const bcrypt = require('bcrypt')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
  createUser: async ({ userInput: { email, password } }) => {
    try {
      const findUser = await User.findOne({ email })
  
      if (findUser) {
        throw new Error('User already exists.')
      }
    
      const hashPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashPassword })
      const { _doc } = await user.save()
    
      return { ..._doc, password: null }
    } catch (err) {
      throw err
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email })
    
    if (!user) {
      throw new Error('User does not exist!')
    }

    const isEqual = await bcrypt.compare(password, user.password)

    if (!isEqual) {
      throw new Error('Wrong password!')
    }

    const token = jwt.sign({ userId: user.id, email }, 'somesupersecretkey', { expiresIn: '1h' })

    return { userId: user.id, token, tokenExpiration: 1 }
  }
}