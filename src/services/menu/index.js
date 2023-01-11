export default async function getMenuData() {
  return [
    {
      title: 'Trang chủ',
      key: 'home',
      url: '/public/home',
    },
    // {
    //   title: 'Quản trị',
    //   key: 'manage',
    //   children: [
    //     {
    //       title: 'Tài khoản',
    //       key: 'account',
    //       url: '/manage/account'
    //     },
    //     {
    //       title: 'Bài hát',
    //       key: 'song',
    //       url: '/manage/song'
    //     },
    //     {
    //       title: 'Ca sĩ',
    //       key: 'singer',
    //       url: '/manage/singer'
    //     }
    //   ]
    // },
    {
      title: 'Thể loại',
      key: 'category',
      children: [
        {
          title: 'Nhạc trẻ karaoke',
          key: 'young-music',
          url: '/public/young-music',
        },
        {
          title: 'Nhạc trữ tình karaoke',
          key: 'lyrical-music',
          url: '/public/lyrical-music',
        },
        {
          title: 'Nhạc thiếu nhi karaoke',
          key: 'children-music',
          url: '/public/children-music',
        },
        {
          title: 'Nhạc xuân, giáng sinh karaoke',
          key: 'christmas-music',
          url: '/public/christmas-music',
        },
        {
          title: 'Nhạc Rap karaoke',
          key: 'rap-music',
          url: '/public/rap-music',
        },
      ],
    },
    {
      title: 'Ca sĩ',
      key: 'singer-music',
      url: '/public/singer',
    },
  ]
}
