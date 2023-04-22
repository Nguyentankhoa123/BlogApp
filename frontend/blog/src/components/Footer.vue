<template>
  <div class="footer">
    <div class="container">
      <div class="footer-container">
        <div class="design-by">
          <p>Blog app <span>- Designed By Nguyen Tan Khoa</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style>
.footer {
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  padding: 20px;
}

.design-by {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 468px) {
  .design-by {
    font-size: 13px;
  }
}
</style>
