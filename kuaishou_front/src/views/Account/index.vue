<template>
  <div>
    <el-upload
      class="avatar-uploader Center"
      ref="upload"
      :limit="1"
      :auto-upload="false"
      :action="uploadUrl"
      :show-file-list="true"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div style="width: 450px" class="marleft">
      <br />
      <el-form ref="uploadForm" :model="form" label-width="80px" >
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model.trim="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="form.password"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
         
        >
          <el-input v-model.trim="form.email"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="desc">
          <el-input type="textarea" v-model.trim="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        callback(new Error("密码长度不能小于8位"));
      } else if (value.length > 15) callback(new Error("密码长度不能大于15位"));
    };
    var validateDesc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("写点简介吧,亲.."));
      } else if (value.length > 50) {
        callback(new Error("简介不能太长哦,亲.."));
      }
    };
    return {
      uploadUrl: "http://127.0.0.1:3000/api/upload/uploadAvatar/",
      avatarUrl: "",
      id: "",
      form: {
        nickname: "",
        password: "",
        desc: "",
        email: "",
      },
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        desc: [{ validator: validateDesc, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.avatarUrl = res.avatarUrl;
      axios
        .post("http://127.0.0.1:3000/api/user/updateUser", {
          userID: window.localStorage.getItem("access_token"),
          avatarUrl: this.avatarUrl,
          password: this.form.password,
          nickname: this.form.nickname,
          email: this.form.email,
          desc: this.form.desc,
          id: this.id,
        })
        .then((res) => {
          console.log(res);
        });
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    onSubmit() {
      console.log("submit!");
      this.$refs['uploadForm'].validate((valid) => {
        console.log(1111111);
        if (valid) {
          this.$refs['upload'].submit();
        }
      });
    },
  },

  mounted() {
    axios
      .post("http://127.0.0.1:3000/api/user/getUser", {
        userID: window.localStorage.getItem("access_token"),
      })
      .then((res) => {
        console.log(res);
        this.avatarUrl = res.data.data.avatarUrl;
        this.form.nickname = res.data.data.nickname;
        this.form.password = res.data.data.password;
        this.form.email = res.data.data.email;
        this.form.desc = res.data.data.desc;
        this.id = res.data.data.id;
      });
  },
};
</script>

<style scoped>
.Center {
  text-align: center;
}

.marleft {
  margin-left: 350px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>