const dataOfUsers = require('../db/users')
const bcrypt = require('bcrypt')


const setUsers = (User) => {
  return Promise.all(dataOfUsers.map(user => {
      return bcrypt.hash(user.password, 10)
          .then(hashResult => {
              return User.create({ ...user, password: hashResult })
                  .then(() => { })
                  .catch((error) => {
                      console.log(error.message)
                  })
          })
  }))
}

const setRoles = (Role) => {
  return Promise.all([ Role.create({ label: "admin" }), Role.create({ label: "user" })])
}



module.exports = { setUsers , setRoles }
