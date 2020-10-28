export default {
  data: '/api/front/match/info/v1/data/info/{{matchInfoId}}', // 赛事详情数据
  report: '/api/front/matchInfo/v5/analyse/{{matchInfoId}} ', // 赛事详情情报
  oddsList: '/api/front/matchInfo/getMatchHdaAhOdds/{{matchInfoId}}', // 欧盘/亚盘列表
  ballList: '/api/front/matchInfo/getMatchOuOdds/{{matchInfoId}}', // 大小球列表
  oddsDetail: '/api/front/matchInfo/getMatchHdaAhOddsHistory/{{matchInfoId}}', // 欧盘/亚赔详情页
  ballDetail: '/api/front/matchInfo/getMatchOuOddsHistory/{{matchInfoId}}' // 大小球详情页
}
