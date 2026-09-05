/* ============================================================
   幻象学习中心 —— 课程数据 + 交互逻辑
   纯前端实现：已内置真实课程数据，加课只需按下方数据结构追加即可
   视图层级：第2层(职位) -> 第3层(课程列表) -> 第4层(课程详情) -> 第5层(视频播放)
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     课程数据（真实课程：7 职位 / 18 门课，内容来自 B 站公开课）
     结构：roles 定义职位气泡（含主题色 tint/tint2 与 SVG 图标 icon）；
     courses 以 roleId 为键存放课程数组。每课程含 coverImg 封面与 cover 兜底色、
     intro/req/goals/tools 信息区、material 配套资料（可选）、
     episodes 选集数组（bvid + page，支持多 P 分集与多 BV 拼接）。
     ============================================================ */
  var LEARNING = {
    /* 角色气泡（7 个职位）——每角色配独立主题色与 SVG 图标，差异化视觉 */
    roles: [
      { id: "director",   name: "我是导演", tint: "#0e7490", tint2: "#0c4a6e", icon: '<rect x="2" y="6" width="14" height="12" rx="2"/><circle cx="9" cy="12" r="3"/><path d="M16 9l4-2 2 2v8l-2 2-4-2"/>' },
      { id: "editor",     name: "我是剪辑", tint: "#7c3aed", tint2: "#5b21b6", icon: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>' },
      { id: "storyboard", name: "我是分镜", tint: "#ea580c", tint2: "#c2410c", icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/>' },
      { id: "sound",      name: "我是收音", tint: "#e11d48", tint2: "#9f1239", icon: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="22"/>' },
      { id: "writer",     name: "我是编剧", tint: "#1d4ed8", tint2: "#1e3a8a", icon: '<path d="M14 4l6 6-9 9H5v-6l9-9z"/><line x1="14" y1="4" x2="20" y2="10"/><line x1="5" y1="19" x2="9" y2="19"/>' },
      { id: "operator",   name: "我是运营", tint: "#db2777", tint2: "#9d174d", icon: '<line x1="3" y1="21" x2="21" y2="21"/><rect x="5" y="13" width="3" height="6"/><rect x="11" y="9" width="3" height="10"/><rect x="17" y="5" width="3" height="14"/><polyline points="3 12 7 8 11 10"/>' },
      { id: "frontend",   name: "我是前端", tint: "#059669", tint2: "#065f46", icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="13" y1="4" x2="11" y2="20"/>' }
    ],

    /* 各职位真实课程（B 站公开课整理；每集可独立 BV + page） */
    courses: {
      director: [
        {
          id: "dir-003",
          roleId: "director",
          name: "张策·短视频导演养成记",
          brief: "19 集系统课：从拉片偷师、文案情绪到手机实拍剪辑，走通完整的短视频导演创作流程。",
          category: "实战",
          coverImg: "img/courses/cover-dir-003.png",
          cover: "135deg, #155e75 0%, #0891b2 50%, #22d3ee 100%",
          coverMark: "策",
          intro: "张策（导演\"张小策\"，朱一旦系列导演）的短视频导演方法论：如何从热门作品里\"偷\"思路，如何用情绪和想象力写文案，如何只用一部手机完成拍摄与剪辑。全 19 集，从认知到实操完整覆盖。",
          req: ["对短视频创作有基本了解", "一部可拍摄的手机", "愿意边看边动手练习"],
          goals: ["建立\"拉片-模仿-再创造\"的学习方法", "掌握标题、封面与开头钩子的卖点设计", "能用一部手机独立完成拍摄与剪辑全流程"],
          tools: ["智能手机（拍摄 + 剪辑一体）", "剪映 App（或任意剪辑软件）", "笔记工具（拉片记录用）"],
          episodes: [
            { title: '00 宣导片：短视频导演养成记', note: '课程总览：这套课要带你解决什么问题。', bvid: 'BV1934y1u7Bj', page: 1 },
            { title: '01 "偷"，是所有大师的第一步！', note: '拉片模仿的正确姿势：从拆解热门作品开始学创作。', bvid: 'BV1934y1u7Bj', page: 2 },
            { title: '02 在热门的标题和封面，学习短视频的核心卖点', note: '逆向拆解标题与封面，找到视频真正卖的是什么。', bvid: 'BV1934y1u7Bj', page: 3 },
            { title: '03 "被一个二流子撞到"这句话至少值 20 万', note: '开头钩子的写法：一句话让观众停下来。', bvid: 'BV1934y1u7Bj', page: 4 },
            { title: '04 结尾是灯塔，该往哪儿划', note: '先想清楚结尾，再倒推全片结构与节奏。', bvid: 'BV1934y1u7Bj', page: 5 },
            { title: '05 短视频的结构套路，你初中就学过！', note: '起承转合在 60 秒里的用法。', bvid: 'BV1934y1u7Bj', page: 6 },
            { title: '06 全网 1500 万的 IP，是被 59 秒逼出来的', note: '时长限制如何倒逼内容取舍与节奏压缩。', bvid: 'BV1934y1u7Bj', page: 7 },
            { title: '07 怎样用情绪和想象力写出好文案', note: '文案不是辞藻，是情绪的搬运。', bvid: 'BV1934y1u7Bj', page: 8 },
            { title: '08 拍片，一部手机就够了！（上）', note: '手机拍摄的参数与运镜基础。', bvid: 'BV1934y1u7Bj', page: 9 },
            { title: '09 拍片，一部手机就够了！（实操·一）', note: '跟拍实操演示：现场怎么取景、怎么调度。', bvid: 'BV1934y1u7Bj', page: 10 },
            { title: '10 拍片，一部手机就够了！（实操·二）', note: '实拍续篇：常见现场问题的即时处理。', bvid: 'BV1934y1u7Bj', page: 11 },
            { title: '11 剪辑，一节课就学会！（理论）', note: '剪辑的核心逻辑：为什么切、什么时候切。', bvid: 'BV1934y1u7Bj', page: 12 },
            { title: '12 剪辑，一节课就学会！（实操）', note: '从素材整理到成片输出的完整剪辑流程。', bvid: 'BV1934y1u7Bj', page: 13 },
            { title: '13 所谓导演，不过是看起来光鲜的包工头', note: '导演的真实职责：统筹、沟通与兜底。', bvid: 'BV1934y1u7Bj', page: 14 },
            { title: '14 《两只老虎》完整花絮（一）', note: '真实项目花絮：看一条成片是怎么诞生的。', bvid: 'BV1934y1u7Bj', page: 15 },
            { title: '15 一个及格短视频的创作流程', note: '从选题到发布的标准流程清单。', bvid: 'BV1934y1u7Bj', page: 16 },
            { title: '16 《两只老虎》完整花絮（二）', note: '花絮续篇：复盘拍摄中的决策与失误。', bvid: 'BV1934y1u7Bj', page: 17 },
            { title: '17 为什么火的是他们？有些人就是不按套路生活', note: '账号人格化：真实感为什么比精致更值钱。', bvid: 'BV1934y1u7Bj', page: 18 },
            { title: '18 爆火网红，必备的元素', note: '收官：爆款账号的共性拆解与行动建议。', bvid: 'BV1934y1u7Bj', page: 19 }
          ]
        },
        {
          id: "wb-001",
          roleId: "director",
          name: "WorkBuddy 官方教程 · 完全上手",
          brief: "30 集保姆级官方教程：从认识 WorkBuddy 到远程控制、提示词技巧与高效技能，把 AI 办公真正用起来。",
          category: "官方",
          coverImg: "img/courses/cover-wb-001.png",
          cover: "135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%",
          coverMark: "智",
          intro: "WorkBuddy 官方出品（UP：腾讯WorkBuddy官方教程）的保姆级完整教程，共 30 集。从\"AI 办公新范式\"建立认知，到安装与工作模式、远程控制 Claw、提示词技巧，再到各类办公场景与精选技能（文档、表格、录音转文字等），零基础一周可完成入门到进阶。适合全团队一起学。",
          req: ["已安装 WorkBuddy（官网可下载）", "愿意边看边动手实操"],
          goals: ["理解 WorkBuddy 与普通 AI 工具的区别", "掌握任务管理、远程控制等核心用法", "能组合多个技能完成真实办公任务"],
          tools: ["WorkBuddy 客户端", "一个可用的 AI 账号"],
          bvid: "BV1zHbh68Ed9",
          episodes: [
            { title: "1- 认识workbuddy-AI办公新范式，使用场景与传统AI工具的区别", bvid: "BV1zHbh68Ed9", page: 1 },
            { title: "2- 快速上手，安装workbuddy以及几种工作模式介绍", bvid: "BV1zHbh68Ed9", page: 2 },
            { title: "2-2快速上手，给workbuddy的第一个任务及任务管理", bvid: "BV1zHbh68Ed9", page: 3 },
            { title: "3-Claw远程控制，工作原理、模式以及接入配置", bvid: "BV1zHbh68Ed9", page: 4 },
            { title: "4-Claw远程控制，手机使用workbuddy的技巧、实战用例以及使用场景", bvid: "BV1zHbh68Ed9", page: 5 },
            { title: "5- 提示词技巧，高质量的提示词模板", bvid: "BV1zHbh68Ed9", page: 6 },
            { title: "6-提示词常见错误及编写高质量提示词的方法", bvid: "BV1zHbh68Ed9", page: 7 },
            { title: "7-文件处理-批量提取文件信息", bvid: "BV1zHbh68Ed9", page: 8 },
            { title: "8-文件处理-批量文件归档和重命名", bvid: "BV1zHbh68Ed9", page: 9 },
            { title: "9- 文件处理-数据清洗与合并", bvid: "BV1zHbh68Ed9", page: 10 },
            { title: "10-文件处理-识别发票", bvid: "BV1zHbh68Ed9", page: 11 },
            { title: "11-文件处理-跨格式转换及安全操作文件注意事项", bvid: "BV1zHbh68Ed9", page: 12 },
            { title: "12-文档生成与编辑-从素材生成结构化报告", bvid: "BV1zHbh68Ed9", page: 13 },
            { title: "13-文档生成与编辑-会议纪要整理生成", bvid: "BV1zHbh68Ed9", page: 14 },
            { title: "14-文档生成与编辑-从零生成文档（方案和邮件）", bvid: "BV1zHbh68Ed9", page: 15 },
            { title: "15- 文档生成与编辑-基于模板生成标准化文档", bvid: "BV1zHbh68Ed9", page: 16 },
            { title: "16- 文档生成与编辑-改写润色与优化技巧", bvid: "BV1zHbh68Ed9", page: 17 },
            { title: "17-数据分析与可视化-销售数据分析，html与word版本输出", bvid: "BV1zHbh68Ed9", page: 18 },
            { title: "18-数据分析与可视化-财务数据分析", bvid: "BV1zHbh68Ed9", page: 19 },
            { title: "19- 数据分析与可视化-运营数据分析", bvid: "BV1zHbh68Ed9", page: 20 },
            { title: "20-数据分析与可视化-用户满意度调查问卷分析", bvid: "BV1zHbh68Ed9", page: 21 },
            { title: "21- 数据分析与可视化的输出技巧", bvid: "BV1zHbh68Ed9", page: 22 },
            { title: "22- 自动化任务-每天定时推送AI简报", bvid: "BV1zHbh68Ed9", page: 23 },
            { title: "23-自动化任务-每周自动生成周报", bvid: "BV1zHbh68Ed9", page: 24 },
            { title: "24- 自动化任务-定时推送竞品分析", bvid: "BV1zHbh68Ed9", page: 25 },
            { title: "25-高效养虾技巧01-03", bvid: "BV1zHbh68Ed9", page: 26 },
            { title: "26-高效养虾技巧04-07", bvid: "BV1zHbh68Ed9", page: 27 },
            { title: "27-高效养虾技巧08-10", bvid: "BV1zHbh68Ed9", page: 28 },
            { title: "28- skill精选-office办公文档套件", bvid: "BV1zHbh68Ed9", page: 29 },
            { title: "29-skill精选-录音转文字", bvid: "BV1zHbh68Ed9", page: 30 },
          ]
        }
      ],
      editor: [
        {
          id: "edi-001",
          roleId: "editor",
          name: "剪映专业版 · 零基础学剪辑",
          brief: "54 集系统大课：从导入素材、关键帧到转场卡点与影视后期变现，剪映与 PR 双软件覆盖。",
          category: "入门",
          coverImg: "img/courses/cover-edi-001.png",
          cover: "135deg, #4f46e5 0%, #7c3aed 55%, #a78bfa 100%",
          coverMark: "映",
          intro: "B 站口碑剪映大课（UP：剪辑教程寒林）。从软件安装与素材导入讲起，逐集覆盖关键帧、曲线变速、卡点、调色、字幕、转场等剪映专业版全部核心功能，并穿插\"剪辑变现\"\"影视后期入门\"等商业视角，最后一组案例实操带你完成进阶转场。想系统掌握剪映，从这套开始最省时间。",
          req: ["一台能装剪映专业版的电脑（Win/Mac 均可）", "准备 10 条以上随手拍的素材用于练习", "零基础可学，无需剪辑经验"],
          goals: ["熟练操作剪映专业版全部核心功能", "独立完成卡点视频、转场与简单调色", "理解剪辑变现与影视后期的基础路径"],
          tools: ["剪映专业版（免费）", "PR（选学，用于对比理解）", "自己的素材库"],
          bvid: "BV1EeQ4BiEC6",
          episodes: [
            { title: "【剪映专业版】1.导入素材的三种方法", bvid: "BV1EeQ4BiEC6", page: 1 },
            { title: "【剪辑变现】零基础一节课入门影视后期", bvid: "BV1EeQ4BiEC6", page: 2 },
            { title: "【剪映专业版】2.关键帧", bvid: "BV1EeQ4BiEC6", page: 3 },
            { title: "【剪映专业版】3.关键帧四大类", bvid: "BV1EeQ4BiEC6", page: 4 },
            { title: "【剪映专业版】4.曲线变速", bvid: "BV1EeQ4BiEC6", page: 5 },
            { title: "【剪映专业版】5.变速卡点", bvid: "BV1EeQ4BiEC6", page: 6 },
            { title: "【剪映专业版】6.视频转场", bvid: "BV1EeQ4BiEC6", page: 7 },
            { title: "【剪映专业版】7.蒙版", bvid: "BV1EeQ4BiEC6", page: 8 },
            { title: "【剪映专业版】8.美颜美体", bvid: "BV1EeQ4BiEC6", page: 9 },
            { title: "【剪映专业版】9.调色", bvid: "BV1EeQ4BiEC6", page: 10 },
            { title: "【剪映专业版】10.音频处理", bvid: "BV1EeQ4BiEC6", page: 11 },
            { title: "【剪映专业版】11.AI功能", bvid: "BV1EeQ4BiEC6", page: 12 },
            { title: "【如果你也想学PR剪辑】", bvid: "BV1EeQ4BiEC6", page: 13 },
            { title: "【剪辑基础】1.软件安装和基本设置", bvid: "BV1EeQ4BiEC6", page: 14 },
            { title: "【剪辑基础】2.认识PR的所有界面", bvid: "BV1EeQ4BiEC6", page: 15 },
            { title: "【剪辑基础】3.新建项目", bvid: "BV1EeQ4BiEC6", page: 16 },
            { title: "【剪辑基础】4.项目面板", bvid: "BV1EeQ4BiEC6", page: 17 },
            { title: "【剪辑基础】5.标准化剪辑流程", bvid: "BV1EeQ4BiEC6", page: 18 },
            { title: "【剪辑基础】6.效果控件面板", bvid: "BV1EeQ4BiEC6", page: 19 },
            { title: "【剪辑基础】7.常用视频效果", bvid: "BV1EeQ4BiEC6", page: 20 },
            { title: "【剪辑基础】8.音频处理", bvid: "BV1EeQ4BiEC6", page: 21 },
            { title: "【剪辑基础】9.视频调色", bvid: "BV1EeQ4BiEC6", page: 22 },
            { title: "【剪辑基础】10.视频变速", bvid: "BV1EeQ4BiEC6", page: 23 },
            { title: "【剪辑基础】11.联动包装", bvid: "BV1EeQ4BiEC6", page: 24 },
            { title: "【案例实操】我要验牌转场", bvid: "BV1EeQ4BiEC6", page: 25 },
            { title: "【案例实操】跳切卡点与灵魂出窍", bvid: "BV1EeQ4BiEC6", page: 26 },
            { title: "【案例实操】三个炫酷效果", bvid: "BV1EeQ4BiEC6", page: 27 },
            { title: "【案例实操】乱剪卡点", bvid: "BV1EeQ4BiEC6", page: 28 },
            { title: "【案例实操】丝滑的拉镜效果", bvid: "BV1EeQ4BiEC6", page: 29 },
            { title: "【案例实操】镜面滑屏效果", bvid: "BV1EeQ4BiEC6", page: 30 },
            { title: "【案例实操】折叠翻页效果", bvid: "BV1EeQ4BiEC6", page: 31 },
            { title: "【案例实操】指尖支配转场", bvid: "BV1EeQ4BiEC6", page: 32 },
            { title: "【案例实操】照片分屏弹出效果", bvid: "BV1EeQ4BiEC6", page: 33 },
            { title: "【案例实操】弹跳转场效果", bvid: "BV1EeQ4BiEC6", page: 34 },
            { title: "【案例实操】线条切割转场效果", bvid: "BV1EeQ4BiEC6", page: 35 },
            { title: "【案例实操】照片运镜效果", bvid: "BV1EeQ4BiEC6", page: 36 },
            { title: "【案例实操】照片轮播效果", bvid: "BV1EeQ4BiEC6", page: 37 },
            { title: "【案例实操】老电影胶片效果", bvid: "BV1EeQ4BiEC6", page: 38 },
            { title: "【案例实操】翻转卡点转场", bvid: "BV1EeQ4BiEC6", page: 39 },
            { title: "【案例实操】拍照卡点效果", bvid: "BV1EeQ4BiEC6", page: 40 },
            { title: "【案例实操】连续缩放拉镜效果", bvid: "BV1EeQ4BiEC6", page: 41 },
            { title: "【案例实操】百叶窗旋转转场", bvid: "BV1EeQ4BiEC6", page: 42 },
            { title: "【案例实操】展开颜色效果", bvid: "BV1EeQ4BiEC6", page: 43 },
            { title: "【案例实操】人物扫光效果", bvid: "BV1EeQ4BiEC6", page: 44 },
            { title: "【案例实操】星空模糊转场", bvid: "BV1EeQ4BiEC6", page: 45 },
            { title: "【案例实操】人物分频弹出转场", bvid: "BV1EeQ4BiEC6", page: 46 },
            { title: "【案例实操】网格缩放转场", bvid: "BV1EeQ4BiEC6", page: 47 },
            { title: "【案例实操】边框移动转场", bvid: "BV1EeQ4BiEC6", page: 48 },
            { title: "【案例实操】裂缝分割转场", bvid: "BV1EeQ4BiEC6", page: 49 },
            { title: "【案例实操】无限撕裂转场", bvid: "BV1EeQ4BiEC6", page: 50 },
            { title: "【案例实操】酷炫闪屏转场", bvid: "BV1EeQ4BiEC6", page: 51 },
            { title: "【案例实操】三色渐变转场", bvid: "BV1EeQ4BiEC6", page: 52 },
            { title: "【案例实操】边框切屏转场", bvid: "BV1EeQ4BiEC6", page: 53 },
            { title: "【案例实操】屏幕穿透转场", bvid: "BV1EeQ4BiEC6", page: 54 },
          ]
        },
        {
          id: "edi-002",
          roleId: "editor",
          name: "声音设计 · 用音效提升剪辑质感",
          brief: "单集精华：混剪、预告片、旅拍短片如何用音效把画面质感拉高一个档次。",
          category: "进阶",
          coverImg: "img/courses/cover-edi-002.png",
          cover: "135deg, #0891b2 0%, #06b6d4 60%, #67e8f9 100%",
          coverMark: "音",
          intro: "很多片子画面不错却\"没声音的灵魂\"。本课（UP：南门录像厅）从声音设计的角度拆解：预告片怎么铺音效、混剪怎么对点、旅拍怎么用环境声建立氛围，一条视频讲清\"用音效提升剪辑质感\"的核心思路。",
          req: ["会基础剪辑操作", "对\"片子很干\"有体感"],
          goals: ["建立声音层意识：对白/音乐/音效分层思考", "学会为画面挑选与铺设音效", "让成片听感更有电影感"],
          tools: ["任意剪辑软件", "音效素材站账号（如爱给网）", "耳机"],
          bvid: "BV1Qr4y1S7r1",
          episodes: [
            { title: "「声音设计1」用音效提升剪辑质感！混剪、预告片、旅拍短片必备！", bvid: "BV1Qr4y1S7r1", page: 1 },
          ]
        },
        {
          id: "wb-001",
          roleId: "editor",
          name: "WorkBuddy 官方教程 · 完全上手",
          brief: "30 集保姆级官方教程：从认识 WorkBuddy 到远程控制、提示词技巧与高效技能，把 AI 办公真正用起来。",
          category: "官方",
          coverImg: "img/courses/cover-wb-001.png",
          cover: "135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%",
          coverMark: "智",
          intro: "WorkBuddy 官方出品（UP：腾讯WorkBuddy官方教程）的保姆级完整教程，共 30 集。从\"AI 办公新范式\"建立认知，到安装与工作模式、远程控制 Claw、提示词技巧，再到各类办公场景与精选技能（文档、表格、录音转文字等），零基础一周可完成入门到进阶。适合全团队一起学。",
          req: ["已安装 WorkBuddy（官网可下载）", "愿意边看边动手实操"],
          goals: ["理解 WorkBuddy 与普通 AI 工具的区别", "掌握任务管理、远程控制等核心用法", "能组合多个技能完成真实办公任务"],
          tools: ["WorkBuddy 客户端", "一个可用的 AI 账号"],
          bvid: "BV1zHbh68Ed9",
          episodes: [
            { title: "1- 认识workbuddy-AI办公新范式，使用场景与传统AI工具的区别", bvid: "BV1zHbh68Ed9", page: 1 },
            { title: "2- 快速上手，安装workbuddy以及几种工作模式介绍", bvid: "BV1zHbh68Ed9", page: 2 },
            { title: "2-2快速上手，给workbuddy的第一个任务及任务管理", bvid: "BV1zHbh68Ed9", page: 3 },
            { title: "3-Claw远程控制，工作原理、模式以及接入配置", bvid: "BV1zHbh68Ed9", page: 4 },
            { title: "4-Claw远程控制，手机使用workbuddy的技巧、实战用例以及使用场景", bvid: "BV1zHbh68Ed9", page: 5 },
            { title: "5- 提示词技巧，高质量的提示词模板", bvid: "BV1zHbh68Ed9", page: 6 },
            { title: "6-提示词常见错误及编写高质量提示词的方法", bvid: "BV1zHbh68Ed9", page: 7 },
            { title: "7-文件处理-批量提取文件信息", bvid: "BV1zHbh68Ed9", page: 8 },
            { title: "8-文件处理-批量文件归档和重命名", bvid: "BV1zHbh68Ed9", page: 9 },
            { title: "9- 文件处理-数据清洗与合并", bvid: "BV1zHbh68Ed9", page: 10 },
            { title: "10-文件处理-识别发票", bvid: "BV1zHbh68Ed9", page: 11 },
            { title: "11-文件处理-跨格式转换及安全操作文件注意事项", bvid: "BV1zHbh68Ed9", page: 12 },
            { title: "12-文档生成与编辑-从素材生成结构化报告", bvid: "BV1zHbh68Ed9", page: 13 },
            { title: "13-文档生成与编辑-会议纪要整理生成", bvid: "BV1zHbh68Ed9", page: 14 },
            { title: "14-文档生成与编辑-从零生成文档（方案和邮件）", bvid: "BV1zHbh68Ed9", page: 15 },
            { title: "15- 文档生成与编辑-基于模板生成标准化文档", bvid: "BV1zHbh68Ed9", page: 16 },
            { title: "16- 文档生成与编辑-改写润色与优化技巧", bvid: "BV1zHbh68Ed9", page: 17 },
            { title: "17-数据分析与可视化-销售数据分析，html与word版本输出", bvid: "BV1zHbh68Ed9", page: 18 },
            { title: "18-数据分析与可视化-财务数据分析", bvid: "BV1zHbh68Ed9", page: 19 },
            { title: "19- 数据分析与可视化-运营数据分析", bvid: "BV1zHbh68Ed9", page: 20 },
            { title: "20-数据分析与可视化-用户满意度调查问卷分析", bvid: "BV1zHbh68Ed9", page: 21 },
            { title: "21- 数据分析与可视化的输出技巧", bvid: "BV1zHbh68Ed9", page: 22 },
            { title: "22- 自动化任务-每天定时推送AI简报", bvid: "BV1zHbh68Ed9", page: 23 },
            { title: "23-自动化任务-每周自动生成周报", bvid: "BV1zHbh68Ed9", page: 24 },
            { title: "24- 自动化任务-定时推送竞品分析", bvid: "BV1zHbh68Ed9", page: 25 },
            { title: "25-高效养虾技巧01-03", bvid: "BV1zHbh68Ed9", page: 26 },
            { title: "26-高效养虾技巧04-07", bvid: "BV1zHbh68Ed9", page: 27 },
            { title: "27-高效养虾技巧08-10", bvid: "BV1zHbh68Ed9", page: 28 },
            { title: "28- skill精选-office办公文档套件", bvid: "BV1zHbh68Ed9", page: 29 },
            { title: "29-skill精选-录音转文字", bvid: "BV1zHbh68Ed9", page: 30 },
          ]
        }
      ],
      storyboard: [
        {
          id: "sto-001",
          roleId: "storyboard",
          name: "老白分镜课 · 从零基础到实战",
          brief: "17 集分镜系统课（连载中）：正反打、轴线、透视、蒙太奇，把镜头语言一次讲透。",
          category: "入门",
          coverImg: "img/courses/cover-sto-001.png",
          cover: "135deg, #0e7490 0%, #0891b2 55%, #22d3ee 100%",
          coverMark: "镜",
          intro: "B 站专业分镜教学（UP：老白的分镜），目前更新到 16 课并持续连载。课程从\"正反打\"讲起，系统覆盖轴线规则、透视基础、主镜概念、蒙太奇等分镜与镜头语言知识，配有大量影片拆解范例，适合想从零建立分镜体系的人。",
          req: ["对拍摄有兴趣即可", "建议备纸笔随手画", "课程仍在更新，按当前进度顺序学"],
          goals: ["看懂并会画基础分镜图", "理解正反打、轴线、景别等核心概念", "能为一场戏设计基础机位方案"],
          tools: ["纸笔或分镜 App", "任意可看片源（B 站即可）"],
          bvid: "BV1QB4y1r73i",
          episodes: [
            { title: "第一课 正反打 1", bvid: "BV1QB4y1r73i", page: 1 },
            { title: "第二课 轴向 2-1", bvid: "BV1QB4y1r73i", page: 2 },
            { title: "第二课 轴向 2-2", bvid: "BV1QB4y1r73i", page: 3 },
            { title: "第三课 范例一《老板，大门忘关了》3", bvid: "BV1QB4y1r73i", page: 4 },
            { title: "第四课 透视基础 4", bvid: "BV1QB4y1r73i", page: 5 },
            { title: "第五课 主镜的概念 5", bvid: "BV1QB4y1r73i", page: 6 },
            { title: "第六课 用画面推导机位 6", bvid: "BV1QB4y1r73i", page: 7 },
            { title: "第七课 讲故事的基础三原则 7", bvid: "BV1QB4y1r73i", page: 8 },
            { title: "第八课 决定景别的六个原则 8", bvid: "BV1QB4y1r73i", page: 9 },
            { title: "第九课 决定机位高度的六个原则 9", bvid: "BV1QB4y1r73i", page: 10 },
            { title: "第十课 构图的两种思路 10", bvid: "BV1QB4y1r73i", page: 11 },
            { title: "第十一课 视觉焦点的实际应用 11", bvid: "BV1QB4y1r73i", page: 12 },
            { title: "第十二课 空间感", bvid: "BV1QB4y1r73i", page: 13 },
            { title: "第十三课 运动", bvid: "BV1QB4y1r73i", page: 14 },
            { title: "第十四课 什么时候能跳轴", bvid: "BV1QB4y1r73i", page: 15 },
            { title: "第十五课 视角", bvid: "BV1QB4y1r73i", page: 16 },
            { title: "第十六课 蒙太奇", bvid: "BV1QB4y1r73i", page: 17 },
          ]
        },
        {
          id: "sto-002",
          roleId: "storyboard",
          name: "AI 视觉生产工作流 · 稳定出图",
          brief: "单集精华：从随机抽卡到锁定风格、替换变量，建立可控的 AI 出图流程。",
          category: "进阶",
          coverImg: "img/courses/cover-sto-002.png",
          cover: "135deg, #4338ca 0%, #6366f1 60%, #a5b4fc 100%",
          coverMark: "图",
          intro: "AI 出图最大的痛点是\"不稳定\"。本课（UP：段截面）演示一套从随机抽卡到稳定复现的视觉生产工作流：锁定风格关键词、把可替换内容做成变量，再用参考图微调出图方向，让 AI 从\"碰运气\"变成\"可生产\"。分镜阶段找参考、做概念图都很实用。",
          req: ["有一个可用的 AI 出图工具（Midjourney / SD / 即梦等）"],
          goals: ["掌握\"风格锁定 + 变量替换\"的出图方法", "能为分镜/概念设计快速产出参考图", "建立可控可复现的 AI 视觉流程"],
          tools: ["AI 出图工具", "提示词笔记"],
          bvid: "BV1wvgG6PEXo",
          episodes: [
            { title: "从随机抽卡到稳定出图：AI视觉生产工作流，锁定风格、替换变量，还有图片新玩法", bvid: "BV1wvgG6PEXo", page: 1 },
          ]
        },
        {
          id: "sto-003",
          roleId: "storyboard",
          name: "AI 提示词工程 · 零基础全套",
          brief: "8 集提示词系统课：基本原则、结构、框架到攻击防御与实战场景，一小时快速入门。",
          category: "入门",
          coverImg: "img/courses/cover-sto-003.png",
          cover: "135deg, #1e40af 0%, #3b82f6 55%, #93c5fd 100%",
          coverMark: "词",
          intro: "面向零基础的提示词工程完整课（UP：大模型基础），8 集约一小时：从提示词入门、编写原则、基本结构，到常用框架、进阶技巧、自动化，再到安全与实战场景。学会写提示词，AI 出图、AI 写作、AI 编程的效率都会上一个台阶。",
          req: ["会使用任意一种大模型产品（豆包/Kimi/GPT 等）"],
          goals: ["掌握高质量提示词的编写原则与结构", "会用框架写出稳定的提示词", "了解提示词注入等安全边界"],
          tools: ["任一 AI 对话产品", "笔记工具"],
          bvid: "BV1nsuu6nEpt",
          episodes: [
            { title: "1.提示词工程入门", bvid: "BV1nsuu6nEpt", page: 1 },
            { title: "2.编写提示词的基本原则", bvid: "BV1nsuu6nEpt", page: 2 },
            { title: "3.提示词的基本结构", bvid: "BV1nsuu6nEpt", page: 3 },
            { title: "4.提示词框架", bvid: "BV1nsuu6nEpt", page: 4 },
            { title: "5.提示词的进阶技术", bvid: "BV1nsuu6nEpt", page: 5 },
            { title: "6.提示词自动化", bvid: "BV1nsuu6nEpt", page: 6 },
            { title: "7.提示词攻击与防御策略", bvid: "BV1nsuu6nEpt", page: 7 },
            { title: "8.大模型实战场景", bvid: "BV1nsuu6nEpt", page: 8 },
          ]
        },
        {
          id: "wb-001",
          roleId: "storyboard",
          name: "WorkBuddy 官方教程 · 完全上手",
          brief: "30 集保姆级官方教程：从认识 WorkBuddy 到远程控制、提示词技巧与高效技能，把 AI 办公真正用起来。",
          category: "官方",
          coverImg: "img/courses/cover-wb-001.png",
          cover: "135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%",
          coverMark: "智",
          intro: "WorkBuddy 官方出品（UP：腾讯WorkBuddy官方教程）的保姆级完整教程，共 30 集。从\"AI 办公新范式\"建立认知，到安装与工作模式、远程控制 Claw、提示词技巧，再到各类办公场景与精选技能（文档、表格、录音转文字等），零基础一周可完成入门到进阶。适合全团队一起学。",
          req: ["已安装 WorkBuddy（官网可下载）", "愿意边看边动手实操"],
          goals: ["理解 WorkBuddy 与普通 AI 工具的区别", "掌握任务管理、远程控制等核心用法", "能组合多个技能完成真实办公任务"],
          tools: ["WorkBuddy 客户端", "一个可用的 AI 账号"],
          bvid: "BV1zHbh68Ed9",
          episodes: [
            { title: "1- 认识workbuddy-AI办公新范式，使用场景与传统AI工具的区别", bvid: "BV1zHbh68Ed9", page: 1 },
            { title: "2- 快速上手，安装workbuddy以及几种工作模式介绍", bvid: "BV1zHbh68Ed9", page: 2 },
            { title: "2-2快速上手，给workbuddy的第一个任务及任务管理", bvid: "BV1zHbh68Ed9", page: 3 },
            { title: "3-Claw远程控制，工作原理、模式以及接入配置", bvid: "BV1zHbh68Ed9", page: 4 },
            { title: "4-Claw远程控制，手机使用workbuddy的技巧、实战用例以及使用场景", bvid: "BV1zHbh68Ed9", page: 5 },
            { title: "5- 提示词技巧，高质量的提示词模板", bvid: "BV1zHbh68Ed9", page: 6 },
            { title: "6-提示词常见错误及编写高质量提示词的方法", bvid: "BV1zHbh68Ed9", page: 7 },
            { title: "7-文件处理-批量提取文件信息", bvid: "BV1zHbh68Ed9", page: 8 },
            { title: "8-文件处理-批量文件归档和重命名", bvid: "BV1zHbh68Ed9", page: 9 },
            { title: "9- 文件处理-数据清洗与合并", bvid: "BV1zHbh68Ed9", page: 10 },
            { title: "10-文件处理-识别发票", bvid: "BV1zHbh68Ed9", page: 11 },
            { title: "11-文件处理-跨格式转换及安全操作文件注意事项", bvid: "BV1zHbh68Ed9", page: 12 },
            { title: "12-文档生成与编辑-从素材生成结构化报告", bvid: "BV1zHbh68Ed9", page: 13 },
            { title: "13-文档生成与编辑-会议纪要整理生成", bvid: "BV1zHbh68Ed9", page: 14 },
            { title: "14-文档生成与编辑-从零生成文档（方案和邮件）", bvid: "BV1zHbh68Ed9", page: 15 },
            { title: "15- 文档生成与编辑-基于模板生成标准化文档", bvid: "BV1zHbh68Ed9", page: 16 },
            { title: "16- 文档生成与编辑-改写润色与优化技巧", bvid: "BV1zHbh68Ed9", page: 17 },
            { title: "17-数据分析与可视化-销售数据分析，html与word版本输出", bvid: "BV1zHbh68Ed9", page: 18 },
            { title: "18-数据分析与可视化-财务数据分析", bvid: "BV1zHbh68Ed9", page: 19 },
            { title: "19- 数据分析与可视化-运营数据分析", bvid: "BV1zHbh68Ed9", page: 20 },
            { title: "20-数据分析与可视化-用户满意度调查问卷分析", bvid: "BV1zHbh68Ed9", page: 21 },
            { title: "21- 数据分析与可视化的输出技巧", bvid: "BV1zHbh68Ed9", page: 22 },
            { title: "22- 自动化任务-每天定时推送AI简报", bvid: "BV1zHbh68Ed9", page: 23 },
            { title: "23-自动化任务-每周自动生成周报", bvid: "BV1zHbh68Ed9", page: 24 },
            { title: "24- 自动化任务-定时推送竞品分析", bvid: "BV1zHbh68Ed9", page: 25 },
            { title: "25-高效养虾技巧01-03", bvid: "BV1zHbh68Ed9", page: 26 },
            { title: "26-高效养虾技巧04-07", bvid: "BV1zHbh68Ed9", page: 27 },
            { title: "27-高效养虾技巧08-10", bvid: "BV1zHbh68Ed9", page: 28 },
            { title: "28- skill精选-office办公文档套件", bvid: "BV1zHbh68Ed9", page: 29 },
            { title: "29-skill精选-录音转文字", bvid: "BV1zHbh68Ed9", page: 30 },
          ]
        }
      ],
      sound: [
        {
          id: "sou-001",
          roleId: "sound",
          name: "影视飓风的声音质感 · 深度解析",
          brief: "单集干货：普通人如何一步步接近影视飓风的声音质感，从器材到后期思路全拆解。",
          category: "进阶",
          coverImg: "img/courses/cover-sou-001.png",
          cover: "135deg, #0f766e 0%, #14b8a6 55%, #5eead4 100%",
          coverMark: "声",
          intro: "影视飓风一直被夸\"声音质感好\"，好在哪、怎么做到的？本课（UP：Tom不是Harry）从收音设备、现场拾音到后期处理逐步拆解，讲清普通人也能上手的声音提升路径。想让你拍的视频\"听感\"变专业，这集值得反复看。",
          req: ["有一支能录像的设备（手机即可）", "若有多余预算可备一支领夹麦"],
          goals: ["理解影视级声音质感的关键构成", "掌握低成本提升收音质量的方法", "知道后期如何处理声音瑕疵"],
          tools: ["手机或相机", "领夹麦 / 枪式麦（按需）", "剪辑软件音频面板"],
          bvid: "BV1hzjX6LEWb",
          episodes: [
            { title: "全程干货！普通人如何快速接近影视飓风的声音质感？｜深度解析飓风（3）", bvid: "BV1hzjX6LEWb", page: 1 },
          ]
        },
        {
          id: "wb-001",
          roleId: "sound",
          name: "WorkBuddy 官方教程 · 完全上手",
          brief: "30 集保姆级官方教程：从认识 WorkBuddy 到远程控制、提示词技巧与高效技能，把 AI 办公真正用起来。",
          category: "官方",
          coverImg: "img/courses/cover-wb-001.png",
          cover: "135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%",
          coverMark: "智",
          intro: "WorkBuddy 官方出品（UP：腾讯WorkBuddy官方教程）的保姆级完整教程，共 30 集。从\"AI 办公新范式\"建立认知，到安装与工作模式、远程控制 Claw、提示词技巧，再到各类办公场景与精选技能（文档、表格、录音转文字等），零基础一周可完成入门到进阶。适合全团队一起学。",
          req: ["已安装 WorkBuddy（官网可下载）", "愿意边看边动手实操"],
          goals: ["理解 WorkBuddy 与普通 AI 工具的区别", "掌握任务管理、远程控制等核心用法", "能组合多个技能完成真实办公任务"],
          tools: ["WorkBuddy 客户端", "一个可用的 AI 账号"],
          bvid: "BV1zHbh68Ed9",
          episodes: [
            { title: "1- 认识workbuddy-AI办公新范式，使用场景与传统AI工具的区别", bvid: "BV1zHbh68Ed9", page: 1 },
            { title: "2- 快速上手，安装workbuddy以及几种工作模式介绍", bvid: "BV1zHbh68Ed9", page: 2 },
            { title: "2-2快速上手，给workbuddy的第一个任务及任务管理", bvid: "BV1zHbh68Ed9", page: 3 },
            { title: "3-Claw远程控制，工作原理、模式以及接入配置", bvid: "BV1zHbh68Ed9", page: 4 },
            { title: "4-Claw远程控制，手机使用workbuddy的技巧、实战用例以及使用场景", bvid: "BV1zHbh68Ed9", page: 5 },
            { title: "5- 提示词技巧，高质量的提示词模板", bvid: "BV1zHbh68Ed9", page: 6 },
            { title: "6-提示词常见错误及编写高质量提示词的方法", bvid: "BV1zHbh68Ed9", page: 7 },
            { title: "7-文件处理-批量提取文件信息", bvid: "BV1zHbh68Ed9", page: 8 },
            { title: "8-文件处理-批量文件归档和重命名", bvid: "BV1zHbh68Ed9", page: 9 },
            { title: "9- 文件处理-数据清洗与合并", bvid: "BV1zHbh68Ed9", page: 10 },
            { title: "10-文件处理-识别发票", bvid: "BV1zHbh68Ed9", page: 11 },
            { title: "11-文件处理-跨格式转换及安全操作文件注意事项", bvid: "BV1zHbh68Ed9", page: 12 },
            { title: "12-文档生成与编辑-从素材生成结构化报告", bvid: "BV1zHbh68Ed9", page: 13 },
            { title: "13-文档生成与编辑-会议纪要整理生成", bvid: "BV1zHbh68Ed9", page: 14 },
            { title: "14-文档生成与编辑-从零生成文档（方案和邮件）", bvid: "BV1zHbh68Ed9", page: 15 },
            { title: "15- 文档生成与编辑-基于模板生成标准化文档", bvid: "BV1zHbh68Ed9", page: 16 },
            { title: "16- 文档生成与编辑-改写润色与优化技巧", bvid: "BV1zHbh68Ed9", page: 17 },
            { title: "17-数据分析与可视化-销售数据分析，html与word版本输出", bvid: "BV1zHbh68Ed9", page: 18 },
            { title: "18-数据分析与可视化-财务数据分析", bvid: "BV1zHbh68Ed9", page: 19 },
            { title: "19- 数据分析与可视化-运营数据分析", bvid: "BV1zHbh68Ed9", page: 20 },
            { title: "20-数据分析与可视化-用户满意度调查问卷分析", bvid: "BV1zHbh68Ed9", page: 21 },
            { title: "21- 数据分析与可视化的输出技巧", bvid: "BV1zHbh68Ed9", page: 22 },
            { title: "22- 自动化任务-每天定时推送AI简报", bvid: "BV1zHbh68Ed9", page: 23 },
            { title: "23-自动化任务-每周自动生成周报", bvid: "BV1zHbh68Ed9", page: 24 },
            { title: "24- 自动化任务-定时推送竞品分析", bvid: "BV1zHbh68Ed9", page: 25 },
            { title: "25-高效养虾技巧01-03", bvid: "BV1zHbh68Ed9", page: 26 },
            { title: "26-高效养虾技巧04-07", bvid: "BV1zHbh68Ed9", page: 27 },
            { title: "27-高效养虾技巧08-10", bvid: "BV1zHbh68Ed9", page: 28 },
            { title: "28- skill精选-office办公文档套件", bvid: "BV1zHbh68Ed9", page: 29 },
            { title: "29-skill精选-录音转文字", bvid: "BV1zHbh68Ed9", page: 30 },
          ]
        }
      ],
      writer: [
        {
          id: "wri-001",
          roleId: "writer",
          name: "查理的编剧课 · 从零到高阶实战",
          brief: "92 集编剧实战大课（连载中）：劝学、故事要素、实战拉片全覆盖，编剧视角拆解经典电影。",
          category: "实战",
          coverImg: "img/courses/cover-wri-001.png",
          cover: "135deg, #be185d 0%, #db2777 55%, #f472b6 100%",
          coverMark: "剧",
          intro: "B 站口碑编剧课（UP：查理老师的编剧课），已更 90+ 集并持续更新。从\"劝学\"建立创作心态，到故事要素、结构理论，再到大量\"编剧视角拉片\"（含《肖申克的救赎》等经典），用上百个小时把编剧从零到高阶的路径走一遍。想认真学编剧，这是目前 B 站最完整的实战合集之一。",
          req: ["愿意投入长时间系统学习", "最好先看前几集\"劝学\"评估自己是否适合"],
          goals: ["建立完整的编剧理论框架", "学会用编剧视角拉片与分析故事", "能独立完成短片剧本的结构设计"],
          tools: ["笔记本（记理论要点）", "B 站追更（课程连载中）", "想写的故事灵感"],
          bvid: "BV1eE411F73t",
          episodes: [
            { title: "一个人在家做AI漫剧能赚钱吗？", bvid: "BV1eE411F73t", page: 1 },
            { title: "第一课-劝学1.1", bvid: "BV1eE411F73t", page: 2 },
            { title: "第一课-劝学1.2", bvid: "BV1eE411F73t", page: 3 },
            { title: "第一课-劝学1.3", bvid: "BV1eE411F73t", page: 4 },
            { title: "第二课-故事的要素2.1", bvid: "BV1eE411F73t", page: 5 },
            { title: "第二课-故事的要素2.2", bvid: "BV1eE411F73t", page: 6 },
            { title: "第三课-八要素的实战应用3.1", bvid: "BV1eE411F73t", page: 7 },
            { title: "第三课-八要素的实战应用3.2", bvid: "BV1eE411F73t", page: 8 },
            { title: "第四课-第一个故事4.1", bvid: "BV1eE411F73t", page: 9 },
            { title: "第四课-第一个故事4.2", bvid: "BV1eE411F73t", page: 10 },
            { title: "第五课-剧本的正义5.1", bvid: "BV1eE411F73t", page: 11 },
            { title: "第五课-剧本的正义5.2", bvid: "BV1eE411F73t", page: 12 },
            { title: "第六课-剧本的格式6", bvid: "BV1eE411F73t", page: 13 },
            { title: "第七课-拿事儿说话7", bvid: "BV1eE411F73t", page: 14 },
            { title: "第八课-勾勒画面8.1", bvid: "BV1eE411F73t", page: 15 },
            { title: "第八课-勾勒画面8.2", bvid: "BV1eE411F73t", page: 16 },
            { title: "第八课-勾勒画面8.3", bvid: "BV1eE411F73t", page: 17 },
            { title: "第九课-谈谈人物9.1", bvid: "BV1eE411F73t", page: 18 },
            { title: "第九课-谈谈人物9.2", bvid: "BV1eE411F73t", page: 19 },
            { title: "第十课-复杂叙事10.1", bvid: "BV1eE411F73t", page: 20 },
            { title: "第十课-复杂叙事10.2", bvid: "BV1eE411F73t", page: 21 },
            { title: "十一课-类型片11.1", bvid: "BV1eE411F73t", page: 22 },
            { title: "十一课-类型片11.2", bvid: "BV1eE411F73t", page: 23 },
            { title: "十一课-类型片11.3", bvid: "BV1eE411F73t", page: 24 },
            { title: "十二课-小蝌蚪找妈妈12.1", bvid: "BV1eE411F73t", page: 25 },
            { title: "十二课-小蝌蚪找妈妈12.2", bvid: "BV1eE411F73t", page: 26 },
            { title: "十二课-小蝌蚪找妈妈12.3", bvid: "BV1eE411F73t", page: 27 },
            { title: "十三课-电视剧13.1", bvid: "BV1eE411F73t", page: 28 },
            { title: "十三课-电视剧13.2", bvid: "BV1eE411F73t", page: 29 },
            { title: "十三课-电视剧13.3", bvid: "BV1eE411F73t", page: 30 },
            { title: "十三课-电视剧13.4", bvid: "BV1eE411F73t", page: 31 },
            { title: "十四课-场景与对白14.1", bvid: "BV1eE411F73t", page: 32 },
            { title: "十四课-场景与对白14.2", bvid: "BV1eE411F73t", page: 33 },
            { title: "十五课-节拍器15.1", bvid: "BV1eE411F73t", page: 34 },
            { title: "十五课-节拍器15.2", bvid: "BV1eE411F73t", page: 35 },
            { title: "十五课-节拍器15.3", bvid: "BV1eE411F73t", page: 36 },
            { title: "十五课-节拍器15.4", bvid: "BV1eE411F73t", page: 37 },
            { title: "十六课-悬念与反转16", bvid: "BV1eE411F73t", page: 38 },
            { title: "十七课-新手跳坑17", bvid: "BV1eE411F73t", page: 39 },
            { title: "十八课-拿人的开场18.1", bvid: "BV1eE411F73t", page: 40 },
            { title: "十八课-拿人的开场18.2", bvid: "BV1eE411F73t", page: 41 },
            { title: "十九课-怎么撰写项目提案19", bvid: "BV1eE411F73t", page: 42 },
            { title: "二十课-编剧拉片20", bvid: "BV1eE411F73t", page: 43 },
            { title: "二十一课-谈几个进阶问题（上）21.1", bvid: "BV1eE411F73t", page: 44 },
            { title: "二十一课-谈几个进阶问题（下）21.2", bvid: "BV1eE411F73t", page: 45 },
            { title: "二十二课-G潮上不去？（上）22.1", bvid: "BV1eE411F73t", page: 46 },
            { title: "二十二课-G潮上不去？（下）22.2", bvid: "BV1eE411F73t", page: 47 },
            { title: "二十三课-怎么写喜剧？(上）23.1", bvid: "BV1eE411F73t", page: 48 },
            { title: "二十三课-怎么写喜剧？（下）23.2", bvid: "BV1eE411F73t", page: 49 },
            { title: "二十四课-剖析烂片24", bvid: "BV1eE411F73t", page: 50 },
            { title: "二十五课-观影情绪节拍表25", bvid: "BV1eE411F73t", page: 51 },
            { title: "二十六课-从容应对文艺凡尔赛26", bvid: "BV1eE411F73t", page: 52 },
            { title: "二十七课-剧本的叙事视角27", bvid: "BV1eE411F73t", page: 53 },
            { title: "二十八课-编剧课科目三28", bvid: "BV1eE411F73t", page: 54 },
            { title: "二十九课-剧情要有攻击性29", bvid: "BV1eE411F73t", page: 55 },
            { title: "三十课-人类为什么需要影视剧30", bvid: "BV1eE411F73t", page: 56 },
            { title: "三十一课-单元剧的创作理念31", bvid: "BV1eE411F73t", page: 57 },
            { title: "三十二课-跟《鱿鱼游戏》学写强设定", bvid: "BV1eE411F73t", page: 58 },
            { title: "三十三课-怎样克服拖延症", bvid: "BV1eE411F73t", page: 59 },
            { title: "三十四课-查理小三角创作法", bvid: "BV1eE411F73t", page: 60 },
            { title: "《让子弹飞》直播拉片", bvid: "BV1eE411F73t", page: 61 },
            { title: "查理老师告诉你，短剧为什么这么火！", bvid: "BV1eE411F73t", page: 62 },
            { title: "职业编剧怎么用ai写剧本", bvid: "BV1eE411F73t", page: 63 },
            { title: "如何写好单场戏，让每一集都有钩子？", bvid: "BV1eE411F73t", page: 64 },
            { title: "编剧的第一性原理", bvid: "BV1eE411F73t", page: 65 },
            { title: "写了剧本怎么投稿", bvid: "BV1eE411F73t", page: 66 },
            { title: "编剧库3.0大升级来了！快来参与普查，订单主动找你对接", bvid: "BV1eE411F73t", page: 67 },
            { title: "无论看多少次都觉得超级！无敌！治愈！《玩具总动员》拉片解读，独特视角（一）", bvid: "BV1eE411F73t", page: 68 },
            { title: "【编剧视角拉片】保姆级拆解《玩具总动员》看完你也能复刻！（二）", bvid: "BV1eE411F73t", page: 69 },
            { title: "【编剧拉片】麻花喜剧巅峰神作！《夏洛特烦恼》逐帧分析创作思路，颠覆你的认知！（一）", bvid: "BV1eE411F73t", page: 70 },
            { title: "编剧视角拉片《夏洛特烦恼》逐帧分析创作思路！全程干货拉满！（二））", bvid: "BV1eE411F73t", page: 71 },
            { title: "【专业编剧带你拉片】科幻神作！细读《星际穿越》，爱是唯一可以超越时间与空间的事", bvid: "BV1eE411F73t", page: 72 },
            { title: "编剧视角拉片《无间道》，双雄戏悬疑戏跟它学就对了！", bvid: "BV1eE411F73t", page: 73 },
            { title: "编剧视角拉片《保你平安》集结喜剧半壁江山，大鹏黑马口碑喜剧", bvid: "BV1eE411F73t", page: 74 },
            { title: "编剧视角拉片《男妇女主任》小品型电影看完你就会写了！", bvid: "BV1eE411F73t", page: 75 },
            { title: "《哪吒2》为啥这么爆？查理老师新年第一讲，一起写好中国故事！", bvid: "BV1eE411F73t", page: 76 },
            { title: "编剧视角拉片《闻香识女人》两个截然不同的灵魂在困境中相互救赎!", bvid: "BV1eE411F73t", page: 77 },
            { title: "编剧视角拉片《猩球崛起》，人猿对战背后的隐喻！", bvid: "BV1eE411F73t", page: 78 },
            { title: "编剧视角拉片《幸福终点站》等待未必是坏事，在等待中寻找生活的转机！", bvid: "BV1eE411F73t", page: 79 },
            { title: "编剧视角拉片经典传记片《华尔街之狼》", bvid: "BV1eE411F73t", page: 80 },
            { title: "编剧视角拉片《蝴蝶效应》！反转 结构 悬疑 脑洞...这部电影值得你再刷N遍", bvid: "BV1eE411F73t", page: 81 },
            { title: "编剧视角拉片《小丑》从内耗走向癫狂，从边缘跨上“神坛”「影史现象级」是怎样炼成的？", bvid: "BV1eE411F73t", page: 82 },
            { title: "编剧视角拉片《危情时速》：神级叙事+真实事件改编，影视从业者不可错过的一部电影！", bvid: "BV1eE411F73t", page: 83 },
            { title: "编剧视角拉片是枝裕和《比海更深》：文艺片的“克制叙事”高级在哪？怎么学？", bvid: "BV1eE411F73t", page: 84 },
            { title: "编剧视角拉片烧脑神作《致命ID》", bvid: "BV1eE411F73t", page: 85 },
            { title: "编剧视角拉片《生死狙击》！男频爽片创作要点", bvid: "BV1eE411F73t", page: 86 },
            { title: "编剧视角拉片《千与千寻》！", bvid: "BV1eE411F73t", page: 87 },
            { title: "编剧视角拉片《摔跤吧爸爸》9分励志体育佳作，为苦难中的亿万女性发声！", bvid: "BV1eE411F73t", page: 88 },
            { title: "编剧视角拉片韩国喜剧【金氏漂流记】两个孤独灵魂的相互救赎！", bvid: "BV1eE411F73t", page: 89 },
            { title: "编剧视角拉片励志电影《肖申克的救赎》一", bvid: "BV1eE411F73t", page: 90 },
            { title: "编剧视角拉片励志电影《肖申克的救赎》二", bvid: "BV1eE411F73t", page: 91 },
            { title: "编剧视角拉片励志电影《肖申克的救赎》三", bvid: "BV1eE411F73t", page: 92 },
          ]
        },
        {
          id: "wri-002",
          roleId: "writer",
          name: "Tim 如何写稿 · 构建视频节奏感",
          brief: "单集拆解：影视飓风 Tim 的写稿方法，一篇文章讲清如何构建视频的节奏感。",
          category: "进阶",
          coverImg: "img/courses/cover-wri-002.png",
          cover: "135deg, #9d174d 0%, #c026d3 55%, #e879f9 100%",
          coverMark: "稿",
          intro: "为什么有的视频让你一口气看完？节奏感从写稿阶段就开始了。本集（一个薏_YiMedia）拆解影视飓风 Tim 的写稿习惯：怎么搭信息顺序、怎么埋钩子、怎么控制段落的松紧，最终落到\"稿子结构决定成片节奏\"这件事上。",
          req: ["写过或想写视频文案/口播稿"],
          goals: ["理解\"成片节奏始于稿子结构\"", "学会用段落松紧控制观看节奏", "把方法用到自己的脚本里"],
          tools: ["文档软件", "一支能记灵感的笔"],
          bvid: "BV1uE411F7Ck",
          episodes: [
            { title: "tim节奏", bvid: "BV1uE411F7Ck", page: 1 },
          ]
        }
      ],
      operator: [
        {
          id: "ope-001",
          roleId: "operator",
          name: "新媒体运营 300 集自学教程",
          brief: "67 集全栈运营大课：小红书/抖音/视频号起号涨粉、文案写作、直播带货与数据分析全覆盖，附配套资料。",
          category: "实战",
          coverImg: "img/courses/cover-ope-001.png",
          cover: "135deg, #c2410c 0%, #ea580c 60%, #fdba74 100%",
          coverMark: "营",
          intro: "B 站运营系统大课（UP：哔里哔里运营），已收录 67 集并持续更新。从小红书起号算法、赛道选择、账号定位，到抖音/视频号运营、文案写作、短视频拍摄剪辑，再到直播话术与数据复盘，覆盖新媒体运营求职就业与自媒体的完整链路，配套资料已附在课程内。",
          req: ["想认真做新媒体账号或入行运营", "建议按课程顺序学习并同步开号练习"],
          goals: ["掌握主流平台起号与涨粉方法", "能独立完成账号定位与内容规划", "看懂后台数据并指导选题迭代"],
          tools: ["1-2 个内容平台账号（小红书/抖音/视频号）", "表格工具做发布规划", "配套资料（见课程资料区）"],
          material: {"name": "新媒体运营 300 集 · 配套资料", "url": "https://1849677050.share.123pan.cn/123pan/cn3ovd-vlhW3?pwd=9i45#"},
          bvid: "BV14B2QB3EEj",
          episodes: [
            { title: "001.【课程开篇】新手小白快速学习路径 必看", bvid: "BV14B2QB3EEj", page: 1 },
            { title: "1.【小红书运营】：起号第一课 平台流量算法 (6)", bvid: "BV14B2QB3EEj", page: 2 },
            { title: "2.【小红书运营】：起号第一要素-赛道选择 对起号的影响 (6)", bvid: "BV14B2QB3EEj", page: 3 },
            { title: "3.【小红薯运营】：账号起号0-1运营全流程 (6)", bvid: "BV14B2QB3EEj", page: 4 },
            { title: "4.【小红薯运营】：高权重账号定位完整方法 (6)", bvid: "BV14B2QB3EEj", page: 5 },
            { title: "5.【小红薯运营】：高转化人设IP定位打法 (6)", bvid: "BV14B2QB3EEj", page: 6 },
            { title: "6.【小红薯运营】：人设定位必须注意的事项 (6)", bvid: "BV14B2QB3EEj", page: 7 },
            { title: "7.【小红薯运营】：实战打造爆款-人设定位 (6)", bvid: "BV14B2QB3EEj", page: 8 },
            { title: "8.【小红薯运营】：起号必备之对标账号（1） (6)", bvid: "BV14B2QB3EEj", page: 9 },
            { title: "9.【小红薯运营】：垂直细分赛道 决定账号流量的关键 (6)", bvid: "BV14B2QB3EEj", page: 10 },
            { title: "10.【小红薯运营】：热门赛道的核心玩法-选择正确的赛道 (6)", bvid: "BV14B2QB3EEj", page: 11 },
            { title: "11.【爆款笔记】：爆款笔记创作公式一：爆款选题 (6)", bvid: "BV14B2QB3EEj", page: 12 },
            { title: "12.【爆款笔记】：爆款笔记创作公式二：爆款封面 (6)", bvid: "BV14B2QB3EEj", page: 13 },
            { title: "13.【爆款笔记】：爆款笔记创作公式三：爆款标题 (6)", bvid: "BV14B2QB3EEj", page: 14 },
            { title: "14.【新媒体运营核心】：关键词搜索排名（1）mp4 (6)", bvid: "BV14B2QB3EEj", page: 15 },
            { title: "15.【新媒体运营核心】：搜索关键词划分及应用 (6)", bvid: "BV14B2QB3EEj", page: 16 },
            { title: "16.【新媒体运营核心】：笔记关键词搜索排名布局 (6)", bvid: "BV14B2QB3EEj", page: 17 },
            { title: "17.【新媒体运营核心】：笔记关键词搜索排名影响因素（1） (6)", bvid: "BV14B2QB3EEj", page: 18 },
            { title: "18.【新媒体运营核心】：笔记关键词搜索排名影响因素（2） (6)", bvid: "BV14B2QB3EEj", page: 19 },
            { title: "18.【新媒体运营核心】：笔记关键词搜索排名影响因素（2） (7)", bvid: "BV14B2QB3EEj", page: 20 },
            { title: "19.【新媒体运营核心】：笔记关键词排名机制演示 (6)", bvid: "BV14B2QB3EEj", page: 21 },
            { title: "20.【新媒体运营核心】：关键词库搭建+关键词自动分组 (6)", bvid: "BV14B2QB3EEj", page: 22 },
            { title: "21.【新媒体运营核心】：三大核心运营问题-判断账号是否限流 (6)", bvid: "BV14B2QB3EEj", page: 23 },
            { title: "22.【新媒体运营核心】：三大核心运营问题-小眼睛持续走低 (6)", bvid: "BV14B2QB3EEj", page: 24 },
            { title: "23.【新媒体运营核心】：三大核心运营问题-互动低.涨粉慢 (6)", bvid: "BV14B2QB3EEj", page: 25 },
            { title: "24.【新媒体运营核心】：产生爆款笔记的核心因子 (6)", bvid: "BV14B2QB3EEj", page: 26 },
            { title: "25.【算法拆解】：平台内容审核机制 (6)", bvid: "BV14B2QB3EEj", page: 27 },
            { title: "26.【算法拆解】：各大平台 标签下的流量分发算法 (6)", bvid: "BV14B2QB3EEj", page: 28 },
            { title: "27.【算法拆解】：账号流量及权重的提升过程 (6)", bvid: "BV14B2QB3EEj", page: 29 },
            { title: "28.【算法拆解】：用户标签-大数据下的千人千面分发算法 (6)", bvid: "BV14B2QB3EEj", page: 30 },
            { title: "29.【深度补充】：做好红薯的关键点：账号定位 (6)", bvid: "BV14B2QB3EEj", page: 31 },
            { title: "30.【深度补充】：做好红薯的关键点：内容定位 (6)", bvid: "BV14B2QB3EEj", page: 32 },
            { title: "31.【运营工具】：全平台短视频文案在线一键提取工具 (6)", bvid: "BV14B2QB3EEj", page: 33 },
            { title: "32.【运营工具】：Ai生成PPT 最好用的PPT生成工具 (6)", bvid: "BV14B2QB3EEj", page: 34 },
            { title: "33.【运营工具】：Ai生成PPT 第2款强大的PPT自动生成工具 (6)", bvid: "BV14B2QB3EEj", page: 35 },
            { title: "34.【运营工具】：营销日历 每天都可以蹭热点 (6)", bvid: "BV14B2QB3EEj", page: 36 },
            { title: "35.【运营工具】：3个经典的热榜聚合网 (6)", bvid: "BV14B2QB3EEj", page: 37 },
            { title: "001.1月2日 (已剪辑) (6)", bvid: "BV14B2QB3EEj", page: 38 },
            { title: "1、新手学习做抖音的正确的学习路径", bvid: "BV14B2QB3EEj", page: 39 },
            { title: "2、短视频运营：认识抖音平台，了解抖音平台属性及偏好", bvid: "BV14B2QB3EEj", page: 40 },
            { title: "3、短视频运营：抖音变现路径之：广告变现", bvid: "BV14B2QB3EEj", page: 41 },
            { title: "4、短视频运营：抖音全体系相关的可变现路径", bvid: "BV14B2QB3EEj", page: 42 },
            { title: "5、短视频运营：抖音小白电商变现全解析", bvid: "BV14B2QB3EEj", page: 43 },
            { title: "6、短视频运营：抖音小店的运营", bvid: "BV14B2QB3EEj", page: 44 },
            { title: "7、短视频运营：抖音本地生活", bvid: "BV14B2QB3EEj", page: 45 },
            { title: "8、短视频运营：抖音的推流机制", bvid: "BV14B2QB3EEj", page: 46 },
            { title: "9、短视频运营：抖音短视频数据详解", bvid: "BV14B2QB3EEj", page: 47 },
            { title: "10、短视频运营：抖音短视频的数据分析", bvid: "BV14B2QB3EEj", page: 48 },
            { title: "11、短视频运营：抖加的投放技巧", bvid: "BV14B2QB3EEj", page: 49 },
            { title: "12、短视频运营：抖加投放的底层逻辑", bvid: "BV14B2QB3EEj", page: 50 },
            { title: "13、短视频运营：抖音的新号养号逻辑及操作", bvid: "BV14B2QB3EEj", page: 51 },
            { title: "14、短视频运营：短视频选题的制作技巧", bvid: "BV14B2QB3EEj", page: 52 },
            { title: "16、短视频运营：短视频的拍摄技巧", bvid: "BV14B2QB3EEj", page: 53 },
            { title: "17、短视频运营：短视频剪辑的基本操作", bvid: "BV14B2QB3EEj", page: 54 },
            { title: "18、短视频运营：短视频制作团队配置", bvid: "BV14B2QB3EEj", page: 55 },
            { title: "19、直播运营：直播起号的底层逻辑", bvid: "BV14B2QB3EEj", page: 56 },
            { title: "20、直播运营：直播间数据详解", bvid: "BV14B2QB3EEj", page: 57 },
            { title: "21、直播运营：产品的分类及作用", bvid: "BV14B2QB3EEj", page: 58 },
            { title: "22、直播运营：【品】测品和拍品", bvid: "BV14B2QB3EEj", page: 59 },
            { title: "23、直播运营：直播间搭建 硬件篇", bvid: "BV14B2QB3EEj", page: 60 },
            { title: "24、直播运营：直播间搭建 软件篇", bvid: "BV14B2QB3EEj", page: 61 },
            { title: "25、直播运营：直播间高转化场景搭建技巧", bvid: "BV14B2QB3EEj", page: 62 },
            { title: "26、直播运营：直播搭建中的人员配置及工作细分", bvid: "BV14B2QB3EEj", page: 63 },
            { title: "27、直播运营-话术篇：主播开场话术训练", bvid: "BV14B2QB3EEj", page: 64 },
            { title: "28、直播运营-话术篇：优秀的讲品话术", bvid: "BV14B2QB3EEj", page: 65 },
            { title: "29、直播运营-话术篇：促单全流程话术", bvid: "BV14B2QB3EEj", page: 66 },
            { title: "30、直播运营：数据复盘专项课", bvid: "BV14B2QB3EEj", page: 67 },
          ]
        },
        {
          id: "wb-001",
          roleId: "operator",
          name: "WorkBuddy 官方教程 · 完全上手",
          brief: "30 集保姆级官方教程：从认识 WorkBuddy 到远程控制、提示词技巧与高效技能，把 AI 办公真正用起来。",
          category: "官方",
          coverImg: "img/courses/cover-wb-001.png",
          cover: "135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%",
          coverMark: "智",
          intro: "WorkBuddy 官方出品（UP：腾讯WorkBuddy官方教程）的保姆级完整教程，共 30 集。从\"AI 办公新范式\"建立认知，到安装与工作模式、远程控制 Claw、提示词技巧，再到各类办公场景与精选技能（文档、表格、录音转文字等），零基础一周可完成入门到进阶。适合全团队一起学。",
          req: ["已安装 WorkBuddy（官网可下载）", "愿意边看边动手实操"],
          goals: ["理解 WorkBuddy 与普通 AI 工具的区别", "掌握任务管理、远程控制等核心用法", "能组合多个技能完成真实办公任务"],
          tools: ["WorkBuddy 客户端", "一个可用的 AI 账号"],
          bvid: "BV1zHbh68Ed9",
          episodes: [
            { title: "1- 认识workbuddy-AI办公新范式，使用场景与传统AI工具的区别", bvid: "BV1zHbh68Ed9", page: 1 },
            { title: "2- 快速上手，安装workbuddy以及几种工作模式介绍", bvid: "BV1zHbh68Ed9", page: 2 },
            { title: "2-2快速上手，给workbuddy的第一个任务及任务管理", bvid: "BV1zHbh68Ed9", page: 3 },
            { title: "3-Claw远程控制，工作原理、模式以及接入配置", bvid: "BV1zHbh68Ed9", page: 4 },
            { title: "4-Claw远程控制，手机使用workbuddy的技巧、实战用例以及使用场景", bvid: "BV1zHbh68Ed9", page: 5 },
            { title: "5- 提示词技巧，高质量的提示词模板", bvid: "BV1zHbh68Ed9", page: 6 },
            { title: "6-提示词常见错误及编写高质量提示词的方法", bvid: "BV1zHbh68Ed9", page: 7 },
            { title: "7-文件处理-批量提取文件信息", bvid: "BV1zHbh68Ed9", page: 8 },
            { title: "8-文件处理-批量文件归档和重命名", bvid: "BV1zHbh68Ed9", page: 9 },
            { title: "9- 文件处理-数据清洗与合并", bvid: "BV1zHbh68Ed9", page: 10 },
            { title: "10-文件处理-识别发票", bvid: "BV1zHbh68Ed9", page: 11 },
            { title: "11-文件处理-跨格式转换及安全操作文件注意事项", bvid: "BV1zHbh68Ed9", page: 12 },
            { title: "12-文档生成与编辑-从素材生成结构化报告", bvid: "BV1zHbh68Ed9", page: 13 },
            { title: "13-文档生成与编辑-会议纪要整理生成", bvid: "BV1zHbh68Ed9", page: 14 },
            { title: "14-文档生成与编辑-从零生成文档（方案和邮件）", bvid: "BV1zHbh68Ed9", page: 15 },
            { title: "15- 文档生成与编辑-基于模板生成标准化文档", bvid: "BV1zHbh68Ed9", page: 16 },
            { title: "16- 文档生成与编辑-改写润色与优化技巧", bvid: "BV1zHbh68Ed9", page: 17 },
            { title: "17-数据分析与可视化-销售数据分析，html与word版本输出", bvid: "BV1zHbh68Ed9", page: 18 },
            { title: "18-数据分析与可视化-财务数据分析", bvid: "BV1zHbh68Ed9", page: 19 },
            { title: "19- 数据分析与可视化-运营数据分析", bvid: "BV1zHbh68Ed9", page: 20 },
            { title: "20-数据分析与可视化-用户满意度调查问卷分析", bvid: "BV1zHbh68Ed9", page: 21 },
            { title: "21- 数据分析与可视化的输出技巧", bvid: "BV1zHbh68Ed9", page: 22 },
            { title: "22- 自动化任务-每天定时推送AI简报", bvid: "BV1zHbh68Ed9", page: 23 },
            { title: "23-自动化任务-每周自动生成周报", bvid: "BV1zHbh68Ed9", page: 24 },
            { title: "24- 自动化任务-定时推送竞品分析", bvid: "BV1zHbh68Ed9", page: 25 },
            { title: "25-高效养虾技巧01-03", bvid: "BV1zHbh68Ed9", page: 26 },
            { title: "26-高效养虾技巧04-07", bvid: "BV1zHbh68Ed9", page: 27 },
            { title: "27-高效养虾技巧08-10", bvid: "BV1zHbh68Ed9", page: 28 },
            { title: "28- skill精选-office办公文档套件", bvid: "BV1zHbh68Ed9", page: 29 },
            { title: "29-skill精选-录音转文字", bvid: "BV1zHbh68Ed9", page: 30 },
          ]
        }
      ],
      frontend: [
        {
          id: "fro-001",
          roleId: "frontend",
          name: "Re01 · 个人网站从零到上线",
          brief: "康文昌编程系列精选：从写第一个网页到 CSS 布局，再到静态网站部署，做出并上线你的个人网站。",
          category: "入门",
          coverImg: "img/courses/cover-fro-001.png",
          cover: "135deg, #0369a1 0%, #0284c7 55%, #38bdf8 100%",
          coverMark: "网",
          intro: "以康文昌《我在B站学编程》（Re01 系列）为骨架，挑选\"个人网站\"方向最相关的视频组成一个循序渐进的实战课：先看课程总览建立编程认知，再依次学写网页、HTML 基础、CSS 布局与 Flex 响应式，最后把个人网站真正部署上线，并用一个小项目练手。全部内容均为 B 站公开课。",
          req: ["零基础可学，会使用电脑浏览器即可", "愿意跟着敲代码"],
          goals: ["能独立写出一个语义化的 HTML 页面", "会用 CSS 完成布局与响应式适配", "能把静态网站部署到公网上线"],
          tools: ["浏览器（推荐 Chrome）", "VS Code 编辑器", "一个 GitHub 账号（部署用）"],
          episodes: [
            { title: "我在B站学编程！【Re01】", note: "课程体系总览：先建立正确的编程认知与学习路径。", bvid: "BV1eF411x7g5", page: 1 },
            { title: "十分钟学会写网页", note: "前端第一课：亲手写出第一个网页。", bvid: "BV1hY411j7UM", page: 1 },
            { title: "前端基础 HTML：如何写一个网页", note: "把网页结构彻底讲明白。", bvid: "BV14S4y1K774", page: 1 },
            { title: "CSS 布局：网页界面的地基", note: "布局是网页好不好看的关键。", bvid: "BV1X3411H76q", page: 1 },
            { title: "CSS Flex 与响应式适配", note: "现代界面布局实践，手机电脑通吃。", bvid: "BV1di4y1U75N", page: 1 },
            { title: "静态网站部署：上线你的个人网站", note: "把写好的网站真正发布到公网。", bvid: "BV17S4y1P7qH", page: 1 },
            { title: "写一个 520 节日小网页", note: "综合练习：用一个小项目串起所学。", bvid: "BV1oa411f7NS", page: 1 },
          ]
        },
        {
          id: "fro-002",
          roleId: "frontend",
          name: "Re01 · 前端+后端全栈实战",
          brief: "从写小程序到 vue + uni-app + uniCloud 前后端一体开发，一套打通全栈的小项目实战精选。",
          category: "进阶",
          coverImg: "img/courses/cover-fro-002.png",
          cover: "135deg, #1e1b4b 0%, #4338ca 60%, #818cf8 100%",
          coverMark: "栈",
          intro: "康文昌\"从零开始的编程之路\"系列里偏全栈实战的一组精选：先一期视频学会写小程序，再进入 vue + uni-app + uniCloud 前后端一体开发（含留言板完整案例），进阶到\"同时写 App/小程序/网页\"的跨端方案，最后用 AI 辅助快速做一个冥想小程序，配合元岛项目编程日记了解真实开发中的踩坑与思路。全部内容均为 B 站公开课。",
          req: ["已能看懂 HTML/CSS 基础", "了解一点 JavaScript 更佳", "愿意跟着做项目"],
          goals: ["理解前端 + 后端的整体协作方式", "会用 uni-app + uniCloud 跑通一个小全栈应用", "建立\"学编程就是做项目\"的实战方法"],
          tools: ["VS Code / HBuilderX", "Node.js 环境", "一个 AI 编程助手（选学）"],
          episodes: [
            { title: "一期视频学会写小程序【实际项目】", note: "小程序入门：跑通第一个真实项目。", bvid: "BV1St4y1p72U", page: 1 },
            { title: "vue+uni-app+uniCloud 全栈留言板", note: "前端 + 云后端一体开发完整演示。", bvid: "BV1eT411L7yj", page: 1 },
            { title: "同时写 APP、小程序和网页", note: "一套代码多端发布的跨端方案。", bvid: "BV1aB4y1577p", page: 1 },
            { title: "用 AI 快速做一个冥想小程序", note: "AI 辅助开发实战：提速的正确用法。", bvid: "BV1WBQiY5EMf", page: 1 },
            { title: "元岛小程序编程日记 2", note: "真实项目：自动化函数开发思路。", bvid: "BV17U4y197mo", page: 1 },
            { title: "元岛小程序编程日记 3", note: "真实项目：常见 bug 与封装测试。", bvid: "BV1sU4y1Q7Sn", page: 1 },
          ]
        },
        {
          id: "fro-003",
          roleId: "frontend",
          name: "GitHub 入门 · 用好这个网站",
          brief: "单集实战：这个星球最好用的网站 GitHub 到底怎么用？从注册到托管代码一次讲清。",
          category: "工具",
          coverImg: "img/courses/cover-fro-003.png",
          cover: "135deg, #0f172a 0%, #334155 60%, #94a3b8 100%",
          coverMark: "库",
          intro: "做前端、做网站离不开 GitHub：它既是代码仓库，也是全球最大的开源社区。本课（UP：李大可爱玩）面向普通人讲清 GitHub 是什么、注册配置怎么做、怎么托管个人网站与代码，帮你把这个\"最好用的网站\"真正用起来。",
          req: ["会基本的电脑操作", "想学编程 / 做网站"],
          goals: ["理解 GitHub 的核心用途", "能创建仓库并托管代码/静态网站", "学会浏览和使用开源项目"],
          tools: ["GitHub 账号（免费注册）", "浏览器"],
          bvid: "BV1m4GhzEER3",
          episodes: [
            { title: "这个星球最好用的网站GitHub，普通人如何用好它？", bvid: "BV1m4GhzEER3", page: 1 },
          ]
        },
        {
          id: "wb-001",
          roleId: "frontend",
          name: "WorkBuddy 官方教程 · 完全上手",
          brief: "30 集保姆级官方教程：从认识 WorkBuddy 到远程控制、提示词技巧与高效技能，把 AI 办公真正用起来。",
          category: "官方",
          coverImg: "img/courses/cover-wb-001.png",
          cover: "135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%",
          coverMark: "智",
          intro: "WorkBuddy 官方出品（UP：腾讯WorkBuddy官方教程）的保姆级完整教程，共 30 集。从\"AI 办公新范式\"建立认知，到安装与工作模式、远程控制 Claw、提示词技巧，再到各类办公场景与精选技能（文档、表格、录音转文字等），零基础一周可完成入门到进阶。适合全团队一起学。",
          req: ["已安装 WorkBuddy（官网可下载）", "愿意边看边动手实操"],
          goals: ["理解 WorkBuddy 与普通 AI 工具的区别", "掌握任务管理、远程控制等核心用法", "能组合多个技能完成真实办公任务"],
          tools: ["WorkBuddy 客户端", "一个可用的 AI 账号"],
          bvid: "BV1zHbh68Ed9",
          episodes: [
            { title: "1- 认识workbuddy-AI办公新范式，使用场景与传统AI工具的区别", bvid: "BV1zHbh68Ed9", page: 1 },
            { title: "2- 快速上手，安装workbuddy以及几种工作模式介绍", bvid: "BV1zHbh68Ed9", page: 2 },
            { title: "2-2快速上手，给workbuddy的第一个任务及任务管理", bvid: "BV1zHbh68Ed9", page: 3 },
            { title: "3-Claw远程控制，工作原理、模式以及接入配置", bvid: "BV1zHbh68Ed9", page: 4 },
            { title: "4-Claw远程控制，手机使用workbuddy的技巧、实战用例以及使用场景", bvid: "BV1zHbh68Ed9", page: 5 },
            { title: "5- 提示词技巧，高质量的提示词模板", bvid: "BV1zHbh68Ed9", page: 6 },
            { title: "6-提示词常见错误及编写高质量提示词的方法", bvid: "BV1zHbh68Ed9", page: 7 },
            { title: "7-文件处理-批量提取文件信息", bvid: "BV1zHbh68Ed9", page: 8 },
            { title: "8-文件处理-批量文件归档和重命名", bvid: "BV1zHbh68Ed9", page: 9 },
            { title: "9- 文件处理-数据清洗与合并", bvid: "BV1zHbh68Ed9", page: 10 },
            { title: "10-文件处理-识别发票", bvid: "BV1zHbh68Ed9", page: 11 },
            { title: "11-文件处理-跨格式转换及安全操作文件注意事项", bvid: "BV1zHbh68Ed9", page: 12 },
            { title: "12-文档生成与编辑-从素材生成结构化报告", bvid: "BV1zHbh68Ed9", page: 13 },
            { title: "13-文档生成与编辑-会议纪要整理生成", bvid: "BV1zHbh68Ed9", page: 14 },
            { title: "14-文档生成与编辑-从零生成文档（方案和邮件）", bvid: "BV1zHbh68Ed9", page: 15 },
            { title: "15- 文档生成与编辑-基于模板生成标准化文档", bvid: "BV1zHbh68Ed9", page: 16 },
            { title: "16- 文档生成与编辑-改写润色与优化技巧", bvid: "BV1zHbh68Ed9", page: 17 },
            { title: "17-数据分析与可视化-销售数据分析，html与word版本输出", bvid: "BV1zHbh68Ed9", page: 18 },
            { title: "18-数据分析与可视化-财务数据分析", bvid: "BV1zHbh68Ed9", page: 19 },
            { title: "19- 数据分析与可视化-运营数据分析", bvid: "BV1zHbh68Ed9", page: 20 },
            { title: "20-数据分析与可视化-用户满意度调查问卷分析", bvid: "BV1zHbh68Ed9", page: 21 },
            { title: "21- 数据分析与可视化的输出技巧", bvid: "BV1zHbh68Ed9", page: 22 },
            { title: "22- 自动化任务-每天定时推送AI简报", bvid: "BV1zHbh68Ed9", page: 23 },
            { title: "23-自动化任务-每周自动生成周报", bvid: "BV1zHbh68Ed9", page: 24 },
            { title: "24- 自动化任务-定时推送竞品分析", bvid: "BV1zHbh68Ed9", page: 25 },
            { title: "25-高效养虾技巧01-03", bvid: "BV1zHbh68Ed9", page: 26 },
            { title: "26-高效养虾技巧04-07", bvid: "BV1zHbh68Ed9", page: 27 },
            { title: "27-高效养虾技巧08-10", bvid: "BV1zHbh68Ed9", page: 28 },
            { title: "28- skill精选-office办公文档套件", bvid: "BV1zHbh68Ed9", page: 29 },
            { title: "29-skill精选-录音转文字", bvid: "BV1zHbh68Ed9", page: 30 },
          ]
        }
      ],
    }
  };

  /* ==================== 状态管理 ==================== */
  var state = {
    roleId: null,       // 当前职位
    courseId: null,     // 当前课程
    episodeIdx: 0,      // 当前选集下标
    searchTerm: ''      // 第3层课程列表的搜索关键词
  };

  /* ==================== 学习进度（localStorage 持久化） ==================== */
  var PROGRESS_KEY = 'lc_progress_v1';
  var _progressCache = null;
  function loadProgress() {
    if (_progressCache) return _progressCache;
    try {
      var raw = localStorage.getItem(PROGRESS_KEY);
      _progressCache = raw ? JSON.parse(raw) : {};
    } catch (e) { _progressCache = {}; }
    return _progressCache;
  }
  function saveProgress() {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(_progressCache)); } catch (e) {}
  }
  function getWatchedSet(courseId) {
    var all = loadProgress();
    return all[courseId] || (all[courseId] = {});
  }
  function epKey(ep) { return ep.bvid + ':' + (ep.page || 1); }
  function isWatched(courseId, ep) {
    return !!getWatchedSet(courseId)[epKey(ep)];
  }
  function toggleWatched(courseId, ep) {
    var set = getWatchedSet(courseId);
    var k = epKey(ep);
    if (set[k]) { delete set[k]; } else { set[k] = Date.now(); }
    saveProgress();
    return !!set[k];
  }
  function countWatched(course) {
    var set = getWatchedSet(course.id);
    var n = 0;
    course.episodes.forEach(function (ep) { if (set[epKey(ep)]) n++; });
    return n;
  }
  function clearCourseProgress(courseId) {
    var all = loadProgress();
    delete all[courseId];
    saveProgress();
  }

  /* ==================== Hero 数据统计 ==================== */
  function updateStats() {
    var all = LEARNING.courses;
    var keys = Object.keys(all);
    var courseCount = 0, epCount = 0;
    keys.forEach(function (k) {
      var list = all[k];
      courseCount += list.length;
      list.forEach(function (c) { epCount += c.episodes.length; });
    });
    var setCount = $('#lc-stat-courses');
    var roleCount = $('#lc-stat-roles');
    var epEl = $('#lc-stat-eps');
    if (setCount) setCount.textContent = courseCount;
    if (roleCount) roleCount.textContent = keys.length;
    if (epEl) epEl.textContent = epCount;
  }

  /* ==================== 课程卡片搜索（按课程名筛选） ==================== */
  function bindSearch() {
    var input = $('#lc-search-input');
    var clearBtn = $('#lc-search-clear');
    if (!input) return;
    var timer = null;
    input.addEventListener('input', function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        state.searchTerm = input.value.trim().toLowerCase();
        clearBtn.classList.toggle('is-visible', !!input.value);
        renderCourseGrid();
      }, 120);
    });
    clearBtn.addEventListener('click', function () {
      input.value = '';
      state.searchTerm = '';
      clearBtn.classList.remove('is-visible');
      renderCourseGrid();
      input.focus();
    });
  }

  /* ==================== 键盘导航（播放页 ← → 切集；空格也可切） ==================== */
  function bindKeyboard() {
    document.addEventListener('keydown', function (e) {
      // 只在播放视图生效，且不在输入框内
      var playerView = $('#view-player');
      if (!playerView || !playerView.classList.contains('is-active')) return;
      var ae = document.activeElement;
      if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.isContentEditable)) return;
      var course = getCourse(state.courseId);
      if (!course) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (state.episodeIdx < course.episodes.length - 1) {
          state.episodeIdx++;
          playEpisode(course);
          e.preventDefault();
        }
      } else if (e.key === 'ArrowLeft') {
        if (state.episodeIdx > 0) {
          state.episodeIdx--;
          playEpisode(course);
          e.preventDefault();
        }
      }
    });
  }

  /* ==================== Hero 鼠标光晕跟随 ==================== */
  function bindHeroGlow() {
    var hero = document.querySelector('.lc-hero');
    var glow = $('#lc-hero-glow');
    if (!hero || !glow) return;
    var raf = null;
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        glow.style.opacity = '0.8';
      });
    });
    hero.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });
  }

  /* ==================== 视图进入动效（IntersectionObserver 兜底） ==================== */
  function bindRevealOnScroll() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-revealed');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });
    $all('.role-bubble, .course-card, .detail-block').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ==================== 工具 ==================== */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function getRole(id) {
    for (var i = 0; i < LEARNING.roles.length; i++) {
      if (LEARNING.roles[i].id === id) return LEARNING.roles[i];
    }
    return null;
  }
  function getCourse(id) {
    var keys = Object.keys(LEARNING.courses);
    for (var k = 0; k < keys.length; k++) {
      var list = LEARNING.courses[keys[k]];
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) return list[i];
      }
    }
    return null;
  }

  /* ==================== 视图切换（同页 Tab，不跳新窗口） ==================== */
  function showView(viewName) {
    $all('.lc-view').forEach(function (v) {
      v.classList.toggle('is-active', v.getAttribute('data-view') === viewName);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==================== 第2层：渲染角色气泡 ==================== */
  function renderRoleBubbles() {
    var box = $('#role-bubbles');
    if (!box) return;
    box.innerHTML = '';
    LEARNING.roles.forEach(function (role, idx) {
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'role-bubble';
      el.setAttribute('data-role', role.id);
      // 注入主题色
      el.style.setProperty('--bubble-tint', role.tint);
      el.style.setProperty('--bubble-tint-2', role.tint2);
      // 每个气泡随机漂浮参数（小幅、慢速、随机方向）
      var drift = idx % 2 === 0 ? 1 : -1;
      el.style.setProperty('--fx', (5 + Math.random() * 5) * drift + 'px');
      el.style.setProperty('--fy', (6 + Math.random() * 6) + 'px');
      el.style.setProperty('--dur', (6 + Math.random() * 4) + 's');
      el.style.setProperty('--delay', (Math.random() * -8) + 's');
      el.innerHTML =
        '<span class="bubble-badge">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true">' + role.icon + '</svg>' +
        '</span>' +
        '<span class="bubble-text">' + role.name + '</span>' +
        '<span class="bubble-arrow" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>' +
        '</span>';
      el.addEventListener('click', function () {
        state.roleId = role.id;
        // 清掉搜索状态（每次进入角色列表重置）
        state.searchTerm = '';
        var inp = $('#lc-search-input'); if (inp) inp.value = '';
        var clr = $('#lc-search-clear'); if (clr) clr.classList.remove('is-visible');
        enterCourses();
      });
      box.appendChild(el);
    });
  }

  /* ==================== 进入第3层：课程列表 ==================== */
  function enterCourses() {
    var role = getRole(state.roleId);
    if (!role) return;
    $('#courses-role-name').textContent = role.name + ' · 课程';
    $('#courses-role-desc').textContent = '为你匹配 ' + role.name.replace('我是', '') + ' 方向的实战课程。';

    renderCourseGrid();
    showView('courses');
  }

  function renderCourseGrid() {
    var grid = $('#course-grid');
    if (!grid) return;
    var list = LEARNING.courses[state.roleId] || [];
    // 搜索过滤
    var term = state.searchTerm;
    if (term) {
      list = list.filter(function (c) {
        return (c.name || '').toLowerCase().indexOf(term) >= 0
          || (c.brief || '').toLowerCase().indexOf(term) >= 0;
      });
    }
    if (list.length === 0) {
      grid.innerHTML =
        '<div class="lc-empty">' +
          '<div class="lc-empty-icon">⌕</div>' +
          (term ? '<p>没找到匹配 "<strong>' + escapeHtml(term) + '</strong>" 的课程</p>'
                : '<p>该职位下暂无课程，敬请期待。</p>') +
        '</div>';
      return;
    }
    grid.innerHTML = '';
    list.forEach(function (course, i) {
      // 取主色调（与气泡同色）：根据 roleId 取对应 tint
      var role = getRole(course.roleId);
      var tint = (role && role.tint) || 'var(--mirage-500)';
      var watched = countWatched(course);
      var pct = course.episodes.length ? Math.round(watched / course.episodes.length * 100) : 0;
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'course-card';
      card.style.setProperty('--card-tint', tint);
      card.style.setProperty('--reveal-delay', (i * 60) + 'ms');
      var coverStyle = course.coverImg
        ? 'background-image:url(' + course.coverImg + ');background-color:' + course.cover
        : 'background:' + course.cover;
      // 进度环（已学>0 才显示）
      var progressHtml = '';
      if (watched > 0) {
        var r = 18, c = 2 * Math.PI * r;
        var off = c * (1 - pct / 100);
        progressHtml =
          '<span class="cover-progress" title="已学 ' + watched + ' / ' + course.episodes.length + ' 集">' +
            '<svg viewBox="0 0 42 42">' +
              '<circle class="ring-bg" cx="21" cy="21" r="' + r + '"/>' +
              '<circle class="ring-fg" cx="21" cy="21" r="' + r + '" ' +
                'stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"/>' +
              '<text class="ring-text" x="21" y="21" text-anchor="middle" dominant-baseline="central">' + pct + '%</text>' +
            '</svg>' +
          '</span>';
      }
      card.innerHTML =
        '<span class="course-cover' + (course.coverImg ? ' has-img' : '') + '" style="' + coverStyle + ';">' +
          (course.coverImg
            ? '<img class="cover-img-zoom" src="' + buildCdnUrl(course.coverImg) + '" data-fallback="' + course.coverImg + '" loading="lazy" decoding="async" alt="" onerror="if(this.dataset.fb2){this.src=this.dataset.fb2;this.onerror=function(){this.onerror=null;this.src=this.dataset.fallback;};}else{this.onerror=null;this.src=this.dataset.fallback;}" data-fb2="' + buildCdnUrl(course.coverImg, 2) + '" />'
            : (course.coverMark ? '<span class="cover-mark">' + course.coverMark + '</span>' : '')) +
          '<span class="cover-tag">' + (course.category || '课程') + '</span>' +
          progressHtml +
        '</span>' +
        '<span class="course-body">' +
          '<span class="course-name">' + course.name + '</span>' +
          '<span class="course-brief">' + course.brief + '</span>' +
          '<span class="course-meta">' +
            '<span class="meta-ep">' +
              '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg>' +
              course.episodes.length + ' 集' +
            '</span>' +
            (watched > 0
              ? '<span class="meta-ep" style="color:var(--graphite);">已学 ' + watched + '</span>'
              : '') +
            '<span class="meta-go">' +
              '查看课程' +
              '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>' +
            '</span>' +
          '</span>' +
        '</span>';
      card.addEventListener('click', function () {
        state.courseId = course.id;
        state.episodeIdx = 0;
        enterDetail();
      });
      grid.appendChild(card);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }

  /* ==================== CDN URL 构造（国内加速关键） ====================
     封面图走 jsDelivr 镜像，比 bjhx.github.io 直连在国内通常快 5-10 倍。
     提供多级 fallback：jsDelivr → fastly.jsdelivr.net → bjhx.github.io
     已通过 Image 探针的 onload/onerror 实现逐级降级，最终回退到 cover 颜色。
     ============================================================ */
  var _cdnOwner = 'bjhx/bjhx.github.io@main';
  function buildCdnUrl(relPath, tier) {
    if (!relPath) return '';
    if (/^https?:/.test(relPath)) return relPath;
    var clean = String(relPath).replace(/^\/+/, '');
    if (tier === 2) return 'https://fastly.jsdelivr.net/gh/' + _cdnOwner + '/' + clean;
    if (tier === 3) return 'https://bjhx.github.io/' + clean;
    return 'https://cdn.jsdelivr.net/gh/' + _cdnOwner + '/' + clean;
  }

  /* 用 Image 探针预加载封面，依次尝试 jsDelivr → fastly.jsdelivr.net → bjhx.github.io。
     课程卡用 <img> 标签天然支持 onerror 多级降级；详情页因层叠问题改用 background-image + 探针。 */
  function loadCoverWithFallback(el, relPath) {
    var tier = 1;
    function tryNext() {
      var url = buildCdnUrl(relPath, tier);
      if (!url) return;
      var probe = new Image();
      probe.onload = function () {
        el.style.backgroundImage = 'url(' + url + ')';
        el.style.backgroundColor = '';
        el.style.backgroundBlendMode = '';
      };
      probe.onerror = function () {
        tier++;
        if (tier <= 3) tryNext();
        // 3 级都失败：保持渐变色背景（color 兜底）
      };
      probe.src = url;
    }
    tryNext();
  }

  /* ==================== 进入第4层：课程详情 ==================== */
  function enterDetail() {
    var course = getCourse(state.courseId);
    if (!course) return;
    $('#detail-title').textContent = course.name;
    var coverEl = $('#detail-cover');
    // 底色兜底（color 渐变），加载成功后用真实封面图替换
    coverEl.style.background = course.cover || '';
    if (course.coverImg) {
      loadCoverWithFallback(coverEl, course.coverImg);
    }
    // 分类 tag + 课程名 + brief 全部在 cover 内
    var tagEl = $('#detail-cover-tag');
    if (tagEl) tagEl.textContent = course.category || '课程';
    $('#detail-name').textContent = course.name;
    $('#detail-brief').textContent = course.brief;
    // stats 行
    var watched = countWatched(course);
    $('#detail-stat-eps').textContent = course.episodes.length;
    $('#detail-stat-watched').textContent = watched;
    $('#detail-stat-cat').textContent = course.category || '—';
    $('#detail-intro').textContent = course.intro;
    fillList('#detail-req', course.req);
    fillList('#detail-goals', course.goals);
    fillList('#detail-tools', course.tools);
    // 配套资料（有 material 才显示）
    var matBox = $('#detail-material');
    if (course.material) {
      $('#detail-material-desc').textContent = '课程附带以下配套资料，点击下载/查看：' + course.material.name;
      $('#detail-material-link').setAttribute('href', course.material.url);
      matBox.hidden = false;
    } else {
      matBox.hidden = true;
    }
    var sc = $('#detail-side-count');
    if (sc) sc.textContent = course.episodes.length + ' 集';
    renderEpisodeList('#episode-list', course, false);
    syncEpisodeHighlight(true);
    showView('detail');
  }

  function fillList(sel, arr) {
    var box = $(sel);
    if (!box) return;
    box.innerHTML = '';
    arr.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      box.appendChild(li);
    });
  }

  /* ==================== 选集列表（详情页 / 播放页共用） ==================== */
  function renderEpisodeList(sel, course, isPlayer) {
    var box = $(sel);
    if (!box) return;
    box.innerHTML = '';
    var watched = getWatchedSet(course.id);
    course.episodes.forEach(function (ep, idx) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'episode-item' + (idx === state.episodeIdx ? ' is-active' : '') + (watched[epKey(ep)] ? ' is-watched' : '');
      item.innerHTML =
        '<span class="ep-num"><span>' + pad(idx + 1) + '</span></span>' +
        '<span class="ep-body">' +
          '<span class="ep-title">' + ep.title + '</span>' +
          (ep.note ? '<span class="ep-note">' + ep.note + '</span>' : '') +
        '</span>' +
        '<span class="ep-watched-btn" title="标记已学/未学" aria-label="标记已学">' +
          '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
        '</span>';
      // 单击条目本身：进入播放
      item.addEventListener('click', function (e) {
        // 防止"标记已学"按钮的点击冒泡到这里
        if (e.target.closest && e.target.closest('.ep-watched-btn')) return;
        state.episodeIdx = idx;
        if (isPlayer) {
          playEpisode(course);
        } else {
          enterPlayer(course, idx);
        }
      });
      // "标记已学"按钮：切换
      var wBtn = item.querySelector('.ep-watched-btn');
      if (wBtn) {
        wBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          toggleWatched(course.id, ep);
          // 局部刷新：更新本项 class + 顶部已学统计
          var nowWatched = !!getWatchedSet(course.id)[epKey(ep)];
          item.classList.toggle('is-watched', nowWatched);
          // 详情页：刷新 stats；播放页：刷新播放页顶部 stats
          var sw = $('#detail-stat-watched');
          if (sw) sw.textContent = countWatched(course);
        });
      }
      box.appendChild(item);
    });
  }

  /* 同步所有选集列表的高亮：选中哪个亮哪个（按每个列表内的下标比对，不再用全局下标） */
  function syncEpisodeHighlight(scrollToActive) {
    $all('.episode-list').forEach(function (list) {
      var items = $all('.episode-item', list);
      items.forEach(function (el, i) {
        el.classList.toggle('is-active', i === state.episodeIdx);
      });
      if (scrollToActive && items[state.episodeIdx]) {
        // 只把当前集滚动到列表可视区，不改变页面滚动；隐藏视图内的列表跳过
        var target = items[state.episodeIdx];
        if (target.offsetParent !== null) {
          target.scrollIntoView({ block: 'nearest' });
        }
      }
    });
  }

  /* ==================== 进入第5层：视频播放 ==================== */
  function enterPlayer(course, idx) {
    state.episodeIdx = idx || 0;
    $('#player-course-name').textContent = course.name;
    $('#player-course-brief').textContent = course.brief;
    var sc = $('#player-side-count');
    if (sc) sc.textContent = course.episodes.length + ' 集';
    renderEpisodeList('#player-episode-list', course, true);
    playEpisode(course);
    showView('player');
    // 视图可见后再把当前集滚入列表可视区（限高滚动容器内定位）
    setTimeout(function () { syncEpisodeHighlight(true); }, 50);
  }

  /* 切换/载入当前选集视频 */
  function playEpisode(course) {
    var ep = course.episodes[state.episodeIdx];
    if (!ep) return;
    $('#player-ep-title').textContent = ep.title;
    $('#player-ep-name').textContent = ep.title;
    // 大课部分分集无简介，给通用引导避免空白
    $('#player-ep-desc').textContent = ep.note || '本节来自 B 站公开课合集，建议按顺序学习；可在右侧选集直接切换。';
    // B 站播放器 iframe：先显示骨架，加载完成后切换 class
    var wrap = document.querySelector('.player-frame-wrap');
    var frame = $('#player-frame');
    if (wrap) wrap.classList.remove('is-loaded');
    frame.src = 'about:blank';
    setTimeout(function () {
      frame.src = 'https://player.bilibili.com/player.html?bvid=' + ep.bvid + '&page=' + (ep.page || 1) + '&high_quality=1';
      // 给 iframe 2.5s 假装"已加载"，B 站跨域无法监听 load，统一时延切换骨架
      setTimeout(function () { if (wrap) wrap.classList.add('is-loaded'); }, 2500);
    }, 60);
    // 同步所有选集列表高亮（选中哪个亮哪个）
    syncEpisodeHighlight(true);
  }

  /* ==================== 面包屑返回逻辑 ==================== */
  function bindBackButtons() {
    $all('.lc-back').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var to = btn.getAttribute('data-back');
        if (to === 'role') {
          showView('role');
        } else if (to === 'courses') {
          enterCourses();
        } else if (to === 'detail') {
          enterDetail();
        }
      });
    });
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ==================== 初始化 ==================== */
  function init() {
    renderRoleBubbles();
    bindBackButtons();
    bindSearch();
    bindKeyboard();
    bindHeroGlow();
    bindRevealOnScroll();
    updateStats();
    showView('role');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
