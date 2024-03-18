<template>
  <div class="screen">
      <dv-decoration-9 style="width: 50px; height: 50px">66%</dv-decoration-9>
  </div>
</template>
<script>
export default {
  name: "screen",
  data() {
    return {
      config: [
        {
          name: "周口",
          value: 55,
        },
        {
          name: "南阳",
          value: 120,
        },
        {
          name: "西峡",
          value: 78,
        },
        {
          name: "驻马店",
          value: 66,
        },
        {
          name: "新乡",
          value: 80,
        },
      ],
    };
  },
};
</script>

<style  lang="less">
.screen{
    height: 100%;
    background: #353434;
}

</style>
