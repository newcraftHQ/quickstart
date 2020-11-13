const vueApp = new Vue({
  el: '#app',
  data: {
    access_token: null,
    addingToken: false,
    submittingConnect: false,
    requestingResource: false,
    employeesModal: true,
    jobsModal: false,
    payrollsModal: false,
    selectedItem: null,
    fetchingJobDetails: false,
    jobs: [],
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
    fetchRequest(record) {
      const vm = this

      vm.requestingResource = true

      fetch(`/${record}/fetch_resource/${vm.access_token}`)
        .then(response => response.json())
        .then((data) => {
          vm.requestingResource = false
          vm.resourceData = data
          vm.resourceData.status = 'success'
          vm.mouldResourceTableItems(data, record)
        })
        .catch((error) => {
          vm.requestingResource = true
          console.error('Error msg:', error);
        })
    },
    getConnectToken(companyName, authenticatorEnv) {
      const vm = this

      vm.submittingConnect = true

      fetch('/connect_tokens/create')
        .then(response => response.json())
        .then((data) => {
          vm.submittingConnect = false
          vm.openAuthenticatorEmbed(data.data.id, companyName, authenticatorEnv) 
        })
        .catch((error) => {
          vm.submittingConnect = false
          console.error('Error msg:', error)
        })
    },
    getAccessToken(publicToken) {
      const vm = this

      fetch(`/public_token/exchange/${publicToken}`)
        .then(response => response.json())
        .then((data) => {
          vm.access_token = data.data.id
        })
        .catch((error) => {
          console.error('Error msg:', error)
        })
    },
    openAuthenticatorEmbed(connectToken, companyName, authenticatorEnv) {
      const vm = this

      vm.submittingConnect = false

      NCConnector.create({
        company_name: companyName,
        connect_token: connectToken,
        authenticator_env: authenticatorEnv,
        successCallback: (token) => {
          if (authenticatorEnv === 'sandbox') {
            vm.access_token = token.id

            return
          }
          vm.getAccessToken(token.id)
        },
        failureCallback: (error_message) => { console.error(error_message) }
      })
    },
    addAccessToken() {
      const vm = this

      vm.addingToken = true
    },
    mouldResourceTableItems(data, record){
      const vm = this

      const itemsArray = []

      switch (record) {
        case 'employees': {
          data.data.forEach((item) => {
            const itemToSave = {
              id: item.id,
              full_name: item.attributes.first_name + item.attributes.last_name,
              title: item.attributes.title,
              work_email: item.attributes.work_email,
              salary: item.attributes.salary,
              record: record,
            }
            itemsArray.push(itemToSave)
          })

          vm[record] = itemsArray

          return
        }
        case 'jobs': {
          data.data.forEach((item) => {
            const itemToSave = {
              id: item.id,
              name: item.attributes.name,
              location: item.attributes.location,
              remote: item.attributes.remote,
              status: item.attributes.status,
              record: record,
            }
            itemsArray.push(itemToSave)
          })

          vm[record] = itemsArray

          return
        }
        case 'payrolls': {
          data.data.forEach((item) => {
            const itemToSave = {
              id: item.id,
              check_data: item.attributes.check_data,
              pay_period_end_date: item.attributes.pay_period_end_date,
              pay_period_start_date: item.attributes.pay_period_start_date,
              record: record,
            }
            itemsArray.push(itemToSave)
          })

          vm[record] = itemsArray

          return
        }
      }
    },
    onRowSelected(items) {
      const vm = this

      vm.selectedItem = items[0]

      vm.$refs['my-modal'].show()
    },
    fetchChildRecords(item) {
      const vm = this

      switch (item.record) {
        case 'jobs': {

          return
        }
      }
    },
    swapTab(record) {
      const vm = this

      const recordModal = record + 'Modal'
      vm[recordModal] = true

      vm.resourceData = null

      switch (record) {
        case 'jobs': {
          vm.employeesModal = false
          vm.payrollsModal = false

          return
        }
        case 'employees': {
          vm.jobsModal = false
          vm.payrollsModal = false

          return
        }
        case 'payrolls': {
          vm.jobsModal = false
          vm.employeesModal = false

          return
        }
      }
    },
    fetchJobDetails() {
      const vm = this

      vm.fetchingJobDetails = true

      fetch(`/show_job/${vm.selectedItem.id}`)
        .then(response => response.json())
        .then((data) => {
          vm.fetchingJobDetails = false
          console.log(data)
        })
        .catch((error) => {
          console.error('Error msg:', error)
        })
    },
  },
})

Vue.config.devtools = true
