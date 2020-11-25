import { getConnectToken, getAccessToken, openAuthenticatorEmbed, addAccessToken } from './authentication.js'
import { fetchResource, fetchChildRecords, fetchJobDetails, fetchJobCandidates, fetchCandidateDetails } from './httpRequests.js'
import { mouldResourceTableItems, onRowSelected, onJobSelected, onCandidateSelected, swapTab } from './utils.js'

const vueApp = new Vue({
  el: '#app',
  data: {
    access_token: null,
    addingToken: false,
    submittingConnect: false,
    requestingResource: false,
    selectedItem: null,
    selectedJobId: null,
    fetchingDetails: false,
    fetchedJobDetails: null,
    fetchedCandidateDetails: null,
    employeesModal: true,
    jobsModal: false,
    payrollsModal: false,
    resourceData: null,
    employeesFields: [
      {
        key: 'full_name',
        sortable: false,
      },
      {
        key: 'title',
        sortable: false,
      },
      {
        key: 'work_email',
        sortable: false,
      },
      {
        key: 'salary',
        sortable: false,
      },
    ],
    employees: [],
    jobsFields: [
      {
        key: 'name',
        sortable: false,
      },
      {
        key: 'location',
        sortable: false,
      },
      {
        key: 'remote',
        sortable: false,
      },
      {
        key: 'status',
        sortable: false,
      },
    ],
    jobs: [],
    payrollsFields: [
      {
        key: 'check_data',
        sortable: false,
      },
      {
        key: 'pay_period_end_date',
        sortable: false,
      },
      {
        key: 'pay_period_start_date',
        sortable: false,
      },
    ],
    payrolls: [],
    candidatesFields: [
      {
        key: 'full_name',
        sortable: false,
      },
      {
        key: 'email',
        sortable: false,
      },
      {
        key: 'phone_number',
        sortable: false,
      },
      {
        key: 'address',
        sortable: false,
      }
    ],
    candidates: [],
  },
  computed: {
    credentialsAdded() {
      const vm = this

      if(vm.access_token){
        return true
      } else {
        return false
      }
    },
    dataToDisplay() {
      const vm = this

      return JSON.stringify(vm.resourceData.data, undefined, 2)
    }
  },
  methods: {
    fetchResource,
    getConnectToken,
    getAccessToken,
    openAuthenticatorEmbed,
    addAccessToken,
    mouldResourceTableItems,
    onJobSelected,
    onRowSelected,
    onCandidateSelected,
    fetchChildRecords,
    swapTab,
    fetchJobDetails,
    fetchJobCandidates,
    fetchCandidateDetails,
  },
})

Vue.config.devtools = true
