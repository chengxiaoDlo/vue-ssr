<template>
  <div class="spin-col" span="8">
    <Spin fix style="background-color: transparent">
      <Icon type="load-c" size="18" class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
  export default {
    name: 'loading'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "../theme/utils/index";

  .spin-col {
    @include size(200px, 200px);
    @include position--absolute(50%, null, null, 50%);
    @include margin(-50px, null, null, null);

    .spin-icon-load {
      animation: ani-spin 1s linear infinite;
    }
  }

  @keyframes ani-spin {
    from {
      transform: rotate(0deg)
    }
    50% {
      transform: rotate(180deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
</style>
