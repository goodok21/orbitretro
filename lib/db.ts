import Gun from 'gun/gun'

export const gunDB = Gun({
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
