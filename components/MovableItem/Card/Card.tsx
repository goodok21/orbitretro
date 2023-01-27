import { forwardRef } from 'react'

type CardProps = Readonly<{
  name: string
}>

const Card = forwardRef<any, CardProps>(({ name, ...props }, ref) => {
  return (
    <div className="flex justify-items-stretch" ref={ref} {...props}>
      <div className="block p-6 rounded-lg shadow-card bg-white">
        <h5 className="text-gray-900 font-medium text-lg mb-3">{name}</h5>
        <p className="text-gray-900 text-sm text-opacity-70 mb-4">
          Some quick example text to build on the card title and make up the
          bulk of the card content.
        </p>
      </div>
    </div>
  )
})

Card.displayName = 'Card'

export default Card
