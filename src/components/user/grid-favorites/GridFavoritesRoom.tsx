import { FavoriteRoom } from '@/interfaces/favoriteRoom.interface'
import { ItemFavoriteRoom } from './ItemFavoriteRoom'


interface Props {
  favoriteRoom: FavoriteRoom[]
}


export const GridFavoritesRoom = ({ favoriteRoom }: Props) => {
  return (
    <div className="grid grid-cols md:grid-cols-4 gap-4 p-2">
      {favoriteRoom.map(room => (
        <div key={room.id}>
          <ItemFavoriteRoom favoriteRoom={room}  />
        </div>
      ))}
    </div>
  )
}
