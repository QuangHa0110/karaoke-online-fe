import config from './config'

const SlideAPI = {
  getSlides: (payload) => {
    return config.get(`/image-slides`, {
      params: {
        ...payload,
      },
    })
  },
  
}

export default SlideAPI
