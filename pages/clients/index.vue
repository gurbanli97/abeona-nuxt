<template>
  <div class="clients">
    <page-header title="Clients" :showActions="true">
       <form-field
            :placeholder= "'Search'"
            :type="'search'"
        >
        </form-field>
        <button class="btn btn-success">Add new</button>
    </page-header>
    <div class="container">
      <user-table :fields="fields" :withActions="true">
        <tbody>
               <template v-for="consultation in consultations" >
                <tr :key="consultation.id">
                  <td>
                    <span>{{consultation.customer.name}} {{consultation.customer.surname}}</span>
                  </td>
                  <td>
                    <span>{{consultation.customer.email}}</span>
                  </td>
                  <td>
                    <span>{{consultation.customer.phone}}</span>
                  </td>
                  <td class="actions" :class="{'active':activeAction === consultation.id}">
                    <button class="show-actions" @click="toggleActions(consultation)" v-scroll-to="`#element-${consultation.id}`" ref="showActions">
                      <icon :name="'more'" />
                    </button>
                    <div class="table-actions" v-show="activeAction === consultation.id" :id="`element-${consultation.id}`" ref="actionsBlock">
                      <button>
                        <icon :name="'edit-2'"/>
                        Edit
                      </button>
                      <button @click="openModal(consultation.id)">
                        <icon :name="'trash'"/>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </template>

        </tbody>
    </user-table>
    <modal 
      :toggle="showDeleteModal"
      @close="showDeleteModal = false"
      :item="itemToDelete"
    />
    </div>
  </div>
</template>

<script>
import { TableActionsMixin } from '~/mixins/table-actions'
import {mapGetters} from 'vuex'
import PageHeader from '../../components/layout/PageHeader.vue'
export default {
  components: { PageHeader },
  mixins: [TableActionsMixin],
  data() {
    return {
      fields: ['Customer','Email','Phone'],
    }
  },
  computed: {
    ...mapGetters({
      consultations: 'consultations/consultations',
      }),
  },
  methods:{
  },
  mounted(){
  },
  async asyncData({store}){
    await store.dispatch('consultations/fetchConsultations')
  }
}
</script>

<style>

</style>