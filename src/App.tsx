import './styles/main.css'
import { GameBanner } from './components/GameBanner'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'


import logoImg from './assets/logo-nlw-esports.svg'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number,
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://server.pessoal.ws:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (

    // Header 
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.</h1>


      {/* Jogos  */}
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads} />
          )
        })}

      </div>

      <Dialog.Root>

        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>

    </div >
  )
}

export default App
