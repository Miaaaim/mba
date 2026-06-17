export interface Classmate {
  id: string;
  name: string;
  className: string;
  hometown: string;
  currentCity: string;
  contact: string;
  hobbies: string;
  companyTitle: string;
  experience: string;
  canHelp: string;
  futureExpectation: string;
  tagsText: string;
  MBTI: string;
  photo: string; // Image path if present, otherwise empty
  fallbackEmoji: string; // Emoji character for visual fallback
  bgColor: string; // Custom pastel card background color
}

const BG_COLORS = [
  "bg-[#FFF5D2]", // Soft yellow
  "bg-[#FFE2F2]", // Soft pink
  "bg-[#D2F4E2]", // Soft green
  "bg-[#E2DEFF]", // Soft blue
  "bg-[#FCECD6]", // Soft orange
  "bg-[#D3F4FF]"  // Soft cyan
];

export const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP"
];

function extractMBTIListFromText(text: string): string[] {
  if (!text) return [];

  const matches = text
    .toUpperCase()
    .matchAll(/(?:^|[^A-Z])(INTJ|INTP|ENTJ|ENTP|INFJ|INFP|ENFJ|ENFP|ISTJ|ISFJ|ESTJ|ESFJ|ISTP|ISFP|ESTP|ESFP)(?=$|[^A-Z])/g);

  const found: string[] = [];
  for (const m of matches) {
    const type = m[1];
    if (type && MBTI_TYPES.includes(type) && !found.includes(type)) {
      found.push(type);
    }
  }

  return found;
}

