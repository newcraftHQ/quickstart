import { getConnectToken, getAccessToken, openAuthenticatorEmbed, addAccessToken } from './authentication.js'
import { fetchResource, fetchChildRecords, fetchJobDetails, fetchJobCandidates, fetchCandidateDetails } from './httpRequests.js'
import { mouldPanelResourceTableItems, onRowSelected, onPanelRowSelected, onJobSelected, onCandidateSelected, swapTab, buildPanelFieldsArray } from './utils.js'

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
    panelTableFields: [],
    panelTableItems: [],
    employees: [],
    jobs: [],
    payrollsFields: [],
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
    mouldPanelResourceTableItems,
    onJobSelected,
    onRowSelected,
    onPanelRowSelected,
    onCandidateSelected,
    fetchChildRecords,
    swapTab,
    fetchJobDetails,
    fetchJobCandidates,
    fetchCandidateDetails,
    buildPanelFieldsArray,
  },
})

Vue.config.devtools = true
