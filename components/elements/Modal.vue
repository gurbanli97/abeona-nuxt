<template>
  <div class="modal-overlay" @click.self="handleBackdropClick" v-if="toggle">
      <div class="modal-content">
          <div class="modal-info">
              <img src="/warning.svg" alt="">
              <h2>Are you sure to delete consultation?</h2>
              <span>If you delete, you can’t bring it again</span>
          </div>
          <div class="modal-actions">
              <button class="btn" @click="$nuxt.$emit('modal-delete-click', item)">Yes, delete</button>
              <button class="btn" @click.stop="handleBackdropClick" >Cancel</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        toggle: Boolean,
        item: Number
    },
    methods: {
    handleEscapeKey(e) {
      if (this.toggle && e.key === 'Escape'){
        this.$emit('close');
      }
    },
    handleBackdropClick() {
        this.$emit('close');
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleEscapeKey);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscapeKey);
  }
}
</script>

<style>

</style>