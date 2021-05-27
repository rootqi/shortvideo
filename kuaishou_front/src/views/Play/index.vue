<template>
  <el-container>
    <el-aside width="500px">
      <div>
        <video
          id="playVideos"
          width="400"
          height="650"
          controls="controls"
          autoplay
        >
          <source :src="url" />
        </video>
      </div>
    </el-aside>
    <el-main>
      <div>
        <img
          :src="avatarUrl"
          height="50"
          width="50"
          style="border-radius: 50%"
          alt
        />
        <span style="vertical-align: 100%; margin-left: 20px; margin-top: 20px"
          >{{ nickname
          }}<span style="margin-left: 100px; font-size: 15px"
            >收藏
            <el-switch v-model="ifLike" @change="changeLike"></el-switch></span
        ></span>
        <div style="margin-top: 15px">
          <span>{{ desc }}</span>
        </div>
      </div>
      <div style="margin-top: 20px"></div>
      <div style="margin-top: 20px; width: 400px">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="说点什么..."
          v-model="textarea"
        >
        </el-input>
        <div style="margin-top: 20px">
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" circle @click="textarea = ''">清空</el-button>
        </div>
      </div>
      <br />
      <div style="height: 350px; width: 500px; overflow: auto">
        <el-col :span="20" v-for="(item, index) in comments" :key="index">
          <el-card shadow="hover">
            <div>
              <img
                :src="item.avatar"
                height="30"
                width="30"
                style="border-radius: 50%"
                alt
              />
              <span
                style="vertical-align: 100%; margin-left: 10px; font-size: 10px"
                >{{ item.userID }}</span
              >
              <div style="margin-top: 15px">
                <span>{{ item.comment }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: this.$route.query.url,
      title: this.$route.query.title,
      desc: this.$route.query.desc,
      avatarUrl: "",
      nickname: "",
      textarea: "",
      ifLike: this.$route.query.ifLike,
      userID: this.$route.query.userID,
      comments: [
        {
          avatar: "Avatar/first_avatar.png",
          userID: "132434",
          comment: "1231231",
        },
        {
          avatar: "Avatar/first_avatar.png",
          userID: "132434",
          comment: "1231231",
        },
        {
          avatar: "Avatar/first_avatar.png",
          userID: "132434",
          comment: "1231231",
        },
        {
          avatar: "Avatar/first_avatar.png",
          userID: "132434",
          comment: "1231231",
        },
      ],
    };
  },

  methods: {
    //收藏操作
    changeLike() {
      alert(this.userID);
      if(window.localStorage.getItem("access_token") == undefined){
        this.$router.push("/login");
        this.$message.error("请登录，无账号的话请注册哦, 亲");
        return false;
      }
      if (this.ifLike == false) {
        this.ifLike == true;
        alert(this.ifLike);
      } else {
        this.ifLike == false;
        alert(this.ifLike);
      }
    },
  },

  mounted() {
    //搜索用户数据
    axios
      .post("http://127.0.0.1:3000/api/user/getUser/", {userID: this.$route.query.userID})
      .then((res) => {
        console.log(res);
        this.avatarUrl = res.data.data.avatarUrl;
        this.nickname = res.data.data.nickname;
      });
  },
};
</script>

<style scoped>
.attention_space {
  padding-left: 200px;
  vertical-align: 100%;
}

.largefont {
  size: 20px;
}
</style>