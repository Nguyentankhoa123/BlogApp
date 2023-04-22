<template>
  <div class="product">
    <div class="container">
      <div class="row">
        <div
          class="col-md-4 product-col"
          v-for="(blog, index) in blogs"
          :key="index"
        >
          <router-link
            class="blog"
            :to="{ name: 'ViewBlog', params: { id: blog._id } }"
          >
            <div class="img">
              <img :src="path + '/images/' + blog.photo" alt="Lỗi" />
            </div>

            <div class="title">
              <h4>{{ blog.title }}</h4>
            </div>
            <div class="content">
              <p>{{ blog.desc }}</p>
            </div>
            <div class="date">
              <font-awesome-icon icon="fa-solid fa-clock" />
              <p>{{ dateTime(blog.createdAt) }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  // name: 'BlogCard',

  data() {
    return {
      blogs: [],
      path: 'http://localhost:5000',
      props: {
        username: String,
        required: true,
      },
    }
  },
  methods: {
    getBlogs() {
      axios
        .get('http://localhost:5000/posts')
        .then((response) => {
          this.blogs = response.data
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    dateTime(value) {
      return moment(value).format('Do MMMM YYYY, h:mm a')
    },
  },
  mounted() {
    this.getBlogs()
  },
}
</script>

<style scoped>
a {
  color: unset;
}

a:hover {
  color: unset;
}
p {
  margin: 0;
  padding: 0;
}

.product {
  padding: 50px 0;
}

.product-col {
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background: #fff;
  cursor: pointer;
}

.blog {
  text-decoration: none;
}

.img img {
  width: 100%;
  background-size: cover;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.title {
  text-transform: uppercase;
}

.content p {
  color: #999;
  margin: 20px 0;
  font-size: 17px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.date {
  display: flex;
  align-items: center;
}

.date .fa-clock {
  margin-right: 15px;
}

.date p {
  color: #999;
}
</style>
