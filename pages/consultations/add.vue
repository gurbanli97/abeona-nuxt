<template>
  <div class="consultations add-new">
    <page-header :title="'New Consultation'" :showActions="true" :showBackButton="true" :showBorder="true">
      <button class="btn btn-borderless add-customer_list">
        Add to customer list
      </button>
      <button class="btn btn-transparent send-details">
        Send details
      </button>
      <button class="btn btn-success">
        Save consultation
      </button>
    </page-header>
    <div class="container">
      <div class="add-consultation-inner row justify-content-between">
        <div class="main col-8">
          <div class="forms">
            <b-col xl="12" class="client-details">
              <h3>Client details</h3>
              <b-form class="d-flex">
                <b-col xl="6 pl-0" class="d-flex flex-column align-items-end">
                  <b-form-group>
                    <form-field :placeholder="'Enter'" :label="'Name'" />
                  </b-form-group>
                  <b-form-group>
                    <form-field :placeholder="'Enter'" :label="'Email'" />
                  </b-form-group>

                  <!-- <div class="client-search_popup">
                    <user-table :fields="fields">
                      <tbody>
                        <template v-for="customer in customers">
                          <tr :key="customer.id">
                            <td>
                              <span>{{customer.name}}</span>
                            </td>
                            <td>
                              <span>{{customer.surname}}</span>
                            </td>
                            <td>
                              <span>{{customer.phone}}</span>
                            </td>
                            <td>
                              <span>{{customer.email}}</span>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </user-table>
                  </div> -->
                </b-col>
                <b-col xl="6">
                  <b-form-group>
                    <form-field :placeholder="'Enter'" :label="'Surname'" />
                  </b-form-group>
                  <b-form-group>
                    <form-field :placeholder="'Enter'" :label="'Phone'" />
                  </b-form-group>
                </b-col>
              </b-form>
            </b-col>
            <b-col xl="12" class="applicants">
              <h3>Applicants</h3>

              <div class="applicant-list">
                <user-table>
                      <tbody>
                        <template v-for="customer in customers">
                          <tr :key="customer.id">
                            <td>
                              <detail-field :label="'Name'">
                                <strong>{{customer.name}} <span class="client-type"> (Client applicant)</span></strong>
                                
                              </detail-field>
                            </td>
                            <td>
                               <detail-field :label="'Surname'">
                                <strong>{{customer.surname}}</strong>
                              </detail-field>
                            </td>
                            <td>
                               <detail-field :label="'Phone'">
                                <strong>{{customer.phone}}</strong>
                              </detail-field>
                            </td>
                            <td>
                               <detail-field :label="'Email'">
                                <strong>{{customer.email}}</strong>
                              </detail-field>
                            </td>
                             <td class="actions" :class="{'active':activeAction === customer.id}">
                              <button class="show-actions" @click="toggleActions(customer)" ref="showActions">
                                <icon :name="'more'" />
                              </button>
                              <div class="table-actions" v-show="activeAction === customer.id" :id="`element-${customer.id}`" ref="actionsBlock">
                                <button>
                                  <icon :name="'edit-2'"/>
                                  Edit
                                </button>
                                <button>
                                  <icon :name="'profile-1'"/>
                                  Make applicant
                                </button>
                                <button @click="openModal(customer.id)">
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

              <button class="btn btn-borderless add-applicant" @click="showSlideOut = true">
                <icon :name="'plus-circle'" />
                <span>Add an applicant</span>
              </button>

              <slide-out :slideIsActive="showSlideOut" @close-slide="showSlideOut = false">
              </slide-out>
            </b-col>
          </div>

          <b-col xl="12" class="documents">
            <h3>Documents</h3>
           <b-row>
              <b-col xl="6 pl-0">

              <div class="drag-box">
                <div class="box-title">
                  <span>Customer provide</span>
                  <div class="item-count">
                    <span>{{list1.length}}</span>
                  </div>
                </div>
                <draggable class="list-group" :list="list1" group="people" @change="log">
                  <div class="list-group-item" v-for="(element) in list1" :key="element.name">
                    <p>{{ element.name }}</p>

                    <badge :category="'document'" :text="element.document_type" />
                  </div>
                </draggable>
                <button class="btn btn-borderless">
                  <icon :name="'plus-circle'" />
                  <span>Add file</span>
                </button>
              </div>
            </b-col>
            <b-col xl="6 pr-0">
              <div class="drag-box">
                <div class="box-title">
                  <span>We handle</span>
                  <div class="item-count">
                    <span>{{list2.length}}</span>
                  </div>
                </div>
                <draggable class="list-group" :list="list2" group="people" @change="log">
                  <div class="list-group-item" v-for="(element) in list2" :key="element.name">
                    <p>{{ element.name }}</p>

                    <badge :category="'document'" :text="element.document_type" />
                  </div>
                </draggable>
                <button class="btn btn-borderless">
                  <icon :name="'plus-circle'" />
                  <span>Add file</span>
                </button>
              </div>
            </b-col>
           </b-row>
          </b-col>



        </div>
        <div class="checkout col-4">
          <div class="checkout-head">
            <span>Checkout</span>
            <button class="btn btn-borderless" @click="showAddPopup = !showAddPopup">
              <icon :name="'plus-circle'" />
              <span>Add service</span>
            </button>

            <div class="add-service-popup" v-show="showAddPopup">
              <div class="popup-head">
                <span>Add service</span>
                <button @click="showAddPopup = false">
                  <icon :name="'close-circle'" />
                </button>
              </div>
              <b-form class="popup-form">
                <b-form-group label="Section">
                  <v-select :closeOnSelect="true" :clearable="false">
                  </v-select>
                </b-form-group>
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Service name'" />
                </b-form-group>
                <b-form-group>
                  <form-field :placeholder="'Enter'" :label="'Fee (in AZN)'" />
                </b-form-group>
              </b-form>
              <button class="btn btn-success">Save changes</button>
            </div>
          </div>
          <div class="checkout-travel_info">
            <ul>
              <li>
                <span>Visa getting period:</span>
                <strong>3-5 business days</strong>
              </li>
              <li>
                <span>Duration of stay:</span>
                <strong>3 month</strong>
              </li>
            </ul>
          </div>
          <div class="checkout-fees">
            <h3>Visa fee</h3>
            <ul>
              <li>
                <span>Consultation fee</span>
                <strong>272 AZN</strong>
              </li>
              <li>
                <span>Our processing fee</span>
                <strong>90.1 AZN</strong>
              </li>
            </ul>
          </div>
          <div class="checkout-other_services">
            <h3>Other services</h3>
            <ul>
              <li>
                <span>Document fee</span>
                <strong>272 AZN</strong>
              </li>
            </ul>
          </div>
          <div class="checkout-total">
            <h3>Total</h3>
            <strong>412.1 AZN</strong>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker'
  import draggable from 'vuedraggable'

  export default {
    order: 1,
    components: {
      DatePicker,
      draggable
    },
    data() {
      return {
        showSlideOut: false,
        birthDate: '',
        showAddPopup: false,
        activeAction: null,
        showDeleteModal: false,
        itemToDelete: null,
        customers: [{
            id: 1,
            name: 'Ali',
            surname: 'Gurbanli',
            phone: '+994507224461',
            email: 'ali.e.gurbanli@gmail.com'
          },
          {
            id: 2,
            name: 'Ali',
            surname: 'Gurbanli',
            phone: '+994507224461',
            email: 'ali.e.gurbanli@gmail.com'
          },
          {
            id: 3,
            name: 'Ali',
            surname: 'Gurbanli',
            phone: '+994507224461',
            email: 'ali.e.gurbanli@gmail.com'
          }
        ],
        fields: ['Name', 'Surname', 'Phone', 'Email'],
        list1: [{
            name: "Bank account statement/Evidence of sufficient funds",
            document_type: 'Translated',
            id: 1
          },
          {
            name: "Work reference from e-government portal",
            document_type: 'Translated',
            id: 2
          },
          {
            name: "Jean",
            document_type: 'Copy',
            id: 3
          },
          {
            name: "Gerard",
            document_type: 'Original',
            id: 4
          }
        ],
        list2: [{
            name: "Juan",
            id: 5
          },
          {
            name: "Edgard",
            id: 6
          },
          {
            name: "Johnson",
            id: 7
          }
        ]
      };
    },
    methods: {
      // add: function () {  
      //   this.list.push({
      //     name: "Juan"
      //   });
      // },
      // replace: function () {
      //   this.list = [{
      //     name: "Edgard"
      //   }];
      // },
      // clone: function (el) {
      //   return {
      //     name: el.name + " cloned"
      //   };
      // },
      log: function (evt) {
        window.console.log(evt);
      },
       toggleActions(item){
        this.activeAction = item.id
    },
      handleDocClick(event) { 
        let target = event.target.classList.contains('slideout-overlay');
        if(target)
          this.showSlideOut = false

          if(this.activeAction === null) {
          return
        }
        let clickedActionBtn = event.target.classList.contains('icon-more');
        let clickedActionBlock = event.target.classList.contains('table-actions');
        
        if(!clickedActionBtn && !clickedActionBlock) {
          this.activeAction = null;
        }
      },
      openModal(item){
        this.showDeleteModal = true,
        this.itemToDelete = item
      },
      handleDelete(item){
        console.log('id:',item)
      }
      
    },
    mounted() {
    document.addEventListener('click', this.handleDocClick);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleDocClick);
    },
   
  };
</script>

<style>

</style>