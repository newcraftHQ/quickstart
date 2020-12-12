import { getConnectToken, getAccessToken, openAuthenticatorEmbed, addAccessToken } from './authentication.js'
import { fetchResource, fetchShowDetails, fetchSecondaryDetails } from './httpRequests.js'
import { mouldPanelResourceTableItems, buildPanelFieldsArray, onPanelRowSelected, mouldModalResourceTableItems, buildModalFieldsArray, onModalRowSelected, onShowRowSelected, swapTab } from './utils.js'
import { fetchCandidates, showJob } from './jobs.js'

const vueApp = new Vue({
  el: '#app',
  data: {
    access_token: null,
    addingToken: false,
    submittingConnect: false,
    requestingResource: false,
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
    panelTableItemSelected: [],
    showTableItems: [],
    showTableFields: [],
    showTableItemSelected: [],
    modalTableItems: [],
    modalTableFields: [],
    onModalRowSelected: [],
    employees: [],
    jobs: [],
    payrollsFields: [],
    payrolls: [],
    candidates: [],
    recordType: null,
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
    getConnectToken,
    getAccessToken,
    openAuthenticatorEmbed,
    addAccessToken,
    fetchResource,
    fetchShowDetails,
    fetchSecondaryDetails,
    mouldPanelResourceTableItems,
    buildPanelFieldsArray,
    mouldModalResourceTableItems,
    buildModalFieldsArray,
    onModalRowSelected,
    onPanelRowSelected,
    onShowRowSelected,
    swapTab,
    fetchCandidates,
    showJob,
  },
})

Vue.config.devtools = true
