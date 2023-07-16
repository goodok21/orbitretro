/**
 * get and put encrypted and/or signed material to paths in Gun
 * FIXME: Investigate why root level put doesn't work
 *
 * DONE: Add signing to make objects unwritable by others
 * Changes:
 * - 25.02.2020
 * - added mergedeep to better merge deeper objects between themselves
 * - added pair.osign option to only sign not encrypt when passing existing pairs
 **/
;(async function () {
  var Nug = (this.Nug = null)

  var atoob = (this.atoob = function atoob(arr) {
    var obj = {}
    Gun.list.map(arr, function (v, f, t) {
      if (Gun.list.is(v) || Gun.obj.is(v)) {
        obj[f] = atoob(v)
        return
      }
      obj[f] = v
    })
    return obj
  })
  const getNug = (this.getNug = function () {
    if (Nug) return Nug.back(-1)
    if (Gun) Nug = new Gun(location.protocol + '//' + location.host + '/gun')
    return Nug.back(-1)
  })
  const mrgdeep = (this.mrgdeep = function mrgdeep(...objects) {
    const isObject = (obj) => obj && typeof obj === 'object'

    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach((key) => {
        const pVal = prev[key]
        const oVal = obj[key]

        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = [...pVal, ...oVal].filter(
            (element, index, array) => array.indexOf(element) === index
          )
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mrgdeep(pVal, oVal)
        } else {
          prev[key] = oVal
        }
      })

      return prev
    }, {})
  })

  const decEnc = (this.decEnc = async (...args) => {
    console.log(args)
    let data = args.length > 0 ? args.shift() : false // data as first argument
    let pair = args.length > 0 ? args.shift() : false // pair to use in decrypting/encrypting as second argument
    let mode = args.length > 0 ? args.shift() : 'decrypt' // mode optional encrypt/decrypt on SEA defaults to decrypt
    //TODO return Promise.reject if we don't have all mandatory arguments passed
    let secret = await SEA.secret(pair.epub, pair)
    let it = await SEA[mode](data, secret)
    return it
  })

  const createRWEResource = (this.createRWEResource = async (...args) => {
    let key = args.shift()
    let data = args.shift()
    let encIt = args.length > 0 ? args.shift() : false
    let addUuid = args.length > 0 ? args.shift() : false
    const uuid = gun._.opt.uuid()
    let pair = await SEA.pair()
    if (typeOf(encIt) == 'object' && encIt.priv) {
      pair = encIt
      var onlysign = pair.osign ? true : false
      if (pair.hasOwnProperty('osign')) delete pair['osign']
      if (onlysign) encIt = false
    }
    let id = '~' + pair.pub
    if (addUuid) id = id + '.' + uuid
    let nug = getNug()
    if (!encIt) {
      let datax = { '#': id, '.': key, ':': data, '>': Gun.state() }
      let signed = await SEA.sign(datax, pair)
      let putsi = await nug.get(id).get(key).put(signed).then()
      console.log('putsi', putsi)
      return { id: id, key: key, ref: nug.get(id).get(key), pair: pair }
    } else {
      return await decEnc(data, pair, 'encrypt').then(async (enc) => {
        let datax = { '#': id, '.': key, ':': 'a' + enc, '>': Gun.state() }
        let signed = await SEA.sign(datax, pair)
        console.log(pair, signed)
        let putsi = await nug.get(id).get(key).put(signed).then()
        console.log('putsi', putsi)
        return { id: id, key: key, ref: nug.get(id).get(key), pair: pair }
      })
    }
  })

  Gun.chain.putsenc = async function () {
    let args = Array.from(arguments)
    let self = this
    let gun = this.back(-1)
    let data = args.shift()
    let pair =
      args.length > 0 ? args.shift() : gun.user().is ? gun.user()._.sea : null
    let genuuid = args.length > 0 ? args.shift() : false
    let onlysign = args.length > 0 ? args.shift() : false
    if (!pair) return Promise.reject('No keypair provided or not logged in')
    if (onlysign) pair.osign = true
    return self.once(async function (olddata, key) {
      return await createRWEResource(key, data, pair, genuuid)
    })
  }

  Gun.chain.putenc = async function () {
    let args = Array.from(arguments)
    let self = this
    let gun = this.back(-1)
    let nug = getNug()
    let data = args.shift()
    let me = gun.user().is
    let pair = args.length > 0 ? args.shift() : me ? gun.user()._.sea : null
    let onlysign = args.length > 0 ? args.shift() : false

    //TODO: Implement checking with old pair as well as throw if error
    if (!pair) return Promise.reject('No keypair provided or not logged in')
    if (onlysign) pair.osign = true
    return this.once(async function (olddata, key) {
      console.log('old data', olddata)
      //TODO: Check the onlysign and skip decrypt and encrypt in that case
      if (typeof olddata === 'string' && /^(aSEA)/.test(olddata))
        olddata = olddata.slice(1)
      return await decEnc(olddata, pair)
        .then(async (old) => {
          console.log('old', old)
          var nd = null
          if (!old) {
            nd = data
          } else {
            if (typeof old === 'object' && data && typeof data === 'object') {
              // trying to simulate regular put
              nd = mrgdeep(old, data)
            } else {
              nd = data
            }
          }
          console.log('new data', nd)
          return await decEnc(nd, pair, 'encrypt').then(async (enc) => {
            console.log('encrypted', enc)
            if (!me && pair && pair.priv) {
              let id = '~' + pair.pub
              let signed = await SEA.sign(
                {
                  '#': id,
                  '.': key,
                  ':': 'a' + enc,
                  '>': Gun.state(),
                },
                pair
              )
              console.log('signed', signed)
              return await nug.get(id).get(key).put(signed).then()
            } else {
              return await self.put('a' + enc).then()
            }
          })
        })
        .catch((err) => {
          console.log('whoops', err)
          return gun
        })
    })
  }

  Gun.chain.getenc = async function () {
    let args = Array.from(arguments)
    let self = this
    let gun = this.back(-1)
    let path = args.length > 0 ? args.shift() : false
    let pair =
      args.length > 0 ? args.shift() : gun.user().is ? gun.user()._.sea : null
    if (!pair) return Promise.reject('No keypair provided or not logged in')
    let data
    if (!path) {
      data = await self.once().then()
    } else {
      data = await this.get(path).then()
    }
    //console.log(data,pair,path);
    if (typeof data === 'string' && /^(aSEA)/.test(data)) data = data.slice(1)
    let dec = await decEnc(data, pair)
    return dec ? dec : null
  }

  const putMyDataEnc = (this.putMyDataEnc = async (...args) => {
    //let args = arguments; Array.from(arguments);
    console.log(args)
    let cb = false
    if (
      args &&
      args.length > 0 &&
      typeof args[args.length - 1] === 'function'
    ) {
      cb = args.pop() // if we have a cb function in last of the list, then pop that
    }
    let path = args.length > 0 ? args.shift() : false // path as first argument
    let data = args.length > 0 ? args.shift() : false // data as second argument
    let pair = args.length > 0 ? args.shift() : false // pair optional pair to use in encrypting
    if (!path || !data) return Promise.reject('No path or data!')
    const me = gun.user()
    if (me.is) {
      //authenticated
      const mypair = me._.sea
      let usePair = mypair
      if (pair && pair.epub && pair.epriv) usePair = pair
      let enc = await decEnc(data, usePair, 'encrypt')
      if (cb) {
        return me.get(path).put(enc, cb)
      } else {
        return await me.get(path).put(enc).then()
      }
    } else {
      return Promise.reject('Not authenticated')
    }
  })
  const getMyDataEnc = (this.getMyDataEnc = async (...args) => {
    console.log(args)
    let path = args.shift() // path as first argument
    let pair = args.length > 0 ? args.shift() : false // optional pair to decrypt with
    const me = gun.user()
    if (me.is) {
      //authenticated
      const mypair = me._.sea
      let usePair = mypair
      if (pair && pair.epub && pair.epriv) usePair = pair
      let data = await me.get(path).then()
      //console.log(data);
      let dec = await decEnc(data, usePair)
      return dec
    } else {
      return Promise.reject('Not authenticated')
    }
  })

  // USAGE:
  // creating a new resource with generated keypair signature: {keyname} to store to, {data} to house {pair} a pair or boolean, {uuid} whether to append random uuid to pubkey
  let testresource1 = await createRWEResource(
    'testing/encryption/321',
    { data: 'I', want: 'to', encrypt: 'true' },
    true,
    true
  )
  console.log(testresource1) // {id:created id, key: referenced key, ref:gun node, pair: if not your user-pair save this if you ever want to touch this node again}

  // creating/overwriting a resource with your user keypair directly to gun.user().get("testing/encryption/321")
  let mypair = gun.user()._.sea
  testresource2 = await createRWEResource(
    'testing/encryption/321',
    { data: 'I', dontwant: 'to', encrypt: 'true' },
    mypair
  )
  console.log(testresource2)

  //decode with decEnc
  let id = testresource2.id
  let key = testresource2.key
  let setti = testresource2.ref
  let pair = testresource2.pair
  let val = await setti.once(Gun.log).then()
  let dec = await decEnc(val.slice(1), testresource2.pair)
  console.log(dec)
  //{data: "I", dontwant: "to", encrypt: "true"}

  let example = await gun
    .get('testing/encryption/123')
    .get('example')
    .putsenc({ encrypted: 'stuff' }) // overwrite whole example
  console.log(example)
  let readexample = await gun.get('testing/encryption/123').getenc('example')
  console.log(readexample)
  let updateexample = await gun
    .get('testing/encryption/123')
    .get('example')
    .putenc({ stuff: 'encrypted stuff' })
  console.log(updateexample)

  setTimeout(async () => {
    let x = await gun.get('testing/encryption/123').getenc('example')
    console.log('some wait time so we wont resolve from localstorage', x)
  }, 250)

  putMyDataEnc('testing/encryption/123', { socks: 'wet' })
    .then((d) => {
      console.log(d)
    })
    .catch((err) => {
      console.log(err)
    })
  getMyDataEnc('testing/encryption/123')
    .then((d) => {
      console.log(d)
    })
    .catch((err) => {
      console.log(err)
    })
  //testing decryption of the node:
  gun
    .user()
    .get('testing/encryption/123')
    .once(function (data) {
      decEnc(data, gun.user()._.sea)
        .then((d) => {
          console.log(d)
        })
        .catch((err) => {
          console.log(err)
        })
    })
})()
