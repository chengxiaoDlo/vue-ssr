<template>
    <div>
      <Form ref="formValidate" :model="formValidate"  :label-width="100">
        <Form-item label="alexa：">
          <Row>
            <Col span="12">
            <Input v-model="formValidate.alexa"  />
            </Col>
          </Row>
        </Form-item>
       <Form-item label="name：">
          <Row>
            <Col span="12">
            <Input v-model="formValidate.name"  />
            </Col>
          </Row>
        </Form-item>
        <Form-item label="url：">
          <Row>
            <Col span="12">
            <Input v-model="formValidate.url"  />
            </Col>
          </Row>
        </Form-item>
        <Form-item label="country：">
          <Row>
            <Col span="12">
            <Input v-model="formValidate.country"  />
            </Col>
          </Row>
        </Form-item>
        <Form-item>
          <Row>
            <Col span="4">
            <Button class="btn" type="success" @click="submit">提交</Button>
            </Col>
            <Col span="4">
            <Button class="btn" type="warning" @click="cancel">取消</Button>
            </Col>
            <Col span="4">
            <Button class="btn" type="error" @click="reset">重置</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
    </div>
</template>

<script>
  import { Users } from '@/model'

  export default {
    data () {
      return {
        formValidate: {
          alexa: '',
          name: '',
          country: '',
          url: ''
        }
      }
    },
    methods: {
      submit () {
        if (this.$route.query.id) {
          new Users().PUT({data: this.formValidate, uri: this.$route.query.id})
            .then(() => {
              this.$router.push('/')
            })
        } else {
          sessionStorage.setItem('add', true)
          new Users().POST({data: this.formValidate})
            .then(() => {
              this.$router.push('/')
            })
        }
      },
      cancel () {
        this.$router.push('/')
      },
      reset () {
        this.$set(this, 'formValidate', {
          id: '',
          name: '',
          country: '',
          url: ''
        })
      }
    },
    created () {
      console.log(this.$route.query.id)
      if (this.$route.query.id) {
        new Users().GET({uri: this.$route.query.id})
          .then((res) => {
            this.formValidate = res.data[0]
          })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
