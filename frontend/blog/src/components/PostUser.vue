<template>
  <div class="product">
    <div class="container">
      <div class="row g-5">
        <div
          class="col-lg-4 col-md-6 products"
          v-for="(blog, index) in blogs"
          :key="index"
        >
          <div class="product-col">
            <router-link
              class="blog g-5"
              :to="{ name: 'ViewBlog', params: { id: blog._id } }"
            >
              <div class="img">
                <img :src="path + '/images/' + blog.photo" alt="Lỗi" />
              </div>
              <div class="blog-content">
                <!-- <div class="categories">
                  <p>{{ blog.categories.join(' ') }}</p>
                </div> -->
                <div class="d-flex mb-2">
                  <div
                    class="categories"
                    v-for="item in blog.categories"
                    :key="item"
                    :to="{ name: 'Category', query: { category: item } }"
                  >
                    <p>{{ item }}</p>
                    <!-- <span v-if="index < blog.categories.length - 1">,</span> -->
                  </div>
                </div>

                <div class="title">
                  <p>{{ blog.title }}</p>
                </div>
                <div class="content">
                  <p>{{ removeTags(blog.desc) }}</p>
                </div>
                <div class="info-user">
                  <div class="img-user">
                    <img
                      :src="path + '/images/' + blog.userid.profilePic"
                      alt="Lỗi"
                    />
                  </div>
                  <p class="username">{{ blog.userid.username }}</p>

                  <div class="date">
                    <p>{{ dateTime(blog.createdAt) }}</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'BlogCard',
  data() {
    return {
      blogs: [],
      path: 'http://localhost:5000',
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    getBlogs() {
      axios
        .get('http://localhost:5000/posts?user=' + this.id)
        .then((response) => {
          this.blogs = response.data
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    dateTime(value) {
      return moment(value).startOf().fromNow()
    },

    // remove all HTML tags
    removeTags(value) {
      return value.replace(/(<([^>]+)>)/gi, '')
    },
  },
  mounted() {
    this.getBlogs()
  },
}
</script>

<style scoped>
.imageuser {
  width: 50px;
  height: 50px;
}

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

.products {
  display: flex;
  flex-direction: column;
}

.product {
  padding: 50px 0 130px 0;
}

.product-col {
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: 0.3s all ease;
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  overflow: hidden;
}

.product-col:hover {
  transition: 0.3s all ease;
  top: -1px;
  box-shadow: 0 3px 50px -2px rgba(0, 0, 0, 0.2) !important;
}

.product-col:hover .img img {
  border-radius: unset;
}

.blog {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.img img {
  width: 100%;
  background-size: cover;
  height: 250px;
  margin-bottom: 25px;
  transition: 0.3s ease;
}

.blog-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 16px;
  text-align: justify;
}

.categories p {
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

.title {
  text-transform: uppercase;
  word-wrap: break-word;
  margin-bottom: auto;
}

.title p {
  font-size: 20px;
  font-weight: 500;
}

.content p {
  color: #666666;
  margin: 18px 0 15px 0;
  font-size: 17px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
}

.info-user {
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
  font-size: 16px;
}

.info-user .img-user img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 14px;
}

.info-user .username {
  font-weight: bolder;
  color: #5488c7;
  max-width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  margin-left: 10px;
}

.date .fa-clock {
  margin-right: 15px;
}

.date p {
  color: #999;
}

@media screen and (max-width: 468px) {
  .info-user {
    font-size: 12px;
  }

  .design-by p {
    font-size: 14px;
  }

  .view-blog .date {
    font-size: 13px;
  }
}
</style>
