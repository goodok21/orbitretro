import Gun from 'gun/gun'
import 'gun/sea'

export const gunDB = new Gun({
  peers: [
    'http://localhost:8765/gun',
    // 'http://gun-manhattan.herokuapp.com/gun',
  ],
})

// get data
// var gun = Gun().get('data').put({
//     object1: object2,
//     object2: object2
//   })

// set value
// gun.get('object3').put({
//     field: 'value'
//   })

// delete item
// gun.get('object3').put(null)

// USER login
// const user = gunDB.user().recall({ sessionStorage: true })
// user.create('username', 'password')

// user.auth('username', 'password')
// gunDB.on('auth', () => { user.get('said').map().on(show) });
// user.get('profile').set('some value')

// !user.is

// user.get('profile').get(id).secret($(this).val());
// user.get('profile').get(id).grant(to);
