<template>
  <div class="create-post">
    <div class="container">
      <h2>Tạo BLog</h2>

      <div>
        <form>
          <div class="form-group">
            <input
              type="text"
              placeholder="Thể loại"
              v-model="categories"
              @blur="validate()"
              v-bind:class="{ 'is-invalid': errors.categories }"
            />
            <div class="invalid-feedback" v-if="errors.categories">
              {{ errors.categories }}
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Tiêu đề"
              @blur="validate()"
              v-model="title"
              v-bind:class="{ 'is-invalid': errors.title }"
            />
            <div class="invalid-feedback" v-if="errors.title">
              {{ errors.title }}
            </div>
          </div>

          <div class="form-group">
            <input
              type="file"
              @change="uploadImage"
              @blur="validate()"
              name="photo"
              accept=".png, .jpg, .jpeg"
              v-bind:class="{ 'is-invalid': errors.photo }"
            />
            <div class="invalid-feedback" v-if="errors.photo">
              {{ errors.photo }}
            </div>
            <!-- <img :src="imagePreview" v-if="imagePreview" alt="" /> -->
          </div>
        </form>
        <quill-editor
          :modules="modules"
          v-model:content="editorContent"
          @blur="validate()"
          ref="editorContent"
          contentType="html"
          theme="snow"
          toolbar="full"
          :class="{
            'is-invalid': errors.editorContent,
            'ql-container ql-snow': true,
          }"
          style="background: #fff"
        >
        </quill-editor>
        <div class="invalid-feedback" v-if="errors.editorContent">
          {{ errors.editorContent }}
        </div>
        <div class="mt-3">
          <button type="submit" @click="onCreatePost">Đăng bài</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Login from './Login.vue'
// import { useUserName } from '../store/username'
import { QuillEditor } from '@vueup/vue-quill'
import ImageUploader from 'quill-image-uploader'
import BlotFormatter from 'quill-blot-formatter'

import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  name: 'Post',
  components: {
    Login,
    QuillEditor,
  },
  data() {
    return {
      errors: {
        title: '',
        categories: '',
        photo: '',
        editorContent: '',
      },
      title: '',
      categories: '',
      photo: '',
      // imagePreview: '',
      usernameId: [],
      editorContent: '',
      editorSettings: {
        modules: {
          ImageResize: {
            modules: ['Resize', 'DisplaySize'],
          },
        },
      },
    }
  },
  setup() {
    const modules = [
      {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
          upload: (file) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData()
              formData.append('photo', file)

              axios
                .post('http://localhost:5000/posts/upload-image', formData)
                .then((res) => {
                  resolve(res.data.url)
                })
                .catch((err) => {
                  reject('Upload failed')
                  console.error('Error:', err)
                })
            })
          },
        },
      },
      {
        name: 'blotFormatter',
        module: BlotFormatter,
        options: {},
      },
    ]

    return {
      modules,
    }
  },

  methods: {
    async validate() {
      let isValid = true

      this.errors.categories = ''
      this.errors.title = ''
      this.errors.photo = ''
      this.errors.editorContent = ''

      if (!this.categories) {
        this.errors.categories = 'Thể loại không được để trống'
        isValid = false
      }

      if (!this.title) {
        this.errors.title = 'Tên bài viết không được để trống'
        isValid = false
      }
      // } else {
      //   const response = await axios.get('http://localhost:5000/posts')
      //   const existingPosts = response.data.title

      //   for (let i = 0; i < existingPosts.length; i++) {
      //     if (existingPosts[i].title === this.title) {
      //       this.errors.title = 'Tên bài viết đã tồn tại'
      //       isValid = false
      //       break
      //     }
      //   }
      // }

      if (!this.photo) {
        this.errors.photo = 'Ảnh không được để trống'
        isValid = false
      }
      if (!this.editorContent) {
        this.errors.editorContent = 'Nội dung không được để trống'
        isValid = false
      }

      return isValid
    },
    onCreatePost() {
      const isValid = this.validate()

      if (isValid) {
        const formData = new FormData()
        // const usestore = useUserName()

        const userid = localStorage.getItem('userid')

        formData.append('categories', this.categories)
        formData.append('title', this.title)
        formData.append('desc', this.editorContent)
        formData.append('userid', userid)
        // formData.append('imageuser', usestore.imageuser)
        formData.append('photo', this.photo)

        let jwtToken = localStorage.getItem('jwtToken')
        console.log(jwtToken)

        axios
          .post('http://localhost:5000/posts', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((response) => {
            console.log(response)
            this.categories = ''
            this.title = ''
            this.photo = ''
            // this.imagePreview = ''
            this.$refs.editorContent.setContents([])
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            document.querySelector('input[type="file"]').value = ''
          })
      }
    },
    uploadImage(event) {
      this.photo = event.target.files[0]
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      // reader.onload = () => {
      //   this.imagePreview = reader.result
      // }
    },
  },

  // created() {
  //   const usestore = useUserName()
  //   const storedUsername = localStorage.getItem('userid')
  //   const storedImageUser = localStorage.getItem('profilePic')
  //   if (storedUsername) {
  //     usestore.setUsername(storedUsername)
  //   }
  //   if (storedImageUser) {
  //     usestore.setImageUser(storedImageUser)
  //   }

  //   axios
  //     .get('http://localhost:5000/users/' + usestore.username)
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // },
}
</script>

<style scoped>
:deep(.ql-snow.ql-toolbar) {
  position: sticky;
  top: 70px;
  z-index: 999;
  background: #fff;
}

:deep(.ql-editor) {
  min-height: 300px;
}

.is-invalid {
  border-color: red;
}

.is-invalid ~ .invalid-feedback {
  display: block !important;
}

.create-post {
  margin-top: 85px;
}

img {
  max-width: 200px;
  max-height: 200px;
}

.form-group input {
  padding: 8px 6px;
  margin: 4px 0;
  border: 1px solid #d1d5db;
  width: 100%;
  background: #fff;
}

button {
  width: 100%;
  border: none;
  outline: none;
  padding: 5px 35px;
  background: rgb(17, 107, 143);
  color: #fff;
}
</style>
