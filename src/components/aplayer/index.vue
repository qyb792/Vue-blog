<template>
  <div>
    <aplayer v-show="isHide" :audio="songList" :lrc-type="1" fixed />
  </div>
</template>
<script>
import { reqPlayList, reqSong, reqSongUrl, reqlyric } from '@/api/music';
export default {
  data() {
    return {
      songSheetId: '3778678',
      songList: [],
      isHide: false,
      audio: [
        {
          name: '武当',
          artist: '等什么君',
          url: 'https://cdn.jsdelivr.net/gh/zytqyb/hexoBLogCDN@master/blog/mp3/%E6%AD%A6%E5%BD%93.mp3',
          cover: 'http://p4.music.126.net/3gqKmqwUY4-nh6onNq5l3w==/109951165277189701.jpg', // prettier-ignore
          lrc: '"[00:00.000] 作词 : 於世同君\n[00:01.000] 作曲 : 罗洋/田昊\n[00:03.432]企划：李喆渊/黄鲲/嘉慧\n[00:04.432]编曲：卡其漠罗洋\n[00:05.432]制作人：爱写歌的小田\n[00:06.432]和声：曾婕\n[00:07.432]念白：司南×情桑\n[00:08.432]混音：幺唠\n[00:09.432]录音棚：音浪工作室\n[00:10.432]录音师：姜鹏\n[00:11.432]文案：闫倩莹\n[00:12.432]网易音乐人×飓风工作室\n[00:13.432]\n[00:15.000]林间，谁家院\n[00:17.167]雪花落在我窗前\n[00:20.000]蒲团，放台前\n[00:22.854]悟道在隐仙岩\n[00:25.196]每天，勤修炼\n[00:28.000]总是想着金殿的后面\n[00:32.741]藏着老神仙\n[00:35.433]\n[00:35.598]师父说过草木皆有道\n[00:38.831]经书武功实在太玄妙\n[00:41.828]领悟道法要趁年少\n[00:45.382]\n[00:45.503]我在金顶一览众山小\n[00:49.000]脚下白云飘\n[00:51.000]求道多年从来不寂寥\n[00:54.000]我有琴和箫\n[00:55.892]\n[00:56.111]只求天地任我自逍遥\n[00:59.852]长江水浪滔滔\n[01:01.747]天天把落叶扫\n[01:05.000]明月当空照\n[01:07.379]\n[01:18.000]林间，谁家院\n[01:20.966]雪花落在我窗前\n[01:23.438]蒲团，放台前\n[01:26.000]悟道在隐仙岩\n[01:28.902]每天，勤修炼\n[01:31.032]总是想着金殿的后面\n[01:36.000]藏着老神仙\n[01:38.346]\n[01:39.012]师父说过草木皆有道\n[01:41.985]经书武功实在太玄妙\n[01:44.993]领悟道法要趁年少\n[01:48.444]\n[01:49.000]我在金顶一览众山小\n[01:52.035]脚下白云飘\n[01:54.151]求道多年从来不寂寥\n[01:57.638]我有琴和箫\n[01:59.224]\n[01:59.453]只求天地任我自逍遥\n[02:03.000]长江水浪滔滔\n[02:05.000]天天把落叶扫\n[02:08.009]明月当空照\n[02:10.713]念白：\n[02:11.000]“师兄！刚刚这招，你觉得怎么样？”\n[02:14.280]“这招剑法的要领在于，身与剑合，剑与神合，你呀，还要多多练习...”\n[02:20.536]\n[02:20.537]我在金顶一览众山小\n[02:24.000]脚下白云飘\n[02:26.000]求道多年从来不寂寥\n[02:29.000]我有琴和箫\n[02:30.813]\n[02:30.971]只求天地任我自逍遥\n[02:34.712]长江水浪滔滔\n[02:36.712]天天把落叶扫\n[02:40.000]明月当空照\n[02:42.432]\n[99:00.01]本歌曲来自 〖网易音乐人〗x〖网易飓风工作室〗\n[99:00.02]10亿现金激励，千亿流量扶持 !\n[99:00.03]网易音乐人商务合作：st399@vip.163.com\n[99:00.04]飓风计划商务合作：jf399@vip.163.com\n"',
        },

        {
          name: '有幸来过',
          artist: '要不要买菜',
          url: 'https://cdn.jsdelivr.net/gh/zytqyb/hexoBLogCDN@master/blog/mp3/%E6%9C%89%E5%B9%B8%E6%9D%A5%E8%BF%87.mp3',
          cover: 'http://p3.music.126.net/Cf7rCSKENcWSTCh3GDQfyg==/109951165099307945.jpg', // prettier-ignore
          lrc: '[00:00.000] 作词 : 风恒成\n[00:01.000] 作曲 : 楚明玉\n[00:17.760]珍藏着你留的回忆存折\n[00:24.791]偶尔会翻开看一看 那些快乐\n[00:31.874]是我的错 让痛在时间里失了火\n[00:38.729]浇不灭 窒息而又深刻\n[00:43.274]\n[00:46.232]很久都没人到过心的角落\n[00:53.173]添砖加瓦的永远都是些难过\n[01:00.357]我很抱歉 我只是个失败的歌者\n[01:07.368]撕心地 唱完那些不舍\n[01:13.742]\n[01:13.976]我就像个久病难医的患者\n[01:18.130]一针一线反复伤口缝合\n[01:21.698]感谢你恩赐于我的角色\n[01:25.198]只剩眼泪还温热\n[01:28.544]\n[01:28.745]谢谢你的世界我有幸来过\n[01:32.446]自嘲着我是个合格过客\n[01:36.022]感谢曾让我\n[01:37.866]满心欢喜又失落\n[01:41.584]\n[01:43.570]很久都没人到过心的角落\n[01:50.792]添砖加瓦的永远都是些难过\n[01:57.776]我很抱歉 我只是个失败的歌者\n[02:04.659]撕心地 唱完那些不舍\n[02:10.692]\n[02:11.266]我就像个久病难医的患者\n[02:15.681]一针一线反复伤口缝合\n[02:19.175]感谢你恩赐于我的角色\n[02:22.606]只剩眼泪还温热\n[02:25.889]\n[02:26.028]谢谢你的世界我有幸来过\n[02:29.807]自嘲着我是个合格过客\n[02:33.387]感谢曾让我\n[02:35.244]满心欢喜又失落\n[02:40.031]\n[02:50.778]我就像个久病难医的患者\n[02:54.966]一针一线反复伤口缝合\n[02:58.465]感谢你恩赐于我的角色\n[03:01.963]只剩眼泪还温热\n[03:05.289]\n[03:05.447]谢谢你的世界我有幸来过\n[03:09.121]自嘲着我是个合格过客\n[03:12.609]感谢曾让我\n[03:14.617]满心欢喜又失落\n[03:19.158]\n[03:20.013]感谢曾让我\n[03:21.729]满心欢喜又失落\n[03:26.190]\n[03:30.190]编曲：马笑天\n[03:35.190]混音：张可人\n[03:40.190]企划：李喆渊\n[03:45.190]统筹：何泽镔/余祖意\n[03:50.190]O P：乐町文化\n',
        },
        {
          name: '时光，一如既往',
          artist: '房东的猫',
          url: 'https://cdn.jsdelivr.net/gh/zytqyb/hexoBLogCDN@master/blog/mp3/%E6%97%B6%E5%85%89%EF%BC%8C%E4%B8%80%E5%A6%82%E6%97%A2%E5%BE%80.mp3',
          cover: 'http://p3.music.126.net/YcO7jIQtyiHQQkCrz6v6-A==/109951165750910747.jpg', // prettier-ignore
          lrc: '[00:00.000] 作词 : 镜千\n[00:01.000] 作曲 : 少年佩\n[00:02.000] 制作人 : 宋涛\n[00:07.76]\n[00:09.01] \n[00:13.49]匆匆走过 拐角的街道\n[00:20.03]何时丢了热闹\n[00:26.54]明明习惯 地铁的熙攘\n[00:33.11]却晚点停靠\n[00:37.94] \n[00:39.57]下个春天 可能会迟到\n[00:45.94]但绝不会出逃\n[00:52.29]回家的路 或许有点绕\n[00:58.99]但一定能走到\n[01:04.10] \n[01:05.52]我知道 最难熬的告别\n[01:08.90]是彼此不能 拥抱\n[01:11.97]最勇敢的逆行\n[01:14.01]往往要背对 人潮\n[01:18.06] \n[01:18.71]长夜后 最如常的破晓\n[01:22.08]一定会赴约 刚好\n[01:25.11]最向往的时光\n[01:28.26]是一如既往 就好\n[01:34.44] \n[01:51.37]默默望着 城市的灯光\n[01:58.12]随着心事打烊\n[02:04.47]静静等着 窗外的树梢\n[02:11.11]长出了喧嚣\n[02:16.78] \n[02:17.40]我知道 最难熬的告别\n[02:20.77]是彼此不能 拥抱\n[02:23.70]最勇敢的逆行\n[02:25.99]往往要背对 人潮\n[02:30.02] \n[02:30.69]长夜后 最如常的破晓\n[02:33.96]一定会赴约 刚好\n[02:36.85]最向往的时光\n[02:40.18]是一如既往 就好\n[02:45.55] \n[02:47.03]我知道 最难熬的告别\n[02:50.37]是彼此不能 拥抱\n[02:53.36]最勇敢的逆行\n[02:55.56]往往要背对 人潮\n[02:58.92] \n[03:00.25]长夜后 最如常的破晓\n[03:03.28]一定会赴约 刚好\n[03:06.62]最向往的时光\n[03:09.92]是一如既往 就好\n[03:15.78] \n[03:16.42]最简单的问好\n[03:20.31]是别来无恙 就好\n[03:26.64]\n[03:28.20]编曲：宋涛\n[03:29.56]和声：少年佩\n[03:30.70]监制：李纤橙\n[03:31.85]制作统筹：OneCandy/姜铄波\n[03:32.79]吉他：薛峰\n[03:33.72]贝斯：韩阳\n[03:34.55]鼓：武勇恒（贝贝）\n[03:35.27]乐器录音师：王辰\n[03:35.93]录音助理：孙炜祁\n[03:36.59]录音室：ShiCong Fatnunu Studio\n[03:37.18]弦乐：国际首席爱乐乐团\n[03:37.88]弦乐监制：李朋\n[03:38.55]人声录音师：韦代立\n[03:39.19]人声录音室：杭州AS_5.1_Studio\n[03:39.82]混音&母带工程师：王辰\n[03:40.77]企划文案：镜千\n[03:41.77]出品公司：武汉东湖音乐文化发展有限公司\n',
        },
        {
          name: '青梅',
          artist: ' 房东的猫',
          url: 'https://cdn.jsdelivr.net/gh/zytqyb/hexoBLogCDN@master/blog/mp3/%E9%9D%92%E6%A2%85.mp3',
          cover: 'http://p3.music.126.net/Rl--9SBoP1JNXLBAFX1ciA==/109951165123439266.jpg', // prettier-ignore
          lrc: '[00:00.000] 作词 : 崔彦\n[00:01.000] 作曲 : 少年佩\n[00:02.24]制作人：大蔚\n[00:03.32]编曲/吉他：大蔚\n[00:04.27]中提琴：金蝶衣\n[00:05.24]贝斯：智贤\n[00:06.18]录音：Toki @LEZIENT. Studio\n[00:07.19]鼓：大墩儿\n[00:08.16]鼓录音：家园@OneMusicDream Studio\n[00:09.03]配唱制作人：大蔚\n[00:10.00]人声录音：严若晨@SoundProStudio\n[00:10.94]混音/母带：Toki @LEZIENT. Studio\n[00:11.79]监制：李纤橙\n[00:12.33]\n[00:27.00]你 总为我着急\n[00:30.41]是我装作不懂 问各种问题\n[00:34.76]你 却没注意\n[00:38.26]我故意没带伞 和你走一起\n[00:42.20]\n[00:42.60]又 是那年一样 的雨季\n[00:49.70]就像窗外 青梅一样清晰\n[00:57.24]这么多年悄悄过去\n[01:00.96]依然经常听说你的消息\n[01:05.09]此时的你 又在为谁着急\n[01:10.46]\n[01:12.89]我把回忆酿成了酒\n[01:16.38]把你写进诗的最后\n[01:21.28]等待 青梅熟透\n[01:24.63]预谋偶然的问候\n[01:27.64]\n[01:28.04]好久没见几个春秋\n[01:31.99]好久没见淡淡忧愁\n[01:36.86]想念 青涩年头\n[01:40.11]想起了懵懂时候\n[01:43.48]是最好的我\n[01:45.47]\n[01:59.96]看 你的背影\n[02:03.34]不知离开之后 你会去哪里\n[02:07.70]我 四处浪迹\n[02:11.21]在城市的角落 试图找回你\n[02:15.12]\n[02:15.52]但 未来谁能够预期\n[02:22.31]生活售卖 兜兜转转游戏\n[02:30.17]在不同的城市隔绝勇气\n[02:34.70]却把酸甜比做想你\n[02:37.65]直到路灯暗去看见星星\n[02:43.31]\n[02:45.50]我把回忆酿成了酒\n[02:49.35]把你写进诗的最后\n[02:54.03]等待 青梅熟透\n[02:57.58]预谋偶然的问候\n[03:00.27]\n[03:01.00]好久没见几个春秋\n[03:04.75]好久没见淡淡忧愁\n[03:09.56]想念 青涩年头\n[03:13.13]想起了懵懂时候\n[03:16.38]是最好的我\n[03:19.16]\n[03:32.00]好久没见几个春秋\n[03:35.91]好久没见淡淡忧愁\n[03:40.56]想念 青涩年头\n[03:44.09]想起了懵懂时候\n[03:50.17]是最好的我\n[03:54.09]\n',
        },
        {
          name: '至此',
          artist: ' 房东的猫',
          url: 'https://cdn.jsdelivr.net/gh/zytqyb/hexoBLogCDN@master/blog/mp3/%E8%87%B3%E6%AD%A4.mp3',
          cover: 'http://p3.music.126.net/WS5-o20Rw8NSrFLHdfHs5w==/109951163641446987.jpg', // prettier-ignore
          lrc: '[00:00.000] 作词 : 少年佩/镜千\n[00:00.004] 作曲 : 少年佩\n[00:00.09]制作人：黎偌天\n[00:00.40]编曲：黎偌天\n[00:00.74]监制：李纤橙\n[00:01.11]弦乐编写：胡静成\n[00:01.51]弦乐：国际首席爱乐乐团\n[00:01.93]混音：王晨雨\n[00:02.90]\n[00:03.62]你说青春 应该是什么模样\n[00:10.63]是被涂鸦过 四 季 的小巷\n[00:17.90]是屋顶啤酒 罐里的幻想\n[00:26.12]还是转角路 灯下 背影的拉长\n[00:34.41]没结局的回忆\n[00:37.57]在失去后圆满\n[00:41.36]是那些说来也无憾的遗憾\n[00:48.72]给了我 抵抗世 界 的臂弯\n[00:55.66]我们都要向过去告别了\n[01:03.20]答应我 你一定要快乐\n[01:10.26]未来的某时某刻\n[01:17.40]我们一定会在某地相遇的\n[01:26.37]\n[01:41.12]你说青春 应该是什么模样\n[01:48.59]是被锁在抽屉里的远方\n[01:55.80]是躲单车后 座上的霞光\n[02:03.22]还是擦肩天桥上 突然的回望\n[02:13.02]其实人生至此\n[02:16.06]岁月磨平心事\n[02:19.41]有些回忆会被珍藏着\n[02:26.93]有些曲折我会忘了\n[02:33.42]我们都要向过去告别了\n[02:41.11]答应我 你一定要快乐\n[02:48.66]未来的某时某刻\n[02:55.79]我们一定会在某地相遇的\n[03:03.24]我们都要向曾经挥手了\n[03:10.47]答应我 别再回头看了\n[03:17.73]青春这只手表 时针分针 慢慢跑\n[03:24.70]跑到终点 那时美好的我们 再会了\n[03:54.22]\n',
        },
      ],
    };
  },
  methods: {
    async getSongList() {
      const playlist = await reqPlayList(this.songSheetId);
      let s = '';
      for (let i = 0; i < 100; i++) {
        s += playlist.privileges[i].id;
        if (i !== 99) s += ',';
      }
      const { songs } = await reqSong(s);
      let ss = '';
      for (let i = 0; i < 100; i++) {
        ss += songs[i].id;
        if (i !== 99) ss += ',';
      }
      const result = await reqSong(ss);
      let sss = '';
      // 歌词列表
      let reqlyricList = [];

      for (let i = 0; i < 100; i++) {
        const lyrics = await reqlyric(result.songs[i].id);
        reqlyricList.push(lyrics);
        sss += result.songs[i].id;
        if (i !== 99) sss += ',';
      }
      let result2 = await reqSongUrl(sss);
      const songList = result2.data.map((item, i) => {
        const urlItem = result2.data.filter((item) => {
          return item.id === result.songs[i].id;
        });
        return {
          name: result.songs[i].al.name,
          artist: result.songs[i].ar[0].name,
          url: urlItem[0].url,
          cover: result.songs[i].al.picUrl,
          lrc: reqlyricList[i].lrc.lyric,
        };
      });
      this.songList = songList;
      this.isHide = true;
    },
  },
  created() {
    this.getSongList();
  },

};
</script>

<style scoped></style>
