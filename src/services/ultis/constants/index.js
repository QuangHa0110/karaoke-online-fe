const JOB_TYPE = {
  INTERNSHIP: {
    value: 'INTERNSHIP',
    label: 'Thực tập',
  },
  FULLTIME: {
    value: 'FULLTIME',
    label: 'Việc làm toàn thời gian',
  },
  PARTTIME: {
    value: 'PARTTIME',
    label: 'Việc làm bán thời gian',
  },
  FREELANCE: {
    value: 'FREELANCE',
    label: 'Việc làm freelance',
  },
}

const FILTER_JOBS = {
  TYPE: {
    value: 'TYPE',
    label: 'Loại công việc',
  },
  CITY: {
    value: 'CITY',
    label: 'Thành phố',
  },
  FIELD: {
    value: 'FIELD',
    label: 'Lĩnh vực',
  },
  TIME: {
    value: 'TIME',
    label: 'Cập nhật lần cuối',
  },
}

const CITIES = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Quảng Ninh', 'Hải Phòng']

const COLORS = {
  WHITE: '#ffffff',
}

const FILTER_TIME_AGO = {
  DAY: {
    value: 1,
    label: '24 giờ trước',
  },
  WEEK: {
    value: 7,
    label: 'Tuần trước',
  },
  MONTH: {
    value: 30,
    label: 'Tháng trước',
  },
  EVERYTIME: {
    value: 0,
    label: 'Mọi lúc',
  },
}

module.exports = {
  JOB_TYPE,
  FILTER_JOBS,
  CITIES,
  COLORS,
  FILTER_TIME_AGO,
}
