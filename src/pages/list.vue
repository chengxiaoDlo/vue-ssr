<template>
    <div>
      <Button type="warning" style="margin: 15px;" @click="edit">添加</Button>
      <Table :columns="columns" :data="userList.data" border stripe>
      </Table>
      <Page class="page" :total="userList.total" show-sizer show-total show-elevator placement="top"
            @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"></Page>
    </div>
</template>

<script>
  import { Users } from '@/model'
  import { mapState } from 'vuex'

  function fetchUser (store, params) {
    return store.dispatch('getUserList', {params: params})
  }
  export default {
    data () {
      return {
        columns: [
          {
            title: 'NO',
            align: 'center',
            render: (h, params) => {
              return h('div', params.index + 1)
            }
          },
          {
            title: 'name',
            align: 'center',
            key: 'name'
          },
          {
            title: 'url',
            align: 'center',
            key: 'url'
          },
          {
            title: 'country',
            align: 'center',
            key: 'country'
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
        ]
      }
    },
    computed: mapState([
      'userList'
    ]),
    prefetch: fetchUser,
    methods: {
      edit () {
        this.$router.push('edit')
      },
      del (id) {
        new Users().DELETE({uri: id})
          .then(() => {
            this.getList()
          })
      },
      handlePageChange (val) {
        fetchUser(this.$store, {currentPage: val})
      },
      handlePageSizeChange (val) {
       fetchUser(this.$store, {pageSize: val})
      }
    },
    beforeMount () {
      fetchUser(this.$store, {})
    }
  }
</script>

<style scoped>
.page {
  margin-top: 20px;
  float: right;
}
</style>
