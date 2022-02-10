const bcrypt = require(`bcryptjs`)
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {        
        if (users[i].username === username) {
          const authenticated = bcrypt.compareSync(password, users[i].passwordHash)

          if (authenticated) {
            let userObjCopy = {...users[i]}
            delete userObjCopy.passwordHash
            res.status(200).send(users[i])
            return
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const {username, email, firstName, lastName, password} = req.body
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)

        let newUser = {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          passwordHash: passwordHash
        }

        users.push(newUser)
        let userObjCopy = {...newUser}
        delete userObjCopy.passwordHash
        res.status(200).send(userObjCopy)
    }
}