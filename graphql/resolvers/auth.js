const bcrypt = require('bcrypt')
const User = require('../../models/user')

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
  }
}