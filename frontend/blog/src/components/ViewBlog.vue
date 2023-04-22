<template>
  <div class="mt-5">
    <div class="container">
      <div class="view-blog">
        <h1>{{ blog.title }}</h1>
        <div v-if="blog && blog.categories">
          <!-- <router-link
          class="categories"
          v-for="item in blog.categories.join(' ').split(' ')"
          :key="item"
          :to="{ name: 'Category', query: { category: item } }"
        >
          {{ item }}
        </router-link> -->
          <router-link
            class="categories"
            v-for="item in blog.categories"
            :key="item"
            :to="{ name: 'Category', query: { category: item } }"
          >
            <p>{{ item }}</p>
            <!-- <span v-if="index < blog.categories.length - 1">,</span> -->
          </router-link>
        </div>
        <div class="user">
          <img
            v-if="blog.userid && blog.userid.profilePic"
            :src="path + /images/ + blog.userid.profilePic"
            class="imageuser"
            alt=""
          />
          <div class="date">
            <router-link
              v-if="blog.userid && blog.userid._id"
              class="author"
              :to="{ name: 'PostOfUser', query: { user: blog.userid._id } }"
              >{{ blog.userid.username }}</router-link
            >
            <p>Đăng lúc: {{ dateTime(blog.createdAt) }}</p>
          </div>
        </div>
        <div class="blog-img">
          <img :src="path + '/images/' + blog.photo" alt="Đang tải" />
        </div>
        <div class="blog-desc ql-editor" v-html="blog.desc"></div>
        <div class="button">
          <button type="button" class="edit" v-show="canEdit">
            <router-link :to="{ name: 'EditPost' }">
              <font-awesome-icon :icon="['fas', 'pencil']" />
              Sửa
            </router-link>
          </button>
          <button
            type="button"
            @click="deletePost()"
            class="delete"
            v-show="canDelete"
          >
            <font-awesome-icon :icon="['fass', 'trash']" /> Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  props: ['id'],
  name: 'ViewBlog',
  components: {
    QuillEditor,
  },
  data() {
    return {
      blog: [],
      postUserID: null,
      path: 'http://localhost:5000',
    }
  },

  created() {
    axios
      .get('http://localhost:5000/posts/' + this.id)
      .then((response) => {
        this.blog = response.data
        this.postUserID = response.data.userid._id
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    console.log(this.blog.desc)
  },

  computed: {
    canEdit() {
      const currentUserID = localStorage.getItem('userid')
      return this.postUserID === currentUserID
    },
    canDelete() {
      const currentUserID = localStorage.getItem('userid')
      return this.postUserID === currentUserID
    },
  },

  methods: {
    deletePost() {
      if (confirm('Xác nhận xóa bài')) {
        axios
          .delete('http://localhost:5000/posts/' + this.id, {
            data: {
              username: this.blog.username,
            },
          })
          .then((response) => {
            console.log(response.data.message)
            this.$router.push('/')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },

    dateTime(value) {
      return moment(value).format('Do MMMM YYYY, h:mm ')
    },

    editPost() {
      axios
        .put(
          'http://localhost:5000/posts/' + this.id,
          {
            data: {
              username: this.blog.username,
            },
          },
          {
            title: this.blog.title,
            desc: this.blog.desc,
          }
        )
        .then((response) => {
          console.log(response.data.message)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none !important;
}
/* 
.view-blog {
  padding: 40px 60px;
} */

.view-blog .categories {
  color: #fff;
  font-weight: 600;
  margin: 0 8px 4px 0;
  border-radius: 4px;
  display: inline-block;
  letter-spacing: 1.5px;
  font-size: 12px;
  padding: 2px 10px;
  background-color: #8bc34a !important ;
  font-weight: 600;
  text-transform: uppercase;
}

.view-blog .user {
  display: flex;
  padding: 15px 0;
}

.view-blog .user .imageuser {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.view-blog .date {
  margin-left: 15px;
}

.view-blog .date .author {
  text-decoration: none;
  font-weight: bolder;
}

.view-blog .blog-img,
.view-blog .blog-desc {
  padding: 10px 0;
}

.view-blog .blog-desc {
  overflow: hidden;
}

.button {
  display: flex;
  margin-top: 15px;
}

.edit,
.delete {
  padding: 5px 10px;
  margin-right: 15px;
  border-radius: 7px;
  border: none;
}

.edit {
  background-color: #c5c5f1;
}
.delete {
  background-color: #1b3d4d;
  color: #fff;
}

.delete:hover {
  background-color: #224c59;
}

.blog-img img {
  width: 100%;
  max-height: 500px;
}

.ql-editor {
  padding: 0 !important;
}

@media screen and (max-width: 468px) {
  :deep(.ql-editor p > img) {
    width: 100%;
  }
}
</style>
