import { FavoriteRoomApi } from '@/interfaces/favoriteRoom.interface'
import { ItemFavoriteRoom } from './ItemFavoriteRoom'


interface Props {
  favoriteRoom: FavoriteRoomApi[]
}


export const GridFavoritesRoom = ({ favoriteRoom }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-2">
      {favoriteRoom.map(room => (
        <div key={room.id}>
          <ItemFavoriteRoom favoriteRoom={room} />
        </div>
      ))}
    </div>
  )
}
