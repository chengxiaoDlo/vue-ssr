<template>
    <div>
      <h1>LOCATION</h1>
    </div>
</template>

<script>
import { Location } from '@/model'
export default {
  name: 'list',
  created () {
    new Location().GET({params: {
      location: '39.984154,116.307490',
      key: 'NGABZ-F5M3U-AVUV7-4JCF3-CL5UZ-RCBVO'
    }})
      .then(res => {
        console.log(44444, res)
      })
  }
}
</script>

<style type="text/scss" lang="scss" scoped>

</style>
