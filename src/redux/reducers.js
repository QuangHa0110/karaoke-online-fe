import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import singer from './singer/reducers'
import song from './song/reducers'
import search from './search-result/reducers'
import slide from './slide/reducers'
import songHistory from './song-history/reducers'
import favoriteSong from './favorite-song/reducers'
import mySong from './my-song/reducers'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    singer,
    song,
    search,
    slide,
    songHistory,
    favoriteSong,
    mySong,
  })
