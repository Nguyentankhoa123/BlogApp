<template>
  <div class="edit">
    <div class="container">
      <h2>Chỉnh Sửa</h2>

      <div>
        <form>
          <div class="form-group">
            <input
              type="text"
              placeholder="Thể loại"
              v-model="categories"
              v-bind:class="{ 'is-invalid': errors.categories }"
            />
            <div class="invalid-feedback" v-if="errors.categories">
              {{ errors.categories }}
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
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
              name="photo"
              accept=".png, .jpg, .jpeg"
              v-bind:class="{ 'is-invalid': errors.photo }"
            />

            <div class="invalid-feedback" v-if="errors.photo && this.photo">
              {{ errors.photo }}
            </div>
            <!-- <img :src="imagePreview" v-if="imagePreview" alt="" /> -->
          </div>
        </form>
        <div class="editor-wrapper">
          <quill-editor
            :modules="modules"
            v-model:content="editorContent"
            ref="editorContent"
            contentType="html"
            theme="snow"
            toolbar="full"
            :class="{
              'is-invalid': errors.editorContent,
              'ql-container ql-snow': true,
            }"
          >
          </quill-editor>
        </div>
        <div class="invalid-feedback" v-if="errors.editorContent">
          {{ errors.editorContent }}
        </div>
        <div class="mt-3">
          <button type="submit" @click="editPost">Thay đổi</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import ImageUploader from 'quill-image-uploader'
import BlotFormatter from 'quill-blot-formatter'
export default {
  props: ['id'],
  name: 'EditPost',
  components: {
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
      desc: '',
      photo: '',
      // imagePreview: '',
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

  created() {
    axios.get('http://localhost:5000/posts/' + this.id).then((response) => {
      console.log(response.data.categories)
      this.categories = response.data.categories.join(', ')
      this.title = response.data.title
      this.editorContent = response.data.desc
      this.username = response.data.username
      this.photo = response.data.photo
      // this.imagePreview = 'http://localhost:5000' + '/images/' + this.photo
    })
  },

  methods: {
    uploadImage(event) {
      this.photo = event.target.files[0]
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      // reader.onload = () => {
      //   this.imagePreview = reader.result
      // }
    },

    editPost() {
      if (confirm('Xác nhận thay đổi')) {
        const formData = new FormData()
        formData.append('categories', this.categories)
        formData.append('title', this.title)
        formData.append('desc', this.editorContent)
        formData.append('username', this.username)
        formData.append('photo', this.photo)
        formData.append('userid', localStorage.getItem('userid'))

        axios
          .put('http://localhost:5000/posts/' + this.id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log(response)
            this.$router.push('/')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
}
</script>

<style scoped>
.editor-wrapper {
  background: #fff;
}

:deep(.ql-snow.ql-toolbar) {
  position: sticky;
  top: 70px;
  z-index: 999;
  background: #fff;
}

.is-invalid {
  border-color: red;
}

.is-invalid ~ .invalid-feedback {
  display: block;
}

.edit {
  margin-top: 50px;
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
