import Cookie from 'js-cookie'

Cookie.set('name', 'luiz')
const name = Cookie.get('name')
console.log(name)
