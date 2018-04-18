<template>
  <div>
    <Button type="warning" style="margin: 15px;" >添加</Button>
    <Table :columns="columns" :data="data" border stripe>
    </Table>
  </div>
</template>

<script>
import { Location } from '@/model'
export default {
  name: 'userList',
  data () {
    return {
      columns: [
        {
          title: '序号',
          align: 'center',
          render: (h, params) => {
            return h('div', params.index + 1)
          }
        },
        {
          title: '用户名',
          align: 'center',
          key: 'user_name'
        },
        {
          title: '用户等级',
          align: 'center',
          key: 'user_level'
        },
        {
          title: '最后修改时间',
          align: 'center',
          key: 'last_modify'
        },
        {
          title: '操作',
          align: 'center',
          key: 'action',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({path: 'edit', query: {id: params.row.id}})
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.del(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: []
    }
  },
  methods: {
    del () {},
    getUserList () {
      new Location().GET({params: {
        location: '39.984154,116.307490',
        key: 'NGABZ-F5M3U-AVUV7-4JCF3-CL5UZ-RCBVO'
      }})
        .then((res) => {
          console.log(111, res)
          this.data = res.data
        })
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style type="text/scss" lang="scss" scoped>

</style>
