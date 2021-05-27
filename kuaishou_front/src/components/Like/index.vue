<template>
  <el-row>
    <el-col :span="8" v-for="(item, index) in videoList" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <video
          width="350"
          height="250"
          @click="playvideo(item.url, item.title, item.desc)"
          type="video/mp4"
          ref="video"
          :src="item.url"
        ></video>
        <div style="padding: 14px" id="describe">
          <span>{{ item.title }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ item.desc }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      videoList: [
        {
          id:"0",
          name: "video1",
          url: "video/video1.mp4",
          title: "发钱了！发钱了！",
          desc: "什么叫做有钱任性？！",
        },
        {
          id:"1",
          name: "video2",
          url: "video/video2.mp4",
          title: "电影来啦！",
          desc: "喜欢的电影终于要上线啦！!",
        },
        {
          id:"2",
          name: "video3",
          url: "https://www.w3school.com.cn/i/movie.ogg",
          title: "可爱的熊",
          desc: "俄罗斯的家伙们来了！！"
        },
      ],
    };
  },

  methods: {
    playvideo(url, title, desc) {
      this.$router.push({
        path: "/play",
        query: { url: url,
                 title: title,
                 desc: desc,
                 ifLike: false,
        },
      });
    },
  },
};
</script>

<style scoped>
#describe {
  text-align: left;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>