export function generateClassmates(): Classmate[] {
  const rawList: Omit<Classmate, "bgColor">[] = [
    {
      id: "user-001",
      name: "包营珺",
      className: "周末4班",
      hometown: "杭州",
      currentCity: "杭州",
      contact: "15267080828",
      hobbies: "刷展、二次元、做实验",
      companyTitle: "质量研究员",
      experience: "英区留子、沉迷实验",
      canHelp: "或许有同学需要多肽/寡核苷酸CDMO服务吗？",
      futureExpectation: "保持探索",
      tagsText: "实验室搬砖人、INTP（EJ横跳）",
      MBTI: "",
      photo: "contact-photos/user_001.png",
      fallbackEmoji: "🧪"
    },
    {
      id: "user-002",
      name: "蔡一鹏",
      className: "周末4班",
      hometown: "浙江温州",
      currentCity: "浙江温州",
      contact: "19857180807",
      hobbies: "足球、赛车、旅游、美食",
      companyTitle: "瑞安市乡镇机关/中层副职",
      experience: "基层乡镇",
      canHelp: "考公、农文旅",
      futureExpectation: "顺利毕业",
      tagsText: "INFP",
      MBTI: "",
      photo: "contact-photos/user_002.jpg",
      fallbackEmoji: "🏎️"
    },
    {
      id: "user-003",
      name: "曹凯",
      className: "周末4班",
      hometown: "四川广安",
      currentCity: "杭州",
      contact: "18667025286",
      hobbies: "马拉松，游泳，双截棍，摄影，吉他（初学），研究黑暗料理，一切户外",
      companyTitle: "苏泊尔股份 研究经理",
      experience: "市场一线销售，技术部工程师，战略市场物联部高工，研发部电控主管，创新研究中心经理",
      canHelp: "厨房小家电选品专业咨询，实战十亿爆品创新信息、方法论交流",
      futureExpectation: "引领小家电智能创新，打造百亿爆品",
      tagsText: "修行，体验，创新，自定义",
      MBTI: "",
      photo: "contact-photos/user_003.jpg",
      fallbackEmoji: "🍳"
    },
    {
      id: "user-005",
      name: "陈斌",
      className: "周末4班",
      hometown: "江西吉安",
      currentCity: "浙江杭州",
      contact: "18858027091",
      hobbies: "篮球、王者、打牌",
      companyTitle: "浙商资产",
      experience: "安永",
      canHelp: "财税和不良资产评估相关咨询",
      futureExpectation: "以梦为马，共赴星海",
      tagsText: "废话文学生产标兵、热搜延迟吃瓜群众",
      MBTI: "",
      photo: "contact-photos/user_005.jpg",
      fallbackEmoji: "🏀"
    },
    {
      id: "user-007",
      name: "陈庆波",
      className: "周末四班",
      hometown: "福建泉州",
      currentCity: "浙江杭州",
      contact: "13957104326",
      hobbies: "篮球、小说",
      companyTitle: "物产中大期货有限公司/技术总监",
      experience: "扎根金融科技领域、浙江省省部属企事业“数字工匠”、拥有个人品牌的技能大师工作室。",
      canHelp: "愿意为大家牵线搭桥物产系相关公司、企业套期保值领域有丰富的经验、期货知识普及",
      futureExpectation: "求知、结伴、共赢！",
      tagsText: "物产中大人、篮球爱好者、外冷内热",
      MBTI: "",
      photo: "contact-photos/user_007.jpg",
      fallbackEmoji: "📈"
    },
    {
      id: "user-008",
      name: "陈润泽",
      className: "周末4班",
      hometown: "浙江金华",
      currentCity: "浙江杭州",
      contact: "15068139842",
      hobbies: "动漫、游戏、历史、写作、唱歌",
      companyTitle: "杭州城投资产集团有限公司-招商运营职员",
      experience: "美国三一学院历史系",
      canHelp: "国有资产相关资讯",
      futureExpectation: "自我提升",
      tagsText: "INFP，慢热，幽默感",
      MBTI: "",
      photo: "contact-photos/user_008.jpg",
      fallbackEmoji: "🎮"
    },
    {
      id: "user-009",
      name: "崔月",
      className: "周末四班",
      hometown: "吉林",
      currentCity: "杭州",
      contact: "18304485383",
      hobbies: "普拉提 健身",
      companyTitle: "医疗公司 总助",
      experience: "教培上市公司分公司销售总监、国企分公司总助兼项目负责人",
      canHelp: "投融资、创新产品及首台套申报",
      futureExpectation: "学习创新创业思维，与各位老师 and / & 同学多多交流学习",
      tagsText: "ISTJ 开荒型选手",
      MBTI: "",
      photo: "contact-photos/user_009.jpg",
      fallbackEmoji: "🧘"
    },
    {
      id: "user-011",
      name: "高姗",
      className: "周末4班",
      hometown: "杭州",
      currentCity: "杭州",
      contact: "15557120953",
      hobbies: "阅读、乒乓球",
      companyTitle: "乐欣户外财务负责人",
      experience: "财务老搬砖人",
      canHelp: "财会税务、内控合规、港股IPO交流",
      futureExpectation: "破界、交流、精进、蜕变",
      tagsText: "INTJ、外冷内热、选择困难症",
      MBTI: "",
      photo: "contact-photos/user_011.jpg",
      fallbackEmoji: "🏓"
    },
    {
      id: "user-012",
      name: "龚宇航",
      className: "四班",
      hometown: "浙江义乌",
      currentCity: "杭州",
      contact: "18042037577",
      hobbies: "唱歌，桌游，德州，羽毛球，美食，养鱼，麻将",
      companyTitle: "省机场集团下属航空物流公司国际 货站出港部组长",
      experience: "咖啡师，桌游店老板",
      canHelp: "国际航空物流/通用航空相关、高品质沉香收藏",
      futureExpectation: "和好玩的人一起做好玩的事",
      tagsText: "ISTJ，向往社交但不善言辞，买单别跟我抢，学军校友滴滴",
      MBTI: "",
      photo: "",
      fallbackEmoji: "✈️"
    },
    {
      id: "user-013",
      name: "胡斐",
      className: "周末4班",
      hometown: "浙江杭州",
      currentCity: "浙江杭州",
      contact: "17376597899",
      hobbies: "逛西湖",
      companyTitle: "医药行业",
      experience: "拜耳医药心血管线",
      canHelp: "分享行业经历，给相关医药领域推广提供市场经验",
      futureExpectation: "希望和更多伙伴一起探寻医药行业新方向，顺应新环境，一起搞钱",
      tagsText: "ENFP快乐小狗/家有小猫",
      MBTI: "",
      photo: "contact-photos/user_013.jpg",
      fallbackEmoji: "🐶"
    },
    {
      id: "user-015",
      name: "黄晨曦",
      className: "周末4班",
      hometown: "福建福州",
      currentCity: "浙江杭州",
      contact: "18858130208",
      hobbies: "自驾、户外",
      companyTitle: "美康生物科技股份有限公司，市场经理",
      experience: "罗氏诊断产品（上海）有限公司，产品经理；杭州分公司，浙江&福建实验室自动化经理",
      canHelp: "医疗IVD检验领域（生化、免疫、POCT、仪器以及实验室自动化）",
      futureExpectation: "企业运营管理，探索医疗新方向，认识跨领域朋友，顺利毕业",
      tagsText: "药学跳到检验，喜欢自驾vs时间不够",
      MBTI: "",
      photo: "contact-photos/user_015.jpg",
      fallbackEmoji: "🏥"
    },
    {
      id: "user-016",
      name: "黄娇",
      className: "周末4班",
      hometown: "广西防城港市",
      currentCity: "浙江杭州",
      contact: "18267129723",
      hobbies: "游泳（学习中） 旅游 普拉提",
      companyTitle: "顾家家居 北美 美西 营销负责人",
      experience: "深耕家居外贸领域十年，从职场小白到目前带领团队拓展海外业务，持续开拓、维护加拿大/美国/墨西哥客户渠道，稳步推进区域市场业绩增长。",
      canHelp: "北美海外市场开拓、团队管理相关经验分享，也可对接家居行业上下游资源。英语口语陪练。",
      futureExpectation: "学以致用 成长蜕变 持续学习 努力搞钱",
      tagsText: "ISFJ（努力变E中），狮子座，咖啡续命，外贸-定期不定期出差，向前一步，Don’t settle",
      MBTI: "",
      photo: "contact-photos/user_016.jpg",
      fallbackEmoji: "🦁"
    },
    {
      id: "user-018",
      name: "黄旭",
      className: "周末四班",
      hometown: "台州",
      currentCity: "台州",
      contact: "18657685620",
      hobbies: "学习",
      companyTitle: "支行主管",
      experience: "分行总经理助理",
      canHelp: "金融，财会，税务，法律相关知识",
      futureExpectation: "顺利毕业",
      tagsText: "注册会计师，税务师，经济师",
      MBTI: "",
      photo: "contact-photos/user_018.jpg",
      fallbackEmoji: "📖"
    },
    {
      id: "user-020",
      name: "李镓许",
      className: "周末4班",
      hometown: "浙江杭州",
      currentCity: "浙江杭州",
      contact: "15906621478",
      hobbies: "攀岩/羽毛球/游泳",
      companyTitle: "浙江交通集团浙江沪杭甬高速公路股份有限公司公司人力资源管理",
      experience: "旅攀3地/电竞比赛兼职",
      canHelp: "智慧交通及人力资源领域资源互通",
      futureExpectation: "不断进步",
      tagsText: "INFJ 80%的i但会为i做e/需要计划但不一定执行",
      MBTI: "",
      photo: "contact-photos/user_020.jpg",
      fallbackEmoji: "🧗"
    },
    {
      id: "user-021",
      name: "李皖",
      className: "周末4班",
      hometown: "浙江杭州",
      currentCity: "杭州",
      contact: "15057104118",
      hobbies: "徒步、露营、桌游、音乐（ukulele、键盘）、旅行",
      companyTitle: "杭州高新控股集团有限公司 科创服务部",
      experience: "美国道富、花旗银行、禾合创投",
      canHelp: "金融老兵，产业链接、产业基金国资投资相关咨询",
      futureExpectation: "求是创新",
      tagsText: "ESTJ/金牛座",
      MBTI: "",
      photo: "contact-photos/user_021.jpg",
      fallbackEmoji: "⛺"
    },
    {
      id: "user-022",
      name: "李旖",
      className: "周末4班",
      hometown: "湖州吴兴",
      currentCity: "浙江杭州",
      contact: "15068162525",
      hobbies: "乐高拼图/旅游/看展",
      companyTitle: "物产中大云商有限公司/美妆事业部（供应链管理/保健品渠道运营）",
      experience: "澳加新留学咨询",
      canHelp: "消费品板块资源对接",
      futureExpectation: "希望对一切保持好奇与热情",
      tagsText: "土澳留子/“小蝴蝶”/真的大写I人",
      MBTI: "INFP",
      photo: "contact-photos/user_022.jpg",
      fallbackEmoji: "🦋"
    },
    {
      id: "user-024",
      name: "梁子晴",
      className: "周末四班",
      hometown: "广东茂名高州",
      currentCity: "杭州",
      contact: "18811012079",
      hobbies: "小说、网球、游戏（端游、桌游）、茶",
      companyTitle: "浙江省国贸资产运营有限公司，产业投资部，高级业务经理",
      experience: "中央财经➡️普华永道➡️天健咨询➡️国贸资产，从乙方到甲方",
      canHelp: "财务咨询、产投探讨",
      futureExpectation: "提升自己+认识更多小伙伴",
      tagsText: "ENFP、狮子座、猫鱼双全、遇E则I，遇I则E",
      MBTI: "",
      photo: "contact-photos/user_024.jpg",
      fallbackEmoji: "🍵"
    },
    {
      id: "user-025",
      name: "刘姗",
      className: "周末四班",
      hometown: "大连",
      currentCity: "杭州",
      contact: "19550120133",
      hobbies: "游泳",
      companyTitle: "杭州万事利丝绸文化股份有限公司 营销中台副总经理",
      experience: "星级酒店总经理助理",
      canHelp: "企业参访/丝绸文化/文创礼品",
      futureExpectation: "不挂科、不延毕",
      tagsText: "ISFJ",
      MBTI: "",
      photo: "contact-photos/user_025.jpg",
      fallbackEmoji: "🧣"
    },
    {
      id: "user-026",
      name: "刘子木",
      className: "周末4班",
      hometown: "江西九江",
      currentCity: "浙江杭州",
      contact: "18757567299",
      hobbies: "羽毛球、桌游",
      companyTitle: "杭州政兴人力资源开发有限公司派驻杭州市市场监督管理局负责人事管理工作",
      experience: "本科毕业后就一直在现单位工作",
      canHelp: "有想了解人事或者考公相关的一些政策的可以解答",
      futureExpectation: "不挂科，一起顺利毕业",
      tagsText: "ISFP，一般不喜欢拍照，所以没有靓照😂",
      MBTI: "",
      photo: "",
      fallbackEmoji: "🏸"
    },
    {
      id: "user-028",
      name: "罗思咏",
      className: "周末四班",
      hometown: "四川内江",
      currentCity: "湖州",
      contact: "13220289319",
      hobbies: "篮球，cosplay，游戏(lol，魂游)",
      companyTitle: "湖州市南太湖双语学校，高中数学教师",
      experience: "入职3年，班主任工作1年",
      canHelp: "教育行业的用户洞察，数学建模/数据分析，传统酒业的实际资源（男友家族企业制酒业）",
      futureExpectation: "正跨界探索传统酒业转型，渴望向制造业、消费品、数字化领域的校友请教。期待碰撞思想，更期待结下友谊！",
      tagsText: "00后教育管理新秀，跨界转型探索者，天秤本秤，待人皆温柔",
      MBTI: "",
      photo: "contact-photos/user_028.jpg",
      fallbackEmoji: "📐"
    },
    {
      id: "user-029",
      name: "马春丽",
      className: "周末4班",
      hometown: "杭州萧山",
      currentCity: "杭州萧山",
      contact: "13588503271",
      hobbies: "徒步、骑行、羽毛球、网球",
      companyTitle: "杭州祈杰科技有限公司总经理",
      experience: "上市公司15年传统行业浙江销售区域负责人",
      canHelp: "浙江能源电力行业资源",
      futureExpectation: "学以致用、职业进阶、事业突破",
      tagsText: "ENFP、创业一年",
      MBTI: "",
      photo: "contact-photos/user_029.jpg",
      fallbackEmoji: "⚡"
    },
    {
      id: "user-030",
      name: "马铭潞",
      className: "周末四班",
      hometown: "辽宁丹东",
      currentCity: "杭州",
      contact: "17326059611",
      hobbies: "摄影、健身、游戏",
      companyTitle: "国企项目开发岗",
      experience: "律师执业4年经验",
      canHelp: "民商事法律相关问题均可咨询，能源类项目前期可交流。",
      futureExpectation: "认识各行各业优秀人才，共同进步，顺利毕业。",
      tagsText: "ENFP偏I但话多",
      MBTI: "",
      photo: "",
      fallbackEmoji: "⚖️"
    },
    {
      id: "user-031",
      name: "牛佳琪",
      className: "周末4班",
      hometown: "吉林松原",
      currentCity: "浙江杭州",
      contact: "15669015687",
      hobbies: "羽毛球、干饭小达人",
      companyTitle: "智慧校园建设",
      experience: "浙江省建投",
      canHelp: "高校资源；美食地图",
      futureExpectation: "好好学习 天天向上",
      tagsText: "运动菜鸟、美食雷达",
      MBTI: "",
      photo: "contact-photos/user_031.jpg",
      fallbackEmoji: "🍚"
    },
    {
      id: "user-033",
      name: "石雨弘",
      className: "周末4班",
      hometown: "安徽蚌埠",
      currentCity: "浙江杭州拱墅区",
      contact: "13216818215",
      hobbies: "健身游泳、阅读、唱歌、拉丁舞、旅行、麻将",
      companyTitle: "荣耀终端股份有限公司 中国区电商部天猫渠道经理",
      experience: "曾任职华为技术有限公司；本科毕业于浙江传媒学院",
      canHelp: "消费电子行业资源、传媒行业资源对接与经验分享",
      futureExpectation: "珍惜校园求学时光，提升管理认知，和同窗们交流共进，奔赴各自职业理想。",
      tagsText: "INFJ可切换E、我的风格是没有固定风格、风一样的水瓶座",
      MBTI: "",
      photo: "contact-photos/user_033.jpg",
      fallbackEmoji: "📱"
    },
    {
      id: "user-034",
      name: "宋思璇",
      className: "周末四班",
      hometown: "辽宁省庄河市",
      currentCity: "浙江省杭州市拱墅区",
      contact: "17600522399",
      hobbies: "滑冰，滑雪，游泳，旅行，露营，唱歌...十项全“部”能",
      companyTitle: "乐刻运动，多品牌HRBP负责人",
      experience: "京东集团多BG/BU经历（9年）；美妆品牌0-1建设经历",
      canHelp: "定制化组织诊断，组织人才发展方案",
      futureExpectation: "一起认识有趣的搭子，探索新赛道",
      tagsText: "ISTJ/ENFP顺畅切换；自由灵魂；体验人生",
      MBTI: "ISTJ/ENFP",
      photo: "contact-photos/user_034.jpg",
      fallbackEmoji: "🏃‍♀️"
    },
    {
      id: "user-035",
      name: "隋亚军",
      className: "周末四班",
      hometown: "黑龙江虎林市",
      currentCity: "浙江杭州",
      contact: "19857146987",
      hobbies: "篮球，只吃饭不喝酒，",
      companyTitle: "每日互动股份有限公司子公司总经理/AI事业部副总经理",
      experience: "宇视科技区域销售/每日互动大区经理",
      canHelp: "大数据与Ai落地的产业实践，全国公安资源",
      futureExpectation: "炒股养家",
      tagsText: "东北人，话多，嗑瓜子贼快。",
      MBTI: "",
      photo: "contact-photos/user_035.png",
      fallbackEmoji: "🧠"
    },
    {
      id: "user-036",
      name: "汤咏芬",
      className: "周末四班",
      hometown: "浙江嘉兴",
      currentCity: "浙江宁波",
      contact: "18858476713",
      hobbies: "跑步/排球/普拉提/电竞/摄影",
      companyTitle: "中国农业银行宁波分行/对公客户经理",
      experience: "中国农业银行嘉兴市分行/客户经理",
      canHelp: "熟悉银行对公业务、企业融资、综合金融方案规划，欢迎随时交流；家族从事家具行业多年，有工厂、货源、定制、软装全屋配套等资源。",
      futureExpectation: "努力成为更好的自己。",
      tagsText: "ENFP/高精力人群",
      MBTI: "",
      photo: "contact-photos/user_036.jpg",
      fallbackEmoji: "🏦"
    },
    {
      id: "user-037",
      name: "童赟儿",
      className: "周末4班",
      hometown: "浙江杭州",
      currentCity: "浙江杭州",
      contact: "15257152299",
      hobbies: "阅读、唱歌、摄影、游戏、二次元相关",
      companyTitle: "浙江省院士专家服务中心综合岗",
      experience: "游戏行业猎头、桌游店搬砖",
      canHelp: "省院士中心产学研业务相关，科技行业动态，联络科技人才等；家里做高多层线路板，广东江西有厂，有需要欢迎交流协作",
      futureExpectation: "认真学习圆满毕业，跟同学们取取经",
      tagsText: "杭州土著、美国留子、家有爱猫、乐子人",
      MBTI: "",
      photo: "contact-photos/user_037.jpg",
      fallbackEmoji: "🐱"
    },
    {
      id: "user-038",
      name: "汪麟",
      className: "周末四班",
      hometown: "重庆",
      currentCity: "宁波",
      contact: "15870433728",
      hobbies: "摄影、游戏、旅游、手工",
      companyTitle: "银行科技部综合岗",
      experience: "毕业后一直在银行金融科技/文化宣传",
      canHelp: "宣传文化落地/活动策划与执行，以及气氛担当",
      futureExpectation: "结识各行各业有趣的人，突破自我局限，做一点有意义的事。",
      tagsText: "非典型银行人/海拉鲁gai溜子",
      MBTI: "",
      photo: "contact-photos/user_038.jpg",
      fallbackEmoji: "📸"
    },
    {
      id: "user-039",
      name: "王晨号",
      className: "周末4班",
      hometown: "吉林四平",
      currentCity: "浙江杭州",
      contact: "13003689821",
      hobbies: "健身",
      companyTitle: "施耐德电气（中国）有限公司 中央业务推广负责人",
      experience: "西门子、罗克韦尔",
      canHelp: "外企头部自动化相关渠道",
      futureExpectation: "结识金融、财务、数字化、AI等领域小伙伴",
      tagsText: "灵活办公的出差选手",
      MBTI: "",
      photo: "contact-photos/user_039.jpg",
      fallbackEmoji: "⚙️"
    },
    {
      id: "user-040",
      name: "王东辰",
      className: "周末4班",
      hometown: "安徽",
      currentCity: "绍兴",
      contact: "15157573612",
      hobbies: "旅游",
      companyTitle: "工商银行，支行行长",
      experience: "深耕金融一线",
      canHelp: "企业、个人投融资业务，综合金融方案制定",
      futureExpectation: "终身学习，成为更好的自己",
      tagsText: "白羊座",
      MBTI: "",
      photo: "contact-photos/user_040.png",
      fallbackEmoji: "🐏"
    },
    {
      id: "user-044",
      name: "谢祥",
      className: "周末4班",
      hometown: "江苏丹阳",
      currentCity: "杭州",
      contact: "15988153882",
      hobbies: "钓鱼会空军，斯诺克老匕首",
      companyTitle: "作业帮硬件直播负责人",
      experience: "Midea生活电器直播负责人",
      canHelp: "电商、营销相关都可深入探讨",
      futureExpectation: "和同学们优势互补，合伙共创",
      tagsText: "年龄与心态完全不符的“老年人”",
      MBTI: "",
      photo: "contact-photos/user_044.png",
      fallbackEmoji: "🎣"
    },
    {
      id: "user-045",
      name: "徐荣豪",
      className: "周末4班",
      hometown: "浙江台州",
      currentCity: "浙江杭州",
      contact: "15868895988",
      hobbies: "旅游、刷剧、阅读、游戏",
      companyTitle: "杭州当虹科技股份有限公司-总经理助理",
      experience: "欧派、金牌家居加拿大西部总代理",
      canHelp: "政企项目资源、家电产销渠道",
      futureExpectation: "期待认识各行各业的伙伴，未来一起学习成长、互帮互助、可以多碰撞出一些火花",
      tagsText: "海外留子| 科创数智 | ENFP or ENFJ",
      MBTI: "ENFP/ENFJ",
      photo: "contact-photos/user_045.png",
      fallbackEmoji: "🎥"
    },
    {
      id: "user-047",
      name: "许旺",
      className: "周末4班",
      hometown: "浙江浦江",
      currentCity: "浙江杭州",
      contact: "18158522018",
      hobbies: "雪茄、摄影、骑行、长跑、观影",
      companyTitle: "浙江省交通集团浙江铁路公司文化宣传主管",
      experience: "密苏里新闻学院访问学者、记者、品牌传播、重大铁路项目建设",
      canHelp: "浙江铁路系统、传统媒体系统",
      futureExpectation: "实现人生“五个一”工程",
      tagsText: "雪茄客、浙江铁路人、品牌传播操盘手、美国访问学者、摄影爱好者",
      MBTI: "",
      photo: "contact-photos/user_047.jpg",
      fallbackEmoji: "🚂"
    },
    {
      id: "user-048",
      name: "杨思懿",
      className: "周末4班",
      hometown: "浙江新昌",
      currentCity: "杭州",
      contact: "1825753472",
      hobbies: "旅游 猫狗 探店",
      companyTitle: "浙江省国际贸易集团供应链有限公司综合办公室",
      experience: "2025年赴省商务厅挂职锻炼，全程协助统筹全省出口管制大会组织工作，同时配合完成上海进博会浙江省交易团各项保障与服务事宜",
      canHelp: "省商务厅或省外贸体制流程引荐协作",
      futureExpectation: "希望能结交各行各业小伙伴，交流工作经验，组队打卡演唱会，拓展有趣人脉",
      tagsText: "ENFP",
      MBTI: "",
      photo: "contact-photos/user_048.jpg",
      fallbackEmoji: "🗺️"
    },
    {
      id: "user-049",
      name: "叶乐",
      className: "周末4班",
      hometown: "浙江湖州",
      currentCity: "浙江杭州",
      contact: "13616554096",
      hobbies: "美食、观影",
      companyTitle: "物产中大物流数智科技部副总经理",
      experience: "毕业后一直在物产/业务一线/办公室/IT",
      canHelp: "大宗商品专业仓储物流服务资源、数字化转型经验；党支部联建共建；物产中大旗下公司合作引荐",
      futureExpectation: "凝心聚力、携手共进，成为最好的我们、更好的自己",
      tagsText: "物产中大人、物流人、INFJ",
      MBTI: "",
      photo: "contact-photos/user_049.png",
      fallbackEmoji: "📦"
    },
    {
      id: "user-052",
      name: "尹海娜",
      className: "周末4班",
      hometown: "湖南株洲",
      currentCity: "宁波/杭州",
      contact: "15669221983",
      hobbies: "安静、赚钱、古筝",
      companyTitle: "浙江大丰实业股份有限公司",
      experience: "轨交板块研发中心总经理/特装事业部总经理",
      canHelp: "分享轨道交通、特种观光装备行业项目操盘、研发管理经验；提供高端装备项目落地、资质申报、市场拓展实战经验；对接轨交、文旅特种装备产业资源与人脉",
      futureExpectation: "遇见更好的自己",
      tagsText: "大丰演艺人、舞台科技专家",
      MBTI: "",
      photo: "contact-photos/user_052.png",
      fallbackEmoji: "🎭"
    },
    {
      id: "user-053",
      name: "应锦程",
      className: "周末四班",
      hometown: "浙江温州",
      currentCity: "浙江温州",
      contact: "15258673315",
      hobbies: "羽毛球、跑步、健身、K歌",
      companyTitle: "浙江舒环环境工程有限公司/机扫部经理",
      experience: "机械化作业团队管理/跨部门协调",
      canHelp: "设备运营管理心得、基层团队建设",
      futureExpectation: "终身成长、推动企业智能化发展",
      tagsText: "INFJ、终身学习者、运动&音乐爱好者",
      MBTI: "",
      photo: "contact-photos/user_053.jpg",
      fallbackEmoji: "🧹"
    },
    {
      id: "user-054",
      name: "俞晶贞",
      className: "周末四班",
      hometown: "宁波",
      currentCity: "宁波",
      contact: "18368208620",
      hobbies: "看电影 阅读 玄学 运动",
      companyTitle: "文化传媒",
      experience: "旅游达人/国际领队 主持各类活动 出演短剧及各类情景剧 编排各类大型活动演出",
      canHelp: "文艺演出资源 各地旅游攻略",
      futureExpectation: "对接更大平台 施展更大能量",
      tagsText: "公益组织服务者 / 持续减肥党 / 40+ 宝妈",
      MBTI: "",
      photo: "",
      fallbackEmoji: "🎤"
    },
    {
      id: "user-055",
      name: "袁佳",
      className: "周末四班",
      hometown: "诸暨",
      currentCity: "杭州",
      contact: "18817333363",
      hobbies: "羽毛球、网球、游泳、太鼓达人",
      companyTitle: "创业",
      experience: "网易、饿了么、智慧校园体育",
      canHelp: "用AI做个人应用",
      futureExpectation: "探索人生更多的可能性，倾听大家独一无二的故事；根据场合在IE、SN、FT、PJ之间自由切换",
      tagsText: "猫奴",
      MBTI: "",
      photo: "contact-photos/user_055.jpg",
      fallbackEmoji: "🐱"
    },
    {
      id: "user-056",
      name: "詹森森",
      className: "周末4班",
      hometown: "浙江丽水",
      currentCity: "浙江杭州",
      contact: "17750782105",
      hobbies: "创业、各类运动（羽毛球优先）",
      companyTitle: "浙江工商大学-培训部主任",
      experience: "教培6年-销售总监、IP老师",
      canHelp: "高校资源、大学生资源、各种培训",
      futureExpectation: "完善自己的项目、加入更多不同的项目，有创业的咱们都可以加一下",
      tagsText: "创业、运动、自媒体IP",
      MBTI: "",
      photo: "contact-photos/user_056.jpg",
      fallbackEmoji: "🏸"
    },
    {
      id: "user-057",
      name: "张云姝",
      className: "周末四班",
      hometown: "浙江杭州",
      currentCity: "浙江杭州",
      contact: "15757154536",
      hobbies: "阅读、旅游、普拉提、猫狗等所有小动物",
      companyTitle: "上市国企综合办公室负责人",
      experience: "区级建筑设计院",
      canHelp: "国企合规/项目协调/美食探店分享",
      futureExpectation: "学然后知，行然后远",
      tagsText: "ENTP/吸引力法则",
      MBTI: "",
      photo: "contact-photos/user_057.jpg",
      fallbackEmoji: "🐱"
    },
    {
      id: "user-058",
      name: "张志鹏",
      className: "周末4班",
      hometown: "陕西宝鸡",
      currentCity: "浙江杭州",
      contact: "18691707857",
      hobbies: "跑步、羽毛球、徒步、吃吃吃",
      companyTitle: "陕外经贸上海有限公司-经济运行部负责人",
      experience: "23年回国，之前在加拿大从事零售业",
      canHelp: "大宗贸易业务模式、合规交流；医疗健康行业探讨交流",
      futureExpectation: "跳出自己的圈子认识志同道合的朋友；顺利毕业",
      tagsText: "国企大宗贸易/医疗健康/加拿大留子/奶爸/运动爱好者",
      MBTI: "",
      photo: "contact-photos/user_058.jpg",
      fallbackEmoji: "🏃"
    },
    {
      id: "user-061",
      name: "郑傲楠",
      className: "周末4班",
      hometown: "新疆",
      currentCity: "杭州",
      contact: "18158137959",
      hobbies: "户外运动、马拉松、钓鱼、篮球、户外野炊",
      companyTitle: "杭州海康威视，户外产品营销&技术",
      experience: "曾做IC红外芯片 To B 集成开发和项目经理，近年聚焦户外产品（钓鱼、热成像打猎）相关 To C 的营销与技术工作。",
      canHelp: "可交流户外装备与场景化体验，包括钓鱼设备（打窝船、声呐等）和热成像设备应用。",
      futureExpectation: "希望给更多户外爱好者带来体验和探索新乐趣，让小众走向大众。",
      tagsText: "海康威视、户外产品、钓鱼装备、热成像",
      MBTI: "",
      photo: "contact-photos/user_061.png",
      fallbackEmoji: "🎣"
    },
    {
      id: "user-062",
      name: "朱泽炯",
      className: "四班",
      hometown: "绍兴",
      currentCity: "杭州",
      contact: "13732232805",
      hobbies: "爬山，钓鱼，游泳",
      companyTitle: "吉利控股集团 HRBP负责人",
      experience: "11年总部，子集团，子公司HR各领域经验，熟悉组织变革和业务孵化",
      canHelp: "提供全域人力咨询以及对于整车行业链接",
      futureExpectation: "一起学习，一起成长，遇见更好的自己",
      tagsText: "INTJ 常年徘徊于E与I 喜爱钓鱼但常年空军",
      MBTI: "INTJ/ENTJ",
      photo: "contact-photos/user_062.png",
      fallbackEmoji: "🎣"
    },
    {
      id: "user-063",
      name: "竺希茜",
      className: "周末4班",
      hometown: "宁波",
      currentCity: "杭州",
      contact: "13735470618",
      hobbies: "德语、鹦鹉、唱歌、咖啡奶茶",
      companyTitle: "杭州非奇科技股份有限公司海外运营",
      experience: "12年深耕游戏出海的从业者，西湖国际第10党支部支部书记",
      canHelp: "AIGC广告内容创作(含平面设计、动画制作、视频剪辑、建模等）、海外广告渠道资源、多语言本地化支持。",
      futureExpectation: "探索人生更多的可能性，希望在和大家交流的过程中碰撞出新的灵感的火花。",
      tagsText: "AIGC，投放，广告优化师，创意策划，游戏出海，养鸟人",
      MBTI: "",
      photo: "contact-photos/user_063.jpg",
      fallbackEmoji: "🦜"
    }
  ];

  return rawList.map((item, index) => {
    let city = item.currentCity ? item.currentCity.trim() : "";
    if (
      city === "浙江杭州" || 
      city === "杭州萧山" || 
      city === "杭州" ||
      city === "浙江省杭州拱墅区" || 
      city === "浙江省杭州市拱墅区" ||
      city === "浙江杭州拱墅区" ||
      city === "浙江省杭州市" ||
      city === "浙江杭州市"
    ) {
      city = "杭州";
    } else if (city === "浙江温州" || city === "温州") {
      city = "温州";
    } else if (city === "浙江宁波" || city === "宁波") {
      city = "宁波";
    }

    let home = item.hometown ? item.hometown.trim() : "";
    if (
      home === "浙江杭州" || 
      home === "浙江省杭州" || 
      home === "浙江省杭州市" || 
      home === "浙江 杭州" || 
      home === "杭州"
    ) {
      home = "杭州";
    }

    // Allow explicit MBTI in source data and support multiple types like ENFP/ENFJ.
    const mbtiSourceText = [
      item.MBTI,
      item.tagsText,
      item.experience,
      item.futureExpectation,
      item.canHelp,
      item.hobbies,
      item.companyTitle
    ].join(" ");

    const extractedMBTIs = extractMBTIListFromText(mbtiSourceText);

    return {
      ...item,
      currentCity: city,
      hometown: home,
      MBTI: extractedMBTIs.join("/"),
      className: "周末4班",
      bgColor: BG_COLORS[index % BG_COLORS.length]
    };
  });
}
