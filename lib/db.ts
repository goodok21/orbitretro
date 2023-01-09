import { create } from 'ipfs'
import OrbitDB from 'orbit-db'

let db: any
let orbitdb: any

// export { db, orbitdb }

export const orbitClient: () => any = async () => {
  try {
    const ipfs = await create({
      repo: './orbitdb',
      start: true,
      preload: {
        enabled: false,
      },
      //   EXPERIMENTAL: {
      //     ipnsPubsub: true,
      //   },
      //   config: {
      //     Addresses: {
      //       Swarm: [
      //         // Use IPFS dev signal server
      //         // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
      //         // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
      //         // Use IPFS dev webrtc signal server
      //         '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
      //         '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
      //         '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
      //         // Use local signal server
      //         // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      //       ],
      //     },
      //   },
    })

    orbitdb = await OrbitDB.createInstance(ipfs, {
      //   directory: './orbitdb/examples/keyvalue',
    })

    db = await orbitdb.kvstore('example', { overwrite: true })

    await db.load()

    return db
  } catch (error) {
    console.error(error)
  }
}

// const load = async (db: any, statusText: string) => {
//   // Set the status text
//   console.log(statusText)

//   // When the database is ready (ie. loaded), display results
//   db.events.on('ready', console.log)
//   // When database gets replicated with a peer, display results
//   db.events.on('replicated', console.log)
//   // When we update the database, display result
//   db.events.on('write', () => console.log)

//   db.events.on('replicate.progress', () => console.log)

//   // Hook up to the load progress event and render the progress
//   let maxTotal = 0,
//     loaded = 0

//   db.events.on(
//     'load.progress',
//     (
//       address: any,
//       hash: any,
//       entry: { clock: { time: number } },
//       progress: number,
//       total: number
//     ) => {
//       loaded++
//       maxTotal = Math.max.apply(null, [maxTotal, progress, 0])
//       total = Math.max.apply(null, [
//         progress,
//         maxTotal,
//         total,
//         entry.clock.time,
//         0,
//       ])
//       console.log({ maxTotal, total })

//       // statusElm.innerHTML = `Loading database... ${maxTotal} / ${total}`
//     }
//   )

//   db.events.on('ready', () => {
//     // Set the status text
//     setTimeout(() => {
//       console.log('database is ready')

//       //   statusElm.innerHTML = 'Database is ready'
//     }, 1000)
//   })

//   // Load locally persisted database
//   await db.load()
// }

// const resetDatabase = async (db: any) => {
//   // writerText.innerHTML = ""
//   // outputElm.innerHTML = ""
//   // outputHeaderElm.innerHTML = ""

//   // clearInterval(updateInterval)

//   if (db) {
//     await db.close()
//   }

//   // interval = Math.floor((Math.random() * 300) + (Math.random() * 2000))
// }

// export const createDatabase = async () => {
//   await resetDatabase(db)

//   //   openButton.disabled = true
//   //   createButton.disabled = true

//   try {
//     const name = 'name'
//     const type = 'keyvalue'
//     const publicAccess = true

//     db = await orbitdb.open(name, {
//       // If database doesn't exist, create it
//       create: true,
//       overwrite: true,
//       // Load only the local version of the database,
//       // don't load the latest from the network yet
//       localOnly: false,
//       type: type,
//       // If "Public" flag is set, allow anyone to write to the database,
//       // otherwise only the creator of the database can write
//       accessController: {
//         write: publicAccess ? ['*'] : [orbitdb.identity.id],
//       },
//     })

//     await load(db, 'Creating database...')
//     // startWriter(db, interval)
//   } catch (e) {
//     console.error(e)
//   }
//   //   openButton.disabled = false
//   //   createButton.disabled = false
// }

// export const openDatabase = async () => {
//   const address =
//     '/orbitdb/zdpuAryVVofryHZ79im7hM4Vo39vsMyDHfksX3tJ4K5dTFtZF/somen'

//   await resetDatabase(db)

//   //   openButton.disabled = true
//   //   createButton.disabled = true

//   try {
//     // statusElm.innerHTML =
//     console.log('Connecting to peers...')

//     db = await orbitdb.open(address, { sync: true })
//     await load(db, 'Loading database...')

//     console.log(`Listening for updates to the database...`)

//     // if (!readonlyCheckbox.checked) {
//     //   startWriter(db, interval)
//     // } else {
//     //   writerText.innerHTML = `Listening for updates to the database...`
//     // }
//   } catch (e) {
//     console.error(e)
//   }
//   //   openButton.disabled = false
//   //   createButton.disabled = false
// }
