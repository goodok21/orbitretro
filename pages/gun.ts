import Gun from 'gun/gun'

export default function handler(req, res) {
  //   Gun.log.verbose = true
  //   const gun = Gun({
  //     file: 'data.json',
  //     // s3: {
  //     //   key: '', // AWS Access Key
  //     //   secret: '', // AWS Secret Token
  //     //   bucket: '', // The bucket you want to save into
  //     // },
  //   })

  //   const gun = Gun({
  //     // web: 4000,
  //     peers: config.peers,
  //   })

  //   Gun
  const gun = Gun({ file: 'data.json' })

  res.status(200).json({ name: 'John Doe' })
}
