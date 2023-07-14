import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const handleCreateNewBoard = () => {
    const boardId = Math.random().toString(36).slice(2)
    router.push(`/board/${boardId}`)
  }

  return (
    <div className="min-h-screen">
      <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
              <h1 className="text-4xl font-medium tracking-tight text-gray-900">
                Decentralized team <b>retrospective</b> board
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Orbit Retro is a digital board optimized for software and
                product teams. Use it for free forever.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <button
                  className="inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors border-gray-300 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80 bg-gray-800 text-white hover:bg-gray-900"
                  onClick={handleCreateNewBoard}
                >
                  <span className="ml-2.5">Create new board</span>
                </button>
                {/* <a
                  className="inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                >
                  <span className="ml-2.5">Watch the video</span>
                </a> */}
              </div>
            </div>
            <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
              <div className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
                <svg
                  viewBox="0 0 1026 1026"
                  fill="none"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full animate-spin-slow"
                >
                  <path
                    d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
                    stroke="#D4D4D4"
                    strokeOpacity="0.7"
                  ></path>
                  <path
                    d="M513 1025C230.23 1025 1 795.77 1 513"
                    stroke="url(#:R65m:-gradient-1)"
                    strokeLinecap="round"
                  ></path>
                  <defs>
                    <linearGradient
                      id=":R65m:-gradient-1"
                      x1="1"
                      y1="513"
                      x2="1"
                      y2="1025"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#06b6d4"></stop>
                      <stop
                        offset="1"
                        stopColor="#06b6d4"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  viewBox="0 0 1026 1026"
                  fill="none"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
                >
                  <path
                    d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
                    stroke="#D4D4D4"
                    strokeOpacity="0.7"
                  ></path>
                  <path
                    d="M913 513c0 220.914-179.086 400-400 400"
                    stroke="url(#:R65m:-gradient-2)"
                    strokeLinecap="round"
                  ></path>
                  <defs>
                    <linearGradient
                      id=":R65m:-gradient-2"
                      x1="913"
                      y1="513"
                      x2="913"
                      y2="913"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#06b6d4"></stop>
                      <stop
                        offset="1"
                        stopColor="#06b6d4"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
              <p className="text-center text-sm font-semibold text-gray-900 lg:text-left">
                How to contribute
              </p>
              <ul
                role="list"
                className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
              >
                <li className="flex">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 98 96"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                      fill="#24292f"
                    />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
