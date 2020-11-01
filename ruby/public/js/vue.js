const vueApp = new Vue({
  el: '#app',
  data: {
    access_token: null,
    addingToken: false,
    submittingConnect: false,
    requestingResource: false,
    jobs: [],
    resourceData: {
      employees: {
        status: "error",
        type: null,
        data: [
          {
            "error": "data did not fetch please try again and ensure you put valid credentials"
          }
        ]
      },
      jobs: {
        status: "error",
        type: null,
        data: [
          {
            "error": "data did not fetch please try again and ensure you put valid credentials"
          }
        ]
      },
      payrolls: {
        status: "error",
        type: null,
        data: [
          {
            "error": "data did not fetch please try again and ensure you put valid credentials"
          }
        ]
      }
    },
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
          vm.resourceData[record] = data
          vm.resourceData[record]['status'] = "success"
          console.log('data' + ' ' + record, vm.resourceData[record])
        })
        .catch((error) => {
          vm.requestingResource = true
          console.error('Error msg:', error);
        })
    },
    getConnectToken(companyName) {
      const vm = this

      vm.submittingConnect = true

      fetch('/connect_tokens/create')
        .then(response => response.json())
        .then((data) => {
          vm.submittingConnect = false
          vm.openAuthenticatorEmbed(data.data.id, companyName) 
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
    openAuthenticatorEmbed(connectToken, companyName) {
      const vm = this
      vm.submittingConnect = false

      NCConnector.create({
        company_name: companyName,
        connect_token: connectToken,
        successCallback: (token) => {
          vm.getAccessToken(token.id)
        },
        failureCallback: (error_message) => { console.error(error_message) }
      })
    },
    addAccessToken() {
      const vm = this

      vm.addingToken = true
    },
    onRowSelected(items) {
      console.log('items', items)
    },
  }
})

Vue.config.devtools = true
